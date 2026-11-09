// ===== KALKULATOR VERDESPACE (SE 1 + SE 2) =====

const KODE_PROMO = "HIJAU10";
const PERSEN_DISKON = 10;      // diskon 10%
const MIN_POT_DISKON = 3;      // beli minimal 3 pot dapat diskon

// Format angka ke Rupiah
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function hitungHarga() {
  // --- SE 1: ambil nilai input & hitung total awal ---
  const hargaPaket = parseInt(document.getElementById("paket").value);
  const jumlahPot = parseInt(document.getElementById("jumlah").value);
  const kodeInput = document.getElementById("promo").value.trim().toUpperCase();
  const hasil = document.getElementById("hasil");

  // Validasi jumlah
  if (isNaN(jumlahPot) || jumlahPot < 1) {
    hasil.innerHTML = '<p class="error">Jumlah pot minimal 1. Silakan periksa kembali.</p>';
    return;
  }

  const totalAwal = hargaPaket * jumlahPot;

  // --- SE 2: logika diskon (if / else) ---
  let diskon = 0;
  let infoDiskon = "";

  if (kodeInput === KODE_PROMO) {
    diskon = totalAwal * PERSEN_DISKON / 100;
    infoDiskon = "Kode promo " + KODE_PROMO + " berhasil digunakan.";
  } else if (jumlahPot >= MIN_POT_DISKON) {
    diskon = totalAwal * PERSEN_DISKON / 100;
    infoDiskon = "Diskon otomatis karena membeli minimal " + MIN_POT_DISKON + " pot.";
  } else if (kodeInput !== "") {
    infoDiskon = "Kode promo tidak valid. Coba kode HIJAU10.";
  } else {
    infoDiskon = "Tambah jadi " + MIN_POT_DISKON + " pot atau pakai kode HIJAU10 untuk diskon 10%.";
  }

  const totalBayar = totalAwal - diskon;

  // Tampilkan hasil ke layar
  hasil.innerHTML =
    '<div class="row"><span>Harga paket</span><span>' + formatRupiah(hargaPaket) + '</span></div>' +
    '<div class="row"><span>Jumlah pot</span><span>' + jumlahPot + '</span></div>' +
    '<div class="row"><span>Total harga awal</span><span>' + formatRupiah(totalAwal) + '</span></div>' +
    '<div class="row diskon"><span>Diskon ' + (diskon > 0 ? PERSEN_DISKON + '%' : '0%') + '</span><span>-' + formatRupiah(diskon) + '</span></div>' +
    '<div class="row total"><span>Total pembayaran</span><span>' + formatRupiah(totalBayar) + '</span></div>' +
    '<p class="info">' + infoDiskon + '</p>';
}

document.getElementById("btn-hitung").addEventListener("click", hitungHarga);
