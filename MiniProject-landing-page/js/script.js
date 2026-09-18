var daftarVarian = [
  { id: 1, nama: "Dior Sauvage", ukuran: "5ml", kategori: "pria", harga: 75000, gambar: "assets/parfum1.jpg" },
  { id: 2, nama: "Versace Eros Flame", ukuran: "5ml", kategori: "pria", harga: 85000, gambar: "assets/parfum2.jpg" },
  { id: 5, nama: "Jean Paul Gaultier Scandal", ukuran: "5ml", kategori: "wanita", harga: 88000, gambar: "assets/parfum4.jpg" },
  { id: 7, nama: "Maison Francis Kurkdjian Baccarat Rouge 540", ukuran: "5ml", kategori: "unisex", harga: 150000, gambar: "assets/parfum3.jpg" },
  { id: 8, nama: "Calvin Klein CK One", ukuran: "5ml", kategori: "unisex", harga: 65000, gambar: "assets/parfum5.jpg" }
];

function formatHarga(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function kosongkanElemen(elemen) {
  while (elemen.firstChild) {
    elemen.removeChild(elemen.firstChild);
  }
}

function buatKartuProduk(produk) {
  var kartu = document.createElement("div");
  kartu.className = "product-card";

  var gambar = document.createElement("img");
  gambar.src = produk.gambar;
  gambar.alt = produk.nama;

  var judul = document.createElement("h3");
  judul.textContent = produk.nama + " (" + produk.ukuran + ")";

  var harga = document.createElement("p");
  harga.className = "product-price";
  harga.textContent = formatHarga(produk.harga);

  var kategori = document.createElement("span");
  kategori.className = "product-tag";
  kategori.textContent = produk.kategori;

  kartu.appendChild(gambar);
  kartu.appendChild(judul);
  kartu.appendChild(harga);
  kartu.appendChild(kategori);

  return kartu;
}

function renderVarian(kategoriDipilih) {
  var productList = document.getElementById("productList");
  var emptyMessage = document.getElementById("emptyMessage");

  kosongkanElemen(productList);

  var hasilFilter = daftarVarian.filter(function (produk) {
    return kategoriDipilih === "semua" || produk.kategori === kategoriDipilih;
  });

  if (hasilFilter.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;

  hasilFilter.forEach(function (produk) {
    var kartu = buatKartuProduk(produk);
    productList.appendChild(kartu);
  });
}

function initFilter() {
  var filterBar = document.getElementById("filterBar");
  var tombolFilter = filterBar.querySelectorAll(".filter-btn");

  tombolFilter.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      tombolFilter.forEach(function (btn) {
        btn.classList.remove("is-active");
      });
      tombol.classList.add("is-active");

      var kategori = tombol.getAttribute("data-kategori");
      renderVarian(kategori);
    });
  });
}

function initNavToggle() {
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", function () {
    var sedangTerbuka = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", sedangTerbuka ? "true" : "false");
  });

  var linkNav = navMenu.querySelectorAll("a");
  linkNav.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initFaqAccordion() {
  var tombolFaq = document.querySelectorAll(".faq-question");

  tombolFaq.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      var sedangTerbuka = tombol.getAttribute("aria-expanded") === "true";
      var idJawaban = tombol.getAttribute("aria-controls");
      var jawaban = document.getElementById(idJawaban);

      tombol.setAttribute("aria-expanded", sedangTerbuka ? "false" : "true");
      jawaban.hidden = sedangTerbuka;
    });
  });
}

function tampilkanError(idInput, pesan) {
  var elemenError = document.getElementById("error-" + idInput);
  elemenError.textContent = pesan;
}

function validasiForm(nama, whatsapp, pesan) {
  var valid = true;

  tampilkanError("nama", "");
  tampilkanError("whatsapp", "");
  tampilkanError("pesan", "");

  if (nama.trim().length === 0) {
    tampilkanError("nama", "Nama wajib diisi.");
    valid = false;
  }

  var polaWhatsapp = /^[0-9+][0-9 ]{8,14}$/;
  if (whatsapp.trim().length === 0) {
    tampilkanError("whatsapp", "Nomor WhatsApp wajib diisi.");
    valid = false;
  } else if (!polaWhatsapp.test(whatsapp.trim())) {
    tampilkanError("whatsapp", "Format nomor tidak valid (contoh: 08123456789).");
    valid = false;
  }

  if (pesan.trim().length === 0) {
    tampilkanError("pesan", "Pesan wajib diisi.");
    valid = false;
  }

  return valid;
}

function initContactForm() {
  var form = document.getElementById("contactForm");
  var pesanSukses = document.getElementById("formSuccess");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var inputNama = document.getElementById("nama");
    var inputWhatsapp = document.getElementById("whatsapp");
    var inputPesan = document.getElementById("pesan");

    pesanSukses.hidden = true;

    var formValid = validasiForm(inputNama.value, inputWhatsapp.value, inputPesan.value);

    if (formValid) {
      form.reset();
      pesanSukses.hidden = false;
      inputNama.focus();
    } else {
      if (inputNama.value.trim().length === 0) {
        inputNama.focus();
      } else if (!/^[0-9+][0-9 ]{8,14}$/.test(inputWhatsapp.value.trim())) {
        inputWhatsapp.focus();
      } else {
        inputPesan.focus();
      }
    }
  });
}

function initBackToTop() {
  var tombolAtas = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    tombolAtas.hidden = window.scrollY <= 300;
  });

  tombolAtas.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initThemeToggle() {
  var tombolTema = document.getElementById("themeToggle");

  tombolTema.addEventListener("click", function () {
    var temaGelapAktif = document.body.classList.toggle("dark-theme");
    tombolTema.textContent = temaGelapAktif ? "☀️ Tema Terang" : "🌙 Tema Gelap";
  });
}

renderVarian("semua");
initFilter();
initNavToggle();
initFaqAccordion();
initContactForm();
initBackToTop();
initThemeToggle();