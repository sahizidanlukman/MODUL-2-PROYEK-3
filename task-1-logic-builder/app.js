'use strict'; 
  
function validasiNilai(nilai) { 
  // TODO: return true hanya untuk number finite pada 0–100. 
} 
  
function tentukanKategori(nilai) { 
  // TODO: tangani nilai tidak valid, lalu kembalikan A/B/C/D. 
} 
  
function tentukanStatus(nilai) { 
  // TODO: kembalikan Data tidak valid, Lulus, atau Tidak lulus. 
} 
  
function buatRingkasan(nama, nilai) { 
  // TODO: return object berisi nama, nilai, kategori, dan status. 
} 
  
const kasusUji = [ 
  { nama: 'Alya', nilai: 0 }, 
  { nama: 'Bima', nilai: 59 }, 
  { nama: 'Citra', nilai: 60 }, 
  { nama: 'Danu', nilai: 69 }, 
  { nama: 'Eka', nilai: 70 }, 
  { nama: 'Fani', nilai: 85 }, 
  { nama: 'Gilang', nilai: 101 }, 
]; 
  
const hasilUji = kasusUji.map(({ nama, nilai }) => 
  buatRingkasan(nama, nilai) 
); 
  
console.table(hasilUji); 