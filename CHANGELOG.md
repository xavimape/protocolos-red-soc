# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

- Screenshots in `docs/screenshots/`
- Additional Sigma/Suricata detection rules per module

---

## [1.0.0] — 2026-07

### Added
- **9 complete modules**: DNS, HTTP/HTTPS, TCP, UDP, DHCP, SMB, FTP, SSH, TLS/SSL
- 4-tab structure per module: Demo Lab, Teoría, Ejercicios, Recursos
- Interactive hub (`web/index.html`) with search bar and OSI-layer filters (Transporte / Aplicación)
- Bilingual ES/EN system (`i18n.js`) covering hub, all 9 modules and exercises
- 7 visual themes (`theme-switcher.js`): vision-ui, midnight-aurora, cyberpunk-neon, forest-moss, solarized-sand, nordic-frost, monochrome-slate — persisted in `localStorage`
- Per-protocol accent color system via `--proto-color` CSS variable
- Progress tracking per module/tab via `localStorage`
- GitHub Pages deploy via GitHub Actions (`deploy.yml`)
- `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (MIT), `.gitignore`
- Author attribution badge in header, linking to [@xavimape](https://github.com/xavimape)

---

## [0.1.0] — 2026-06

### Added
- Initial project scaffolding: `web/` structure, `styles.css` (dark cyber theme), `shared.js`
- DNS module as reference implementation for the 4-tab pattern
