'use strict'; 
  
const peserta = [ 
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' }, 
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' }, 
]; 
  
const form = document.querySelector('#form-peserta'); 
const namaInput = document.querySelector('#nama'); 
const prodiInput = document.querySelector('#prodi'); 
const filterInput = document.querySelector('#filter-prodi'); 
const daftar = document.querySelector('#daftar-peserta'); 
const status = document.querySelector('#status'); 
const errorNama = document.querySelector('#error-nama'); 
const errorProdi = document.querySelector('#error-prodi'); 
  
function validasiPeserta(calon) {
  let errorNama = '';
  let errorProdi = '';

  const namaTrim = calon.nama.trim();
  if (namaTrim.length === 0) {
    errorNama = 'Nama wajib diisi';
  } else if (namaTrim.length < 3) {
    errorNama = 'Nama minimal 3 karakter';
  }

  if (calon.prodi === '') {
    errorProdi = 'Program studi wajib dipilih';
  }

  const valid = errorNama === '' && errorProdi === '';
  return { valid, errorNama, errorProdi };
}
  
function buatKartuPeserta(item) {
  const article = document.createElement('article');
  article.classList.add('kartu');

  const h2 = document.createElement('h2');
  h2.textContent = item.nama;

  const p = document.createElement('p');
  p.textContent = item.prodi;

  article.append(h2, p);
  return article;
}
  
function renderPeserta(data) {
  daftar.replaceChildren();

  if (data.length === 0) {
    const kosong = document.createElement('p');
    kosong.textContent = 'Tidak ada peserta';
    daftar.appendChild(kosong);
    status.textContent = 'Tidak ada peserta';
    return;
  }

  const fragment = document.createDocumentFragment();
  data.forEach(item => fragment.appendChild(buatKartuPeserta(item)));
  daftar.appendChild(fragment);

  status.textContent = `${data.length} peserta ditampilkan`;
}
  
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const calon = {
    nama: namaInput.value,
    prodi: prodiInput.value,
  };

  const hasil = validasiPeserta(calon);

  // Nama
  if (hasil.errorNama) {
    namaInput.setAttribute('aria-invalid', 'true');
    errorNama.textContent = hasil.errorNama;
  } else {
    namaInput.removeAttribute('aria-invalid');
    errorNama.textContent = '';
  }

  // Prodi
  if (hasil.errorProdi) {
    prodiInput.setAttribute('aria-invalid', 'true');
    errorProdi.textContent = hasil.errorProdi;
  } else {
    prodiInput.removeAttribute('aria-invalid');
    errorProdi.textContent = '';
  }

  if (!hasil.valid) {
    return; // hentikan proses, jangan tambah data
  }

  peserta.push({
    id: Date.now(),
    nama: calon.nama.trim(),
    prodi: calon.prodi,
  });

  form.reset();
  namaInput.removeAttribute('aria-invalid');
  prodiInput.removeAttribute('aria-invalid');
  errorNama.textContent = '';
  errorProdi.textContent = '';

  renderPeserta(peserta);
});
  
filterInput.addEventListener('change', () => {
  const pilihan = filterInput.value;

  if (pilihan === 'semua') {
    renderPeserta(peserta);
  } else {
    const hasil = peserta.filter(item => item.prodi === pilihan);
    renderPeserta(hasil);
  }
});
  
renderPeserta(peserta);