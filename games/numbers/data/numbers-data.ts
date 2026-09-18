import { CountableObject, CountableObjectId, NumberItem } from "../types";

export const NUMBERS_CATALOG: NumberItem[] = [
  {
    number: 1,
    word: { id: "Satu", en: "One" },
    emojiGroup: ["🍉"],
    description: { id: "Satu buah semangka segar", en: "One fresh watermelon" },
  },
  {
    number: 2,
    word: { id: "Dua", en: "Two" },
    emojiGroup: ["🍎", "🍎"],
    description: { id: "Dua buah apel merah manis", en: "Two sweet red apples" },
  },
  {
    number: 3,
    word: { id: "Tiga", en: "Three" },
    emojiGroup: ["🍌", "🍌", "🍌"],
    description: { id: "Tiga buah pisang kuning lezat", en: "Three delicious yellow bananas" },
  },
  {
    number: 4,
    word: { id: "Empat", en: "Four" },
    emojiGroup: ["🍓", "🍓", "🍓", "🍓"],
    description: { id: "Empat buah stroberi ceria", en: "Four cheerful strawberries" },
  },
  {
    number: 5,
    word: { id: "Lima", en: "Five" },
    emojiGroup: ["⭐", "⭐", "⭐", "⭐", "⭐"],
    description: { id: "Lima bintang bersinar terang", en: "Five bright shining stars" },
  },
  {
    number: 6,
    word: { id: "Enam", en: "Six" },
    emojiGroup: ["🦆", "🦆", "🦆", "🦆", "🦆", "🦆"],
    description: { id: "Enam ekor bebek lucu berenang", en: "Six cute ducks swimming" },
  },
  {
    number: 7,
    word: { id: "Tujuh", en: "Seven" },
    emojiGroup: ["🐟", "🐟", "🐟", "🐟", "🐟", "🐟", "🐟"],
    description: { id: "Tujuh ikan kecil di lautan", en: "Seven little fishes in the sea" },
  },
  {
    number: 8,
    word: { id: "Delapan", en: "Eight" },
    emojiGroup: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"],
    description: { id: "Delapan balon warna-warni terbang", en: "Eight colorful flying balloons" },
  },
  {
    number: 9,
    word: { id: "Sembilan", en: "Nine" },
    emojiGroup: ["🧁", "🧁", "🧁", "🧁", "🧁", "🧁", "🧁", "🧁", "🧁"],
    description: { id: "Sembilan kue mangkuk manis", en: "Nine sweet cupcakes" },
  },
  {
    number: 10,
    word: { id: "Sepuluh", en: "Ten" },
    emojiGroup: ["🚗", "🚗", "🚗", "🚗", "🚗", "🚗", "🚗", "🚗", "🚗", "🚗"],
    description: { id: "Sepuluh mobil mini berjalan rapi", en: "Ten mini cars on the road" },
  },
];

export const COUNTABLE_OBJECTS: CountableObject[] = [
  {
    id: "watermelon",
    name: { id: "Semangka", en: "Watermelon" },
    pluralName: { id: "Semangka", en: "Watermelons" },
    emoji: "🍉",
    category: "fruits",
    colorHex: "#EF4444",
  },
  {
    id: "apple",
    name: { id: "Apel", en: "Apple" },
    pluralName: { id: "Apel", en: "Apples" },
    emoji: "🍎",
    category: "fruits",
    colorHex: "#DC2626",
  },
  {
    id: "banana",
    name: { id: "Pisang", en: "Banana" },
    pluralName: { id: "Pisang", en: "Bananas" },
    emoji: "🍌",
    category: "fruits",
    colorHex: "#F59E0B",
  },
  {
    id: "strawberry",
    name: { id: "Stroberi", en: "Strawberry" },
    pluralName: { id: "Stroberi", en: "Strawberries" },
    emoji: "🍓",
    category: "fruits",
    colorHex: "#F43F5E",
  },
  {
    id: "orange",
    name: { id: "Jeruk", en: "Orange" },
    pluralName: { id: "Jeruk", en: "Oranges" },
    emoji: "🍊",
    category: "fruits",
    colorHex: "#EA580C",
  },
  {
    id: "duck",
    name: { id: "Bebek", en: "Duck" },
    pluralName: { id: "Bebek", en: "Ducks" },
    emoji: "🦆",
    category: "animals",
    colorHex: "#EAB308",
  },
  {
    id: "bunny",
    name: { id: "Kelinci", en: "Bunny" },
    pluralName: { id: "Kelinci", en: "Bunnies" },
    emoji: "🐰",
    category: "animals",
    colorHex: "#A855F7",
  },
  {
    id: "fish",
    name: { id: "Ikan", en: "Fish" },
    pluralName: { id: "Ikan", en: "Fishes" },
    emoji: "🐟",
    category: "animals",
    colorHex: "#0284C7",
  },
  {
    id: "star",
    name: { id: "Bintang", en: "Star" },
    pluralName: { id: "Bintang", en: "Stars" },
    emoji: "⭐",
    category: "items",
    colorHex: "#FBBF24",
  },
  {
    id: "balloon",
    name: { id: "Balon", en: "Balloon" },
    pluralName: { id: "Balon", en: "Balloons" },
    emoji: "🎈",
    category: "items",
    colorHex: "#EC4899",
  },
  {
    id: "car",
    name: { id: "Mobil", en: "Car" },
    pluralName: { id: "Mobil", en: "Cars" },
    emoji: "🚗",
    category: "items",
    colorHex: "#2563EB",
  },
  {
    id: "cupcake",
    name: { id: "Kue", en: "Cupcake" },
    pluralName: { id: "Kue", en: "Cupcakes" },
    emoji: "🧁",
    category: "items",
    colorHex: "#D946EF",
  },
];

export function getCountableObjectById(id: CountableObjectId): CountableObject {
  return COUNTABLE_OBJECTS.find((o) => o.id === id) || COUNTABLE_OBJECTS[0];
}

export function getRandomCountableObject(): CountableObject {
  return COUNTABLE_OBJECTS[Math.floor(Math.random() * COUNTABLE_OBJECTS.length)];
}
