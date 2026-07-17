/* ============================================================
   i18n-dhcp.js — Traducciones EN del modulo DHCP
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
      'dhcp.subtitle': "Dynamic Host Configuration Protocol · UDP/67,68 · Application Layer",
      'dhcp.demo.waiting': "Waiting for DHCP simulation...",
      'dhcp.demo.dora.title': "DHCP DORA — IP Assignment",
      'dhcp.demo.dora.client': "Client MAC:",
      'dhcp.demo.dora.server': "DHCP server IP:",
      'dhcp.demo.dora.pool': "DHCP pool:",
      'dhcp.demo.dora.output': "DHCP exchange",
      'dhcp.demo.btn.dora': "▶ Simulate DORA",
      'dhcp.demo.starv.title': "⚠️ Demo: DHCP Starvation",
      'dhcp.demo.starv.desc':       { es: 'El atacante envía cientos de DHCP DISCOVER con MACs falsas hasta agotar el pool. El servidor legítimo no puede asignar IPs a clientes reales (DoS). Herramienta típica: Yersinia.',
                                    en: 'The attacker sends hundreds of DHCP DISCOVER packets with fake MACs until the pool is exhausted. The legitimate server cannot assign IPs to real clients (DoS). Typical tool: Yersinia.' },
      'dhcp.demo.starv.panel': "Configure attack",
      'dhcp.demo.starv.server': "Victim DHCP server:",
      'dhcp.demo.starv.pool': "Pool size:",
      'dhcp.demo.starv.rate': "DISCOVER rate:",
      'dhcp.demo.btn.starv': "▶ Simulate Starvation",
      'dhcp.demo.starv.state': "DHCP pool state",
      'dhcp.demo.rogue.title': "🎭 Demo: Rogue DHCP Server (MitM)",
      'dhcp.demo.rogue.desc':       { es: 'Después del starvation (o directamente), el atacante levanta un servidor DHCP falso. Las víctimas obtienen gateway y DNS controlados por el atacante — Man-in-the-Middle perfecto.',
                                    en: 'After the starvation (or directly), the attacker sets up a fake DHCP server. Victims receive a gateway and DNS controlled by the attacker — perfect Man-in-the-Middle.' },
      'dhcp.demo.rogue.panel': "Configure Rogue DHCP",
      'dhcp.demo.rogue.attacker': "Attacker IP / Rogue GW:",
      'dhcp.demo.rogue.dns': "Malicious DNS (sinkhole):",
      'dhcp.demo.rogue.victim': "Victim to hijack:",
      'dhcp.demo.btn.rogue': "▶ Simulate Rogue DHCP",
      'dhcp.demo.rogue.result': "Hijack result",
      'dhcp.s1.title': "What is DHCP?",
      'dhcp.s1.sub': "Automatic network configuration assignment",
      'dhcp.s1.p1': "DHCP (Dynamic Host Configuration Protocol) allows a host to automatically obtain its network configuration without manual intervention: IP address, subnet mask, default gateway, DNS servers, and lease time.",
      'dhcp.s1.what.title': "DHCP assigns:",
      'dhcp.s1.w1': "📍 <strong>IP address</strong> — unique within the segment",
      'dhcp.s1.w2': "🔢 <strong>Subnet mask</strong> — defines the local network boundary",
      'dhcp.s1.w3': "🚪 <strong>Default gateway</strong> — exit router (critical MitM point)",
      'dhcp.s1.w4': "🔍 <strong>DNS servers</strong> — name resolution (critical for DNS hijacking)",
      'dhcp.s1.w5': "⏳ <strong>Lease time</strong> — how long the assignment is valid",
      'dhcp.s1.w6': "➕ <strong>Additional options</strong> — WINS, NTP, search domain",
      'dhcp.s2.title': "The DORA process",
      'dhcp.s2.sub': "Discover → Offer → Request → Acknowledge",
      'dhcp.s2.callout':    { es: '<strong>Sin autenticación:</strong> DHCP no tiene mecanismo de autenticación nativo. Cualquier máquina en la red puede responder OFFERS. El cliente acepta la primera OFFER que llegue — o la más rápida.',
                            en: '<strong>No authentication:</strong> DHCP has no native authentication mechanism. Any machine on the network can send OFFERS. The client accepts the first OFFER that arrives — or the fastest.' },
      'dhcp.s3.title': "Attack 1: DHCP Starvation",
      'dhcp.s3.sub': "IP pool exhaustion — DoS",
      'dhcp.s3.p1': "The attacker sends thousands of DHCP DISCOVER packets with <strong>random fake MACs</strong>. Each DISCOVER reserves an IP from the pool. When the pool is exhausted, legitimate clients cannot obtain an IP and lose network access.",
      'dhcp.s4.title': "Attack 2: Rogue DHCP Server",
      'dhcp.s4.sub': "Man-in-the-Middle via malicious network configuration",
      'dhcp.s4.p1':         { es: 'El atacante levanta un servidor DHCP en la red. Los clientes reciben configuración de red con el <strong>gateway y DNS del atacante</strong>. Todo el tráfico pasa por el atacante antes de salir a Internet.',
                            en: 'The attacker sets up a DHCP server on the network. Clients receive network configuration with the <strong>attacker\'s gateway and DNS</strong>. All traffic passes through the attacker before reaching the Internet.' },
      'dhcp.s4.callout':    { es: '<strong>Impacto:</strong> captura de credenciales, tokens de sesión, datos sensibles. Redirección silenciosa a sitios de phishing. El usuario no nota nada — la navegación parece funcionar.',
                            en: '<strong>Impact:</strong> credential capture, session tokens, sensitive data. Silent redirection to phishing sites. The user notices nothing — browsing appears to work normally.' },
      'dhcp.s5.title': "Attack 3: Combined DHCP Starvation + Rogue",
      'dhcp.s5.sub': "The complete attack in two phases",
      'dhcp.s6.title': "Defense: DHCP Snooping",
      'dhcp.s6.sub': "The switch as DHCP arbiter",
      'dhcp.s6.p1': "DHCP Snooping is a switch security feature that classifies ports as <strong>trusted</strong> (only toward legitimate DHCP servers) and <strong>untrusted</strong> (toward clients).",
      'dhcp.s7.title': "DHCP in SOC telemetry",
      'dhcp.s7.sub': "Zeek dhcp.log — the most useful log for host identity",
      'dhcp.s8.title': "Detection and full mitigation",
      'dhcp.s8.sub': "Checklist for SOC + networking",
      'dhcp.s8.m1': "DHCP Snooping",
      'dhcp.s8.m2': "Dynamic ARP Inspection",
      'dhcp.s8.m3': "IP Source Guard",
      'dhcp.s8.m4': "Monitor Zeek dhcp.log",
      'dhcp.s8.m5': "DHCP rate limiting",
      'dhcp.s8.m6': "802.1X / NAC",
      'dhcp.s8.m7': "Audit leases",
      'dhcp.ej1.title': "Identify DORA phase",
      'dhcp.ej1.q': "For each captured packet, identify which DORA phase it is and what information it contains:",
      'dhcp.ej2.title':     { es: '¿Es DHCP Starvation o Rogue?',                   en: 'Is it DHCP Starvation or Rogue?' },
      'dhcp.ej2.q':         { es: 'Analizá estos extractos de Zeek dhcp.log. Para cada uno, identificá si el tráfico es normal, starvation o rogue DHCP:',
                            en: 'Analyze these Zeek dhcp.log extracts. For each, identify whether the traffic is normal, starvation, or rogue DHCP:' },
      'dhcp.ej3.title':     { es: 'Configurar DHCP Snooping en Cisco',              en: 'Configure DHCP Snooping on Cisco' },
      'dhcp.ej3.q':         { es: 'Dado el siguiente diagrama de red, escribí la configuración de DHCP Snooping para los switches de acceso:',
                            en: 'Given the following network diagram, write the DHCP Snooping configuration for the access switches:' },
      'dhcp.ej4.title':     { es: 'Escribir regla Sigma — Rogue DHCP',             en: 'Write Sigma rule — Rogue DHCP' },
      'dhcp.ej4.q':         { es: 'Escribí una regla Sigma que detecte un servidor Rogue DHCP en los logs de Zeek. Incluí también la detección de starvation.',
                            en: 'Write a Sigma rule that detects a Rogue DHCP server in Zeek logs. Also include starvation detection.' },
      'dhcp.ej5.title':     { es: 'Respuesta a incidente — Rogue DHCP detectado',  en: 'Incident response — Rogue DHCP detected' },
      'dhcp.ej5.q':         { es: 'El SIEM generó una alerta: "Rogue DHCP detectado en VLAN 10". Describí el proceso de respuesta paso a paso.',
                            en: 'The SIEM generated an alert: "Rogue DHCP detected on VLAN 10". Describe the step-by-step response process.' },
      'dhcp.ej6.title': "DHCP Option Spoofing — identify the malicious option",
      'dhcp.ej6.q': "In a DHCP ACK captured with Wireshark you see these options: Option 1 (Subnet Mask): 255.255.255.0 | Option 3 (Router): 10.0.0.99 | Option 6 (DNS): 10.0.0.99 | Option 15 (Domain): evil-corp.local | Option 51 (Lease): 300s. The network legitimate gateway is 10.0.0.1. (a) Which options are malicious? (b) Which attack does each represent? (c) Why is the 300s lease time suspicious? (d) How would you detect this with Zeek?",
      'dhcp.challenge.title': "Incident #DHCP-001: \"The corporate WiFi is stealing passwords\"",
      'dhcp.challenge.q':     { es: '¿Qué pasó? ¿Cómo respondés y cómo lo prevenís?',
                              en: 'What happened? How do you respond and prevent it?' },
      'dhcp.challenge.ctx':   { es: 'Varios usuarios reportan que sus credenciales fueron usadas desde IPs externas después de conectarse al WiFi de la oficina. El equipo de redes no nota nada anormal. El SIEM muestra dos entradas de servidor DHCP en dhcp.log para la VLAN de WiFi.',
                              en: 'Several users report that their credentials were used from external IPs after connecting to the office WiFi. The networking team notices nothing unusual. The SIEM shows two DHCP server entries in dhcp.log for the WiFi VLAN.' },
    'dhcp.rec.rfc2': "Standard DHCP options: gateway, DNS, NTP, domain, NetBIOS, etc. Useful to understand what a rogue DHCP can send.",
    'dhcp.rec.mitre1': "DHCP Spoofing as an AitM technique. Real-world cases, mitigations and documented detections.",
    'dhcp.rec.mitre2': "AitM technique via DHCP. Real-world cases, detections, mitigations.",
    'dhcp.rec.mitre3': "DHCP Starvation as a network denial-of-service technique.",
    'dhcp.rec.zeek': "dhcp.log fields: ts, mac, assigned_ip, lease_time, trans_id, server_addr, gateway, dns, host_name, domain.",
    'dhcp.rec.opt82': "Option 82 lets the relay agent add port/VLAN information. Technical basis of DHCP Snooping on managed switches.",
    'dhcp.rec.rfc': "Complete DHCP protocol specification: messages, options, client and server states.",
    'dhcp.cheat.h1': "Log signal",
    'dhcp.cheat.h2': "Possible attack",
    'dhcp.cheat.h3': "Action",
    'dhcp.cheat.r1a': "Many DISCOVER with sequential same-OUI MACs",
    'dhcp.cheat.r1c': "Isolate port, rate limit",
    'dhcp.cheat.r2a': "server_addr in dhcp.log different from the legitimate DHCP",
    'dhcp.cheat.r2c': "Isolate port, force renewal on affected hosts",
    'dhcp.cheat.r3a': "Gateway in lease different from expected",
    'dhcp.cheat.r3b': "Rogue DHCP / active MitM",
    'dhcp.cheat.r3c': "Review traffic of affected hosts",
    'dhcp.cheat.r4a': "Clients with no IP (DISCOVER without OFFER)",
    'dhcp.cheat.r4b': "Pool exhausted (post-starvation)",
    'dhcp.cheat.r4c': "Look for fake MACs, clear bindings",
    'dhcp.cheat.r5a': "DNS Option 6 pointing to an unauthorized internal IP",
    'dhcp.cheat.r5c': "DHCP Snooping, verify DNS resolution",
    'dhcp.cheat.r6a': "Lease time under 300s on some hosts",
    'dhcp.cheat.r6b': "Rogue DHCP keeping frequent control",
    'dhcp.cheat.r6c': "Audit the source DHCP server",
    'dhcp.rec.cvestitle': "🔒 Relevant CVEs",
    'dhcp.rec.labstitle': "🎯 Labs and References",
    'dhcp.rec.cve1': "NetworkManager on RHEL 6/7 executed arbitrary code via a dhclient hook script when receiving malicious DHCP options. CVSS 7.5. A rogue DHCP could compromise Linux hosts on lease renewal.",
    'dhcp.rec.cve2': "Remote code execution vulnerability in the Windows Server 2019 DHCP server. An unauthenticated attacker could execute arbitrary code by sending specially crafted DHCP packets. CVSS 9.8.",
    'dhcp.rec.cve3': "The ISC DHCP client (used on Debian/Ubuntu) did not sanitize the hostname sent by the DHCP server. A rogue DHCP could inject shell commands into the hostname update script.",
    'dhcp.pre0': { es: `
Cliente (0.0.0.0)               Servidor DHCP (192.168.1.1)
      │                                    │
      │── DISCOVER (broadcast) ───────────►│  src=0.0.0.0:68 dst=255.255.255.255:67
      │   "¿Hay algún DHCP en la red?"     │  MAC: aa:bb:cc:dd:ee:ff
      │                                    │
      │◄──── OFFER ─────────────────────── │  "Te ofrezco 192.168.1.105/24"
      │   IP=192.168.1.105                 │  GW=192.168.1.1  DNS=8.8.8.8
      │   Lease=86400s (24h)               │
      │                                    │
      │── REQUEST (broadcast) ────────────►│  "Acepto la oferta de 192.168.1.1"
      │   Requested IP=192.168.1.105       │  (broadcast para que otros DHCP vean)
      │                                    │
      │◄──── ACK ───────────────────────── │  "Confirmado. IP tuya por 86400s"
      │   Configuración completa           │
      │                                    │
  CONFIGURA interfaz con IP+GW+DNS asignados`, en: `
Client (0.0.0.0)                DHCP Server (192.168.1.1)
      │                                    │
      │── DISCOVER (broadcast) ───────────►│  src=0.0.0.0:68 dst=255.255.255.255:67
      │   "Any DHCP on the network?"       │  MAC: aa:bb:cc:dd:ee:ff
      │                                    │
      │◄──── OFFER ─────────────────────── │  "I offer you 192.168.1.105/24"
      │   IP=192.168.1.105                 │  GW=192.168.1.1  DNS=8.8.8.8
      │   Lease=86400s (24h)               │
      │                                    │
      │── REQUEST (broadcast) ────────────►│  "I accept 192.168.1.1's offer"
      │   Requested IP=192.168.1.105       │  (broadcast so other DHCPs see it)
      │                                    │
      │◄──── ACK ───────────────────────── │  "Confirmed. IP is yours for 86400s"
      │   Full configuration               │
      │                                    │
  CONFIGURES interface with assigned IP+GW+DNS` },
    'dhcp.pre1': { es: `
Atacante (herramienta: Yersinia / dhcpstarv)
  │
  ├── DISCOVER  src_mac=aa:bb:cc:11:11:11  "dame IP"
  ├── DISCOVER  src_mac=aa:bb:cc:22:22:22  "dame IP"
  ├── DISCOVER  src_mac=aa:bb:cc:33:33:33  "dame IP"
  │   ... × 254 veces en segundos ...
  │
  ▼  POOL AGOTADO

  Cliente legítimo:
  ├── DISCOVER  src_mac=aa:bb:cc:real:mac  "dame IP"
  └── ← (sin respuesta — pool vacío)  → ¡Sin red!`, en: `
Attacker (tool: Yersinia / dhcpstarv)
  │
  ├── DISCOVER  src_mac=aa:bb:cc:11:11:11  "give me an IP"
  ├── DISCOVER  src_mac=aa:bb:cc:22:22:22  "give me an IP"
  ├── DISCOVER  src_mac=aa:bb:cc:33:33:33  "give me an IP"
  │   ... × 254 times in seconds ...
  │
  ▼  POOL EXHAUSTED

  Legitimate client:
  ├── DISCOVER  src_mac=aa:bb:cc:real:mac  "give me an IP"
  └── ← (no response — empty pool)  → No network!` },
    'dhcp.pre2': { es: `
NORMAL:   Cliente → [GW real 192.168.1.1] → Internet

ROGUE:    Cliente → [GW atacante 192.168.1.200] → [GW real] → Internet
                          ↑
                    ARP, sniff, inyección, SSL strip
                    DNS falso → sinkhole / phishing

DHCP OFFER malicioso:
  IP=192.168.1.105  ← IP válida (para no levantar sospechas)
  Gateway=192.168.1.200  ← IP del atacante
  DNS=10.0.0.1  ← DNS malicioso del atacante
  Lease=300s  ← lease corto para renovar rápido`, en: `
NORMAL:   Client → [real GW 192.168.1.1] → Internet

ROGUE:    Client → [attacker GW 192.168.1.200] → [real GW] → Internet
                          ↑
                    ARP, sniff, injection, SSL strip
                    fake DNS → sinkhole / phishing

Malicious DHCP OFFER:
  IP=192.168.1.105  ← valid IP (to avoid raising suspicion)
  Gateway=192.168.1.200  ← attacker's IP
  DNS=10.0.0.1  ← attacker's malicious DNS
  Lease=300s  ← short lease to renew quickly` },
    'dhcp.pre3': { es: `
FASE 1 — STARVATION (silenciar el DHCP legítimo):
  └─ Enviar DISCOVER con cientos de MACs falsas
     → Pool del DHCP legítimo = agotado
     → Clientes que piden IP no obtienen respuesta del DHCP real

FASE 2 — ROGUE DHCP (tomar el control):
  └─ Levantar DHCP falso que SOLUCIONA el problema
     → Responde rápido con configuración "válida"
     → Desesperados por red, los clientes aceptan la oferta
     → Todos los nuevos hosts → gateway=atacante

RESULTADO: MitM total sin alertas evidentes
  → Clientes con red funcional (no sospechan)
  → Todo el tráfico pasa por el atacante
  → Atacante puede HTTPS strip, SSLstrip, capturar credenciales

DETECCIÓN:
  → Dos servidores DHCP en el mismo segmento (IOC fuerte)
  → DHCP leases con gateway distinto al esperado
  → Súbita tasa alta de DISCOVER desde una MAC`, en: `
PHASE 1 — STARVATION (silence the legitimate DHCP):
  └─ Send DISCOVER with hundreds of fake MACs
     → Legitimate DHCP pool = exhausted
     → Clients asking for an IP get no response from the real DHCP

PHASE 2 — ROGUE DHCP (take control):
  └─ Bring up a fake DHCP that "SOLVES" the problem
     → Responds quickly with a "valid" configuration
     → Desperate for network, clients accept the offer
     → All new hosts → gateway=attacker

RESULT: full MitM with no obvious alerts
  → Clients with working network (they don't suspect)
  → All traffic passes through the attacker
  → Attacker can HTTPS strip, SSLstrip, capture credentials

DETECTION:
  → Two DHCP servers on the same segment (strong IOC)
  → DHCP leases with a gateway different from the expected one
  → Sudden high rate of DISCOVER from a single MAC` },
    'dhcp.pre4': { es: `
Switch con DHCP Snooping habilitado:

[Puerto Uplink — TRUSTED]         [Puertos de acceso — UNTRUSTED]
  ↕ DHCP OFFER permitido              ↕ Solo DISCOVER/REQUEST (cliente)
  ↕ DHCP ACK permitido                ✗ OFFER/ACK bloqueado (evita rogue)
  ↕ DHCP DISCOVER permitido           ✗ MACs falsas → rate limit + drop

Cisco IOS:
  ip dhcp snooping
  ip dhcp snooping vlan 10
  interface GigabitEthernet0/1   ← hacia clientes
    ip dhcp snooping limit rate 15   ← máx 15 paquetes DHCP/s
  interface GigabitEthernet0/24  ← hacia servidor DHCP real
    ip dhcp snooping trust

DHCP Snooping Binding Table:
  MAC address   IP addr        Lease   VLAN  Interface
  aa:bb:cc...   192.168.1.105  86400s  10    Gi0/5
  → Usada por ARP Inspection + IP Source Guard para validar tráfico`, en: `
Switch with DHCP Snooping enabled:

[Uplink port — TRUSTED]           [Access ports — UNTRUSTED]
  ↕ DHCP OFFER allowed                ↕ Only DISCOVER/REQUEST (client)
  ↕ DHCP ACK allowed                  ✗ OFFER/ACK blocked (prevents rogue)
  ↕ DHCP DISCOVER allowed             ✗ fake MACs → rate limit + drop

Cisco IOS:
  ip dhcp snooping
  ip dhcp snooping vlan 10
  interface GigabitEthernet0/1   ← toward clients
    ip dhcp snooping limit rate 15   ← max 15 DHCP packets/s
  interface GigabitEthernet0/24  ← toward the real DHCP server
    ip dhcp snooping trust

DHCP Snooping Binding Table:
  MAC address   IP addr        Lease   VLAN  Interface
  aa:bb:cc...   192.168.1.105  86400s  10    Gi0/5
  → Used by ARP Inspection + IP Source Guard to validate traffic` },
    'dhcp.pre5': { es: `
# Zeek dhcp.log — campos clave
ts       client_addr  server_addr  mac                assigned_ip   lease_time
10:00:01 0.0.0.0      255.255.255  aa:bb:cc:dd:ee:ff  192.168.1.105 86400
10:00:01 0.0.0.0      255.255.255  aa:bb:cc:dd:ee:ff  192.168.1.105 86400  ← mismo host, OK

# IOC: Starvation — muchas MACs distintas solicitando IPs
ts       mac                      msg_type
10:05:00 aa:bb:cc:00:00:01        DISCOVER
10:05:00 aa:bb:cc:00:00:02        DISCOVER   ← OUI igual, octeto final incremental
10:05:00 aa:bb:cc:00:00:03        DISCOVER   ← Yersinia pattern!
... × 254 en 3 segundos

# IOC: Rogue DHCP — dos servidores distintos
ts       server_addr   assigned_ip    gateway
10:10:00 192.168.1.1   192.168.1.106  192.168.1.1    ← legítimo
10:10:01 192.168.1.200 192.168.1.107  192.168.1.200  ← ROGUE!

# Sigma — Rogue DHCP detection
title: Rogue DHCP Server Detected
detection:
  selection:
    dhcp_type: OFFER
  condition: selection | distinct_count(server_addr) by vlan > 1
level: high  tags: [T1557.003]`, en: `
# Zeek dhcp.log — key fields
ts       client_addr  server_addr  mac                assigned_ip   lease_time
10:00:01 0.0.0.0      255.255.255  aa:bb:cc:dd:ee:ff  192.168.1.105 86400
10:00:01 0.0.0.0      255.255.255  aa:bb:cc:dd:ee:ff  192.168.1.105 86400  ← same host, OK

# IOC: Starvation — many different MACs requesting IPs
ts       mac                      msg_type
10:05:00 aa:bb:cc:00:00:01        DISCOVER
10:05:00 aa:bb:cc:00:00:02        DISCOVER   ← same OUI, final octet incremental
10:05:00 aa:bb:cc:00:00:03        DISCOVER   ← Yersinia pattern!
... × 254 in 3 seconds

# IOC: Rogue DHCP — two different servers
ts       server_addr   assigned_ip    gateway
10:10:00 192.168.1.1   192.168.1.106  192.168.1.1    ← legitimate
10:10:01 192.168.1.200 192.168.1.107  192.168.1.200  ← ROGUE!

# Sigma — Rogue DHCP detection
title: Rogue DHCP Server Detected
detection:
  selection:
    dhcp_type: OFFER
  condition: selection | distinct_count(server_addr) by vlan > 1
level: high  tags: [T1557.003]` },
    'dhcp.pre8': { es: `
Zeek dhcp.log (último hora):
  10:45:00  mac=52:54:00:ab:cd:ef  server=192.168.100.50  gateway=192.168.100.50
  10:45:00  mac=aa:11:22:33:44:55  server=192.168.100.50  gateway=192.168.100.50
  10:45:01  mac=bb:22:33:44:55:66  server=192.168.100.50  gateway=192.168.100.50
  (servidor DHCP legítimo = 192.168.100.1)

Zeek http.log:
  10:46:00  src=192.168.100.105  dst=192.168.100.50  uri=/login POST
  → Credenciales en claro (HTTP, no HTTPS)`, en: `
Zeek dhcp.log (last hour):
  10:45:00  mac=52:54:00:ab:cd:ef  server=192.168.100.50  gateway=192.168.100.50
  10:45:00  mac=aa:11:22:33:44:55  server=192.168.100.50  gateway=192.168.100.50
  10:45:01  mac=bb:22:33:44:55:66  server=192.168.100.50  gateway=192.168.100.50
  (legitimate DHCP server = 192.168.100.1)

Zeek http.log:
  10:46:00  src=192.168.100.105  dst=192.168.100.50  uri=/login POST
  → Credentials in cleartext (HTTP, not HTTPS)` },
    'dhcp.pre9': "# Only in a controlled lab environment\nyersinia dhcp -attack 1  # DHCP starvation\nyersinia dhcp -attack 2  # Rogue DHCP\n\n# Detect DHCP servers on the network (without attacking)\nnmap -sU -p 67 --script dhcp-discover 192.168.1.0/24",
    'dhcp.pre10': { es: `# Encontrar servidores DHCP no autorizados
zeek-cut server_addr < dhcp.log | sort | uniq -c | sort -rn

# Hosts con gateway sospechoso
zeek-cut mac assigned_ip gateway < dhcp.log \\
  | awk '$3 != "192.168.1.1"'

# Starvation: muchas MACs del mismo OUI
zeek-cut ts mac < dhcp.log \\
  | awk '{print substr($2,1,8)}' | sort | uniq -c | sort -rn`, en: `# Find unauthorized DHCP servers
zeek-cut server_addr < dhcp.log | sort | uniq -c | sort -rn

# Hosts with a suspicious gateway
zeek-cut mac assigned_ip gateway < dhcp.log \\
  | awk '$3 != "192.168.1.1"'

# Starvation: many MACs from the same OUI
zeek-cut ts mac < dhcp.log \\
  | awk '{print substr($2,1,8)}' | sort | uniq -c | sort -rn` },
    'dhcp.opt1': "50 IPs (small network)",
    'dhcp.opt2': "254 IPs (/24 standard)",
    'dhcp.opt3': "10 req/s (quiet)",
    'dhcp.opt4': "100 req/s (aggressive)",
    'dhcp.opt5': "DNS Spoofing (option 6)",
    'dhcp.opt6': "Gateway Spoofing (option 3) — MitM",
    'dhcp.opt7': "Domain Spoofing (option 15)",
    'dhcp.opt8': "NTP Spoofing (option 42)",
    'dhcp.demo.spoof.title': "🔧 Demo: DHCP Option Spoofing",
    'dhcp.demo.spoof.desc':   { es: 'Un atacante manipula las opciones DHCP (gateway, DNS, dominio) para redirigir tráfico sin desplegar un servidor DHCP falso completo.', en: 'An attacker manipulates DHCP options (gateway, DNS, domain) to redirect traffic without deploying a full rogue DHCP server.' },
    'dhcp.demo.spoof.panel': "Configure DHCP Spoofing",
    'dhcp.demo.spoof.target': "Target network:",
    'dhcp.demo.spoof.type': "Spoofing type:",
    'dhcp.demo.spoof.result': "Spoofing result",
    'dhcp.demo.btn.spoof': "▶ Simulate Spoofing",
});
