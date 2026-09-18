<div align="center">

<p>
  <img src="../assets/banner.svg" alt="GitHub Organization Map &amp; Cartography" width="100%" />
</p>

# github-org-map-public

<p>
  <strong>Ежедневное автоматическое картографирование репозиториев KS-GG-AI с маскированием приватности на базе SHA-256 с нулевым разглашением</strong>
</p>

<p>
  <a href="../../README.md">🇺🇸 English</a> · <a href="./ko.md">🇰🇷 한국어</a> · <a href="./zh-CN.md">🇨🇳 中文</a> · <a href="./es.md">🇪🇸 Español</a> · <a href="./hi.md">🇮🇳 हिन्दी</a><br />
  <a href="./ar.md">🇸🇦 العربية</a> · <a href="./pt-BR.md">🇧🇷 Português</a> · <strong>🇷🇺 Русский</strong> · <a href="./fr.md">🇫🇷 Français</a> · <a href="./id.md">🇮🇩 Bahasa Indonesia</a>
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

## О проекте

Ежедневно обновляемая карта репозиториев учетной записи KS-GG-AI и организации AI-GG-AUTO-WORK. Публичные репозитории отображаются под своими реальными именами; приватные репозитории маскируются безопасным хешем SHA-256 с солью. Снимки сохраняются в `history/` и объединяются в анимированный GIF.

## Как это работает

Репозиторий генерирует карту автоматически: векторный снимок SVG на сегодня, датированный архив истории и анимированный GIF `org-map.gif`.

## Необходимые секреты

Для работы требуются `USER_READ_TOKEN`, `ORG_READ_TOKEN` и закрытая соль `MASK_SALT`.

## Расписание и автоматизация

Рабочий процесс GitHub Actions разделен на два изолированных задания: безопасная генерация и фиксация изменений.

## Локальный запуск

```sh
npm install
USER_READ_TOKEN=ghp_xxx ORG_READ_TOKEN=ghp_yyy MASK_SALT=<the salt> npm run generate
```

## Конфигурация

Редактируйте `data/config.json` для настройки учетных записей, организаций и параметров GIF.

## Тестирование

```sh
npm test
```

## Контакты и обратная связь

По всем вопросам и предложениям обращайтесь по официальным ссылкам ниже.

[GitHub 프로필](https://github.com/KS-GG-AI) · [프로필 저장소](https://github.com/KS-GG-AI/KS-GG-AI) · [이슈 등록](https://github.com/KS-GG-AI/KS-GG-AI/issues/new)
