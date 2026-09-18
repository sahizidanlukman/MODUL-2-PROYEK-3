'use strict';

const statusUI = document.querySelector('#status');
const btnCobaLagi = document.querySelector('#coba-lagi');
const profileContent = document.querySelector('#profile-content');
const statusContainer = document.querySelector('#status-container');

const btnToggleTema = document.querySelector('#toggle-tema');
const btnToggleDetail = document.querySelector('#toggle-detail');
const bioProfil = document.querySelector('#bio-profil');
const fotoProfil = document.querySelector('#foto-profil');

const formSkill = document.querySelector('#form-skill');
const inputSkill = document.querySelector('#input-skill');
const errorSkill = document.querySelector('#error-skill');
const daftarSkill = document.querySelector('#daftar-skill');
const statusSkillEmpty = document.querySelector('#status-skill');

let profilData = null; 
let isLoading = false; 

function ubahStatus(state, pesan) {
  statusUI.dataset.state = state;
  statusUI.textContent = pesan;
  
  if (state === 'error' || state === 'empty') {
    btnCobaLagi.classList.remove('hidden');
    profileContent.classList.add('hidden');
  } else if (state === 'success') {
    btnCobaLagi.classList.add('hidden');
    statusContainer.classList.add('hidden');
    profileContent.classList.remove('hidden');
  } else {
    btnCobaLagi.classList.add('hidden');
    profileContent.classList.add('hidden');
    statusContainer.classList.remove('hidden');
  }
}

async function ambilProfile() {
  const response = await fetch('data/profile.json');
  if (!response.ok) {
    throw new Error('HTTP Error: ' + response.status);
  }
  return response.json();
}

async function jalankanProses() {
  if (isLoading) return; 
  isLoading = true;
  ubahStatus('loading', 'Sedang memuat data dari JSON...');
  
  try {
    const data = await ambilProfile();
    if (!data.nama) {
      ubahStatus('empty', 'Data JSON kosong.');
      return;
    }
    profilData = data;
    renderData();
    renderKeterampilan();
    ubahStatus('success', 'Berhasil.');
  } catch (error) {
    console.error(error);
    ubahStatus('error', 'Gagal memuat: ' + error.message);
  } finally {
    isLoading = false;
  }
}

function renderData() {
  if (profilData.foto) {
    fotoProfil.src = profilData.foto;
    fotoProfil.classList.remove('hidden');
  }
  
  document.querySelector('#nama-profil').textContent = profilData.nama;
  document.querySelector('#teks-bio').textContent = profilData.bio;
}

function fungsiHapus(id) {
  profilData.keterampilan = profilData.keterampilan.filter(item => item.id !== id);
  renderKeterampilan();
}

function renderKeterampilan() {
  daftarSkill.replaceChildren(); // Mencegah render ganda[cite: 2]
  
  if (profilData.keterampilan.length === 0) {
    statusSkillEmpty.classList.remove('hidden');
    return;
  }
  
  statusSkillEmpty.classList.add('hidden');
  
  for (const skill of profilData.keterampilan) {
    const li = document.createElement('li');
    const wadah = document.createElement('div');
    wadah.classList.add('li-container');
    
    const teks = document.createElement('span');
    teks.textContent = skill.nama;
    
    const tombolHapus = document.createElement('button');
    tombolHapus.textContent = 'Hapus';
    tombolHapus.classList.add('btn-hapus');
    tombolHapus.addEventListener('click', () => fungsiHapus(skill.id));
    
    wadah.append(teks, tombolHapus);
    li.append(wadah);
    daftarSkill.append(li);
  }
}

// Event Listeners
btnCobaLagi.addEventListener('click', jalankanProses);

btnToggleTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

btnToggleDetail.addEventListener('click', () => {
  bioProfil.classList.toggle('hidden');
  const apakahTerbuka = !bioProfil.classList.contains('hidden');
  btnToggleDetail.setAttribute('aria-expanded', String(apakahTerbuka));
  
  if (apakahTerbuka) {
    btnToggleDetail.textContent = 'Sembunyikan Bio';
  } else {
    btnToggleDetail.textContent = 'Tampilkan Bio';
  }
});

formSkill.addEventListener('submit', (event) => {
  event.preventDefault(); // Mencegah reload form[cite: 2]
  
  const skillBaru = inputSkill.value.trim();
  
  if (skillBaru.length === 0) {
    errorSkill.textContent = 'Input tidak boleh kosong!';
    inputSkill.setAttribute('aria-invalid', 'true');
    return;
  }
  
  errorSkill.textContent = '';
  inputSkill.removeAttribute('aria-invalid');
  
  profilData.keterampilan.push({ id: Date.now(), nama: skillBaru });
  
  inputSkill.value = '';
  renderKeterampilan();
});

jalankanProses();