<div align="center">

<p>
  <img src="../assets/banner.svg" alt="GitHub Organization Map &amp; Cartography" width="100%" />
</p>

# github-org-map-public

<p>
  <strong>Mapeo y cartografía topológica diaria de repositorios KS-GG-AI con preservación de privacidad SHA-256 de conocimiento cero</strong>
</p>

<p>
  <a href="../../README.md">🇺🇸 English</a> · <a href="./ko.md">🇰🇷 한국어</a> · <a href="./zh-CN.md">🇨🇳 中文</a> · <strong>🇪🇸 Español</strong> · <a href="./hi.md">🇮🇳 हिन्दी</a><br />
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

## Acerca de

Un mapa actualizado diariamente de los repositorios pertenecientes a la cuenta KS-GG-AI y a la organización AI-GG-AUTO-WORK. Los repositorios públicos se muestran con sus nombres reales; los repositorios privados aparecen enmascarados mediante hash SHA-256 con sal, y algunos repositorios internos se omiten por completo. Cada instantánea se archiva en `history/` y se compila en un GIF animado.

## Cómo funciona

Este repositorio genera el mapa automáticamente cada día:
- **Instantánea SVG de hoy**: Diagrama vectorial con estilo chasis oscuro de alto rendimiento.
- **Historial fechado**: Archivo cronológico guardado en `history/<date>.svg`.
- **Línea de tiempo GIF animada**: Compilación secuencial `org-map.gif` que muestra la evolución histórica.

## Secretos requeridos

Un token de acceso personal de grano fino está restringido a un único propietario, por lo que se requieren tres secretos:
- `USER_READ_TOKEN`: Acceso a la cuenta personal (Metadatos de solo lectura).
- `ORG_READ_TOKEN`: Acceso a la organización rastreada.
- `MASK_SALT`: Cadena aleatoria secreta para salar los hashes de enmascaramiento.

## Programación del flujo de trabajo

`.github/workflows/refresh.yml` se ejecuta diariamente y bajo demanda mediante `workflow_dispatch`, dividido en dos trabajos aislados: generación segura y confirmación sin secretos.

## Ejecución local

```sh
npm install
USER_READ_TOKEN=ghp_xxx ORG_READ_TOKEN=ghp_yyy MASK_SALT=<the salt> npm run generate
```

## Configuración

Modifique `data/config.json` para cambiar cuentas, organizaciones, zonas horarias o parámetros de animación GIF.

## Pruebas

```sh
npm test
```

## Contacto

Para preguntas, sugerencias o comentarios, utilice los siguientes enlaces oficiales.

[GitHub 프로필](https://github.com/KS-GG-AI) · [프로필 저장소](https://github.com/KS-GG-AI/KS-GG-AI) · [이슈 등록](https://github.com/KS-GG-AI/KS-GG-AI/issues/new)
