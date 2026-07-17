# 9 Network Protocols and the Attacks Every SOC Analyst Should Know

[![Deploy to GitHub Pages](https://github.com/xavimape/protocolos-red-soc/actions/workflows/deploy.yml/badge.svg)](https://github.com/xavimape/protocolos-red-soc/actions/workflows/deploy.yml)
🌐 **Live:** https://xavimape.github.io/protocolos-red-soc/ &nbsp;|&nbsp; Spanish version: [README.md](README.md)

> 🔍 Know the protocol · ⚡ Understand the risk · 🎯 Detect the attack

---

## What is this project?

An interactive educational lab covering the **9 network protocols and their attacks** most relevant to a SOC analyst. The goal isn't just to list attacks, but to understand how each protocol works, why it's vulnerable, and what the attack looks like in real telemetry.

```
Protocol → Internal workings → Attack vector → SOC telemetry → Detection
```

Complements the companion projects, covering the **transport and application layer**:

| Project | Layer | Focus |
|---------|-------|-------|
| [criptografia-simetrica](https://xavimape.github.io/criptografia-simetrica/) | Math/algorithms | AES, ChaCha20, SHA-256 from the inside |
| [clase-criptografia](https://xavimape.github.io/clase-criptografia/) | Operational | TLS, DFIR, JA3/JA3S, detection engineering |
| **protocolos-red-soc** (this one) | Protocol | How traffic flows, where attacks land, how to detect them |

---

## The 9 Modules

| # | Protocol | Port | Attacks covered |
|---|----------|------|-------------------|
| 1 | **DNS** | UDP/53 | Spoofing, Tunneling, DGA, Phishing |
| 2 | **HTTP/HTTPS** | TCP/80,443 | SQLi, XSS, Session Hijacking, Malware Drop |
| 3 | **TCP** | — | SYN Flood, Session Hijacking, RST Injection, Port Scan |
| 4 | **UDP** | — | UDP Flood, DNS Amplification, NTP Amplification, Reflection |
| 5 | **DHCP** | UDP/67,68 | Starvation, Rogue Server, Spoofing, MITM |
| 6 | **SMB** | TCP/445 | Brute Force, NTLM Relay, EternalBlue (MS17-010), RCE |
| 7 | **FTP** | TCP/20,21 | Cleartext Credentials, Brute Force, Anon Abuse, Upload Exploit |
| 8 | **SSH** | TCP/22 | Brute Force, Credential Stuffing, Key Theft, Unauth Access |
| 9 | **TLS/SSL** | TCP/443 | SSL Stripping, Cert MITM, Weak Ciphers, JA3 Evasion |

---

## Structure of each module

Every protocol includes **4 components**:

**🧪 Demo Lab** — real-time interactive simulator of the protocol and its attacks: packet flow, internal state, animated logs.

**📖 Theory** — 9 navigable slides: how the protocol works, one slide per attack, how it looks in SOC telemetry, detection and mitigation.

**✏️ Exercises** — 5 progressive exercises (easy → hard) + 1 mini-challenge "Solve this incident" with a simulated real log and a hidden answer.

**📚 Resources** — official RFC, tools (Wireshark, Zeek, dig, nmap), relevant CVEs, Sigma/Suricata rules, external labs.

---

## Repository structure

```
protocolos-red-soc/
│
├── web/                    ← GitHub Pages site
│   ├── index.html          ← Hub: grid of 9 protocols + search
│   ├── styles.css          ← Unified dark cyber theme
│   ├── shared.js           ← Tabs, slides, exercises, progress
│   │
│   ├── dns/                ← DNS module
│   │   ├── index.html      ← Module page with 4 tabs
│   │   ├── app.js          ← Interactive lab logic
│   ├── http/                ← Same structure (index.html + app.js)
│   ├── tcp/
│   ├── udp/
│   ├── dhcp/
│   ├── smb/
│   ├── ftp/
│   ├── ssh/
│   └── tls/                ← All 9 modules are complete
│
├── .github/workflows/deploy.yml
├── README.md
└── LICENSE
```

---

## Technical architecture

| Component | Technology |
|-----------|-----------|
| Frontend | HTML5, CSS3, pure JavaScript ES6 |
| Backend | None — 100% client-side |
| Hosting | GitHub Pages |
| Deploy | Automatic GitHub Actions on push to `main` |
| Dependencies | No external frameworks |
| Progress | localStorage — visited modules and tabs |

---

## Usage & deployment

```bash
# Option 1: open directly
open web/index.html

# Option 2: local server
cd web
python -m http.server 8080
# → http://localhost:8080

# Option 3: GitHub Pages
# Configure Pages → Source: GitHub Actions
```

---

## Project status

| Module | Status |
|--------|--------|
| DNS | ✅ Complete |
| HTTP/HTTPS | ✅ Complete |
| TCP | ✅ Complete |
| UDP | ✅ Complete |
| DHCP | ✅ Complete |
| SMB | ✅ Complete |
| FTP | ✅ Complete |
| SSH | ✅ Complete |
| TLS/SSL | ✅ Complete |

---

## Responsible use

This project is for **educational and defensive purposes only**. The labs, demos and exercises are designed for training in controlled environments. Do not use against third-party infrastructure or without explicit authorization.

---

**Author:** @xavimape (Javier Mapelli)
**Related projects:** [criptografia-simetrica](https://github.com/xavimape/criptografia-simetrica) · [clase-criptografia](https://github.com/xavimape/clase-criptografia)
**License:** MIT
