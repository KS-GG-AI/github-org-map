<div align="center">

<p>
  <img src="../assets/banner.svg" alt="GitHub Organization Map &amp; Cartography" width="100%" />
</p>

# github-org-map-public

<p>
  <strong>Pemetaan topologi harian repositori KS-GG-AI otomatis dengan penyembunyian privasi SHA-256 tanpa pengetahuan</strong>
</p>

<p>
  <a href="../../README.md">🇺🇸 English</a> · <a href="./ko.md">🇰🇷 한국어</a> · <a href="./zh-CN.md">🇨🇳 中文</a> · <a href="./es.md">🇪🇸 Español</a> · <a href="./hi.md">🇮🇳 हिन्दी</a><br />
  <a href="./ar.md">🇸🇦 العربية</a> · <a href="./pt-BR.md">🇧🇷 Português</a> · <a href="./ru.md">🇷🇺 Русский</a> · <a href="./fr.md">🇫🇷 Français</a> · <strong>🇮🇩 Bahasa Indonesia</strong>
</p>

<p>
  <a href="https://github.com/KS-GG-AI/github-org-map-public/releases"><img src="https://img.shields.io/badge/Release-v1.0.0-A78BFA?style=flat-square&logo=github&labelColor=161126" alt="Release" /></a>
  <a href="../../LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&labelColor=161126" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?style=flat-square&logo=typescript&logoColor=white&labelColor=161126" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Privacy-Zero--Knowledge%20SHA--256-F43F5E.svg?style=flat-square&labelColor=161126" alt="Privacy: SHA-256" />
  <img src="https://img.shields.io/badge/Refresh-Automated%20Daily%20Cron-10B981.svg?style=flat-square&labelColor=161126" alt="Daily Automation" />
</p>

<p align="center">
  <img src="../../org-map.svg" alt="GitHub Organization Map" width="100%" />
</p>

</div>

---

## Tentang

Peta repositori milik akun KS-GG-AI dan organisasi AI-GG-AUTO-WORK yang diperbarui setiap hari. Repositori publik ditampilkan dengan nama aslinya; repositori privat disamarkan dengan hash SHA-256 yang aman. Snapshot harian disimpan di `history/` dan digabungkan menjadi GIF animasi.

## Cara kerja

Repositori ini menghasilkan peta secara mandiri: snapshot SVG hari ini, arsip riwayat, dan GIF animasi yang memperlihatkan evolusi struktur.

## Rahasia yang diperlukan (Secrets)

Memerlukan `USER_READ_TOKEN`, `ORG_READ_TOKEN`, dan `MASK_SALT` untuk isolasi data yang aman.

## Jadwal dan Otomatisasi

Berjalan otomatis setiap hari menggunakan alur kerja GitHub Actions dengan dua pekerjaan terpisah.

## Menjalankan secara lokal

```sh
npm install
USER_READ_TOKEN=ghp_xxx ORG_READ_TOKEN=ghp_yyy MASK_SALT=<the salt> npm run generate
```

## Konfigurasi

Edit `data/config.json` untuk mengubah akun, organisasi, zona waktu, atau parameter GIF.

## Pengujian

```sh
npm test
```

## Kontak

Untuk pertanyaan, masukan, atau ide, silakan gunakan tautan resmi di bawah ini.

[GitHub 프로필](https://github.com/KS-GG-AI) · [프로필 저장소](https://github.com/KS-GG-AI/KS-GG-AI) · [이슈 등록](https://github.com/KS-GG-AI/KS-GG-AI/issues/new)
