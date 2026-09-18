<div align="center">

<p>
  <img src="../assets/banner.svg" alt="GitHub Organization Map &amp; Cartography" width="100%" />
</p>

# github-org-map-public

<p>
  <strong>शून्य-ज्ञान SHA-256 मास्किंग के साथ KS-GG-AI रिपॉजिटरी का स्वचालित दैनिक टोपोलॉजी मानचित्रण</strong>
</p>

<p>
  <a href="../../README.md">🇺🇸 English</a> · <a href="./ko.md">🇰🇷 한국어</a> · <a href="./zh-CN.md">🇨🇳 中文</a> · <a href="./es.md">🇪🇸 Español</a> · <strong>🇮🇳 हिन्दी</strong><br />
  <a href="./ar.md">🇸🇦 العربية</a> · <a href="./pt-BR.md">🇧🇷 Português</a> · <a href="./ru.md">🇷🇺 Русский</a> · <a href="./fr.md">🇫🇷 Français</a> · <a href="./id.md">🇮🇩 Bahasa Indonesia</a>
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

## के बारे में

KS-GG-AI खाते और AI-GG-AUTO-WORK संगठन के रिपॉजिटरी का दैनिक अद्यतन मानचित्र। सार्वजनिक रिपॉजिटरी अपने वास्तविक नामों के साथ दिखाई देते हैं; निजी रिपॉजिटरी सुरक्षित नमकीन SHA-256 मास्क के रूप में दिखाई देते हैं। प्रत्येक स्नैपशॉट को `history/` में रखा जाता है और एक एनिमेटेड GIF में संयोजित किया जाता है।

## यह कैसे काम करता है

यह रिपॉजिटरी दैनिक रूप से मानचित्र उत्पन्न करती है: आज का SVG स्नैपशॉट, कालानुक्रमिक इतिहास, और समय के साथ बदलाव दिखाने वाला एनिमेटेड GIF।

## आवश्यक सीक्रेट्स (Secrets)

सुरक्षित निष्पादन के लिए `USER_READ_TOKEN`, `ORG_READ_TOKEN`, और `MASK_SALT` की आवश्यकता होती है।

## अनुसूची (Schedule)

दैनिक स्वचालित शेड्यूलिंग और पृथक GitHub Actions नौकरियों के साथ सुरक्षित निष्पादन।

## स्थानीय निष्पादन

```sh
npm install
USER_READ_TOKEN=ghp_xxx ORG_READ_TOKEN=ghp_yyy MASK_SALT=<the salt> npm run generate
```

## कॉन्फ़िगरेशन

`data/config.json` को संपादित करके संगठन, समयक्षेत्र और GIF सेटिंग्स को अनुकूलित करें।

## परीक्षण

```sh
npm test
```

## संपर्क और प्रतिक्रिया

प्रश्नों या सुझावों के लिए आधिकारिक लिंक का उपयोग करें।

[GitHub 프로필](https://github.com/KS-GG-AI) · [프로필 저장소](https://github.com/KS-GG-AI/KS-GG-AI) · [이슈 등록](https://github.com/KS-GG-AI/KS-GG-AI/issues/new)
