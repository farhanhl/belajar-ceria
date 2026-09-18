import { PuzzleItem } from "../types";

export const PUZZLE_CATALOG: PuzzleItem[] = [
  {
    id: "elephant",
    artworkId: "elephant",
    title: {
      id: "Gajah Ceria",
      en: "Happy Elephant",
    },
    theme: "animals",
    themeName: {
      id: "Hewan Ceria",
      en: "Cheerful Animals",
    },
    bgGradient: "from-sky-300 to-blue-400",
    badgeColor: "bg-sky-500",
    description: {
      id: "Sahabat gajah biru yang ramah di padang rumput pelangi",
      en: "A friendly blue elephant in the rainbow meadow",
    },
  },
  {
    id: "cat",
    artworkId: "cat",
    title: {
      id: "Kucing Lucu",
      en: "Playful Kitten",
    },
    theme: "animals",
    themeName: {
      id: "Hewan Ceria",
      en: "Cheerful Animals",
    },
    bgGradient: "from-amber-200 to-orange-400",
    badgeColor: "bg-orange-500",
    description: {
      id: "Kucing belang oranye sedang asyik bermain bola benang",
      en: "An orange tabby kitten playing with a ball of yarn",
    },
  },
  {
    id: "rabbit",
    artworkId: "rabbit",
    title: {
      id: "Kelinci Manis",
      en: "Sweet Bunny",
    },
    theme: "animals",
    themeName: {
      id: "Hewan Ceria",
      en: "Cheerful Animals",
    },
    bgGradient: "from-emerald-200 to-teal-400",
    badgeColor: "bg-teal-500",
    description: {
      id: "Kelinci putih memegang wortel lezat di taman bunga",
      en: "A white rabbit holding a yummy carrot in the garden",
    },
  },
  {
    id: "lion",
    artworkId: "lion",
    title: {
      id: "Singa Sahabat",
      en: "Friendly Lion",
    },
    theme: "animals",
    themeName: {
      id: "Hewan Ceria",
      en: "Cheerful Animals",
    },
    bgGradient: "from-yellow-200 to-amber-400",
    badgeColor: "bg-amber-500",
    description: {
      id: "Singa kecil yang gagah dan ramah di padang rumput sabana",
      en: "A brave and friendly baby lion in the savannah",
    },
  },
  {
    id: "airplane",
    artworkId: "airplane",
    title: {
      id: "Pesawat Langit",
      en: "Sky Airplane",
    },
    theme: "vehicles",
    themeName: {
      id: "Kendaraan Keren",
      en: "Cool Vehicles",
    },
    bgGradient: "from-cyan-300 to-blue-500",
    badgeColor: "bg-blue-500",
    description: {
      id: "Pesawat merah terbang tinggi di atas awan putih yang lembut",
      en: "A red airplane soaring high above the fluffy white clouds",
    },
  },
  {
    id: "firetruck",
    artworkId: "firetruck",
    title: {
      id: "Mobil Pemadam",
      en: "Fire Truck",
    },
    theme: "vehicles",
    themeName: {
      id: "Kendaraan Keren",
      en: "Cool Vehicles",
    },
    bgGradient: "from-red-300 to-rose-500",
    badgeColor: "bg-rose-600",
    description: {
      id: "Mobil pemadam merah siap menolong siapa saja dengan sigap",
      en: "A red fire truck ready to help everyone in town",
    },
  },
  {
    id: "train",
    artworkId: "train",
    title: {
      id: "Kereta Pelangi",
      en: "Rainbow Train",
    },
    theme: "vehicles",
    themeName: {
      id: "Kendaraan Keren",
      en: "Cool Vehicles",
    },
    bgGradient: "from-indigo-300 to-purple-500",
    badgeColor: "bg-indigo-500",
    description: {
      id: "Kereta api ceria meluncur melewati bukit dan gunung indah",
      en: "A cheerful train chugging through green hills and mountains",
    },
  },
  {
    id: "boat",
    artworkId: "boat",
    title: {
      id: "Kapal Layar Ceria",
      en: "Happy Sailboat",
    },
    theme: "vehicles",
    themeName: {
      id: "Kendaraan Keren",
      en: "Cool Vehicles",
    },
    bgGradient: "from-sky-300 to-teal-500",
    badgeColor: "bg-teal-600",
    description: {
      id: "Kapal layar mengarungi lautan biru bersama lumba-lumba",
      en: "A sailboat cruising across the blue sea with jumping dolphins",
    },
  },
];

export function getPuzzleById(id: string): PuzzleItem | undefined {
  return PUZZLE_CATALOG.find((p) => p.id === id);
}
