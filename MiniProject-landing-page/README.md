# Zidan Decant - Mini Project 2 (Modul 2)

Landing page decant parfum, dibuat lanjutan dari Modul 1. Tugas Mini Project Modul 2 mata kuliah D3 Teknik Informatika, nambahin interaksi pakai JavaScript ke landing page yang sudah ada.

## Deskripsi

Landing page ini buat usaha decant parfum, isinya daftar varian parfum, cara pesan, FAQ, dan form kontak. Semua bagian di Modul 1 masih dipakai, cuma ditambah beberapa fitur.

## Target Pengguna

Orang yang mau coba parfum branded tapi budgetnya terbatas, jadi beli versi decant (ukuran kecil) dulu.

## Struktur Halaman

- Header/Nav - nama brand, menu navigasi, tombol menu mobile, tombol tema gelap
- Hero - judul dan CTA ke bagian varian
- Manfaat - kenapa pilih Zidan Decant
- Varian & Harga - daftar produk, bisa difilter per kategori
- Cara Pesan - langkah pemesanan
- FAQ - pertanyaan yang sering ditanya, bentuk accordion
- Form Kontak - buat kirim pesan sebelum chat WhatsApp
- Footer - link WhatsApp
- Tombol kembali ke atas

## Fitur Interaktif (Modul 2)

1. Navigasi mobile - tombol menu buka/tutup di layar kecil
2. Daftar varian dirender dari array data di JavaScript, bukan ditulis manual di HTML
3. Filter kategori Pria/Wanita/Unisex
4. FAQ accordion, klik pertanyaan buat buka/tutup jawaban
5. Form kontak dengan validasi nama, nomor WA, dan pesan, ada notifikasi kalau berhasil
6. Tombol kembali ke atas, muncul kalau sudah scroll ke bawah
7. Tombol ganti tema gelap/terang

## Batasan Teknis yang Dipatuhi

Cuma pakai HTML, CSS, vanilla JavaScript, tanpa framework apapun. Kode JavaScript dipisah di file js/script.js dan dipanggil pakai defer. Belum pakai fetch, Promise, atau async/await karena itu materi Task 3. Semua event pakai addEventListener, tidak ada onclick di HTML. Tidak pakai innerHTML buat masukin data, dipakai createElement dan textContent. Semua fitur bisa dijalankan pakai keyboard juga, tidak cuma mouse.

## Teknologi

HTML5, CSS3 (pakai variable warna buat tema gelap), vanilla JavaScript.

## Cara Menjalankan

Buka file index.html lalu jalankan pakai Live Server.

## Refleksi

(isi sendiri sesuai pengalaman ngerjain project ini)