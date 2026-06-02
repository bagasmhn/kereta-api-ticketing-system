# TODO - Fitur Pembayaran + Ticket

## Checklist
- [ ] 1) Update Prisma schema untuk mendukung simulasi pembayaran (paymentMethod, paymentRef)
- [ ] 2) Ubah BookingService agar transaksi dibuat sebagai PENDING dan kursi tidak langsung BOOKED sampai payment sukses
- [ ] 3) Tambah modul Payment (controller/service/dto)
- [ ] 4) Wiring PaymentModule ke AppModule
- [ ] 5) Pastikan flow sukses: /booking -> transaksiId(PENDING), /payment/init -> redirectUrl, /payment/confirm -> status SUCCESS + kursi BOOKED
- [ ] 6) Build & jalankan aplikasi, cek endpoint-ticket tetap berfungsi

