import { AdabCategory, AdabScenario, AdabDoa } from "../types";

export const ADAB_CATEGORIES: {
  id: AdabCategory;
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  icon: string;
  themeColor: string;
}[] = [
  {
    id: "eating",
    title: { id: "Makan & Minum", en: "Eating & Drinking" },
    subtitle: { id: "Cuci tangan, baca doa, dan gunakan tangan kanan", en: "Wash hands, pray, and use right hand" },
    icon: "🍽️",
    themeColor: "amber",
  },
  {
    id: "speech",
    title: { id: "Sopan Santun", en: "Polite Speech & Manners" },
    subtitle: { id: "4 Kata Ajaib: Tolong, Terima Kasih, Maaf, Permisi", en: "4 Magic Words: Please, Thank You, Sorry, Excuse Me" },
    icon: "💬",
    themeColor: "sky",
  },
  {
    id: "cleanliness",
    title: { id: "Bersih & Rapi", en: "Clean & Tidy Habits" },
    subtitle: { id: "Merapikan mainan dan buang sampah pada tempatnya", en: "Tidying toys and throwing trash in the bin" },
    icon: "🧼",
    themeColor: "emerald",
  },
  {
    id: "sleeping",
    title: { id: "Tidur & Bangun", en: "Sleeping & Waking" },
    subtitle: { id: "Wudhu, membaca doa, dan bangun pagi ceria", en: "Wudu, prayer, and joyful early morning wake up" },
    icon: "🌙",
    themeColor: "indigo",
  },
  {
    id: "sharing",
    title: { id: "Berbagi & Menolong", en: "Sharing & Helping" },
    subtitle: { id: "Sayang teman, tolong sesama, dan rawat lingkungan", en: "Love friends, help each other, and care for nature" },
    icon: "🤝",
    themeColor: "rose",
  },
];

export const DAILY_DOAS: Record<string, AdabDoa> = {
  before_eating: {
    id: "before_eating",
    title: { id: "Doa Sebelum Makan", en: "Prayer Before Eating" },
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar",
    translation: {
      id: "Ya Allah, berkahilah rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.",
      en: "O Allah, bless the provision You have given us and save us from the punishment of the fire.",
    },
    whenToRead: {
      id: "Dibaca sebelum mulai menyantap makanan.",
      en: "Recited before starting to eat food.",
    },
    emoji: "🍲",
  },
  after_eating: {
    id: "after_eating",
    title: { id: "Doa Setelah Makan", en: "Prayer After Eating" },
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    latin: "Alhamdulillaahil ladzii ath'amanaa wa saqoonaa wa ja'alanaa muslimiin",
    translation: {
      id: "Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami orang-orang muslim.",
      en: "Praise be to Allah Who fed us and gave us drink and made us Muslims.",
    },
    whenToRead: {
      id: "Dibaca selesai makan dan minum sebagai rasa syukur.",
      en: "Recited after eating and drinking in gratitude.",
    },
    emoji: "🥤",
  },
  before_sleep: {
    id: "before_sleep",
    title: { id: "Doa Sebelum Tidur", en: "Prayer Before Sleep" },
    arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
    latin: "Bismikallaahumma ahyaa wa amuutu",
    translation: {
      id: "Dengan nama-Mu ya Allah, aku hidup dan aku mati.",
      en: "In Your name, O Allah, I live and I die.",
    },
    whenToRead: {
      id: "Dibaca saat sudah berbaring di tempat tidur.",
      en: "Recited while lying down in bed.",
    },
    emoji: "🛌",
  },
  after_wake: {
    id: "after_wake",
    title: { id: "Doa Bangun Tidur", en: "Prayer Upon Waking" },
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin: "Alhamdulillaahil ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin nusyuur",
    translation: {
      id: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami kembali.",
      en: "Praise be to Allah Who brought us to life after giving us death, and to Him is the resurrection.",
    },
    whenToRead: {
      id: "Dibaca ketika baru bangun di pagi hari.",
      en: "Recited right after waking up in the morning.",
    },
    emoji: "🌅",
  },
  enter_bathroom: {
    id: "enter_bathroom",
    title: { id: "Doa Masuk Kamar Mandi", en: "Prayer Entering Bathroom" },
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allahumma innii a'uudzu bika minal khubutsi wal khobaa-its",
    translation: {
      id: "Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan.",
      en: "O Allah, I seek refuge with You from all evil and evil spirits.",
    },
    whenToRead: {
      id: "Dibaca sebelum melangkah masuk toilet dengan kaki kiri.",
      en: "Recited before stepping in with the left foot.",
    },
    emoji: "🚪",
  },
};

export const ADAB_SCENARIOS: AdabScenario[] = [
  // --- KATEGORI 1: MAKAN & MINUM ---
  {
    id: "eat-wash-hands",
    category: "eating",
    difficulty: "easy",
    title: { id: "Sebelum Makan", en: "Before Eating" },
    situation: {
      id: "Ibu telah menyiapkan makan siang yang lezat di meja makan. Apa yang sebaiknya kamu lakukan pertama kali?",
      en: "Mom has prepared delicious lunch on the dining table. What should you do first?",
    },
    question: {
      id: "Pilihlah kebiasaan yang baik sebelum menyentuh makanan:",
      en: "Choose the good habit before touching food:",
    },
    sceneEmoji: "🍲",
    themeColor: "amber",
    associatedDoa: DAILY_DOAS.before_eating,
    moralLesson: {
      id: "Mencuci tangan dengan sabun menjaga kebersihan dan melindungi tubuh kita dari kuman jahat.",
      en: "Washing hands with soap keeps us clean and protects our body from germs.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Mencuci tangan dengan sabun dan air mengalir", en: "Wash hands with soap and running water" },
        emoji: "🧼",
        isCorrect: true,
        feedback: {
          id: "Pintar sekali! Tangan jadi bersih bebas kuman sebelum makan.",
          en: "Wonderful! Hands are clean and free from germs before eating.",
        },
      },
      {
        id: "c2",
        text: { id: "Langsung mengambil makanan dengan tangan kotor", en: "Immediately grab food with dirty hands" },
        emoji: "🖐️",
        isCorrect: false,
        feedback: {
          id: "Kuman di tangan bisa ikut termakan lho. Yuk cuci tangan dulu!",
          en: "Germs on dirty hands could make your tummy hurt. Let's wash hands first!",
        },
      },
    ],
  },
  {
    id: "eat-right-hand",
    category: "eating",
    difficulty: "easy",
    title: { id: "Tangan Saat Makan", en: "Hands While Eating" },
    situation: {
      id: "Kamu sedang menikmati bekal kue yang enak di sekolah bersama teman-teman.",
      en: "You are enjoying tasty snack cakes at school with your friends.",
    },
    question: {
      id: "Tangan manakah yang kita gunakan untuk makan dan minum?",
      en: "Which hand do we use to eat and drink?",
    },
    sceneEmoji: "🍰",
    themeColor: "amber",
    moralLesson: {
      id: "Rasulullah mengajarkan kita untuk selalu makan dan minum menggunakan tangan kanan.",
      en: "Prophet Muhammad taught us to always eat and drink using our right hand.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Makan menggunakan tangan kanan sambil duduk", en: "Eat using right hand while sitting down" },
        emoji: "👍",
        isCorrect: true,
        feedback: {
          id: "Hebat! Makan dengan tangan kanan dan duduk adalah adab terpuji.",
          en: "Great job! Eating with right hand while sitting is a noble habit.",
        },
      },
      {
        id: "c2",
        text: { id: "Makan menggunakan tangan kiri sambil berlari", en: "Eat using left hand while running" },
        emoji: "🏃‍♂️",
        isCorrect: false,
        feedback: {
          id: "Makan sambil berlari bisa tersedak, dan gunakan tangan kanan ya!",
          en: "Eating while running can choke you, and always use your right hand!",
        },
      },
    ],
  },
  {
    id: "eat-finish-gratitude",
    category: "eating",
    difficulty: "medium",
    title: { id: "Selesai Makan", en: "Finished Eating" },
    situation: {
      id: "Piring makanmu sudah bersih dan perutmu terasa kenyang dan bertenaga.",
      en: "Your plate is empty and your tummy feels full and energized.",
    },
    question: {
      id: "Apa yang kita ucapkan dan lakukan setelah selesai makan?",
      en: "What do we say and do after finishing our meal?",
    },
    sceneEmoji: "🥣",
    themeColor: "amber",
    associatedDoa: DAILY_DOAS.after_eating,
    moralLesson: {
      id: "Mengucap Alhamdulillah adalah tanda syukur kepada Allah yang telah memberi kita rezeki.",
      en: "Saying Alhamdulillah expresses gratitude to Allah for providing our sustenance.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Membaca doa 'Alhamdulillah' dan merapikan piring", en: "Recite 'Alhamdulillah' and tidy up plate" },
        emoji: "🤲",
        isCorrect: true,
        feedback: {
          id: "Masya Allah! Anak sholeh/sholehah selalu bersyukur dan mandiri.",
          en: "Masha Allah! Good children always show gratitude and help tidy up.",
        },
      },
      {
        id: "c2",
        text: { id: "Meninggalkan piring kotor berantakan di meja", en: "Leave dirty dishes scattered on the table" },
        emoji: "❌",
        isCorrect: false,
        feedback: {
          id: "Sebaiknya kita bawa piring ke tempat cuci piring ya teman-teman!",
          en: "We should carry our dish to the kitchen sink to help mom and dad!",
        },
      },
    ],
  },

  // --- KATEGORI 2: SOPAN SANTUN & 4 KATA AJAIB ---
  {
    id: "speech-magic-please",
    category: "speech",
    difficulty: "easy",
    title: { id: "Meminta Bantuan", en: "Asking for Help" },
    situation: {
      id: "Kamu ingin mengambil buku cerita yang letaknya tinggi di atas rak buku.",
      en: "You want to reach a storybook placed high on top of the shelf.",
    },
    question: {
      id: "Kata ajaib apa yang kamu ucapkan saat meminta bantuan Ayah?",
      en: "Which magic word do you say when asking Dad for help?",
    },
    sceneEmoji: "📚",
    themeColor: "sky",
    moralLesson: {
      id: "Kata 'Tolong' menunjukkan rasa hormat dan kerendahan hati saat membutuhkan bantuan.",
      en: "Saying 'Please' shows respect and kindness when requesting help.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "'Ayah, tolong bantu ambilkan buku itu ya'", en: "'Dad, please help me reach that book'" },
        emoji: "✨",
        isCorrect: true,
        feedback: {
          id: "Bagus sekali! Mengucap kata 'Tolong' membuat orang senang membantu.",
          en: "Wonderful! Saying 'Please' makes people happy to assist you.",
        },
      },
      {
        id: "c2",
        text: { id: "'Ayah cepat ambilkan sekarang!' (Berteriak)", en: "'Dad get it now!' (Shouting)" },
        emoji: "📢",
        isCorrect: false,
        feedback: {
          id: "Berteriak kurang sopan. Yuk minta tolong dengan suara lembut!",
          en: "Shouting is not polite. Let's speak gently and say 'please'!",
        },
      },
    ],
  },
  {
    id: "speech-magic-thanks",
    category: "speech",
    difficulty: "easy",
    title: { id: "Menerima Hadiah / Kebaikan", en: "Receiving a Gift or Kindness" },
    situation: {
      id: "Temanmu meminjamkan pensil warna yang indah saat kamu membutuhkannya.",
      en: "Your classmate lends you a bright colored pencil when you need one.",
    },
    question: {
      id: "Apa yang kamu katakan kepada temanmu?",
      en: "What do you say to your friend?",
    },
    sceneEmoji: "🎁",
    themeColor: "sky",
    moralLesson: {
      id: "Mengucapkan 'Terima Kasih' atau 'Jazakallah Khair' menghargai kebaikan orang lain.",
      en: "Saying 'Thank You' expresses appreciation for other people's kindness.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "'Terima kasih banyak ya sudah meminjamkan!'", en: "'Thank you so much for lending it to me!'" },
        emoji: "💖",
        isCorrect: true,
        feedback: {
          id: "Luar biasa! Terima kasih adalah ungkapan manis yang membahagiakan teman.",
          en: "Awesome! Saying thank you spreads happiness to your friend.",
        },
      },
      {
        id: "c2",
        text: { id: "Mengambil pensil tanpa berbicara apa-apa", en: "Take the pencil silently without saying anything" },
        emoji: "🤐",
        isCorrect: false,
        feedback: {
          id: "Jangan lupa ucapkan terima kasih ya agar temanmu merasa dihargai!",
          en: "Don't forget to say thank you so your friend feels appreciated!",
        },
      },
    ],
  },
  {
    id: "speech-magic-sorry",
    category: "speech",
    difficulty: "medium",
    title: { id: "Saat Berbuat Salah", en: "When Making a Mistake" },
    situation: {
      id: "Tanpa sengaja kamu menyenggol menara balok temanmu hingga roboh.",
      en: "Accidentally, you bumped into your friend's block tower and it fell.",
    },
    question: {
      id: "Sikap anak pemberani dan berakhlak baik adalah:",
      en: "The attitude of a brave and kind child is:",
    },
    sceneEmoji: "🧱",
    themeColor: "sky",
    moralLesson: {
      id: "Meminta maaf dan membantu merapikan kembali adalah ciri anak yang berjiwa besar.",
      en: "Apologizing and helping rebuild shows honesty and greatness of heart.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Meminta maaf dan membantu menyusunnya kembali", en: "Say sorry and help rebuild the tower together" },
        emoji: "🤝",
        isCorrect: true,
        feedback: {
          id: "Anak hebat! Mengakui kesalahan dan meminta maaf adalah perbuatan mulia.",
          en: "Great child! Admitting mistakes and saying sorry is truly honorable.",
        },
      },
      {
        id: "c2",
        text: { id: "Pura-pura tidak tahu dan lari bersembunyi", en: "Pretend not knowing and run away" },
        emoji: "🙈",
        isCorrect: false,
        feedback: {
          id: "Jangan takut minta maaf ya. Temanmu pasti memaafkan jika kamu jujur!",
          en: "Don't be afraid to apologize. Your friend will appreciate your honesty!",
        },
      },
    ],
  },

  // --- KATEGORI 3: KEBIASAAN BERSIH & RAPI ---
  {
    id: "clean-toys-tidy",
    category: "cleanliness",
    difficulty: "easy",
    title: { id: "Selesai Bermain Mainan", en: "After Playing with Toys" },
    situation: {
      id: "Kamu dan adik selesai bermain balok susun dan boneka di ruang tengah.",
      en: "You and your little sibling finished playing with building blocks in the living room.",
    },
    question: {
      id: "Apa yang harus dilakukan dengan mainan tersebut?",
      en: "What should be done with all the toys?",
    },
    sceneEmoji: "🧸",
    themeColor: "emerald",
    moralLesson: {
      id: "Menyimpan mainan di tempatnya melatih kemandirian dan membuat rumah tetap aman dan rapi.",
      en: "Putting toys back in their storage keeps our home safe and tidy.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Memasukkan mainan kembali ke dalam kotak mainan", en: "Put all toys back into the toy storage box" },
        emoji: "📦",
        isCorrect: true,
        feedback: {
          id: "Hebat dan mandiri! Ruangan jadi bersih dan tidak ada yang tersandung.",
          en: "Tidy and helpful! The room is neat and nobody trips on toys.",
        },
      },
      {
        id: "c2",
        text: { id: "Membiarkan mainan berserakan di lantai", en: "Leave toys scattered all over the floor" },
        emoji: "💥",
        isCorrect: false,
        feedback: {
          id: "Mainan yang berserakan bisa terinjak dan rusak. Yuk rapikan bersama!",
          en: "Scattered toys can get stepped on and broken. Let's tidy them up!",
        },
      },
    ],
  },
  {
    id: "clean-trash-bin",
    category: "cleanliness",
    difficulty: "easy",
    title: { id: "Membuang Sampah", en: "Disposing of Trash" },
    situation: {
      id: "Kamu baru saja selesai memakan pisang yang manis di taman bermain.",
      en: "You just finished eating a sweet banana at the park.",
    },
    question: {
      id: "Di manakah tempat yang tepat untuk membuang kulit pisang?",
      en: "Where is the right place to throw the banana peel?",
    },
    sceneEmoji: "🍌",
    themeColor: "emerald",
    moralLesson: {
      id: "Kebersihan adalah sebagian dari iman. Jagalah kebersihan lingkungan kita.",
      en: "Cleanliness is a part of faith. Always protect our environment.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Membuang kulit pisang ke dalam tempat sampah", en: "Throw the banana peel into the trash bin" },
        emoji: "🗑️",
        isCorrect: true,
        feedback: {
          id: "Tepat sekali! Taman tetap bersih dan tidak ada yang terpeleset.",
          en: "Exactly right! The park stays clean and safe for everyone.",
        },
      },
      {
        id: "c2",
        text: { id: "Melempar kulit pisang ke rumput sembarangan", en: "Toss the peel onto the grass carelessly" },
        emoji: "🍃",
        isCorrect: false,
        feedback: {
          id: "Kulit pisang di jalan bisa membuat orang terpeleset lho. Buang di tong sampah ya!",
          en: "Peels on the ground can make people slip. Always use the trash can!",
        },
      },
    ],
  },
  {
    id: "clean-bathroom-etiquette",
    category: "cleanliness",
    difficulty: "hard",
    title: { id: "Adab ke Kamar Mandi", en: "Bathroom Manners" },
    situation: {
      id: "Kamu ingin buang air kecil di toilet rumah.",
      en: "You want to use the bathroom at home.",
    },
    question: {
      id: "Kaki manakah yang kita langkahkan pertama kali saat masuk toilet?",
      en: "Which foot do we step forward with first when entering the bathroom?",
    },
    sceneEmoji: "🚪",
    themeColor: "emerald",
    associatedDoa: DAILY_DOAS.enter_bathroom,
    moralLesson: {
      id: "Masuk kamar mandi mendahulukan kaki kiri dan membaca doa perlindungan.",
      en: "Enter the bathroom with the left foot first and recite the protection prayer.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Membaca doa dan melangkah dengan kaki kiri", en: "Recite prayer and step in with left foot" },
        emoji: "👣",
        isCorrect: true,
        feedback: {
          id: "Masya Allah! Kamu mengamalkan sunnah Rasulullah dengan sempurna.",
          en: "Masha Allah! You follow the Prophet's manners perfectly.",
        },
      },
      {
        id: "c2",
        text: { id: "Masuk dengan kaki kanan sambil bernyanyi keras", en: "Step in with right foot while singing loudly" },
        emoji: "🎤",
        isCorrect: false,
        feedback: {
          id: "Di kamar mandi tidak boleh bernyanyi atau berisik ya teman-teman.",
          en: "We should remain calm and avoid singing inside the bathroom.",
        },
      },
    ],
  },

  // --- KATEGORI 4: TIDUR & BANGUN PAGI ---
  {
    id: "sleep-routine-night",
    category: "sleeping",
    difficulty: "easy",
    title: { id: "Persiapan Tidur Malam", en: "Night Bedtime Routine" },
    situation: {
      id: "Jam dinding menunjukkan pukul 8 malam dan matamu sudah mulai mengantuk.",
      en: "The clock shows 8 PM and your eyes are feeling sleepy.",
    },
    question: {
      id: "Kebiasaan baik apa yang dilakukan sebelum naik ke tempat tidur?",
      en: "What is the healthy habit before getting into bed?",
    },
    sceneEmoji: "🪥",
    themeColor: "indigo",
    associatedDoa: DAILY_DOAS.before_sleep,
    moralLesson: {
      id: "Menyikat gigi dan berwudhu sebelum tidur membuat tidur kita nyenyak dan dijaga malaikat.",
      en: "Brushing teeth and doing wudu makes our sleep peaceful and protected.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Menggosok gigi, cuci kaki, dan membaca doa tidur", en: "Brush teeth, wash feet, and recite sleep prayer" },
        emoji: "✨",
        isCorrect: true,
        feedback: {
          id: "Pintar sekali! Gigi bersih bebas kuman dan tidur jadi nyenyak.",
          en: "Super smart! Clean teeth and a peaceful night of sweet dreams.",
        },
      },
      {
        id: "c2",
        text: { id: "Makan permen manis di atas kasur tanpa sikat gigi", en: "Eat sweet candy in bed without brushing teeth" },
        emoji: "🍬",
        isCorrect: false,
        feedback: {
          id: "Gula bisa merusak gigi saat tidur lho. Jangan lupa sikat gigi ya!",
          en: "Sugar causes tooth decay overnight. Always brush your teeth!",
        },
      },
    ],
  },
  {
    id: "sleep-wake-morning",
    category: "sleeping",
    difficulty: "medium",
    title: { id: "Bangun di Pagi Hari", en: "Waking Up in the Morning" },
    situation: {
      id: "Matahari pagi mulai terbit dan burung-burung berkicau riang di luar jendela.",
      en: "The morning sun rises and cheerful birds chirp outside your window.",
    },
    question: {
      id: "Sikap ceria apa yang sebaiknya kita tunjukkan saat bangun tidur?",
      en: "What cheerful attitude should we show upon waking up?",
    },
    sceneEmoji: "🌅",
    themeColor: "indigo",
    associatedDoa: DAILY_DOAS.after_wake,
    moralLesson: {
      id: "Bangun pagi dengan senyuman, membaca doa, dan menyapa keluarga dengan penuh cinta.",
      en: "Wake up early with a smile, recite prayer, and greet family with love.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Tersenyum, membaca doa bangun, dan merapikan selimut", en: "Smile, recite waking prayer, and fold the blanket" },
        emoji: "🌞",
        isCorrect: true,
        feedback: {
          id: "Luar biasa! Bangun pagi dengan bersyukur membuat hari kita penuh berkah.",
          en: "Brilliant! Starting the morning with gratitude brings blessings all day.",
        },
      },
      {
        id: "c2",
        text: { id: "Menangis dan marah-marah saat dibangunkan", en: "Crying and whining when woken up" },
        emoji: "😭",
        isCorrect: false,
        feedback: {
          id: "Pagi hari adalah anugerah indah. Yuk sambut dengan senyum ceria!",
          en: "Morning is a beautiful gift. Let's greet it with a bright smile!",
        },
      },
    ],
  },

  // --- KATEGORI 5: BERBAGI & MENOLONG ---
  {
    id: "share-snack-friend",
    category: "sharing",
    difficulty: "easy",
    title: { id: "Berbagi Makanan", en: "Sharing Food" },
    situation: {
      id: "Kamu membawa dua biskuit lezat, sedangkan temanmu lupa membawa bekal cemilan.",
      en: "You have two delicious cookies, while your friend forgot to bring snacks.",
    },
    question: {
      id: "Apa yang sebaiknya kamu lakukan?",
      en: "What should you do?",
    },
    sceneEmoji: "🍪",
    themeColor: "rose",
    moralLesson: {
      id: "Berbagi makanan mendatangkan kasih sayang dan pahala yang berlimpah.",
      en: "Sharing food brings affection, friendship, and great rewards.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Membagi satu biskuit untuk dinikmati bersama teman", en: "Share one cookie so you can enjoy together" },
        emoji: "🥰",
        isCorrect: true,
        feedback: {
          id: "Hati yang sangat mulia! Berbagi membuat persahabatan semakin erat.",
          en: "So kind-hearted! Sharing makes friendship stronger and warmer.",
        },
      },
      {
        id: "c2",
        text: { id: "Menyembunyikan biskuit dan makan sendiri", en: "Hide the cookies and eat all alone" },
        emoji: "🙈",
        isCorrect: false,
        feedback: {
          id: "Berbagi dengan teman tidak akan membuat kita kekurangan lho!",
          en: "Sharing with friends never makes us lack anything. It multiplies joy!",
        },
      },
    ],
  },
  {
    id: "share-help-fallen-friend",
    category: "sharing",
    difficulty: "medium",
    title: { id: "Menolong Teman Terjatuh", en: "Helping a Fallen Friend" },
    situation: {
      id: "Saat bermain kejar-kejaran di halaman sekolah, temanmu tersandung dan terjatuh.",
      en: "While playing tag in the school yard, your friend tripped and fell down.",
    },
    question: {
      id: "Bagaimanakah tindakan anak baik?",
      en: "What is the action of a kind child?",
    },
    sceneEmoji: "🩹",
    themeColor: "rose",
    moralLesson: {
      id: "Menolong sesama yang tertimpa musibah adalah bukti cinta dan kepedulian.",
      en: "Helping others in difficulty is proof of genuine love and empathy.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Membantu teman berdiri dan menenangkannya", en: "Help friend stand up and check if they are okay" },
        emoji: "💖",
        isCorrect: true,
        feedback: {
          id: "Pahlawan cilik! Sikap suka menolong sangat disukai Allah dan semua orang.",
          en: "Little hero! Helping others is beloved by Allah and everyone.",
        },
      },
      {
        id: "c2",
        text: { id: "Menertawakan teman yang terjatuh", en: "Laughing at the friend who fell" },
        emoji: "😆",
        isCorrect: false,
        feedback: {
          id: "Menertawakan teman membuat hatinya sedih. Kita harus menolongnya ya!",
          en: "Laughing hurts people's feelings. We should always help instead!",
        },
      },
    ],
  },
  {
    id: "share-care-plants-animals",
    category: "sharing",
    difficulty: "hard",
    title: { id: "Menyayangi Mahluk Hidup", en: "Caring for Plants and Animals" },
    situation: {
      id: "Ada kucing kecil yang mengeong kehausan dan tanaman bunga yang layu di halaman.",
      en: "A small kitten meows thirstily and flower plants look wilted in the garden.",
    },
    question: {
      id: "Perbuatan terpuji apa yang bisa kita lakukan?",
      en: "What noble deed can we do?",
    },
    sceneEmoji: "🐱",
    themeColor: "rose",
    moralLesson: {
      id: "Menyayangi hewan dan merawat tanaman adalah ibadah dan wujud syukur atas ciptaan Allah.",
      en: "Caring for animals and plants is an act of worship and gratitude to Allah.",
    },
    choices: [
      {
        id: "c1",
        text: { id: "Memberi kucing minum dan menyiram tanaman dengan air", en: "Give kitten water to drink and water the flowers" },
        emoji: "🌸",
        isCorrect: true,
        feedback: {
          id: "Masya Allah! Menyayangi mahluk hidup mendatangkan rahmat dari langit.",
          en: "Masha Allah! Compassion towards living creatures brings mercy from above.",
        },
      },
      {
        id: "c2",
        text: { id: "Mengusir kucing dan merusak tangkai bunga", en: "Chase the kitten away and snap flower stems" },
        emoji: "🚫",
        isCorrect: false,
        feedback: {
          id: "Mahluk hidup ciptaan Allah harus kita sayangi dan rawat ya!",
          en: "All living beings created by Allah should be loved and protected!",
        },
      },
    ],
  },
];
