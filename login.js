// ==========================================================
// Validasi form login
// ==========================================================

// --- Ambil elemen ---
const form = document.getElementById('formLogin');
const email = document.getElementById('email');
const password = document.getElementById('password');
const alertBox = document.getElementById('alertBox');
const togglePw = document.getElementById('togglePw');

// --- Fungsi bantu ---

// Tampilkan status valid/tidak valid pada sebuah input.
// Mengembalikan true jika valid (pesan kosong), false jika tidak.
function setStatus(input, errorId, pesan) {
  const error = document.getElementById(errorId);

  if (pesan) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    error.textContent = pesan;
    return false;
  }

  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  return true;
}

// --- Aturan validasi ---

function cekEmail() {
  const nilai = email.value.trim();
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nilai === '') {
    return setStatus(email, 'emailError', 'Email wajib diisi.');
  }
  if (!polaEmail.test(nilai)) {
    return setStatus(email, 'emailError', 'Format email belum benar. Contoh: nama@gmail.com');
  }
  return setStatus(email, 'emailError', '');
}

function cekPassword() {
  const nilai = password.value;
  const adaHuruf = /[A-Za-z]/.test(nilai);
  const adaAngka = /[0-9]/.test(nilai);

  if (nilai === '') {
    return setStatus(password, 'passwordError', 'Kata sandi wajib diisi.');
  }
  if (nilai.length < 8) {
    return setStatus(password, 'passwordError', 'Kata sandi minimal 8 karakter.');
  }
  if (!adaHuruf || !adaAngka) {
    return setStatus(password, 'passwordError', 'Gunakan kombinasi huruf dan angka.');
  }
  return setStatus(password, 'passwordError', '');
}

// Tampilkan alert hasil akhir ('success' atau 'danger')
function tampilkanAlert(jenis, teks) {
  alertBox.classList.remove('d-none', 'alert-danger', 'alert-success');
  alertBox.classList.add('alert-' + jenis);
  alertBox.textContent = teks;
}

// --- Event ---

// Validasi saat pengguna meninggalkan kolom
email.addEventListener('blur', cekEmail);
password.addEventListener('blur', cekPassword);

// Tombol lihat/sembunyikan kata sandi
togglePw.addEventListener('click', function () {
  const sedangTersembunyi = password.type === 'password';
  password.type = sedangTersembunyi ? 'text' : 'password';
  togglePw.textContent = sedangTersembunyi ? 'Sembunyikan' : 'Lihat';
});

// Validasi saat form dikirim
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const emailOk = cekEmail();
  const passwordOk = cekPassword();

  if (emailOk && passwordOk) {
    tampilkanAlert('success', 'Berhasil masuk. Mengarahkan ke beranda...');
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1500);
  } else {
    tampilkanAlert('danger', 'Periksa kembali isian yang ditandai merah.');
  }
});
