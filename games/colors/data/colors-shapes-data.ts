import { ColorId, ColorItem, ShapeId, ShapeItem } from "../types";

export const COLORS_CATALOG: ColorItem[] = [
  {
    id: "red",
    name: { id: "Merah", en: "Red" },
    hex: "#EF4444",
    gradient: "from-rose-500 to-red-600",
    textColor: "text-red-700",
    badgeBorder: "border-red-400 bg-red-50",
    realWorldExamples: [
      {
        id: "apple",
        name: { id: "Apel Manis", en: "Sweet Apple" },
        emoji: "🍎",
        description: {
          id: "Buah apel merah yang manis dan segar",
          en: "Sweet and fresh red apple",
        },
      },
      {
        id: "strawberry",
        name: { id: "Stroberi", en: "Strawberry" },
        emoji: "🍓",
        description: {
          id: "Buah stroberi merah berbintik manis",
          en: "Sweet spotted red strawberry",
        },
      },
      {
        id: "firetruck",
        name: { id: "Mobil Pemadam", en: "Fire Truck" },
        emoji: "🚒",
        description: {
          id: "Mobil pemadam kebakaran merah yang gagah",
          en: "Brave red fire engine",
        },
      },
    ],
  },
  {
    id: "blue",
    name: { id: "Biru", en: "Blue" },
    hex: "#3B82F6",
    gradient: "from-sky-400 to-blue-600",
    textColor: "text-blue-700",
    badgeBorder: "border-blue-400 bg-blue-50",
    realWorldExamples: [
      {
        id: "cloud",
        name: { id: "Langit Ceria", en: "Blue Sky" },
        emoji: "🌤️",
        description: {
          id: "Langit biru cerah di hari yang indah",
          en: "Bright blue sky on a lovely day",
        },
      },
      {
        id: "whale",
        name: { id: "Paus Biru", en: "Blue Whale" },
        emoji: "🐋",
        description: {
          id: "Ikan paus biru yang berenang di lautan luas",
          en: "Blue whale swimming in the ocean",
        },
      },
      {
        id: "blueberry",
        name: { id: "Bluberi", en: "Blueberry" },
        emoji: "🫐",
        description: {
          id: "Buah bluberi kecil yang lezat",
          en: "Delicious little blueberries",
        },
      },
    ],
  },
  {
    id: "yellow",
    name: { id: "Kuning", en: "Yellow" },
    hex: "#F59E0B",
    gradient: "from-amber-300 to-yellow-500",
    textColor: "text-amber-800",
    badgeBorder: "border-amber-400 bg-amber-50",
    realWorldExamples: [
      {
        id: "sun",
        name: { id: "Matahari", en: "Sun" },
        emoji: "☀️",
        description: {
          id: "Matahari kuning hangat bersinar terang",
          en: "Warm yellow sun shining bright",
        },
      },
      {
        id: "banana",
        name: { id: "Pisang", en: "Banana" },
        emoji: "🍌",
        description: {
          id: "Buah pisang kuning matang dan manis",
          en: "Sweet ripe yellow banana",
        },
      },
      {
        id: "duck",
        name: { id: "Bebek Lucu", en: "Cute Duck" },
        emoji: "🦆",
        description: {
          id: "Bebek kuning kecil yang suka berenang",
          en: "Little yellow duck that loves to swim",
        },
      },
    ],
  },
  {
    id: "green",
    name: { id: "Hijau", en: "Green" },
    hex: "#10B981",
    gradient: "from-emerald-400 to-green-600",
    textColor: "text-emerald-700",
    badgeBorder: "border-emerald-400 bg-emerald-50",
    realWorldExamples: [
      {
        id: "leaf",
        name: { id: "Daun Segar", en: "Fresh Leaf" },
        emoji: "🍃",
        description: {
          id: "Daun hijau segar di pepohonan rindang",
          en: "Fresh green leaves on shady trees",
        },
      },
      {
        id: "frog",
        name: { id: "Katak Ceria", en: "Happy Frog" },
        emoji: "🐸",
        description: {
          id: "Katak hijau lucu yang suka melompat",
          en: "Cute green frog jumping happily",
        },
      },
      {
        id: "tree",
        name: { id: "Pohon", en: "Tree" },
        emoji: "🌳",
        description: {
          id: "Pohon hijau rindang tempat berteduh",
          en: "Lush green tree for cool shade",
        },
      },
    ],
  },
  {
    id: "orange",
    name: { id: "Oranye", en: "Orange" },
    hex: "#F97316",
    gradient: "from-amber-400 to-orange-600",
    textColor: "text-orange-700",
    badgeBorder: "border-orange-400 bg-orange-50",
    realWorldExamples: [
      {
        id: "orange_fruit",
        name: { id: "Jeruk Manis", en: "Sweet Orange" },
        emoji: "🍊",
        description: {
          id: "Buah jeruk oranye kaya vitamin C",
          en: "Sweet orange fruit rich in vitamin C",
        },
      },
      {
        id: "carrot",
        name: { id: "Wortel", en: "Carrot" },
        emoji: "🥕",
        description: {
          id: "Wortel oranye sehat kesukaan kelinci",
          en: "Healthy orange carrot bunny loves",
        },
      },
      {
        id: "basketball",
        name: { id: "Bola Basket", en: "Basketball" },
        emoji: "🏀",
        description: {
          id: "Bola basket oranye untuk berolahraga",
          en: "Orange basketball for sports",
        },
      },
    ],
  },
  {
    id: "purple",
    name: { id: "Ungu", en: "Purple" },
    hex: "#8B5CF6",
    gradient: "from-violet-400 to-purple-600",
    textColor: "text-purple-700",
    badgeBorder: "border-purple-400 bg-purple-50",
    realWorldExamples: [
      {
        id: "grape",
        name: { id: "Anggur", en: "Grape" },
        emoji: "🍇",
        description: {
          id: "Buah anggur ungu berkelompok manis",
          en: "Sweet cluster of purple grapes",
        },
      },
      {
        id: "eggplant",
        name: { id: "Terung", en: "Eggplant" },
        emoji: "🍆",
        description: {
          id: "Sayur terung ungu yang menyehatkan",
          en: "Healthy purple eggplant",
        },
      },
      {
        id: "flower",
        name: { id: "Bunga Anggrek", en: "Orchid Flower" },
        emoji: "🪻",
        description: {
          id: "Bunga ungu cantik yang harum semerbak",
          en: "Beautiful fragrant purple blossom",
        },
      },
    ],
  },
  {
    id: "pink",
    name: { id: "Merah Muda", en: "Pink" },
    hex: "#EC4899",
    gradient: "from-pink-300 to-rose-500",
    textColor: "text-pink-700",
    badgeBorder: "border-pink-400 bg-pink-50",
    realWorldExamples: [
      {
        id: "flamingo",
        name: { id: "Burung Flamingo", en: "Flamingo" },
        emoji: "🦩",
        description: {
          id: "Burung flamingo merah muda yang anggun",
          en: "Graceful pink flamingo bird",
        },
      },
      {
        id: "candy",
        name: { id: "Gula Kapas", en: "Cotton Candy" },
        emoji: "🍧",
        description: {
          id: "Gula kapas merah muda yang manis lembut",
          en: "Soft sweet pink cotton candy",
        },
      },
      {
        id: "lotus",
        name: { id: "Bunga Teratai", en: "Lotus Flower" },
        emoji: "🌸",
        description: {
          id: "Bunga mekar merah muda yang indah",
          en: "Pretty blooming pink blossom",
        },
      },
    ],
  },
  {
    id: "brown",
    name: { id: "Cokelat", en: "Brown" },
    hex: "#92400E",
    gradient: "from-amber-700 to-amber-900",
    textColor: "text-amber-900",
    badgeBorder: "border-amber-700 bg-amber-50",
    realWorldExamples: [
      {
        id: "chocolate",
        name: { id: "Cokelat", en: "Chocolate" },
        emoji: "🍫",
        description: {
          id: "Batangan cokelat lezat kesukaan semua",
          en: "Delicious yummy chocolate bar",
        },
      },
      {
        id: "bear",
        name: { id: "Beruang Lucu", en: "Cute Bear" },
        emoji: "🐻",
        description: {
          id: "Beruang cokelat berbulu hangat",
          en: "Warm furry brown teddy bear",
        },
      },
      {
        id: "coconut",
        name: { id: "Kelapa", en: "Coconut" },
        emoji: "🥥",
        description: {
          id: "Buah kelapa cokelat dengan air segar",
          en: "Brown coconut with fresh water",
        },
      },
    ],
  },
];

export const SHAPES_CATALOG: ShapeItem[] = [
  {
    id: "circle",
    name: { id: "Lingkaran", en: "Circle" },
    sidesCount: 0,
    description: {
      id: "Bulat sempurna tanpa sudut, seperti roda yang berputar",
      en: "Perfectly round with no corners, like a rolling wheel",
    },
    realWorldExamples: [
      {
        id: "ball",
        name: { id: "Bola", en: "Ball" },
        emoji: "⚽",
        description: { id: "Bola bundar yang asyik dimainkan", en: "Round ball fun to kick" },
      },
      {
        id: "clock",
        name: { id: "Jam Dinding", en: "Wall Clock" },
        emoji: "⏰",
        description: { id: "Jam bulat penunjuk waktu", en: "Round clock showing time" },
      },
      {
        id: "cookie",
        name: { id: "Kue Kering", en: "Cookie" },
        emoji: "🍪",
        description: { id: "Kue bulat renyah yang lezat", en: "Delicious crunchy round cookie" },
      },
    ],
  },
  {
    id: "square",
    name: { id: "Persegi", en: "Square" },
    sidesCount: 4,
    description: {
      id: "Memiliki 4 sisi sama panjang dan 4 sudut lurus",
      en: "Has 4 equal sides and 4 square corners",
    },
    realWorldExamples: [
      {
        id: "gift",
        name: { id: "Kotak Hadiah", en: "Gift Box" },
        emoji: "🎁",
        description: { id: "Kotak kado persegi penuh kejutan", en: "Square present box" },
      },
      {
        id: "window",
        name: { id: "Jendela", en: "Window" },
        emoji: "🪟",
        description: { id: "Jendela persegi tempat melihat keluar", en: "Square window" },
      },
      {
        id: "dice",
        name: { id: "Dadu", en: "Dice" },
        emoji: "🎲",
        description: { id: "Dadu kotak untuk bermain", en: "Square play dice" },
      },
    ],
  },
  {
    id: "triangle",
    name: { id: "Segitiga", en: "Triangle" },
    sidesCount: 3,
    description: {
      id: "Memiliki 3 sisi runcing dan 3 sudut",
      en: "Has 3 straight sides and 3 sharp corners",
    },
    realWorldExamples: [
      {
        id: "pizza_slice",
        name: { id: "Potongan Pizza", en: "Pizza Slice" },
        emoji: "🍕",
        description: { id: "Sepotong pizza segitiga yang lezat", en: "Yummy triangular pizza slice" },
      },
      {
        id: "roof",
        name: { id: "Atap Rumah", en: "House Roof" },
        emoji: "🏠",
        description: { id: "Atap segitiga pelindung dari hujan", en: "Triangular roof for shelter" },
      },
      {
        id: "tent",
        name: { id: "Tenda Kemah", en: "Camping Tent" },
        emoji: "⛺",
        description: { id: "Tenda segitiga untuk berkemah ceria", en: "Triangular camping tent" },
      },
    ],
  },
  {
    id: "rectangle",
    name: { id: "Persegi Panjang", en: "Rectangle" },
    sidesCount: 4,
    description: {
      id: "Memiliki 4 sisi, 2 sisi panjang dan 2 sisi pendek",
      en: "Has 4 sides, 2 long sides and 2 short sides",
    },
    realWorldExamples: [
      {
        id: "door",
        name: { id: "Pintu", en: "Door" },
        emoji: "🚪",
        description: { id: "Pintu masuk rumah yang tinggi", en: "Tall entrance door" },
      },
      {
        id: "board",
        name: { id: "Papan Tulis", en: "Blackboard" },
        emoji: "📋",
        description: { id: "Papan tulis tempat belajar di sekolah", en: "Board for learning" },
      },
      {
        id: "book",
        name: { id: "Buku Cerita", en: "Storybook" },
        emoji: "📖",
        description: { id: "Buku cerita yang seru dibaca", en: "Fun storybook to read" },
      },
    ],
  },
  {
    id: "star",
    name: { id: "Bintang", en: "Star" },
    sidesCount: 5,
    description: {
      id: "Bintang bersudut 5 yang bersinar indah di langit malam",
      en: "5-pointed star shining bright in the night sky",
    },
    realWorldExamples: [
      {
        id: "night_star",
        name: { id: "Bintang Malam", en: "Night Star" },
        emoji: "⭐",
        description: { id: "Bintang berkelap-kelip di langit", en: "Twinkling star in the sky" },
      },
      {
        id: "starfish",
        name: { id: "Bintang Laut", en: "Starfish" },
        emoji: "🐠",
        description: { id: "Bintang laut yang hidup di terumbu karang", en: "Friendly ocean starfish" },
      },
      {
        id: "wand",
        name: { id: "Tongkat Ajaib", en: "Magic Wand" },
        emoji: "🪄",
        description: { id: "Ujung tongkat ajaib berkilau", en: "Sparkling magic wand tip" },
      },
    ],
  },
  {
    id: "heart",
    name: { id: "Hati", en: "Heart" },
    sidesCount: 0,
    description: {
      id: "Bentuk lambang kasih sayang yang hangat dan manis",
      en: "Heart symbol of warm love and affection",
    },
    realWorldExamples: [
      {
        id: "love_card",
        name: { id: "Kartu Kasih", en: "Love Card" },
        emoji: "💌",
        description: { id: "Kartu ucapan manis untuk orang tua", en: "Sweet card for parents" },
      },
      {
        id: "balloon_heart",
        name: { id: "Balon Hati", en: "Heart Balloon" },
        emoji: "🎈",
        description: { id: "Balon berbentuk hati yang terbang tinggi", en: "Flying heart balloon" },
      },
      {
        id: "heart_candy",
        name: { id: "Permen Hati", en: "Heart Candy" },
        emoji: "🍬",
        description: { id: "Permen manis berbentuk hati", en: "Sweet heart-shaped candy" },
      },
    ],
  },
  {
    id: "oval",
    name: { id: "Oval (Lonjong)", en: "Oval" },
    sidesCount: 0,
    description: {
      id: "Bulat memanjang seperti bentuk telur ayam",
      en: "Elongated circle like an egg",
    },
    realWorldExamples: [
      {
        id: "egg",
        name: { id: "Telur", en: "Egg" },
        emoji: "🥚",
        description: { id: "Telur ayam yang lonjong dan bergizi", en: "Nutritious oval egg" },
      },
      {
        id: "rugby",
        name: { id: "Bola Rugbi", en: "Rugby Ball" },
        emoji: "🏉",
        description: { id: "Bola lonjong untuk permainan olahraga", en: "Oval ball for sports" },
      },
      {
        id: "mirror",
        name: { id: "Cermin Hias", en: "Mirror" },
        emoji: "🪞",
        description: { id: "Cermin lonjong untuk berkaca", en: "Oval vanity mirror" },
      },
    ],
  },
  {
    id: "diamond",
    name: { id: "Belah Ketupat", en: "Diamond" },
    sidesCount: 4,
    description: {
      id: "Berbentuk miring 4 sisi seperti layang-layang",
      en: "4-sided tilted shape like a kite",
    },
    realWorldExamples: [
      {
        id: "kite",
        name: { id: "Layang-Layang", en: "Kite" },
        emoji: "🪁",
        description: { id: "Layang-layang yang terbang meliuk di udara", en: "Kite flying in the breeze" },
      },
      {
        id: "gem",
        name: { id: "Permata Berkilau", en: "Shiny Gem" },
        emoji: "💎",
        description: { id: "Batu permata yang berkilau indah", en: "Beautiful sparkling jewel" },
      },
      {
        id: "sign",
        name: { id: "Rambu Kuning", en: "Road Sign" },
        emoji: "🔶",
        description: { id: "Rambu petunjuk yang mudah dilihat", en: "Clear diamond street sign" },
      },
    ],
  },
];

export function getColorById(id: ColorId): ColorItem | undefined {
  return COLORS_CATALOG.find((c) => c.id === id);
}

export function getShapeById(id: ShapeId): ShapeItem | undefined {
  return SHAPES_CATALOG.find((s) => s.id === id);
}
