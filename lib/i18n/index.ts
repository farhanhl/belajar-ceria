import { Language } from "@/types/settings";
import { id } from "./id";
import { en } from "./en";

export const dictionaries = {
  id,
  en,
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof id>;

/**
 * Retrieves a translated string given a dot-separated key and optional parameter interpolation
 */
export function getTranslation(key: string, params?: Record<string, string | number>, lang: Language = "id"): string {
  const dict = dictionaries[lang] || dictionaries.id;
  const keys = key.split(".");

  let current: unknown = dict;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      // Fallback to Indonesian if key missing in target lang
      let fallbackCurrent: unknown = dictionaries.id;
      for (const fk of keys) {
        if (fallbackCurrent && typeof fallbackCurrent === "object" && fk in fallbackCurrent) {
          fallbackCurrent = (fallbackCurrent as Record<string, unknown>)[fk];
        } else {
          return key; // return the key itself if not found
        }
      }
      current = fallbackCurrent;
      break;
    }
  }

  if (typeof current !== "string") {
    return key;
  }

  let result = current;
  if (params) {
    for (const [paramKey, paramVal] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramVal));
    }
  }

  return result;
}
