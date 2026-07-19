# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

- Screenshots in `docs/screenshots/`
- Additional Sigma/Suricata detection rules per module

---

## [1.1.0] — 2026-07-18

### Changed
- **i18n refactor**: split the monolithic `web/i18n.js` (~413 KB, 1552 keys) into
  `web/i18n-core.js` (engine + 85 shared keys) plus one `web/i18n-<module>.js` per
  protocol. Each page now downloads only its own module's translations instead of
  the full dictionary — **85-92% less payload per page**. Spanish text is cached
  from the DOM at runtime for most keys instead of being duplicated in the
  dictionary; a subset of keys that can't safely rely on DOM content (empty
  elements, JS-driven button labels) still carry both languages explicitly.
- Fixed hub filters ("Capa Transporte" / "Capa Aplicación") hiding every protocol
  card — a `dataset` attribute name mismatch in `shared.js`.
- Fixed missing English translations: the DNS phishing demo's log output, two
  DNS Theory slide diagrams, and the hub search box placeholder.
- Removed a broken, redundant `SOC.initHub()` call left in the hub's inline
  script (the hub already self-initializes from `shared.js`).

### Added
- Live deployment on **GitHub Pages** via the existing GitHub Actions workflow.
- Google Analytics (privacy-conscious): loads only after explicit opt-in via a
  small, non-blocking consent card (bottom-left corner, bilingual ES/EN,
  references Argentine Law 25,326 and GDPR) instead of a full-width banner.

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
