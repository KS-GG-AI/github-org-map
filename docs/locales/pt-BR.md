<div align="center">

<p>
  <img src="../assets/banner.svg" alt="GitHub Organization Map &amp; Cartography" width="100%" />
</p>

# github-org-map-public

<p>
  <strong>Mapeamento topológico diário automatizado de repositórios KS-GG-AI com mascaramento seguro SHA-256 de conhecimento zero</strong>
</p>

<p>
  <a href="../../README.md">🇺🇸 English</a> · <a href="./ko.md">🇰🇷 한국어</a> · <a href="./zh-CN.md">🇨🇳 中文</a> · <a href="./es.md">🇪🇸 Español</a> · <a href="./hi.md">🇮🇳 हिन्दी</a><br />
  <a href="./ar.md">🇸🇦 العربية</a> · <strong>🇧🇷 Português</strong> · <a href="./ru.md">🇷🇺 Русский</a> · <a href="./fr.md">🇫🇷 Français</a> · <a href="./id.md">🇮🇩 Bahasa Indonesia</a>
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

## Sobre

Um mapa atualizado diariamente dos repositórios pertencentes à conta KS-GG-AI e à organização AI-GG-AUTO-WORK. Repositórios públicos aparecem com seus nomes reais; repositórios privados aparecem mascarados com hash SHA-256 seguro, e alguns repositórios são totalmente omitidos. Cada instantâneo diário é preservado em `history/` e compilado em um GIF animado.

## Como funciona

Este repositório gera o mapa diariamente: instantâneo SVG do dia, histórico em `history/<date>.svg` e GIF animado `org-map.gif`.

## Segredos necessários

Tokens de acesso dedicados (`USER_READ_TOKEN`, `ORG_READ_TOKEN`) e `MASK_SALT` para anonimização com falha fechada.

## Agendamento e CI/CD

Execução diária com fluxo de trabalho dividido em dois jobs isolados para segurança máxima de credenciais.

## Execução local

```sh
npm install
USER_READ_TOKEN=ghp_xxx ORG_READ_TOKEN=ghp_yyy MASK_SALT=<the salt> npm run generate
```

## Configuração

Edite `data/config.json` para ajustar contas rastreadas, fuso horário e parâmetros de GIF.

## Testes

```sh
npm test
```

## Contato

Para perguntas, comentários ou sugestões, utilize os links oficiais abaixo.

[GitHub 프로필](https://github.com/KS-GG-AI) · [프로필 저장소](https://github.com/KS-GG-AI/KS-GG-AI) · [이슈 등록](https://github.com/KS-GG-AI/KS-GG-AI/issues/new)
