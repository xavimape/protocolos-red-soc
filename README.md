# 9 Protocolos y los Ataques que todo Analista SOC debe conocer

[![Deploy to GitHub Pages](https://github.com/xavimape/protocolos-red-soc/actions/workflows/deploy.yml/badge.svg)](https://github.com/xavimape/protocolos-red-soc/actions/workflows/deploy.yml)
🌐 **Live:** https://xavimape.github.io/protocolos-red-soc/ &nbsp;|&nbsp; English version: [README.en.md](README.en.md)

> 🔍 Conoce el protocolo · ⚡ Entiende el riesgo · 🎯 Detecta el ataque

---

## ¿Qué es este proyecto?

Laboratorio educativo interactivo sobre los **9 protocolos de red y sus ataques** más relevantes para un analista SOC. El objetivo no es solo listar ataques, sino entender cómo funciona cada protocolo, por qué es vulnerable, y cómo se ve el ataque en telemetría real.

```
Protocolo → Funcionamiento interno → Vector de ataque → Telemetría SOC → Detección
```

Complementa los proyectos hermanos cubriendo la **capa de transporte y aplicación**:

| Proyecto | Capa | Enfoque |
|----------|------|---------|
| [criptografia-simetrica](https://xavimape.github.io/criptografia-simetrica/) | Matemática/algoritmos | AES, ChaCha20, SHA-256 desde adentro |
| [clase-criptografia](https://xavimape.github.io/clase-criptografia/) | Operativa | TLS, DFIR, JA3/JA3S, detection engineering |
| **protocolos-red-soc** (este) | Protocolo | Cómo fluye el tráfico, dónde atacan, cómo detectar |

---

## Los 9 Módulos

| # | Protocolo | Puerto | Ataques cubiertos |
|---|-----------|--------|-------------------|
| 1 | **DNS** | UDP/53 | Spoofing, Tunneling, DGA, Phishing |
| 2 | **HTTP/HTTPS** | TCP/80,443 | SQLi, XSS, Session Hijacking, Malware Drop |
| 3 | **TCP** | — | SYN Flood, Session Hijacking, RST Injection, Port Scan |
| 4 | **UDP** | — | UDP Flood, DNS Amplification, NTP Amplification, Reflexión |
| 5 | **DHCP** | UDP/67,68 | Starvation, Rogue Server, Spoofing, MITM |
| 6 | **SMB** | TCP/445 | Brute Force, NTLM Relay, EternalBlue (MS17-010), RCE |
| 7 | **FTP** | TCP/20,21 | Cleartext Credentials, Brute Force, Anon Abuse, Upload Exploit |
| 8 | **SSH** | TCP/22 | Brute Force, Credential Stuffing, Key Theft, Unauth Access |
| 9 | **TLS/SSL** | TCP/443 | SSL Stripping, Cert MITM, Weak Ciphers, JA3 Evasion |

---

## Estructura de cada módulo

Cada protocolo incluye **4 componentes**:

**🧪 Demo Lab** — simulador interactivo del protocolo y sus ataques en tiempo real: flujo de paquetes, estado interno, logs animados.

**📖 Teoría** — 9 slides navegables: cómo funciona el protocolo, un slide por ataque, cómo se ve en telemetría SOC, detección y mitigación.

**✏️ Ejercicios** — 5 ejercicios progresivos (fácil → difícil) + 1 mini-challenge "Resuelve este incidente" con log real simulado y respuesta oculta.

**📚 Recursos** — RFC oficial, herramientas (Wireshark, Zeek, dig, nmap), CVEs relevantes, reglas Sigma/Suricata, labs externos.

---

## Estructura del repositorio

```
protocolos-red-soc/
│
├── web/                    ← Sitio GitHub Pages
│   ├── index.html          ← Hub: grid de 9 protocolos + búsqueda
│   ├── styles.css          ← Tema dark cyber unificado
│   ├── shared.js           ← Tabs, slides, ejercicios, progreso
│   │
│   ├── dns/                ← Módulo DNS
│   │   ├── index.html      ← Página del módulo con 4 tabs
│   │   ├── app.js          ← Lógica del lab interactivo
│   ├── http/               ← Misma estructura (index.html + app.js)
│   ├── tcp/
│   ├── udp/
│   ├── dhcp/
│   ├── smb/
│   ├── ftp/
│   ├── ssh/
│   └── tls/                ← Los 9 módulos están completos
│
├── .github/workflows/deploy.yml
├── README.md
└── LICENSE
```

---

## Arquitectura técnica

| Componente | Tecnología |
|------------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6 puro |
| Backend | Ninguno — 100% client-side |
| Hosting | GitHub Pages |
| Deploy | GitHub Actions automático en push a `main` |
| Dependencias | Sin frameworks externos |
| Progreso | localStorage — módulos y tabs visitados |

---

## Uso y despliegue

```bash
# Opción 1: abrir directamente
open web/index.html

# Opción 2: servidor local
cd web
python -m http.server 8080
# → http://localhost:8080

# Opción 3: GitHub Pages
# Configurar Pages → Source: GitHub Actions
```

---

## Estado del proyecto

| Módulo | Estado |
|--------|--------|
| DNS | ✅ Completo |
| HTTP/HTTPS | ✅ Completo |
| TCP | ✅ Completo |
| UDP | ✅ Completo |
| DHCP | ✅ Completo |
| SMB | ✅ Completo |
| FTP | ✅ Completo |
| SSH | ✅ Completo |
| TLS/SSL | ✅ Completo |

---

## Uso responsable

Este proyecto tiene fines exclusivamente **educativos y defensivos**. Los labs, demos y ejercicios están diseñados para formación en entornos controlados. No utilizar sobre infraestructura ajena o sin autorización explícita.

---

**Autor:** @xavimape (Javier Mapelli)
**Proyectos relacionados:** [criptografia-simetrica](https://github.com/xavimape/criptografia-simetrica) · [clase-criptografia](https://github.com/xavimape/clase-criptografia)
**Licencia:** MIT
