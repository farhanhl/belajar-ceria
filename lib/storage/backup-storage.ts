import { AppData, AppDataSchema } from "@/types/storage";
import { loadAppData, saveAppData } from "./storage";

export function exportBackupJson(): string {
  const data = loadAppData();
  return JSON.stringify(data, null, 2);
}

export function importBackupJson(jsonString: string): { success: boolean; message: string; data?: AppData } {
  try {
    const raw = JSON.parse(jsonString);
    const result = AppDataSchema.safeParse(raw);
    if (!result.success) {
      const errorMsg = result.error.issues
        ? result.error.issues.map((e: { message: string }) => e.message).join(", ")
        : result.error.message || "Skema data tidak valid";
      return {
        success: false,
        message: "Format file cadangan tidak valid: " + errorMsg,
      };
    }

    saveAppData(result.data);
    return {
      success: true,
      message: "Data berhasil dipulihkan!",
      data: result.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: "Gagal membaca file JSON: " + (err instanceof Error ? err.message : String(err)),
    };
  }
}
