<div align="center">

<p>
  <img src="../assets/banner.svg" alt="GitHub Organization Map &amp; Cartography" width="100%" />
</p>

# github-org-map-public

<p>
  <strong>Cartographie quotidienne automatisée des dépôts KS-GG-AI avec masquage de confidentialité SHA-256 à divulgation nulle de connaissance</strong>
</p>

<p>
  <a href="../../README.md">🇺🇸 English</a> · <a href="./ko.md">🇰🇷 한국어</a> · <a href="./zh-CN.md">🇨🇳 中文</a> · <a href="./es.md">🇪🇸 Español</a> · <a href="./hi.md">🇮🇳 हिन्दी</a><br />
  <a href="./ar.md">🇸🇦 العربية</a> · <a href="./pt-BR.md">🇧🇷 Português</a> · <a href="./ru.md">🇷🇺 Русский</a> · <strong>🇫🇷 Français</strong> · <a href="./id.md">🇮🇩 Bahasa Indonesia</a>
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

## À propos

Une carte actualisée quotidiennement des dépôts appartenant au compte KS-GG-AI et à l'organisation AI-GG-AUTO-WORK. Les dépôts publics apparaissent sous leurs vrais noms ; les dépôts privés sont masqués avec un hachage SHA-256 salé sécurisé. Les instantanés sont archivés dans `history/` et assemblés dans un GIF animé.

## Fonctionnement

Ce dépôt produit automatiquement la carte : instantané SVG du jour, historique archivé et GIF animé dynamique.

## Secrets requis

Configuration sécurisée avec `USER_READ_TOKEN`, `ORG_READ_TOKEN` et `MASK_SALT`.

## Planification du flux de travail

Exécution quotidienne avec séparation stricte des privilèges entre la génération et la publication.

## Exécution locale

```sh
npm install
USER_READ_TOKEN=ghp_xxx ORG_READ_TOKEN=ghp_yyy MASK_SALT=<the salt> npm run generate
```

## Configuration

Modifiez `data/config.json` pour ajuster les comptes suivis, le fuseau horaire et les paramètres du GIF.

## Tests

```sh
npm test
```

## Contact

Pour toute question ou suggestion, veuillez utiliser les liens ci-dessous.

[GitHub 프로필](https://github.com/KS-GG-AI) · [프로필 저장소](https://github.com/KS-GG-AI/KS-GG-AI) · [이슈 등록](https://github.com/KS-GG-AI/KS-GG-AI/issues/new)
