import { GameDefinition } from "@/types/game";

export const GAMES_CATALOG: GameDefinition[] = [
  {
    id: "matching",
    titleKey: "games.matching.title",
    descriptionKey: "games.matching.subtitle",
    icon: "puzzle",
    available: true,
    levels: ["easy", "medium", "hard"],
  },
  {
    id: "letters",
    titleKey: "games.letters.title",
    descriptionKey: "games.letters.subtitle",
    icon: "alphabet",
    available: false,
  },
  {
    id: "numbers",
    titleKey: "games.numbers.title",
    descriptionKey: "games.numbers.subtitle",
    icon: "numbers",
    available: false,
  },
  {
    id: "colors",
    titleKey: "games.colors.title",
    descriptionKey: "games.colors.subtitle",
    icon: "shapes",
    available: false,
  },
  {
    id: "memory",
    titleKey: "games.memory.title",
    descriptionKey: "games.memory.subtitle",
    icon: "brain",
    available: false,
  },
  {
    id: "puzzle",
    titleKey: "games.puzzle.title",
    descriptionKey: "games.puzzle.subtitle",
    icon: "pieces",
    available: false,
  },
];
