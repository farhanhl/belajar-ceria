# Belajar Ceria --- Spesifikasi Produk & UI/UX v1

## 1. Ringkasan

**Belajar Ceria** adalah website interaktif untuk membantu anak usia
sekitar 5 tahun belajar melalui permainan edukatif yang sederhana,
menyenangkan, visual, dan didukung **Text-to-Speech (TTS)** dengan suara
ramah anak.

Versi pertama berfokus pada satu permainan:

> **Cocokkan & Temukan**

Arsitektur harus dibuat modular agar permainan lain dapat ditambahkan
kemudian tanpa perlu membangun ulang sistem profil anak, TTS, bahasa,
progress, dan area orang tua.

------------------------------------------------------------------------

## 2. Target Pengguna

### Anak

-   Usia utama: sekitar 5 tahun
-   Membutuhkan instruksi sederhana
-   Interaksi utama menggunakan klik/tap dan drag & drop
-   Belum bergantung pada kemampuan membaca
-   Membutuhkan feedback positif dan visual yang jelas

### Orang Tua

-   Dapat membuat/memilih profile anak
-   Dapat memantau perkembangan setiap anak secara terpisah
-   Tidak perlu mengatur permainan secara rumit

------------------------------------------------------------------------

## 3. Prinsip Desain

1.  **Child-first** --- antarmuka harus mudah dipahami anak.
2.  **Visual-first** --- gunakan gambar, ikon, animasi, dan suara;
    jangan bergantung pada teks.
3.  **Positive reinforcement** --- hindari feedback yang membuat anak
    merasa gagal.
4.  **Sederhana** --- satu layar sebaiknya memiliki satu tujuan utama.
5.  **Aman** --- tidak membutuhkan data pribadi anak selain nama profile
    yang dimasukkan pengguna.
6.  **Modular** --- permainan baru dapat ditambahkan menggunakan sistem
    game yang sama.
7.  **Bilingual-ready** --- Bahasa Indonesia sebagai default, English
    tersedia melalui pengaturan.

------------------------------------------------------------------------

# 4. Identitas Produk

## Nama

**Belajar Ceria**

## Tagline

**Belajar jadi menyenangkan!**

## Karakter utama

Satu karakter pendamping tetap:

> **Ibu Guru**

Karakter berupa wanita/guru yang mengenakan jilbab dengan ekspresi
ramah, ceria, dan lembut.

Tidak ada fitur memilih karakter pendamping.

Ibu Guru digunakan untuk: - menyambut anak - memberikan instruksi -
memberikan feedback - memberi motivasi - membantu anak ketika kesulitan

------------------------------------------------------------------------

# 5. Alur Pengguna

## 5.1 Pengguna baru

``` text
Buka Belajar Ceria
        ↓
Masukkan nama anak
        ↓
Buat profile
        ↓
Ibu Guru menyambut anak
        ↓
Dashboard anak
        ↓
Pilih "Cocokkan & Temukan"
        ↓
Pilih tingkat kesulitan
        ↓
Main 5 soal
        ↓
Hasil permainan
        ↓
Progress diperbarui
        ↓
Kembali ke dashboard
```

------------------------------------------------------------------------

# 6. Sistem Profile Anak

Setiap nama yang dibuat melalui proses onboarding menjadi satu profile
anak.

Contoh:

``` text
Profile:
- Fatimah
- Rizky
- Alya
```

Data setiap profile harus terpisah.

Contoh:

``` text
Fatimah
Level: 3
Bintang: 18
Jawaban benar: 87%

Rizky
Level: 2
Bintang: 11
Jawaban benar: 80%
```

Progress Fatimah tidak boleh memengaruhi progress Rizky.

## 6.1 Profile pertama

Jika belum ada profile:

``` text
Siapa yang mau belajar?

[ Masukkan nama kamu ]

[ Mulai Belajar ]
```

Setelah submit:

``` text
Profile Fatimah dibuat.
```

Ibu Guru:

> "Selamat datang, Fatimah! Selamat datang di Belajar Ceria. Yuk, kita
> belajar bersama!"

## 6.2 Banyak profile

Jika sudah terdapat lebih dari satu profile:

``` text
Siapa yang mau belajar hari ini?

[ 👧 Fatimah ]
[ 👦 Rizky ]
[ 👧 Alya ]

[ + Tambah Anak ]
```

Profile dapat dipilih untuk melanjutkan progress sebelumnya.

------------------------------------------------------------------------

# 7. Dashboard Anak

Contoh struktur:

``` text
┌─────────────────────────────────────┐
│ 🌈 BELAJAR CERIA          ⚙️        │
│                                     │
│ 👩🏻‍🏫 Ibu Guru                       │
│ "Halo, Fatimah! Yuk belajar!"      │
│ 🔊                                  │
│                                     │
│ ⭐ 18 Bintang       🏆 Level 3      │
│                                     │
│         PILIH PERMAINAN             │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ 🧩                         │   │
│ │   COCOKKAN & TEMUKAN          │   │
│ │   Cari pasangan yang tepat!   │   │
│ │                               │   │
│ │          [ MULAI ]            │   │
│ └───────────────────────────────┘   │
│                                     │
│ 🔒 Permainan lain akan tersedia     │
│    segera                           │
└─────────────────────────────────────┘
```

Permainan lain dapat ditampilkan sebagai kartu yang masih terkunci atau
belum tersedia.

Contoh masa depan:

-   🔤 Belajar Huruf
-   🔢 Belajar Angka
-   🎨 Warna & Bentuk
-   🧠 Memori
-   🧩 Puzzle
-   📖 Cerita Interaktif

------------------------------------------------------------------------

# 8. Permainan Pertama: Cocokkan & Temukan

## Tujuan

Melatih: - kemampuan mengenali kesamaan - observasi visual -
konsentrasi - koordinasi tangan dan mata - kemampuan
mengelompokkan/menghubungkan objek

## Gameplay dasar

Anak diminta mencocokkan gambar dengan pasangan yang sama.

Contoh:

``` text
       🍎

🍌     🍎     🐱
```

Anak dapat melakukan drag & drop gambar ke pasangan yang benar.

Alternatif interaksi dapat berupa tap:

``` text
Pilih gambar:

🍎   🐱   🚗

Pasangan:

🚗   🍎   🐱
```

Untuk versi awal, **drag & drop + tap-friendly interaction** disarankan
agar dapat digunakan pada mouse maupun layar sentuh.

------------------------------------------------------------------------

# 9. Level Kesulitan

Tersedia tiga tingkat:

### Level 1 --- Mudah

-   Objek sedikit
-   Gambar sangat berbeda satu sama lain
-   Pasangan identik
-   Distraktor sederhana
-   Cocok untuk pengenalan awal

### Level 2 --- Sedang

-   Objek lebih banyak
-   Distraktor lebih mirip
-   Ukuran/posisi gambar dapat bervariasi
-   Tetap menggunakan konsep pasangan yang sama

### Level 3 --- Sulit

-   Lebih banyak pilihan
-   Distraktor lebih mirip
-   Dapat mulai memperkenalkan hubungan sederhana antarobjek

Untuk versi awal, **Level 1 harus menggunakan gambar yang sama persis**.

------------------------------------------------------------------------

# 10. Jumlah Soal

Setiap sesi permainan:

> **5 soal**

Setelah soal kelima selesai, tampilkan halaman hasil.

Tujuannya agar satu sesi cukup pendek untuk anak usia 5 tahun.

------------------------------------------------------------------------

# 11. Sistem Feedback

## Jawaban benar

Visual: - animasi ringan - objek mendapatkan efek berhasil - bintang
bertambah

TTS:

> "Hebat, Fatimah! Benar!"

Variasi kalimat dapat digunakan agar tidak monoton:

-   "Hebat!"
-   "Pintar sekali!"
-   "Benar! Kamu berhasil!"
-   "Wah, bagus sekali!"

## Jawaban salah

Jangan menggunakan feedback yang keras atau mempermalukan anak.

TTS:

> "Tidak apa-apa. Coba cari lagi, ya!"

Alternatif:

> "Hampir benar. Yuk coba sekali lagi!"

Tidak langsung pindah soal jika anak salah.

------------------------------------------------------------------------

# 12. Text-to-Speech

TTS adalah bagian penting dari pengalaman Belajar Ceria.

## Karakter suara

-   suara perempuan
-   lembut
-   ceria
-   hangat
-   artikulasi jelas
-   kecepatan tidak terlalu cepat
-   terdengar seperti guru yang sedang membimbing anak

## Automatic TTS

TTS otomatis dapat digunakan ketika: - anak masuk dashboard - permainan
dimulai - instruksi baru muncul - jawaban benar - anak selesai bermain -
anak membutuhkan bantuan

## Tombol replay

Setiap instruksi penting memiliki tombol:

> 🔊

Anak dapat menekan tombol tersebut untuk mendengarkan instruksi kembali.

Contoh:

``` text
👩🏻‍🏫
"Ayo cari gambar yang sama!"

              🔊
```

------------------------------------------------------------------------

# 13. Contoh Script TTS

## Welcome

> "Selamat datang, Fatimah! Yuk kita belajar bersama!"

## Memulai permainan

> "Ayo bermain Cocokkan dan Temukan!"

## Instruksi

> "Cari gambar yang sama, lalu cocokkan!"

## Benar

> "Hebat, Fatimah! Jawabanmu benar!"

## Salah

> "Tidak apa-apa. Coba cari lagi, ya!"

## Selesai

> "Yeay! Kamu sudah menyelesaikan permainan!"

## Motivasi

> "Kamu hebat! Yuk coba lagi!"

------------------------------------------------------------------------

# 14. Bahasa

Default:

> **Bahasa Indonesia**

Pengaturan menyediakan:

``` text
⚙️ Pengaturan

Bahasa
● Bahasa Indonesia
○ English
```

Semua teks dan TTS harus menggunakan sistem translation key, bukan
hard-coded text.

Contoh:

``` text
welcome_message
correct_message
incorrect_message
start_game
settings
profile_selection
```

Dengan demikian, penambahan bahasa di masa depan lebih mudah.

------------------------------------------------------------------------

# 15. Pengaturan

Menu pengaturan minimal:

``` text
⚙️ Pengaturan

🔊 Suara
   ON / OFF

🔉 Volume
   ─────────●──

🗣️ Suara otomatis
   ON / OFF

🌐 Bahasa
   Bahasa Indonesia
   English
```

Opsional untuk versi berikutnya: - kecepatan suara - pilihan voice TTS -
mode orang tua - pengaturan aksesibilitas

------------------------------------------------------------------------

# 16. Sistem Bintang

Untuk versi pertama gunakan sistem sederhana:

> ⭐ Bintang

Setiap soal yang berhasil diselesaikan dengan benar mendapatkan bintang.

Contoh:

``` text
5 soal
5 benar
⭐⭐⭐⭐⭐

4 benar
⭐⭐⭐⭐

3 benar
⭐⭐⭐
```

Tidak perlu leaderboard.

Tidak perlu kompetisi antar-anak.

Fokus utama adalah belajar dan kemajuan anak.

------------------------------------------------------------------------

# 17. Halaman Hasil

Setelah 5 soal:

``` text
🎉 SELESAI!

👩🏻‍🏫
"Hebat, Fatimah! Kamu sudah selesai!"

⭐⭐⭐⭐⭐

5 dari 5 benar

[ MAIN LAGI ]

[ KEMBALI KE MENU ]
```

Jika hasil lebih rendah:

``` text
🎉 SELESAI!

⭐⭐⭐

3 dari 5 benar

"Bagus! Kamu sudah mencoba dengan baik.
Yuk berlatih lagi!"

[ COBA LAGI ]

[ KEMBALI KE MENU ]
```

Feedback harus tetap positif.

------------------------------------------------------------------------

# 18. Progress Anak

Simpan minimal:

``` text
profile_id
name
current_level
total_stars
total_games
total_questions
correct_answers
incorrect_answers
accuracy
last_played
```

Contoh:

``` json
{
  "name": "Fatimah",
  "current_level": 3,
  "total_stars": 18,
  "total_games": 12,
  "total_questions": 60,
  "correct_answers": 52,
  "incorrect_answers": 8,
  "accuracy": 86.7
}
```

------------------------------------------------------------------------

# 19. Area Orang Tua

Area orang tua digunakan untuk melihat perkembangan profile anak.

Jika terdapat:

``` text
Fatimah
Rizky
Alya
```

orang tua dapat memilih masing-masing profile.

## Dashboard Orang Tua

Contoh:

``` text
👨‍👩‍👧 AREA ORANG TUA

Anak:
[ Fatimah ▼ ]

Progress
━━━━━━━━━━━━━━━━

⭐ Total Bintang
18

🎮 Permainan selesai
12

🎯 Jawaban benar
52 / 60

📊 Akurasi
86.7%

📚 Level
3
```

## Informasi yang ditampilkan

Minimal: - total permainan - total soal - jumlah jawaban benar -
akurasi - level - total bintang - aktivitas terakhir

Di masa depan dapat ditambahkan: - kemampuan per kategori - durasi
belajar - perkembangan mingguan - rekomendasi latihan - laporan
perkembangan

------------------------------------------------------------------------

# 20. Struktur Navigasi

``` text
Belajar Ceria
│
├── Profile Selection
│   ├── Existing Profiles
│   └── Add Child
│
├── Child Dashboard
│   ├── Profile Summary
│   ├── Game List
│   │   └── Cocokkan & Temukan
│   │       ├── Level Selection
│   │       ├── Game
│   │       └── Result
│   └── Settings
│
└── Parent Area
    ├── Profile Selection
    └── Child Progress
```

------------------------------------------------------------------------

# 21. Arsitektur Game yang Modular

Game jangan dibuat sebagai halaman yang berdiri sendiri.

Gunakan konsep:

``` text
Game Engine
│
├── Matching Game
├── Letter Game       (future)
├── Number Game       (future)
├── Memory Game       (future)
├── Puzzle Game       (future)
└── Story Game        (future)
```

Setiap game sebaiknya mempunyai interface/data standar:

``` text
game_id
title
description
category
difficulty
questions
scoring
tts
progress
```

Contoh:

``` json
{
  "game_id": "matching",
  "title": "Cocokkan & Temukan",
  "category": "cognitive",
  "difficulty": "easy",
  "questions_per_session": 5
}
```

------------------------------------------------------------------------

# 22. Struktur Data Profile

Contoh:

``` json
{
  "id": "profile_001",
  "name": "Fatimah",
  "created_at": "...",
  "progress": {
    "matching": {
      "current_level": 3,
      "stars": 18,
      "games_completed": 12,
      "questions_answered": 60,
      "correct_answers": 52
    }
  },
  "settings": {
    "language": "id",
    "sound_enabled": true,
    "auto_tts": true,
    "volume": 0.8
  }
}
```

------------------------------------------------------------------------

# 23. Responsive Design

Website harus dapat digunakan pada:

-   HP
-   Tablet
-   Laptop
-   Desktop

Prioritas desain:

1.  Tablet
2.  HP
3.  Desktop

Semua elemen permainan harus memiliki ukuran yang cukup besar untuk
disentuh anak.

Target: - tombol besar - area drag & drop besar - teks mudah dibaca -
tidak ada elemen kecil yang penting - jarak antar elemen cukup luas

------------------------------------------------------------------------

# 24. Visual Design

Gaya:

> **Colorful, playful, friendly, clean**

Karakteristik: - warna cerah - bentuk rounded - ilustrasi kartun -
animasi lembut - ikon besar - typography yang mudah dibaca - tidak
terlalu banyak informasi dalam satu layar

Hindari: - tampilan terlalu kompleks - terlalu banyak teks - animasi
berlebihan - warna yang terlalu menyilaukan - tombol kecil - menu yang
sulit dipahami anak

------------------------------------------------------------------------

# 25. Accessibility

Minimal: - semua instruksi penting tersedia melalui TTS - tombol replay
suara - kontras teks cukup jelas - ukuran tombol besar - jangan
menggunakan warna saja untuk menunjukkan benar/salah - animasi tidak
boleh menjadi satu-satunya indikator - suara dapat dimatikan

------------------------------------------------------------------------

# 26. UX Saat Anak Tidak Melakukan Apa-apa

Jika anak tidak berinteraksi selama beberapa saat, Ibu Guru dapat
memberikan bantuan.

Contoh:

> "Masih mencari? Coba lihat gambar yang bentuknya sama."

Setelah waktu lebih lama:

> "Ayo, kita cari bersama-sama."

Sistem hint dapat dibuat bertahap agar tidak langsung memberikan
jawaban.

------------------------------------------------------------------------

# 27. Aturan UX Penting

1.  Anak tidak boleh mudah keluar dari permainan secara tidak sengaja.
2.  Tombol penting harus besar.
3.  Jangan menggunakan dialog konfirmasi yang rumit untuk anak.
4.  TTS harus menggunakan kalimat pendek.
5.  Feedback harus positif.
6.  Jangan membuat anak merasa sedang diuji.
7.  Permainan harus bisa dimainkan tanpa kemampuan membaca yang tinggi.
8.  Setiap sesi dibuat singkat.
9.  Orang tua memiliki area terpisah dari pengalaman anak.
10. Profile anak harus menyimpan progress secara terpisah.

------------------------------------------------------------------------

# 28. Contoh User Journey

## Fatimah pertama kali datang

``` text
Belajar Ceria
       ↓
"Siapa namamu?"
       ↓
Fatimah
       ↓
Buat Profile
       ↓
Ibu Guru:
"Selamat datang, Fatimah!"
       ↓
Dashboard
       ↓
Cocokkan & Temukan
       ↓
Level 1
       ↓
5 soal
       ↓
⭐⭐⭐⭐⭐
       ↓
"Hebat, Fatimah!"
       ↓
Progress tersimpan
```

## Fatimah kembali lagi

``` text
Belajar Ceria
       ↓
"Siapa yang mau belajar?"
       ↓
Fatimah
       ↓
Progress Fatimah dimuat
       ↓
Dashboard
       ↓
Melanjutkan permainan
```

## Jika Rizky ikut

``` text
Belajar Ceria
       ↓
Profile Selection
       ↓
Fatimah
Rizky
+ Tambah Anak
       ↓
Pilih Rizky
       ↓
Dashboard Rizky
       ↓
Progress Rizky sendiri
```

------------------------------------------------------------------------

# 29. Contoh Konten Level 1

Untuk level pertama gunakan objek yang sangat familiar bagi anak.

Contoh kategori:

### Hewan

🐱 Kucing\
🐶 Anjing\
🐰 Kelinci\
🐟 Ikan

### Buah

🍎 Apel\
🍌 Pisang\
🍊 Jeruk\
🍓 Stroberi

### Kendaraan

🚗 Mobil\
🚌 Bus\
🚲 Sepeda\
✈️ Pesawat

### Benda sehari-hari

⚽ Bola\
📚 Buku\
🧸 Boneka\
🎒 Tas

Gambar sebaiknya berupa ilustrasi yang jelas dan tidak membingungkan.

------------------------------------------------------------------------

# 30. Roadmap Pengembangan

## V1

-   Profile anak
-   Profile selection
-   Dashboard
-   Ibu Guru
-   TTS Indonesia
-   Pengaturan suara
-   Pengaturan bahasa
-   Cocokkan & Temukan
-   3 tingkat kesulitan
-   5 soal per sesi
-   Bintang
-   Progress dasar
-   Area orang tua

## V2

-   English TTS
-   lebih banyak tipe matching
-   sistem hint
-   lebih banyak animasi
-   kategori permainan
-   progress lebih detail

## V3

-   Belajar Huruf
-   Belajar Angka
-   Warna & Bentuk
-   Memory
-   Puzzle

## V4

-   Cerita interaktif
-   laporan perkembangan anak
-   progress mingguan
-   rekomendasi latihan berdasarkan aktivitas

------------------------------------------------------------------------

# 31. Definition of Done --- V1

V1 dianggap selesai apabila:

-   [ ] Anak dapat membuat profile menggunakan nama.
-   [ ] Profile dapat dipilih saat terdapat lebih dari satu anak.
-   [ ] Progress setiap profile tersimpan terpisah.
-   [ ] Dashboard anak tersedia.
-   [ ] Ibu Guru tampil sebagai karakter utama.
-   [ ] TTS dapat berbicara otomatis.
-   [ ] Anak dapat menekan tombol speaker untuk mengulang suara.
-   [ ] Bahasa Indonesia menjadi default.
-   [ ] English tersedia di pengaturan.
-   [ ] Anak dapat memainkan Cocokkan & Temukan.
-   [ ] Tersedia 5 soal dalam satu sesi.
-   [ ] Level Easy/Medium/Hard tersedia.
-   [ ] Jawaban benar memberikan feedback positif.
-   [ ] Jawaban salah memberikan kesempatan mencoba lagi.
-   [ ] Bintang diberikan berdasarkan hasil.
-   [ ] Halaman hasil tersedia.
-   [ ] Progress tersimpan setelah permainan.
-   [ ] Orang tua dapat melihat progress masing-masing profile.
-   [ ] Tampilan responsif di HP, tablet, dan desktop.
-   [ ] UI dapat digunakan anak tanpa harus banyak membaca.
-   [ ] Struktur game siap menerima modul permainan baru.

------------------------------------------------------------------------

# 32. Prinsip Utama Produk

**Belajar Ceria bukan sekadar website berisi soal.**

Pengalaman yang ingin dibangun:

> **Anak datang → disambut Ibu Guru → bermain → mendengar suara →
> mencoba → mendapat feedback positif → menyelesaikan permainan →
> mendapatkan penghargaan → progress tersimpan → ingin bermain dan
> belajar lagi.**

Semua fitur berikutnya harus mempertahankan prinsip tersebut.
