# Contributing Guide

Este repositorio es un proyecto educativo personal sobre protocolos de red y sus vectores de ataque, orientado a analistas SOC.

## Estado actual del proyecto

El proyecto cubre actualmente los **9 módulos** completos:

* **DNS** — Suplantación/Envenenamiento, Túnel DNS, DGA, Phishing
* **HTTP/HTTPS** — Inyección SQL, XSS, Secuestro de sesión, SSRF/LFI, XXE
* **TCP** — SYN Flood, Secuestro de sesión, RST Injection, Escaneo de puertos
* **UDP** — UDP Flood, Amplificación DNS/NTP, Reflexión
* **DHCP** — Agotamiento, Servidor malicioso (Rogue), Suplantación, MITM
* **SMB** — Pass-the-Hash, Reenvío NTLM, EternalBlue (MS17-010), RCE
* **FTP** — Credenciales en texto plano, Fuerza bruta, Acceso anónimo, Upload exploit
* **SSH** — Fuerza bruta, Credential stuffing, Robo de claves, C2 Tunneling
* **TLS/SSL** — SSL Stripping, Cert MITM, Cifrados débiles, JA3 Evasion

Cada módulo incluye 4 componentes: Demo Lab interactivo, Teoría (slides navegables), Ejercicios progresivos y Recursos técnicos (RFCs, herramientas, CVEs, reglas Sigma/Suricata).

---

## Objetivo del proyecto

Conectar el funcionamiento interno de cada protocolo con su aplicación operativa en:

* SOC (Security Operations Center)
* Detección y telemetría de red
* DFIR / Forensia Digital
* Detection Engineering

```
Protocolo → Funcionamiento interno → Vector de ataque → Telemetría SOC → Detección
```

---

## Tipos de contribuciones aceptadas

* mejoras de visualización en los labs interactivos (flujo de paquetes, logs animados)
* correcciones técnicas en la lógica de los simuladores
* mejoras de documentación o traducciones ES/EN
* nuevos recursos o referencias técnicas (RFCs, CVEs, reglas de detección)
* mejoras UI/UX o responsive
* nuevos ejercicios o mini-challenges de log
* nuevos slides de teoría con respaldo técnico

---

## Antes de contribuir

1. Revisar la estructura existente del proyecto en `web/`
2. Mantener coherencia visual con el sistema de temas y `styles.css`
3. Reutilizar los patrones establecidos (tabs, cards de protocolo, ejercicios)
4. Todo texto nuevo debe tener su traducción EN en `i18n.js`
5. No romper la navegación entre el hub y los módulos
6. Mantener compatibilidad con GitHub Pages (sin backend)

---

## Reglas técnicas

El proyecto usa exclusivamente:

* HTML5
* CSS3
* JavaScript (ES6) — sin frameworks ni librerías externas

Cada módulo vive en su propia subcarpeta dentro de `web/` (`web/<protocolo>/index.html` + `app.js`) y comparte `styles.css`, `i18n.js`, `shared.js` y `theme-switcher.js` con el resto del sitio.

---

## Sistema bilingüe

Toda cadena de texto nueva debe:

1. Estar en español en el HTML fuente
2. Tener su traducción EN registrada en `web/i18n.js`
3. Usar los atributos `data-i18n` / helpers existentes para que el toggle ES/EN la levante automáticamente

---

## Sistema de temas

El sitio soporta 7 temas visuales (`vision-ui` por defecto, `midnight-aurora`, `cyberpunk-neon`, `forest-moss`, `solarized-sand`, `nordic-frost`, `monochrome-slate`), seleccionables desde el header y persistidos en `localStorage`. Cada protocolo además tiene su propio color de acento vía la variable CSS `--proto-color` definida inline en su card del hub.

Evitar cambios globales en `styles.css` sin verificar que no rompan alguno de los 7 temas.

---

## Contenido técnico

El contenido debe:

* ser verificable contra RFCs, CVEs o documentación oficial del protocolo
* incluir contexto operativo SOC (telemetría, detección) cuando sea posible
* citar fuentes en la pestaña de Recursos de cada módulo
* priorizar claridad pedagógica sobre exhaustividad

---

## Commits

```bash
feat(ssh): add key theft interactive lab

fix(tcp): correct SYN flood packet counter

docs(dhcp): add rogue server detection resources

i18n(smb): add EN translations for smb module

style(css): improve mobile layout for exercise cards
```

---

## Seguridad

No subir credenciales, tokens, API keys ni datos reales de infraestructura. Todos los ejemplos de tráfico, logs y payloads deben estar simulados o anonimizados, marcados explícitamente como material pedagógico. Ver [`SECURITY.md`](SECURITY.md).

---

## Filosofía

```
Protocolo → Funcionamiento interno → Vector de ataque → Telemetría SOC → Detección
```
