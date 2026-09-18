/**
 * Child-friendly Cheerful & Chill Background Music Synthesizer (BGM)
 * Designed specifically for young children (age 4-6) with warm music-box / kalimba tones,
 * soft acoustic chords, and a calming playful melody in C Major at 86 BPM.
 * 100% offline, zero network latency, seamless looping.
 */

class BgmSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private duckGain: GainNode | null = null;
  private tempo = 86; // Relaxed cheerful tempo (BPM)
  private timerId: number | null = null;
  private currentStep = 0;
  private totalSteps = 64; // 16 beats * 4 sixteenth-notes = 4-bar or 8-bar loop
  private userVolume = 0.5;
  private hasInitializedGestureListener = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    return this.ctx;
  }

  constructor() {
    if (typeof window !== "undefined") {
      this.setupUserGestureListener();
    }
  }

  /**
   * Listen for first user click / touch to unlock AudioContext on modern browsers
   */
  private setupUserGestureListener() {
    if (this.hasInitializedGestureListener) return;
    this.hasInitializedGestureListener = true;

    const unlock = () => {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      if (this.isPlaying && this.ctx && this.ctx.state === "running") {
        // Active
      }
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
  }

  /**
   * Initialize nodes
   */
  private initAudioNodes() {
    const ctx = this.getContext();
    if (!ctx) return;

    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.duckGain = ctx.createGain();

      this.duckGain.gain.setValueAtTime(1.0, ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.userVolume * 0.22, ctx.currentTime);

      this.duckGain.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);
    }
  }

  /**
   * Start BGM loop
   */
  public start(musicEnabled = true, volume = 0.5) {
    this.isMuted = !musicEnabled;
    this.userVolume = volume;

    if (this.isPlaying) {
      this.setVolume(volume);
      this.setMuted(!musicEnabled);
      return;
    }

    const ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    this.initAudioNodes();
    this.isPlaying = true;
    this.currentStep = 0;
    this.scheduleLoop();
  }

  /**
   * Stop BGM loop
   */
  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Update volume dynamically (0.0 to 1.0)
   */
  public setVolume(volume: number) {
    this.userVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : this.userVolume * 0.22;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Toggle mute state
   */
  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : this.userVolume * 0.22;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Duck BGM temporarily when teacher speaks
   */
  public duck(durationMs = 2000) {
    if (!this.duckGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.duckGain.gain.cancelScheduledValues(now);
      this.duckGain.gain.setTargetAtTime(0.35, now, 0.05);
      this.duckGain.gain.setTargetAtTime(1.0, now + durationMs / 1000, 0.2);
    } catch {
      // Ignore
    }
  }

  /**
   * Cheerful C-Major Scale Notes (Frequencies in Hz)
   */
  private note(noteName: string): number {
    const table: Record<string, number> = {
      C3: 130.81,
      D3: 146.83,
      E3: 164.81,
      F3: 174.61,
      G3: 196.0,
      A3: 220.0,
      B3: 246.94,

      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      F4: 349.23,
      G4: 392.0,
      A4: 440.0,
      B4: 493.88,

      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      F5: 698.46,
      G5: 783.99,
      A5: 880.0,
      B5: 987.77,

      C6: 1046.5,
      D6: 1174.66,
      E6: 1318.51,
      G6: 1567.98,
    };
    return table[noteName] || 440;
  }

  /**
   * Play a warm Kalimba / Music Box bell note
   */
  private playKalimba(freq: number, startTime: number, duration = 0.45, velocity = 0.5) {
    const ctx = this.ctx;
    if (!ctx || !this.duckGain) return;

    try {
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft triangle base + sine harmonic for crystal-clear but warm child-friendly tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      oscHarmonic.type = "triangle";
      oscHarmonic.frequency.setValueAtTime(freq * 2, startTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, startTime);
      filter.frequency.exponentialRampToValueAtTime(800, startTime + duration);

      // ADSR: instantaneous attack, organic decay
      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.setValueAtTime(velocity * 0.45, startTime + 0.005);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.duckGain);

      osc.start(startTime);
      oscHarmonic.start(startTime);
      osc.stop(startTime + duration + 0.05);
      oscHarmonic.stop(startTime + duration + 0.05);
    } catch {
      // Audio node failure fallback
    }
  }

  /**
   * Play a soft warm pad chord
   */
  private playWarmPad(freqs: number[], startTime: number, duration = 1.6, velocity = 0.3) {
    const ctx = this.ctx;
    if (!ctx || !this.duckGain) return;

    try {
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, startTime);

        // Smooth swelling pad
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(velocity * 0.12, startTime + 0.2);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.duckGain!);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      });
    } catch {
      // Audio node failure fallback
    }
  }

  /**
   * Play a gentle acoustic bass note
   */
  private playBass(freq: number, startTime: number, duration = 0.8, velocity = 0.4) {
    const ctx = this.ctx;
    if (!ctx || !this.duckGain) return;

    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.setValueAtTime(velocity * 0.35, startTime + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.duckGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Audio node failure fallback
    }
  }

  /**
   * Play a soft wooden click / raindrop tap
   */
  private playSoftWoodblock(startTime: number, pitch = 800) {
    const ctx = this.ctx;
    if (!ctx || !this.duckGain) return;

    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, startTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, startTime + 0.03);

      noteGain.gain.setValueAtTime(0.06, startTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.035);

      osc.connect(noteGain);
      noteGain.connect(this.duckGain);

      osc.start(startTime);
      osc.stop(startTime + 0.04);
    } catch {
      // Audio node failure fallback
    }
  }

  /**
   * Schedule 1 step of loop
   */
  private scheduleLoop() {
    if (!this.isPlaying) return;

    const ctx = this.getContext();
    if (!ctx) return;

    const sixteenthDuration = (60 / this.tempo) / 4; // in seconds
    const now = ctx.currentTime;

    const step = this.currentStep;
    const time = now + 0.05; // lookahead

    // 1. Chords & Bass Trigger on Bar starts
    if (step === 0) {
      this.playWarmPad([this.note("C4"), this.note("E4"), this.note("G4"), this.note("B4")], time, 1.4);
      this.playBass(this.note("C3"), time, 0.9);
    } else if (step === 8) {
      this.playWarmPad([this.note("B3"), this.note("D4"), this.note("G4")], time, 1.4);
      this.playBass(this.note("G3"), time, 0.9);
    } else if (step === 16) {
      this.playWarmPad([this.note("A3"), this.note("C4"), this.note("E4"), this.note("G4")], time, 1.4);
      this.playBass(this.note("A3"), time, 0.9);
    } else if (step === 24) {
      this.playWarmPad([this.note("F3"), this.note("A3"), this.note("C4"), this.note("E4")], time, 1.4);
      this.playBass(this.note("F3"), time, 0.9);
    } else if (step === 32) {
      this.playWarmPad([this.note("E3"), this.note("G3"), this.note("C4")], time, 1.4);
      this.playBass(this.note("E3"), time, 0.9);
    } else if (step === 40) {
      this.playWarmPad([this.note("F3"), this.note("A3"), this.note("C4")], time, 1.4);
      this.playBass(this.note("F3"), time, 0.9);
    } else if (step === 48) {
      this.playWarmPad([this.note("D3"), this.note("F3"), this.note("A3"), this.note("C4")], time, 1.4);
      this.playBass(this.note("D3"), time, 0.9);
    } else if (step === 56) {
      this.playWarmPad([this.note("G3"), this.note("B3"), this.note("D4"), this.note("F4")], time, 1.4);
      this.playBass(this.note("G3"), time, 0.9);
    }

    // 2. Gentle Kalimba / Music Box Playful Melody
    const melodyMap: Record<number, string[]> = {
      // Bar 1 (Cmaj7)
      0: ["E5"],
      2: ["G5"],
      4: ["C6"],
      6: ["B5"],
      // Bar 2 (G)
      8: ["D5"],
      10: ["G5"],
      12: ["B5"],
      14: ["A5"],
      // Bar 3 (Am7)
      16: ["C5"],
      18: ["E5"],
      20: ["A5"],
      22: ["G5"],
      // Bar 4 (Fmaj7)
      24: ["F5"],
      26: ["A5"],
      28: ["C6"],
      30: ["D6"],
      // Bar 5 (C/E)
      32: ["E6"],
      34: ["C6"],
      36: ["G5"],
      38: ["E5"],
      // Bar 6 (Fmaj7)
      40: ["A5"],
      42: ["C6"],
      44: ["D6"],
      46: ["E6"],
      // Bar 7 (Dm7)
      48: ["F6"],
      50: ["D6"],
      52: ["A5"],
      54: ["F5"],
      // Bar 8 (G7)
      56: ["G5"],
      58: ["B5"],
      60: ["D6"],
      62: ["E5"],
    };

    if (melodyMap[step]) {
      melodyMap[step].forEach((noteName) => {
        this.playKalimba(this.note(noteName), time, 0.4, 0.5);
      });
    }

    // 3. Gentle Soft Rhythm Tick (every 4 steps = quarter note)
    if (step % 4 === 0) {
      this.playSoftWoodblock(time, step % 8 === 0 ? 950 : 650);
    }

    // Advance step
    this.currentStep = (this.currentStep + 1) % this.totalSteps;

    // Schedule next sixteenth-note
    this.timerId = window.setTimeout(() => {
      this.scheduleLoop();
    }, sixteenthDuration * 1000);
  }
}

export const bgm = new BgmSynthesizer();
