/* ============================================================
   i18n-tcp.js — Traducciones EN del modulo TCP
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
      'tcp.subtitle': "Transmission Control Protocol · TCP/any · Transport Layer",
      'tcp.demo.handshake.title': "TCP Handshake Simulator",
      'tcp.demo.src.label': "Source IP (Client):",
      'tcp.demo.dst.label': "Destination IP (Server):",
      'tcp.demo.port.label': "Destination port:",
      'tcp.demo.btn.handshake': "▶ Simulate Handshake",
      'tcp.demo.output.title': "Packet flow",
      'tcp.demo.waiting': "Waiting for TCP simulation...",
      'tcp.demo.synflood.title': "⚠️ Demo: SYN Flood (DDoS)",
      'tcp.demo.synflood.panel': "Configure attack",
      'tcp.demo.synflood.target': "Victim IP:",
      'tcp.demo.synflood.rate': "Packets/second:",
      'tcp.demo.btn.synflood': "▶ Simulate SYN Flood",
      'tcp.demo.synflood.state': "Victim server state",
      'tcp.demo.portscan.title': "🔍 Demo: Port Scanning (nmap-style)",
      'tcp.demo.portscan.panel': "Configure scan",
      'tcp.demo.portscan.target': "Target IP:",
      'tcp.demo.portscan.range': "Port range:",
      'tcp.demo.btn.scan': "▶ Start Scan",
      'tcp.demo.portscan.results': "Scan results",
      'tcp.demo.rst.title': "⚡ Demo: TCP RST Injection",
      'tcp.demo.rst.desc':       { es: 'El atacante envía un paquete RST forjado a una conexión TCP activa para desconectarla forzosamente. Usado en censura y ataques man-in-the-middle.', en: 'The attacker sends a forged RST packet to an active TCP connection to forcefully disconnect it. Used in censorship and man-in-the-middle attacks.' },
      'tcp.demo.rst.panel.conn': "🔗 Active TCP connection",
      'tcp.demo.rst.panel.log': "🔍 Attack flow",
      'tcp.demo.rst.label.src': "Victim IP:",
      'tcp.demo.rst.label.dst': "Server IP:",
      'tcp.demo.rst.btn': "💀 Inject RST",
      'tcp.demo.hijack.title': "👤 Demo: TCP Session Hijacking",
      'tcp.demo.hijack.desc':    { es: 'El atacante predice o captura números SEQ/ACK de una sesión TCP activa para inyectar datos como si fuera el cliente legítimo.', en: 'The attacker predicts or captures SEQ/ACK numbers from an active TCP session to inject data as if it were the legitimate client.' },
      'tcp.demo.hijack.panel.seq': "🔢 SEQ/ACK Analysis",
      'tcp.demo.hijack.panel.log': "💀 Hijacking sequence",
      'tcp.demo.hijack.label.seq': "Current SEQ number:",
      'tcp.demo.hijack.btn': "🎯 Simulate Hijacking",
      'tcp.slide1.title': "What is TCP?",
      'tcp.slide1.sub': "The reliable transport protocol of the Internet",
      'tcp.slide2.title': "The Three-Way Handshake",
      'tcp.slide2.sub': "How a TCP connection is established",
      'tcp.slide3.title': "TCP Header",
      'tcp.slide3.sub': "Fields relevant for SOC analysis",
      'tcp.slide4.title': "Attack 1: SYN Flood",
      'tcp.slide4.sub': "The classic transport-layer DDoS",
      'tcp.slide5.title': "Attack 2: Port Scanning",
      'tcp.slide5.sub': "Reconnaissance of exposed services",
      'tcp.slide6.title': "Attack 3: TCP Session Hijacking",
      'tcp.slide6.sub': "Stealing an active TCP session",
      'tcp.slide7.title': "TCP in SOC telemetry",
      'tcp.slide7.sub': "Zeek conn.log + Suricata + NetFlow",
      'tcp.slide8.title': "Detection and mitigation",
      'tcp.slide8.sub': "Operational summary for SOC",
      'tcp.ej1.title': "Handshake or not — when does the ACK not arrive?",
      'tcp.ej2.title': "Identify port scan type by flags",
      'tcp.ej3.title': "SYN Flood analysis in NetFlow",
      'tcp.ej4.title': "Why RST on an established session?",
      'tcp.ej5.title': "Write Suricata rule — NULL/Xmas scan",
      'tcp.challenge.title': "Incident #TCP-001: \"The web server that won't respond\"",
      'tcp.challenge.q': "What do you do in the next 10 minutes?",
      'tcp.demo.synflood.desc': "The attacker sends thousands of SYN packets with spoofed IPs. The server reserves resources waiting for the ACK that never arrives, exhausting the half-open connection table.",
      'tcp.demo.portscan.desc': "The attacker sends SYN to multiple ports. An open port replies SYN-ACK; a closed one replies RST; a filtered one does not respond.",
      'tcp.slide1.p1': "TCP (Transmission Control Protocol) is the transport-layer protocol that guarantees ordered, error-free, and duplicate-free delivery of data between two hosts. It operates over IP and is the foundation of HTTP, HTTPS, SSH, SMTP, FTP, and most application protocols.",
      'tcp.slide1.callout.title': "Key TCP characteristics:",
      'tcp.slide1.f1': "🔗 <strong>Connection-oriented</strong> — requires establishing a connection before sending data (3-way handshake)",
      'tcp.slide1.f2': "✅ <strong>Guaranteed delivery</strong> — ACK for each segment; retransmits if no acknowledgment",
      'tcp.slide1.f3': "📋 <strong>Ordering</strong> — sequence numbers ensure data arrives in order",
      'tcp.slide1.f4': "🚦 <strong>Flow control</strong> — sliding window prevents overwhelming the receiver",
      'tcp.slide1.f5': "🔧 <strong>Congestion control</strong> — slow start, AIMD, CUBIC",
      'tcp.slide2.callout': {
      es: '<strong>Flags TCP:</strong> SYN (sync), ACK (acknowledge), FIN (finish), RST (reset), PSH (push), URG (urgent). La combinación de flags en cada paquete indica el estado de la conexión.',
      en: '<strong>TCP Flags:</strong> SYN (sync), ACK (acknowledge), FIN (finish), RST (reset), PSH (push), URG (urgent). The combination of flags in each packet indicates the connection state.' },
      'tcp.slide3.callout.title': "Fields of interest in SOC:",
      'tcp.slide3.c1': "Window Size 0 → scheduled RST or denial attempt",
      'tcp.slide3.c2': "Out-of-order sequence numbers → possible hijacking or retransmission",
      'tcp.slide3.c3': "SYN only without ACK → SYN Flood or port scan in progress",
      'tcp.slide3.c4': "Invalid flags (SYN+FIN, NULL) → evasive scan (Xmas scan, NULL scan)",
      'tcp.slide4.p1': "The attacker sends a burst of SYN packets with spoofed source IPs. The server reserves resources for each half-open \"connection\" in the Transmission Control Block (TCB) table and waits for the final ACK that never arrives.",
      'tcp.slide4.impact.title': "Impact:",
      'tcp.slide4.i1': "The TCB table fills up → the server rejects legitimate connections",
      'tcp.slide4.i2': "Effective denial of service with relatively low attacker bandwidth",
      'tcp.slide4.i3': "Spoofed IPs make blocking by source difficult",
      'tcp.slide4.mitigation': "<strong>Mitigation:</strong> SYN cookies (server does not reserve state until ACK received), SYN rate limiting per IP, stateful firewall, scrubbing centers.",
      'tcp.slide5.p1': "The attacker sends TCP packets to multiple ports to identify active services. The different scan types are detectable by flag patterns:",
      'tcp.slide5.s1': "<strong>SYN scan (-sS)</strong>: sends SYN, waits for SYN-ACK (open) or RST (closed). More stealthy: does not complete the handshake.",
      'tcp.slide5.s2': "<strong>Connect scan (-sT)</strong>: completes the handshake. Appears in application logs.",
      'tcp.slide5.s3': "<strong>NULL scan (-sN)</strong>: sends packet with no flags. Open → no response, Closed → RST.",
      'tcp.slide5.s4': "<strong>Xmas scan (-sX)</strong>: SYN+FIN+URG+PSH. Same behavior as NULL.",
      'tcp.slide5.s5': "<strong>FIN scan (-sF)</strong>: FIN only. Evades some stateless firewalls.",
      'tcp.slide5.ioc': { es: 'IOC en logs: una IP enviando SYN a más de 15–20 puertos distintos en &lt;1 minuto = port scan casi seguro.', en: 'IOC in logs: one IP sending SYN to more than 15–20 different ports in &lt;1 minute = almost certain port scan.' },
      'tcp.slide6.p1': "The attacker in MITM position intercepts an active TCP session and takes control by injecting packets with the correct sequence numbers. Steps:",
      'tcp.slide6.s1': "Sniff TCP traffic to obtain current seq/ack numbers",
      'tcp.slide6.s2': "Inject packets with src=victim, seq=expected → the server accepts them",
      'tcp.slide6.s3': "Desynchronize the legitimate client (RST or sequence desync)",
      'tcp.slide6.s4': "The attacker has full control of the session",
      'tcp.slide6.callout': { es: '<strong>Señal en SOC:</strong> RST inesperados en conexiones activas, retransmisiones anómalas, cambio de sequence numbers sin causa de red.', en: '<strong>SOC signal:</strong> unexpected RSTs on active connections, anomalous retransmissions, sequence number changes without network cause.' },
      'tcp.slide8.m1.title': "SYN Cookies",
      'tcp.slide8.m1.desc': "— the kernel does not reserve TCB until a valid ACK is received. Active by default on Linux.",
      'tcp.slide8.m2.title': "Stateful Firewall",
      'tcp.slide8.m2.desc': "— only allows packets that belong to an established connection.",
      'tcp.slide8.m3.title': "SYN Rate Limiting",
      'tcp.slide8.m3.desc': "— iptables/nftables: max N SYN/s per source IP.",
      'tcp.slide8.m4.title': "IDS signatures",
      'tcp.slide8.m4.desc': "— Suricata detects NULL/Xmas scans by invalid flag combinations.",
      'tcp.slide8.m5.title': "NetFlow / IPFIX",
      'tcp.slide8.m5.desc': "— TCP connection baseline per destination; anomalies → SIEM alert.",
      'tcp.slide8.m6.title': "Blackholing / Scrubbing",
      'tcp.slide8.m6.desc': "— during volumetric DDoS, redirect traffic to scrubbing centers.",
      'tcp.slide8.sigma.title': "Sigma Rule — Port Scan Detection:",
      'tcp.ej1.q': "In Zeek conn.log the <code>conn_state</code> field can be: <code>S0</code>, <code>S1</code>, <code>SF</code>, <code>REJ</code>, <code>RSTO</code>, <code>RSTR</code>. Explain what each means and which one(s) indicate a possible attack.",
      'tcp.ej2.q': "The IDS captured these packets from the same source IP to different ports. Identify the scan type and its purpose:",
      'tcp.ej3.q': "The SIEM reports the following over a 30-second period. What is happening and how do you respond?",
      'tcp.ej4.q': "An analyst sees in Zeek that an established SSH session (ESTABLISHED) receives an unexpected RST after 12 seconds. The session ends with conn_state=RSTR. The user reports their SSH session \"drops on its own.\" List possible causes from most benign to most suspicious.",
      'tcp.ej5.q': "Write Suricata rules to detect: (1) NULL scan, (2) Xmas scan, (3) FIN scan. Explain why you need <code>flow:stateless</code> in these rules.",
      'tcp.ej1.ans': { es: 'S0  → SYN enviado, nunca llegó SYN-ACK\n      → Posible SYN Flood (muchos S0 desde IPs distintas al mismo destino)\n      → O puerto filtrado por firewall\n\nS1  → Handshake iniciado pero incompleto (SYN+SYN-ACK, sin ACK final)\n      → Raro en condiciones normales → posible scan o problema de red\n\nSF  → Conexión completada y cerrada normalmente (SYN→DATA→FIN)\n      → Estado esperado en tráfico legítimo\n\nREJ → Conexión rechazada (RST recibido al SYN)\n      → Puerto cerrado → normal; muchos REJ desde una IP → port scan\n\nRSTO → Conexión reseteada por el ORIGEN (cliente)\n      → Puede ser normal (timeout de aplicación)\n      → Muchos RSTO rápidos → herramienta automatizada\n\nRSTR → Conexión reseteada por el RESPONDEDOR (servidor)\n      → El servidor rechaza la sesión activa\n      → Posible TCP hijacking detection o IDS inline bloqueando\n\nPARA UN SOC:\n- Muchos S0 → mismo dst = SYN Flood o scanning activo\n- Muchos REJ desde un src → port scan (T1046)\n- RSTR inesperado en sesión establecida → TCP hijacking o IPS activo',
                    en: 'S0  → SYN sent, SYN-ACK never arrived\n      → Possible SYN Flood (many S0 from different IPs to same destination)\n      → Or port filtered by firewall\n\nS1  → Handshake started but incomplete (SYN+SYN-ACK, no final ACK)\n      → Rare under normal conditions → possible scan or network issue\n\nSF  → Connection completed and closed normally (SYN→DATA→FIN)\n      → Expected state in legitimate traffic\n\nREJ → Connection rejected (RST received on SYN)\n      → Closed port → normal; many REJ from one IP → port scan\n\nRSTO → Connection reset by ORIGINATOR (client)\n      → Can be normal (application timeout)\n      → Many fast RSTOs → automated tool\n\nRSTR → Connection reset by RESPONDER (server)\n      → Server rejects the active session\n      → Possible TCP hijacking detection or inline IDS blocking\n\nFOR A SOC:\n- Many S0 → same dst = SYN Flood or active scanning\n- Many REJ from one src → port scan (T1046)\n- Unexpected RSTR on established session → TCP hijacking or active IPS' },
      'tcp.ej2.ans': { es: 'Paquete A: Flags=SYN → SYN Scan (-sS nmap)\n  → El más común. No completa handshake → menos logs en la app\n  → Puerto abierto: SYN-ACK · Puerto cerrado: RST\n\nPaquete B: Flags=FIN+URG+PSH → Xmas Scan (-sX nmap)\n  → Nombre porque "ilumina" todos los flags como un árbol de navidad\n  → Evasión de firewalls stateless que solo filtran SYN\n  → NO funciona contra Windows (que responde RST a cualquier combo)\n\nPaquete C: Flags=(ninguno) → NULL Scan (-sN nmap)\n  → Misma lógica que Xmas pero sin ningún flag\n  → Evasión de firewalls que solo bloquean SYN\n\nPaquete D: Flags=FIN → FIN Scan (-sF nmap)\n  → Variante de evasión. Solo FIN sin contexto de conexión previa\n  → Comportamiento: mismo que NULL y Xmas\n\nPaquete E: Flags=SYN+ACK → Posible respuesta spoofed o scan inverso\n  → Un SYN-ACK sin SYN previo puede ser para reconocimiento\n  → El destino responderá RST si no tiene conexión abierta\n\nRESUMEN para SOC:\n→ B, C, D son flags inválidas = siempre sospechosos = alertar inmediato\n→ A es normal en tráfico legítimo PERO a muchos puertos = scan\n→ E aislado puede ser escaneo de servicios que filtran SYN pero no SYN-ACK',
                    en: 'Packet A: Flags=SYN → SYN Scan (-sS nmap)\n  → Most common. Does not complete handshake → fewer app logs\n  → Open port: SYN-ACK · Closed port: RST\n\nPacket B: Flags=FIN+URG+PSH → Xmas Scan (-sX nmap)\n  → Named because it "lights up" all flags like a Christmas tree\n  → Evades stateless firewalls that only filter SYN\n  → Does NOT work against Windows (which responds RST to any combo)\n\nPacket C: Flags=(none) → NULL Scan (-sN nmap)\n  → Same logic as Xmas but with no flags\n  → Evades firewalls that only block SYN\n\nPacket D: Flags=FIN → FIN Scan (-sF nmap)\n  → Evasion variant. FIN only without prior connection context\n  → Behavior: same as NULL and Xmas\n\nPacket E: Flags=SYN+ACK → Possible spoofed reply or reverse scan\n  → A SYN-ACK without a prior SYN can be used for reconnaissance\n  → Destination will respond RST if it has no open connection\n\nSOC SUMMARY:\n→ B, C, D are invalid flags = always suspicious = alert immediately\n→ A is normal in legitimate traffic BUT to many ports = scan\n→ Isolated E can be scanning services that filter SYN but not SYN-ACK' },
      'tcp.ej3.ans': { es: 'ANÁLISIS:\n1. 8,500 IPs distintas enviando SYN = IPs spoofed (nadie tiene 8,500 hosts)\n2. 100% conn_state=S0 = ningún handshake se completa = SYN Flood confirmado\n3. Solo 60 bytes/paquete = paquetes SYN mínimos (IP spoofed, no payload)\n4. 40.8 Mbps hacia un solo host en puerto 443 = DDoS TCP volumétrico\n5. dst_port=443 = atacando HTTPS/TLS, puede saturar la TCB table del servidor\n\nIMPACTO ESTIMADO:\n- Si el servidor tiene SYN cookies: posiblemente aguante\n- Si no tiene SYN cookies: tabla de conexiones semi-abiertas saturada\n  en segundos → HTTPS inaccesible para usuarios legítimos\n\nRESPUESTA INMEDIATA (en orden):\n→ T+0: Confirmar que 10.0.0.5 está degradado (latencia, packet loss)\n→ T+1: Activar SYN cookies en el host/firewall si no están activas\n→ T+2: Rate limit de SYN: máx 500/s por IP de origen en border firewall\n→ T+3: Notificar al ISP upstream para null-routing del tráfico de ataque\n→ T+4: Si el upstream no puede: activar scrubbing center / CDN DDoS protection\n→ T+5: Documentar, abrir ticket de incidente, escalar si continúa\n\nPREVENCIÓN:\n- SYN cookies siempre activas (net.ipv4.tcp_syncookies=1 en Linux)\n- BGP blackholing automation para volúmenes > threshold\n- Anycast + CDN para servicios públicos críticos',
                    en: 'ANALYSIS:\n1. 8,500 distinct IPs sending SYN = spoofed IPs (no one has 8,500 hosts)\n2. 100% conn_state=S0 = no handshake completes = SYN Flood confirmed\n3. Only 60 bytes/packet = minimal SYN packets (spoofed IP, no payload)\n4. 40.8 Mbps toward a single host on port 443 = volumetric TCP DDoS\n5. dst_port=443 = attacking HTTPS/TLS, can saturate the server TCB table\n\nESTIMATED IMPACT:\n- If server has SYN cookies: may hold up\n- If no SYN cookies: half-open connection table saturates\n  in seconds → HTTPS inaccessible for legitimate users\n\nIMMEDIATE RESPONSE (in order):\n→ T+0: Confirm 10.0.0.5 is degraded (latency, packet loss)\n→ T+1: Enable SYN cookies on host/firewall if not active\n→ T+2: SYN rate limit: max 500/s per source IP at border firewall\n→ T+3: Notify upstream ISP for null-routing of attack traffic\n→ T+4: If upstream cannot absorb: activate scrubbing center / CDN DDoS protection\n→ T+5: Document, open incident ticket, escalate if it continues\n\nPREVENTION:\n- SYN cookies always active (net.ipv4.tcp_syncookies=1 on Linux)\n- BGP blackholing automation for volumes > threshold\n- Anycast + CDN for critical public services' },
      'tcp.ej4.ans': { es: 'CAUSAS POSIBLES (benigna → sospechosa):\n\n1. BENIGNAS:\n   - Timeout de inactividad del servidor SSH (ClientAliveInterval)\n   - Firewall corporativo con idle TCP timeout corto (ej: 10s)\n   - NAT table expirando la entrada (común en NAT de ISP)\n   - El proceso del servidor SSH terminó o se reinició\n\n2. AMBIGUAS:\n   - IPS/IDS inline detectó algo y envió RST para cortar la sesión\n     (el RST viene del IDS, no del servidor real)\n   - Load balancer reseteando conexión sin respuesta del backend\n\n3. SOSPECHOSAS:\n   - TCP Session Hijacking: el atacante envía RST al cliente para\n     "expulsarlo" y tomar control de la sesión\n   - RST injection por herramienta como tcpkill o Scapy:\n     el atacante corta sesiones activas (DoS selectivo)\n   - Malware con RST injection para interrumpir conexiones de seguridad\n     (ej: cortar la sesión con el SIEM o el agente AV)\n\nCÓMO DISTINGUIRLO:\n→ Verificar seq number del RST: ¿coincide exactamente? → podría ser legítimo\n→ ¿Hay otros usuarios con el mismo problema al mismo tiempo? → más sospechoso\n→ ¿El RST viene de la IP del servidor o de otra IP? → PCAP para confirmar\n→ Correlacionar con alertas de IDS en el mismo timestamp',
                    en: 'POSSIBLE CAUSES (benign → suspicious):\n\n1. BENIGN:\n   - SSH server inactivity timeout (ClientAliveInterval)\n   - Corporate firewall with short idle TCP timeout (e.g., 10s)\n   - NAT table entry expiring (common in ISP NAT)\n   - SSH server process terminated or restarted\n\n2. AMBIGUOUS:\n   - Inline IPS/IDS detected something and sent RST to cut the session\n     (the RST comes from the IDS, not the real server)\n   - Load balancer resetting connection without backend response\n\n3. SUSPICIOUS:\n   - TCP Session Hijacking: attacker sends RST to the client to\n     "evict" it and take control of the session\n   - RST injection via tool like tcpkill or Scapy:\n     attacker cuts active sessions (selective DoS)\n   - Malware with RST injection to disrupt security connections\n     (e.g., cut session with SIEM or AV agent)\n\nHOW TO DISTINGUISH:\n→ Check RST sequence number: does it match exactly? → could be legitimate\n→ Are other users experiencing the same issue at the same time? → more suspicious\n→ Does the RST come from the server IP or another IP? → PCAP to confirm\n→ Correlate with IDS alerts at the same timestamp' },
      'tcp.ej5.ans': { es: '# Regla 1 — NULL Scan (sin flags TCP)\nalert tcp any any -> $HOME_NET any (\n  msg:"ET SCAN TCP NULL Scan";\n  flow:stateless;\n  flags:0;\n  threshold: type both, track by_src, count 5, seconds 60;\n  classtype:attempted-recon;\n  sid:2100301; rev:1;\n)\n\n# Regla 2 — Xmas Scan (FIN+URG+PSH simultáneos)\nalert tcp any any -> $HOME_NET any (\n  msg:"ET SCAN TCP Xmas Scan";\n  flow:stateless;\n  flags:FPU,12;\n  threshold: type both, track by_src, count 5, seconds 60;\n  classtype:attempted-recon;\n  sid:2100302; rev:1;\n)\n\n# Regla 3 — FIN Scan (solo FIN, sin contexto de conexión)\nalert tcp any any -> $HOME_NET any (\n  msg:"ET SCAN TCP FIN Scan";\n  flow:stateless;\n  flags:F,12;\n  threshold: type both, track by_src, count 5, seconds 60;\n  classtype:attempted-recon;\n  sid:2100303; rev:1;\n)\n\n¿POR QUÉ flow:stateless?\n→ Suricata por defecto solo procesa paquetes de flujos reconocidos.\n→ NULL/Xmas/FIN scans envían paquetes fuera de cualquier flujo legítimo.\n→ Sin flow:stateless, Suricata los descartaría sin inspeccionar.\n→ Con flow:stateless se evalúan TODOS los paquetes independientemente.',
                    en: '# Rule 1 — NULL Scan (no TCP flags)\nalert tcp any any -> $HOME_NET any (\n  msg:"ET SCAN TCP NULL Scan";\n  flow:stateless;\n  flags:0;\n  threshold: type both, track by_src, count 5, seconds 60;\n  classtype:attempted-recon;\n  sid:2100301; rev:1;\n)\n\n# Rule 2 — Xmas Scan (simultaneous FIN+URG+PSH)\nalert tcp any any -> $HOME_NET any (\n  msg:"ET SCAN TCP Xmas Scan";\n  flow:stateless;\n  flags:FPU,12;\n  threshold: type both, track by_src, count 5, seconds 60;\n  classtype:attempted-recon;\n  sid:2100302; rev:1;\n)\n\n# Rule 3 — FIN Scan (FIN only, no connection context)\nalert tcp any any -> $HOME_NET any (\n  msg:"ET SCAN TCP FIN Scan";\n  flow:stateless;\n  flags:F,12;\n  threshold: type both, track by_src, count 5, seconds 60;\n  classtype:attempted-recon;\n  sid:2100303; rev:1;\n)\n\nWHY flow:stateless?\n→ Suricata by default only processes packets belonging to recognized flows.\n→ NULL/Xmas/FIN scans send packets outside any legitimate flow.\n→ Without flow:stateless, Suricata would discard them without inspecting.\n→ With flow:stateless ALL packets are evaluated regardless of connection state.' },
      'tcp.challenge.context': "3 AM. Cascading alerts: the public web server (10.0.0.10) has 15-second latency and is rejecting ~90% of new connections. The NOC sees kernel CPU spikes. SIEM data:",
      'tcp.challenge.ans': {
      es: 'DIAGNÓSTICO:\nSYN Flood masivo confirmado:\n- 14,200 IPs distintas = botnet o IPs spoofed\n- 99.8% paquetes SYN, 0 completando handshake = spoofed (no hay return path)\n- 64 bytes = paquetes SYN mínimos sin payload\n- SYN cookies DESACTIVADAS → el kernel crea TCB por cada SYN\n  → backlog de 128 se satura instantáneamente\n- 94% CPU en softirq = el kernel está ahogado procesando paquetes TCP\n\nACCIONES T+0 a T+10min:\n\nT+0 → ACTIVAR SYN COOKIES (sin downtime):\n  sysctl -w net.ipv4.tcp_syncookies=1\n  sysctl -w net.ipv4.tcp_max_syn_backlog=4096\n\nT+1 → AJUSTAR TIMEOUTS:\n  sysctl -w net.ipv4.tcp_synack_retries=1\n  sysctl -w net.ipv4.tcp_syn_retries=2\n\nT+2 → RATE LIMIT en iptables:\n  iptables -A INPUT -p tcp --syn -m limit --limit 500/s --limit-burst 1000 -j ACCEPT\n  iptables -A INPUT -p tcp --syn -j DROP\n\nT+3 → CONTACTO con ISP/upstream para null-route\nT+5 → Activar CDN/DDoS scrubbing si disponible\nT+7 → Abrir incidente formal, notificar management\nT+10 → Documentar timeline para postmortem',
      en: 'DIAGNOSIS:\nMassive SYN Flood confirmed:\n- 14,200 distinct IPs = botnet or spoofed IPs\n- 99.8% SYN packets, 0 completing handshake = spoofed (no return path)\n- 64 bytes = minimal SYN packets with no payload\n- SYN cookies DISABLED → kernel creates TCB for each SYN\n  → backlog of 128 saturates instantly\n- 94% CPU on softirq = kernel drowning in TCP packet processing\n\nACTIONS T+0 to T+10min:\n\nT+0 → ENABLE SYN COOKIES (no downtime):\n  sysctl -w net.ipv4.tcp_syncookies=1\n  sysctl -w net.ipv4.tcp_max_syn_backlog=4096\n\nT+1 → TUNE TIMEOUTS:\n  sysctl -w net.ipv4.tcp_synack_retries=1\n  sysctl -w net.ipv4.tcp_syn_retries=2\n\nT+2 → RATE LIMIT in iptables:\n  iptables -A INPUT -p tcp --syn -m limit --limit 500/s --limit-burst 1000 -j ACCEPT\n  iptables -A INPUT -p tcp --syn -j DROP\n\nT+3 → CONTACT ISP/upstream for null-route\nT+5 → Activate CDN/DDoS scrubbing if available\nT+7 → Open formal incident, notify management\nT+10 → Document timeline for postmortem' },
    'tcp.predlabel': "Prediction examples:",
    'tcp.pre0': { es: `
Cliente (192.168.1.100)          Servidor (93.184.216.34:443)
       │                                    │
       │──── SYN (seq=1000) ───────────────►│  [1] Cliente inicia
       │                                    │      SYN_SENT
       │◄─── SYN-ACK (seq=5000, ack=1001) ─│  [2] Servidor confirma
       │                                    │      SYN_RECEIVED
       │──── ACK (ack=5001) ───────────────►│  [3] Conexión establecida
       │                                    │      ESTABLISHED
       │════════ DATA TRANSFER ═════════════│
       │                                    │
       │──── FIN ──────────────────────────►│  [4] Cierre (4-way)
       │◄─── ACK ───────────────────────────│
       │◄─── FIN ───────────────────────────│
       │──── ACK ──────────────────────────►│  CLOSED`, en: `
Client (192.168.1.100)           Server (93.184.216.34:443)
       │                                    │
       │──── SYN (seq=1000) ───────────────►│  [1] Client initiates
       │                                    │      SYN_SENT
       │◄─── SYN-ACK (seq=5000, ack=1001) ─│  [2] Server confirms
       │                                    │      SYN_RECEIVED
       │──── ACK (ack=5001) ───────────────►│  [3] Connection established
       │                                    │      ESTABLISHED
       │════════ DATA TRANSFER ═════════════│
       │                                    │
       │──── FIN ──────────────────────────►│  [4] Teardown (4-way)
       │◄─── ACK ───────────────────────────│
       │◄─── FIN ───────────────────────────│
       │──── ACK ──────────────────────────►│  CLOSED` },
    'tcp.pre1': { es: `
 0      7 8     15 16    23 24    31
┌────────────────┬────────────────┐
│  Source Port   │   Dest Port    │  ← identifica la aplicación
├────────────────────────────────┤
│         Sequence Number        │  ← posición en el flujo
├────────────────────────────────┤
│       Acknowledgment Number    │  ← próximo byte esperado
├────────┬───────┬───────────────┤
│DataOff │Reserv │  Flags        │  ← SYN ACK FIN RST PSH URG
├────────────────┬───────────────┤
│  Window Size   │   Checksum    │
└────────────────┴───────────────┘`, en: `
 0      7 8     15 16    23 24    31
┌────────────────┬────────────────┐
│  Source Port   │   Dest Port    │  ← identifies the application
├────────────────────────────────┤
│         Sequence Number        │  ← position in the stream
├────────────────────────────────┤
│       Acknowledgment Number    │  ← next expected byte
├────────┬───────┬───────────────┤
│DataOff │Reserv │  Flags        │  ← SYN ACK FIN RST PSH URG
├────────────────┬───────────────┤
│  Window Size   │   Checksum    │
└────────────────┴───────────────┘` },
    'tcp.pre2': { es: `
# Zeek conn.log — conexión normal HTTPS
ts=10:01:05  orig=192.168.1.100:51234  resp=93.184.216.34:443
proto=tcp  state=SF  orig_bytes=1240  resp_bytes=8920
conn_state: S0=sin ACK · SF=normal · REJ=rechazada · RSTO=RST origen

# Zeek — posible SYN Flood (muchos S0 al mismo destino)
ts=10:05:00  state=S0  orig=1.2.3.4:random  resp=10.0.0.1:443
ts=10:05:00  state=S0  orig=5.6.7.8:random  resp=10.0.0.1:443
... × 10.000 en 1 segundo

# Zeek — port scan (un origen, muchos destinos/puertos)
10:10:01  orig=192.168.99.200  resp=192.168.1.1:22   S0
10:10:01  orig=192.168.99.200  resp=192.168.1.1:80   S0
10:10:01  orig=192.168.99.200  resp=192.168.1.1:443  SF  ← abierto
10:10:01  orig=192.168.99.200  resp=192.168.1.1:3389 S0

# Suricata — SYN Flood detection
alert tcp any any -> $HOME_NET any (
  msg:"ET DOS TCP SYN Flood";
  flags:S,12; flow:stateless;
  threshold: type both, track by_dst, count 1000, seconds 1;
  classtype:denial-of-service; sid:2100200;)`, en: `
# Zeek conn.log — normal HTTPS connection
ts=10:01:05  orig=192.168.1.100:51234  resp=93.184.216.34:443
proto=tcp  state=SF  orig_bytes=1240  resp_bytes=8920
conn_state: S0=no ACK · SF=normal · REJ=rejected · RSTO=RST from origin

# Zeek — possible SYN Flood (many S0 to the same destination)
ts=10:05:00  state=S0  orig=1.2.3.4:random  resp=10.0.0.1:443
ts=10:05:00  state=S0  orig=5.6.7.8:random  resp=10.0.0.1:443
... × 10,000 in 1 second

# Zeek — port scan (one source, many destinations/ports)
10:10:01  orig=192.168.99.200  resp=192.168.1.1:22   S0
10:10:01  orig=192.168.99.200  resp=192.168.1.1:80   S0
10:10:01  orig=192.168.99.200  resp=192.168.1.1:443  SF  ← open
10:10:01  orig=192.168.99.200  resp=192.168.1.1:3389 S0

# Suricata — SYN Flood detection
alert tcp any any -> $HOME_NET any (
  msg:"ET DOS TCP SYN Flood";
  flags:S,12; flow:stateless;
  threshold: type both, track by_dst, count 1000, seconds 1;
  classtype:denial-of-service; sid:2100200;)` },
    'tcp.pre3': { es: `
MECANISMO:
  - Paquetes ACK válidos: el servidor los procesa rápido (sesión conocida)
  - Paquetes ACK inválidos: el servidor responde con RST → doble gasto de CPU
  - Sin sesión previa → el firewall stateful debe verificar cada uno
  - Volumétrico: fácil de amplificar con botnet

COMANDO (hping3):
  hping3 -A --rand-source --flood -p 80 10.0.0.1
  # -A    = flag ACK activado
  # --rand-source = IP origen aleatoria (spoofed)
  # --flood = máxima velocidad posible

VS SYN FLOOD:
  SYN Flood: crea half-open connections, agota tabla TCP
  ACK Flood: no crea estado, pero fuerza búsquedas en tabla
  ACK Flood es más difícil de filtrar (ACK es tráfico normal de vuelta)

DETECCIÓN:
  Zeek: paquetes ACK sin SYN previo correspondiente
  iptables: -m state --state ESTABLISHED → bloquear ACK sin estado
  Netflow: ratio ACK/SYN anómalo (>>1 en condiciones normales es ok, >>100 es sospechoso)
  SIEM: alerta en tasa de RST responses desde el servidor

MITIGACIÓN:
  Rate limiting en ACK sin conexión establecida
  SYN cookies + connection tracking en firewall
  Anycast + scrubbing center ante ataques volumétricos`, en: `
MECHANISM:
  - Valid ACK packets: the server processes them fast (known session)
  - Invalid ACK packets: the server replies with RST → double CPU cost
  - No prior session → the stateful firewall must check each one
  - Volumetric: easy to amplify with a botnet

COMMAND (hping3):
  hping3 -A --rand-source --flood -p 80 10.0.0.1
  # -A    = ACK flag enabled
  # --rand-source = random source IP (spoofed)
  # --flood = maximum possible speed

VS SYN FLOOD:
  SYN Flood: creates half-open connections, exhausts the TCP table
  ACK Flood: creates no state, but forces table lookups
  ACK Flood is harder to filter (ACK is normal return traffic)

DETECTION:
  Zeek: ACK packets with no corresponding prior SYN
  iptables: -m state --state ESTABLISHED → block stateless ACK
  Netflow: anomalous ACK/SYN ratio (>>1 in normal conditions is ok, >>100 is suspicious)
  SIEM: alert on the rate of RST responses from the server

MITIGATION:
  Rate limiting on ACK without an established connection
  SYN cookies + connection tracking in the firewall
  Anycast + scrubbing center against volumetric attacks` },
    'tcp.pre4': { es: `
TIPOS DE TCP SPOOFING:

1. BLIND SPOOFING (sin respuesta visible):
   - El atacante no ve la respuesta del target
   - Debe predecir el ISN (Initial Sequence Number)
   - Requiere silenciar la IP suplantada (iptables DROP)
   - scapy: send(IP(src="victim",dst="target")/TCP(flags="S",seq=ISN_guess))

2. MitM + ARP POISONING (con respuesta visible):
   - ARP Poisoning redirige el tráfico a través del atacante
   - El atacante ve las respuestas → spoofing bidireccional
   - Permite inyectar comandos en sesiones Telnet, HTTP no cifrado
   - arpspoof + scapy/inject para modificar tráfico en-vuelo

3. SESSION RESET:
   - Sniffar SEQ number de una sesión activa
   - Enviar RST con IP spoofed y SEQ dentro de la ventana
   - Termina la conexión sin ser parte de ella (ver RST Injection)

HERRAMIENTAS:
  scapy:    send(IP(src="1.2.3.4",dst="5.6.7.8")/TCP(flags="S"))
  hping3:   hping3 --spoof 1.2.3.4 -S -p 80 5.6.7.8
  tcpkill:  terminar conexiones TCP activas en la red local

DETECCIÓN:
  uRPF (Unicast Reverse Path Forwarding): bloquea IPs con ruta asimétrica
  Ingress filtering (BCP38): ISPs deben filtrar paquetes con IPs propias
  ARP inspection dinámica: detecta ARP poisoning
  Zeek: conn.log — IPs que no corresponden a la MAC registrada`, en: `
TYPES OF TCP SPOOFING:

1. BLIND SPOOFING (no visible response):
   - The attacker does not see the target's response
   - Must predict the ISN (Initial Sequence Number)
   - Requires silencing the spoofed IP (iptables DROP)
   - scapy: send(IP(src="victim",dst="target")/TCP(flags="S",seq=ISN_guess))

2. MitM + ARP POISONING (with visible response):
   - ARP Poisoning redirects traffic through the attacker
   - The attacker sees the responses → bidirectional spoofing
   - Allows injecting commands into Telnet, unencrypted HTTP sessions
   - arpspoof + scapy/inject to modify in-flight traffic

3. SESSION RESET:
   - Sniff the SEQ number of an active session
   - Send RST with a spoofed IP and SEQ within the window
   - Ends the connection without being part of it (see RST Injection)

TOOLS:
  scapy:    send(IP(src="1.2.3.4",dst="5.6.7.8")/TCP(flags="S"))
  hping3:   hping3 --spoof 1.2.3.4 -S -p 80 5.6.7.8
  tcpkill:  terminate active TCP connections on the local network

DETECTION:
  uRPF (Unicast Reverse Path Forwarding): blocks IPs with an asymmetric route
  Ingress filtering (BCP38): ISPs should filter packets with their own IPs
  Dynamic ARP inspection: detects ARP poisoning
  Zeek: conn.log — IPs that do not match the registered MAC` },
    'tcp.pre7': { es: `
NetFlow últimos 60s → dst=10.0.0.10:80
  src_ips:  14,200 distintas
  avg_pkt_size: 64 bytes
  flags: SYN (99.8%)
  conn_state S0: 98%
  bandwidth: 109 Mbps

iptables -nL → SYN cookies: DISABLED
ulimit TCP backlog: 128 (default)
CPU softirq: 94% (procesando paquetes TCP)`, en: `
NetFlow last 60s → dst=10.0.0.10:80
  src_ips:  14,200 distinct
  avg_pkt_size: 64 bytes
  flags: SYN (99.8%)
  conn_state S0: 98%
  bandwidth: 109 Mbps

iptables -nL → SYN cookies: DISABLED
ulimit TCP backlog: 128 (default)
CPU softirq: 94% (processing TCP packets)` },
    'tcp.opt1': "1,000 pps — medium",
    'tcp.opt2': "10,000 pps — high",
    'tcp.opt3': "100,000 pps — saturation",
    'tcp.opt4': "Top 20 common ports",
    'tcp.opt5': "Top 100 ports",
    'tcp.opt6': "10,000 pkt/s (low)",
    'tcp.opt7': "100,000 pkt/s (medium)",
    'tcp.opt8': "1,000,000 pkt/s (high)",
    'tcp.cheat.r1.sig': { es: 'Miles de SYN hacia mismo dst', en: 'Thousands of SYN to same dst' },
    'tcp.cheat.r1.att': "SYN Flood DDoS",
    'tcp.cheat.r1.act': "SYN cookies, rate limit, ISP blackhole",
    'tcp.cheat.r2.sig': "One src → many dst_ports (S0/REJ)",
    'tcp.cheat.r2.att': "Port Scanning",
    'tcp.cheat.r2.act': "Alert, block IP, check for subsequent access",
    'tcp.cheat.r3.sig': "Flags=0 (NULL) from external src",
    'tcp.cheat.r3.att': "NULL Scan",
    'tcp.cheat.r3.act': "Block, alert",
    'tcp.cheat.r4.sig': "Flags=FIN+PSH+URG (Xmas)",
    'tcp.cheat.r4.att': "Xmas Scan",
    'tcp.cheat.r4.act': "Block, alert",
    'tcp.cheat.r5.sig': "Unexpected RST in ESTABLISHED session",
    'tcp.cheat.r5.att': "TCP Hijacking / RST injection",
    'tcp.cheat.r5.act': "Immediate PCAP, verify RST origin",
    'tcp.cheat.r6.sig': "Out-of-sequence numbers",
    'tcp.cheat.r6.att': "Session hijacking",
    'tcp.cheat.r6.act': "Terminate session, investigate",
    'tcp.cheat.r7.sig': "High softirq CPU + TCP latency",
    'tcp.cheat.r7.att': "SYN Flood in progress",
    'tcp.cheat.r7.act': "SYN cookies, adjust backlog",
    'tcp.rec.rfc9293': "Updated official TCP specification. Consolidates RFC 793 and all its updates.",
    'tcp.rec.rfc4987': { es: 'Documento de referencia para entender SYN Flood y SYN cookies a nivel técnico profundo.', en: 'Reference document for understanding SYN Flood and SYN cookies at a deep technical level.' },
    'tcp.demo.ack.title': "⚡ Demo: ACK Flood DoS",
    'tcp.demo.ack.desc':   { es: 'Inundación de paquetes ACK con IPs spoofed. El servidor gasta CPU verificando cada ACK contra su tabla de conexiones.', en: 'ACK packet flood with spoofed IPs. The server wastes CPU verifying each ACK against its connection table.' },
    'tcp.demo.ack.panel': "Configure ACK Flood",
    'tcp.demo.ack.target': "Target IP:",
    'tcp.demo.ack.rate': "Packet rate/s:",
    'tcp.demo.ack.btn': "▶ Simulate ACK Flood",
    'tcp.demo.ack.result': "Attack flow",
    'tcp.demo.spoof.title': "🎭 Demo: TCP IP Spoofing",
    'tcp.demo.spoof.desc':   { es: 'Falsificación de la IP origen en paquetes TCP. Permite inyectar datos en sesiones activas, realizar ataques blind, o combinarse con ARP poisoning para MitM.', en: 'Forging the source IP in TCP packets. Allows injecting data into active sessions, performing blind attacks, or combining with ARP poisoning for MitM.' },
    'tcp.demo.spoof.panel': "Configure TCP Spoofing",
    'tcp.demo.spoof.src': "IP to spoof (fake source):",
    'tcp.demo.spoof.target': "Target IP:",
    'tcp.demo.spoof.type': "Technique:",
    'tcp.demo.spoof.btn': "▶ Simulate TCP Spoofing",
    'tcp.demo.spoof.result': "Attack flow",
    'tcp.s9.title': "Attack 5: ACK Flood DoS",
    'tcp.s9.sub': "Saturate the TCP state table with spurious ACK packets",
    'tcp.s9.p1':     { es: 'El ACK Flood envía millones de paquetes ACK con IPs spoofed y números de secuencia aleatorios. El servidor debe buscar cada ACK en su tabla de conexiones. Con suficiente volumen, la CPU se satura.', en: 'ACK Flood sends millions of ACK packets with spoofed IPs and random sequence numbers. The server must look up each ACK in its connection table. With enough volume, the CPU saturates.' },
    'tcp.s10.title': "Attack 6: TCP IP Spoofing",
    'tcp.s10.sub': "Forge the source IP to impersonate another host",
    'tcp.s10.p1':    { es: 'IP Spoofing en TCP consiste en forjar la dirección IP origen. Se combina con ARP poisoning para MitM, o se usa en ataques blind para inyectar datos o resetear conexiones.', en: 'IP Spoofing in TCP involves forging the source IP address. It combines with ARP poisoning for MitM, or is used in blind attacks to inject data or reset connections.' },
      'tcp.ej6.title': "ACK Flood: how does it differ from SYN Flood?",
      'tcp.ej6.q': { es: 'Explicá las diferencias técnicas entre SYN Flood y ACK Flood. ¿Por qué los SYN cookies no mitigan el ACK Flood? ¿Qué recurso del servidor atacan respectivamente? ¿Cómo detectarías un ACK Flood en Zeek conn.log?', en: 'Explain the technical differences between SYN Flood and ACK Flood. Why do SYN cookies not mitigate ACK Flood? What server resource does each attack? How would you detect an ACK Flood in Zeek conn.log?' },
      'tcp.ej6.ans': { es: 'SYN Flood → llena la backlog (half-open connections) → memoria\nACK Flood → cada ACK busca sesión en el stack → CPU\n\nSYN cookies no ayudan: resuelven el backlog, los ACK pasan igual al stack\n\nDETECCIÓN:\n  conn_state RSTO + flag ACK + alto volumen\n  Sigma: count() by dst_ip > 10000 en 10s', en: 'SYN Flood → fills backlog (half-open connections) → memory\nACK Flood → each ACK triggers session lookup in stack → CPU\n\nSYN cookies do not help: they solve the backlog, ACKs still hit the stack\n\nDETECTION:\n  conn_state RSTO + ACK flag + high volume\n  Sigma: count() by dst_ip > 10000 in 10s' },
      'tcp.ej7.title': "TCP Spoofing: blind vs. non-blind",
      'tcp.ej7.q': { es: '¿Cuál es la diferencia entre TCP Spoofing ciego y no-ciego? ¿Por qué los ISNs aleatorios dificultan el ataque? ¿Qué condición de red se necesita para el ataque no-ciego? ¿Cómo se usa TCP Spoofing para inyectar RST y terminar sesiones BGP?', en: 'What is the difference between blind and non-blind TCP spoofing? Why does ISN randomization make the attack harder? What network condition is needed for non-blind? How is TCP spoofing used to inject RST and tear down BGP sessions?' },
      'tcp.ej7.ans': { es: 'BLIND: atacante no ve respuestas → debe adivinar ISN → hoy inviable (RFC 6528)\nNON-BLIND: atacante en el path → ve seq numbers → session hijacking\n\nRST INJECTION vs BGP (CVE-2004-0230):\n  Enviar RST con seq en la ventana TCP → sesión BGP cae\n  Impacto: disruption de routing en internet\n  Mitigación: TCP MD5 (RFC 2385), GTSM, BCP38', en: 'BLIND: attacker cannot see responses → must guess ISN → impractical today (RFC 6528)\nNON-BLIND: attacker on the path → sees seq numbers → session hijacking\n\nRST INJECTION vs BGP (CVE-2004-0230):\n  Send RST with seq in TCP window → BGP session drops\n  Impact: routing disruption\n  Mitigation: TCP MD5 (RFC 2385), GTSM, BCP38' },
      'tcp.rec.cve2004': { es: 'Vulnerabilidad en la ventana TCP que permite terminar sesiones BGP via RST spoofed. Afectó a todos los routers con BGP.', en: 'TCP window vulnerability allowing BGP session termination via spoofed RST. Affected all BGP-speaking routers.' },
      'tcp.rec.cve2018': "DoS in the Linux TCP stack via specially crafted packets. O(n²) segment processing complexity. CVSS 7.5.",
      'tcp.rec.cve2020': "Vulnerabilities in embedded TCP/IP stacks (Treck). Affected millions of IoT, medical and industrial devices.",
      'tcp.rec.t1498': "SYN Flood, ACK Flood and network-level DoS variants.",
      'tcp.rec.t1046': "Port scanning and service discovery. Very common pre-attack technique.",
      'tcp.rec.t1557': "Session hijacking and TCP spoofing in MitM attacks. Includes traffic injection techniques.",
      'tcp.rec.thm': "Practical lab covering all TCP scan types (SYN, NULL, Xmas, FIN) and firewall evasion.",
});
