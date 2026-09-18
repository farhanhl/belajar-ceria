import { MatchingItem } from "@/types/game";

export const ALL_ITEMS: MatchingItem[] = [
  // Animals
  { id: "cat", pairId: "cat", iconName: "cat", label: "Kucing", labelId: "Kucing", labelEn: "Cat", category: "animals" },
  { id: "dog", pairId: "dog", iconName: "dog", label: "Anjing", labelId: "Anjing", labelEn: "Dog", category: "animals" },
  { id: "rabbit", pairId: "rabbit", iconName: "rabbit", label: "Kelinci", labelId: "Kelinci", labelEn: "Rabbit", category: "animals" },
  { id: "fish", pairId: "fish", iconName: "fish", label: "Ikan", labelId: "Ikan", labelEn: "Fish", category: "animals" },
  { id: "lion", pairId: "lion", iconName: "lion", label: "Singa", labelId: "Singa", labelEn: "Lion", category: "animals" },
  { id: "elephant", pairId: "elephant", iconName: "elephant", label: "Gajah", labelId: "Gajah", labelEn: "Elephant", category: "animals" },
  { id: "bear", pairId: "bear", iconName: "bear", label: "Beruang", labelId: "Beruang", labelEn: "Bear", category: "animals" },
  { id: "frog", pairId: "frog", iconName: "frog", label: "Katak", labelId: "Katak", labelEn: "Frog", category: "animals" },

  // Fruits
  { id: "apple", pairId: "apple", iconName: "apple", label: "Apel", labelId: "Apel", labelEn: "Apple", category: "fruits" },
  { id: "banana", pairId: "banana", iconName: "banana", label: "Pisang", labelId: "Pisang", labelEn: "Banana", category: "fruits" },
  { id: "orange", pairId: "orange", iconName: "orange", label: "Jeruk", labelId: "Jeruk", labelEn: "Orange", category: "fruits" },
  { id: "strawberry", pairId: "strawberry", iconName: "strawberry", label: "Stroberi", labelId: "Stroberi", labelEn: "Strawberry", category: "fruits" },
  { id: "grape", pairId: "grape", iconName: "grape", label: "Anggur", labelId: "Anggur", labelEn: "Grapes", category: "fruits" },
  { id: "watermelon", pairId: "watermelon", iconName: "watermelon", label: "Semangka", labelId: "Semangka", labelEn: "Watermelon", category: "fruits" },

  // Vehicles
  { id: "car", pairId: "car", iconName: "car", label: "Mobil", labelId: "Mobil", labelEn: "Car", category: "vehicles" },
  { id: "bus", pairId: "bus", iconName: "bus", label: "Bus", labelId: "Bus", labelEn: "Bus", category: "vehicles" },
  { id: "bicycle", pairId: "bicycle", iconName: "bicycle", label: "Sepeda", labelId: "Sepeda", labelEn: "Bicycle", category: "vehicles" },
  { id: "airplane", pairId: "airplane", iconName: "airplane", label: "Pesawat", labelId: "Pesawat", labelEn: "Airplane", category: "vehicles" },
  { id: "rocket", pairId: "rocket", iconName: "rocket", label: "Roket", labelId: "Roket", labelEn: "Rocket", category: "vehicles" },
  { id: "train", pairId: "train", iconName: "train", label: "Kereta", labelId: "Kereta", labelEn: "Train", category: "vehicles" },

  // Everyday Objects
  { id: "ball", pairId: "ball", iconName: "ball", label: "Bola", labelId: "Bola", labelEn: "Ball", category: "objects" },
  { id: "book", pairId: "book", iconName: "book", label: "Buku", labelId: "Buku", labelEn: "Book", category: "objects" },
  { id: "teddy", pairId: "teddy", iconName: "teddy", label: "Boneka", labelId: "Boneka", labelEn: "Teddy Bear", category: "objects" },
  { id: "backpack", pairId: "backpack", iconName: "backpack", label: "Tas", labelId: "Tas", labelEn: "Backpack", category: "objects" },
  { id: "star", pairId: "star", iconName: "star", label: "Bintang", labelId: "Bintang", labelEn: "Star", category: "objects" },
  { id: "balloon", pairId: "balloon", iconName: "balloon", label: "Balon", labelId: "Balon", labelEn: "Balloon", category: "objects" },
];

export function getMatchingItemLabel(item: MatchingItem, lang: "id" | "en" = "id"): string {
  if (lang === "en") {
    return item.labelEn || item.label;
  }
  return item.labelId || item.label;
}
