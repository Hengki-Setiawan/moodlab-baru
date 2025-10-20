import midtransClient from 'midtrans-client';

// Ambil server key dan client key dari environment variables.
const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA';
const clientKey = process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-35fgBhK8ianqJP3d';

// Validasi bahwa server key ada.
if (!serverKey) {
  console.warn('Peringatan: MIDTRANS_SERVER_KEY tidak diatur di environment variables.');
}

// Buat instance baru dari Midtrans CoreApi client untuk transaksi dari sisi server.
// 'isProduction' diatur ke false untuk lingkungan pengembangan/sandbox.
// Ganti menjadi true saat aplikasi Anda siap untuk transaksi live (menggunakan key produksi).
export const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: serverKey,
  clientKey: clientKey
});

// Buat instance Snap client untuk transaksi menggunakan Snap.js
export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: serverKey,
  clientKey: clientKey
});
