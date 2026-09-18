import { Language } from "@/types/settings";
import { bgm } from "@/lib/audio/bgm";

export interface SpeakOptions {
  text: string;
  language?: Language;
  volume?: number;
  rate?: number;
  pitch?: number;
  voiceURI?: string; // explicit voice URI to use (overrides auto-detection)
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

/**
 * Female-only Indonesian TTS Service.
 * Always uses a female voice in Bahasa Indonesia.
 */
class TtsService {
  private isSpeakingState = false;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded = false;
  private cachedFemaleVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
          this.cachedFemaleVoice = null; // re-discover on voice list change
        };
      }
    }
  }

  public initVoices(): SpeechSynthesisVoice[] {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
    this.voices = window.speechSynthesis.getVoices();
    this.voicesLoaded = this.voices.length > 0;
    return this.voices;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.voicesLoaded || this.voices.length === 0) {
      this.initVoices();
    }
    return this.voices;
  }

  /** Find a voice by its voiceURI string. Returns null if not found. */
  public getVoiceByURI(uri: string): SpeechSynthesisVoice | null {
    if (!uri) return null;
    const all = this.getAvailableVoices();
    return all.find((v) => v.voiceURI === uri) || null;
  }

  public isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  public isSpeaking(): boolean {
    if (!this.isSupported()) return false;
    return this.isSpeakingState || window.speechSynthesis.speaking;
  }

  public stop() {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
      this.isSpeakingState = false;
    }
  }

  /**
   * Known female voice name keywords (cross-platform)
   */
  private static readonly FEMALE_KEYWORDS = [
    "gadis", "siti", "wanita", "female",
    "zira", "jenny", "aria", "samantha", "victoria",
    "karen", "moira", "fiona", "tessa", "hazel",
    "susan", "linda", "heera", "sabina",
  ];

  /**
   * Known male voice name keywords to exclude
   */
  private static readonly MALE_KEYWORDS = [
    "andika", "male", "david", "mark", "george",
    "guy", "stefan", "richard", "james", "paul",
    "daniel", "tom", "alex", "ravi", "hemant",
  ];

  /**
   * Check if a voice is definitively male
   */
  private isDefinitelyMale(voice: SpeechSynthesisVoice): boolean {
    const name = voice.name.toLowerCase();
    return TtsService.MALE_KEYWORDS.some((k) => name.includes(k));
  }

  /**
   * Check if a voice is known female
   */
  private isKnownFemale(voice: SpeechSynthesisVoice): boolean {
    const name = voice.name.toLowerCase();
    return TtsService.FEMALE_KEYWORDS.some((k) => name.includes(k));
  }

  /**
   * Find the best female Indonesian voice.
   * Priority:
   *   1. Indonesian female voice (Gadis, Siti, etc.)
   *   2. Google Indonesian voice (typically female)
   *   3. Any Indonesian voice that is NOT male
   *   4. Any non-male voice (cross-language fallback with id-ID lang forced)
   *   5. null (will use browser default with high pitch)
   */
  public getFemaleVoice(): SpeechSynthesisVoice | null {
    if (this.cachedFemaleVoice) return this.cachedFemaleVoice;

    const allVoices = this.getAvailableVoices();
    if (allVoices.length === 0) return null;

    // Indonesian voices
    const idVoices = allVoices.filter((v) => v.lang.toLowerCase().startsWith("id"));

    // 1. Known female Indonesian voice
    const idFemale = idVoices.find((v) => this.isKnownFemale(v));
    if (idFemale) {
      this.cachedFemaleVoice = idFemale;
      return idFemale;
    }

    // 2. Google Indonesian voice (Google voices are typically female)
    const googleId = idVoices.find((v) => v.name.toLowerCase().includes("google"));
    if (googleId) {
      this.cachedFemaleVoice = googleId;
      return googleId;
    }

    // 3. Any Indonesian voice that is NOT male
    const idNonMale = idVoices.find((v) => !this.isDefinitelyMale(v));
    if (idNonMale) {
      this.cachedFemaleVoice = idNonMale;
      return idNonMale;
    }

    // 4. Skip male Indonesian voices entirely — find ANY female voice from other languages
    const anyFemale = allVoices.find((v) => this.isKnownFemale(v) && !this.isDefinitelyMale(v));
    if (anyFemale) {
      this.cachedFemaleVoice = anyFemale;
      return anyFemale;
    }

    // 5. Any non-male voice as last resort
    const anyNonMale = allVoices.find((v) => !this.isDefinitelyMale(v));
    if (anyNonMale) {
      this.cachedFemaleVoice = anyNonMale;
      return anyNonMale;
    }

    // Absolute fallback: null — we'll set high pitch on utterance
    return null;
  }

  /**
   * Speak a text message with a cheerful feminine Indonesian teacher voice.
   * Always uses id-ID language and a female voice.
   */
  public speak(options: SpeakOptions) {
    if (!this.isSupported()) {
      if (options.onEnd) options.onEnd();
      return;
    }

    // Always cancel previous speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(options.text);

    // Always Indonesian
    utterance.lang = "id-ID";
    utterance.volume = options.volume !== undefined ? Math.max(0, Math.min(1, options.volume)) : 0.95;

    const femaleVoice = options.voiceURI
      ? this.getVoiceByURI(options.voiceURI) ?? this.getFemaleVoice()
      : this.getFemaleVoice();

    if (femaleVoice) {
      utterance.voice = femaleVoice;

      // If voice is from a different language (cross-language fallback),
      // still force id-ID lang code
      if (!femaleVoice.lang.toLowerCase().startsWith("id")) {
        utterance.lang = "id-ID";
      }
    }

    // Cheerful female teacher pitch & rate
    // High pitch (1.3) for warm, playful feminine tone
    utterance.pitch = options.pitch || 1.3;
    utterance.rate = options.rate || 0.9;

    utterance.onstart = () => {
      this.isSpeakingState = true;
      bgm.duck(Math.max(1500, options.text.length * 90));
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      if (options.onError) options.onError(e);
      if (options.onEnd) options.onEnd();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      this.isSpeakingState = false;
      if (options.onEnd) options.onEnd();
    }
  }
}

export const ttsService = new TtsService();
