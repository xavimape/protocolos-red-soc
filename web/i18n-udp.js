/* ============================================================
   i18n-udp.js — Traducciones EN del modulo UDP
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
      'udp.subtitle': "User Datagram Protocol · UDP/any · Transport Layer",
      'udp.demo.waiting': "Waiting for UDP simulation...",
      'udp.demo.compare.title': "UDP vs TCP — Live Comparison",
      'udp.demo.compare.src': "Source server:",
      'udp.demo.compare.dst': "Destination client:",
      'udp.demo.compare.proto': "Protocol to simulate:",
      'udp.demo.btn.compare': "▶ Simulate UDP traffic",
      'udp.demo.compare.output': "Datagram flow",
      'udp.demo.flood.title': "⚠️ Demo: UDP Flood (DDoS)",
      'udp.demo.flood.desc':         { es: 'El atacante envía datagramas UDP masivos hacia puertos aleatorios. El servidor responde con ICMP "Port Unreachable" agotando ancho de banda y CPU. Sin handshake = sin defensa por cookies.',
                                     en: 'The attacker sends massive UDP datagrams to random ports. The server responds with ICMP "Port Unreachable" exhausting bandwidth and CPU. No handshake = no cookie-based defense.' },
      'udp.demo.flood.panel': "Configure attack",
      'udp.demo.flood.target': "Victim IP:",
      'udp.demo.flood.size': "Datagram size:",
      'udp.demo.flood.rate': "Send rate:",
      'udp.demo.btn.flood': "▶ Simulate UDP Flood",
      'udp.demo.flood.state': "Victim server state",
      'udp.demo.amp.title': "🔊 Demo: UDP Amplification (NTP/DNS)",
      'udp.demo.amp.desc':           { es: 'El atacante envía pequeñas consultas spoofed hacia servidores reflectores. Cada reflector responde con paquetes mucho más grandes a la IP víctima. Factor de amplificación: hasta 550x en NTP monlist.',
                                     en: 'The attacker sends small spoofed queries to reflector servers. Each reflector responds with much larger packets to the victim IP. Amplification factor: up to 550x with NTP monlist.' },
      'udp.demo.amp.panel': "Configure amplification",
      'udp.demo.amp.victim': "Victim IP (spoofed as source):",
      'udp.demo.amp.reflector': "Reflector protocol:",
      'udp.demo.amp.bw': "Attacker bandwidth:",
      'udp.demo.btn.amp': "▶ Calculate amplification",
      'udp.demo.amp.result': "Attack result",
      'udp.demo.scan.title': "🔍 Demo: UDP Port Scan",
      'udp.demo.scan.desc':          { es: 'El escaneo UDP funciona al revés que TCP: un puerto cerrado responde ICMP "Port Unreachable", uno abierto suele no responder.',
                                     en: 'UDP scanning works in reverse to TCP: a closed port responds with ICMP "Port Unreachable", an open one usually does not respond.' },
      'udp.demo.scan.panel.config': "⚙️ Scan configuration",
      'udp.demo.scan.label.target': "Target IP:",
      'udp.demo.scan.label.type': "Scan type:",
      'udp.demo.scan.label.speed': "Speed:",
      'udp.demo.scan.btn': "🔍 Run UDP scan",
      'udp.demo.scan.panel.result': "📊 Scan results",
      'udp.demo.dhcp.title': "☠️ Demo: DHCP Starvation",
      'udp.demo.dhcp.desc':          { es: 'El atacante inunda el servidor DHCP con DISCOVER falsos usando MACs aleatorias. El pool de IPs se agota y los hosts legítimos no pueden obtener dirección IP.',
                                     en: 'The attacker floods the DHCP server with fake DISCOVER packets using random MACs. The IP pool is exhausted and legitimate hosts cannot obtain an IP address.' },
      'udp.demo.dhcp.panel.config': "⚙️ Attack configuration",
      'udp.demo.dhcp.label.server': "DHCP server:",
      'udp.demo.dhcp.label.pool': "Pool size:",
      'udp.demo.dhcp.label.rate': "DISCOVER rate:",
      'udp.demo.dhcp.btn': "☠️ Simulate Starvation",
      'udp.demo.dhcp.panel.log': "📡 DHCP server log",
      'udp.s1.title': "What is UDP?",
      'udp.s1.sub': "The connectionless transport protocol",
      'udp.s1.when.title': "When to use UDP?",
      'udp.s1.w1': "🎮 <strong>Gaming / VoIP / streaming</strong> — latency matters more than packet loss",
      'udp.s1.w2':       { es: '🔍 <strong>DNS</strong> — query/response rápido; TCP solo para zone transfers',
                          en: '🔍 <strong>DNS</strong> — fast query/response; TCP only for zone transfers' },
      'udp.s1.w3': "⏱️ <strong>NTP</strong> — time synchronization; one packet is enough",
      'udp.s1.w4': "📡 <strong>DHCP / SNMP / Syslog / TFTP</strong> — simple protocols that do not need guarantees",
      'udp.s1.w5': "🚀 <strong>HTTP/3 (QUIC)</strong> — UDP with reliability implemented at the application layer",
      'udp.s2.title': "UDP Header — 8 bytes",
      'udp.s2.sub': "The simplest header in the TCP/IP stack",
      'udp.s2.callout':  { es: '<strong>Sin estado:</strong> UDP no mantiene ninguna tabla de conexiones. Cada datagrama es independiente. Esto lo hace ideal para el spoofing de IP de origen.',
                          en: '<strong>Stateless:</strong> UDP maintains no connection table. Each datagram is independent. This makes it ideal for source IP spoofing.' },
      'udp.s3.title': "TCP vs UDP — Comparison table",
      'udp.s3.sub': "When each one is the right choice",
      'udp.s3.feat': "Feature",
      'udp.s3.conn': "Connection",
      'udp.s3.delivery': "Guaranteed delivery",
      'udp.s3.order': "Packet ordering",
      'udp.s3.speed': "Speed",
      'udp.s3.overhead': "Overhead",
      'udp.s3.spoof': "IP Spoofing",
      'udp.s3.ddos': "DDoS risk",
      'udp.s3.use': "Typical use",
      'udp.s4.title': "Attack 1: UDP Flood",
      'udp.s4.sub': "Direct volumetric DDoS",
      'udp.s4.p1': "The attacker sends a flood of UDP datagrams to random ports of the target. Since there is no connection state, <strong>there is no SYN-cookie equivalent defense</strong>. The server:",
      'udp.s4.s1': "Receives the datagram on port X",
      'udp.s4.s2':       { es: 'Verifica si hay servicio escuchando en X', en: 'Checks if a service is listening on X' },
      'udp.s4.s3': "Generates ICMP \"Port Unreachable\" response → consumes CPU and bandwidth",
      'udp.s4.s4': "Repeats for the next 10,000 packets/second",
      'udp.s4.impact': "Impact:",
      'udp.s5.title': "Attack 2: UDP Amplification",
      'udp.s5.sub': "Turning 1 Mbps into 556 Mbps",
      'udp.s5.callout':  { es: '<strong>Con Memcached:</strong> 1 Mbps de ataque → 51 Gbps hacia la víctima. El ataque GitHub de 2018 alcanzó <strong>1.35 Tbps</strong> usando reflectores Memcached.',
                          en: '<strong>With Memcached:</strong> 1 Mbps attack → 51 Gbps at the victim. The 2018 GitHub attack reached <strong>1.35 Tbps</strong> using Memcached reflectors.' },
      'udp.s6.title': "Attack 3: UDP Port Scan",
      'udp.s6.sub': "UDP service reconnaissance — slower but necessary",
      'udp.s6.p1':       { es: 'El escaneo UDP es más difícil que TCP porque no hay respuesta para puertos abiertos.',
                          en: 'UDP scanning is harder than TCP because there is no response for open ports.' },
      'udp.s6.r1':       { es: '🟢 <strong>Puerto abierto</strong>: el servicio responde',   en: '🟢 <strong>Open port</strong>: the service responds' },
      'udp.s6.r2': "❓ <strong>Open but no response</strong>: service ignores the datagram",
      'udp.s6.r3': "🔴 <strong>Closed port</strong>: OS responds ICMP \"Port Unreachable\"",
      'udp.s6.r4':       { es: '🟡 <strong>Puerto filtrado</strong>: no hay respuesta', en: '🟡 <strong>Filtered port</strong>: no response (firewall silently drops)' },
      'udp.s6.ioc': "IOC:",
      'udp.s7.title': "UDP in SOC telemetry",
      'udp.s7.sub': "Zeek + Suricata + NetFlow",
      'udp.s8.title': "Detection and mitigation",
      'udp.s8.sub': "Operational summary for SOC",
      'udp.s8.m1': "Disable NTP monlist",
      'udp.s8.m2': "BCP38 / uRPF",
      'udp.s8.m3': "ICMP unreachable rate limiting",
      'udp.s8.m4': "Anycast + scrubbing",
      'udp.s8.m5': "Border ACLs",
      'udp.s8.m6': "NetFlow baseline",
      'udp.s8.sigma': "Sigma Rule — UDP Flood Detection:",
      'udp.ej1.title': "UDP or TCP — which would you use?",
      'udp.ej1.q': "For each scenario, justify whether you would use UDP or TCP and why:",
      'udp.ej1.s1':      { es: 'Transferencia de un archivo de configuración de 5 MB', en: 'Transfer of a 5 MB configuration file' },
      'udp.ej1.s2': "Live video streaming for 10,000 viewers",
      'udp.ej1.s3': "Time synchronization between datacenter servers",
      'udp.ej1.s4': "User login in a banking app",
      'udp.ej1.s5': "Sending syslog logs from 500 devices to a SIEM",
      'udp.ej2.title': "Why is amplification so effective?",
      'udp.ej2.q':       { es: 'Explicá el mecanismo de la amplificación UDP paso a paso, usando NTP monlist como ejemplo.',
                          en: 'Explain the UDP amplification mechanism step by step, using NTP monlist as an example.' },
      'udp.ej3.title': "Log analysis — identify the UDP attack",
      'udp.ej3.q': "Analyze these Zeek and NetFlow extracts. For each, identify the type of activity and whether it is malicious:",
      'udp.ej4.title': "How to detect if your NTP server is a reflector",
      'udp.ej4.q':       { es: 'Un compañero de trabajo dice "nuestro servidor NTP tiene picos de CPU". ¿Cómo verificás si está siendo usado como reflector?', en: 'A colleague says "our NTP server has CPU spikes". How do you verify if it is being used as a reflector?' },
      'udp.ej5.title': "Write Suricata rule — UDP amplification",
      'udp.ej5.q': "Write Suricata rules to detect: (1) inbound UDP Flood, (2) your server being used as an NTP reflector, (3) UDP port scan from the internal network.",
      'udp.challenge.title': "Incident #UDP-001: \"The attack that didn't come from where it seemed\"",
      'udp.challenge.q': "What happened? How do you respond and prevent it?",
      'udp.challenge.ctx':   { es: 'Las 14:30. El NOC reporta que el servidor de producción (45.33.32.156) está recibiendo 8.3 Gbps de tráfico UDP/123 entrante desde cientos de servidores NTP legítimos en todo el mundo.',
                              en: '14:30. The NOC reports that the production server (45.33.32.156) is receiving 8.3 Gbps of inbound UDP/123 traffic from hundreds of legitimate NTP servers worldwide.' },
    'udp.cmp.conn': "✗ Connectionless",
    'udp.cmp.delivery': "✓ ACK + retransmission",
    'udp.cmp.order': "✗ No ordering",
    'udp.cmp.slow': "Slower",
    'udp.cmp.fast': "Faster",
    'udp.cmp.spoof': "Hard (ACK required)",
    'udp.cmp.ddos': "UDP Flood + Amplification",
    'udp.ch.r1a': "Thousands of UDP S0 to same dst, random ports",
    'udp.ch.r2a': "UDP/123 with orig_bytes &gt;1000 outbound",
    'udp.ch.r2c': "Disable monlist, ACL",
    'udp.ch.r3a': "Massive inbound UDP/123 from NTP IPs",
    'udp.ch.r3b': "NTP amplification victim",
    'udp.ch.r4a': "UDP from one src to many dst_ports",
    'udp.ch.r4c': "Alert, investigate the source",
    'udp.ch.r5a': "Mass outbound ICMP \"Port Unreachable\"",
    'udp.ch.r5b': "UDP Flood/scan in progress",
    'udp.ch.r5c': "Rate limit ICMP, analyze the source",
    'udp.ch.r6a': "UDP/1900 (SSDP) with a large response",
    'udp.ch.r6c': "Block SSDP from the Internet",
    'udp.ch.r7a': "UDP/11211 (Memcached) outbound traffic",
    'udp.ch.r7c': "Urgent: disable or apply ACL immediately",
    'udp.ch.r8a': "Many DHCP DISCOVER from different MACs",
    'udp.rec.rfc768': "Original UDP specification. Just 3 pages — the simplest protocol on the Internet.",
    'udp.rec.guide': "Guide to using UDP in applications: when it is appropriate and how to implement it well.",
    'udp.rec.ampfactors': "Up-to-date list of UDP protocols vulnerable to amplification with their factors.",
    'udp.rec.hping3': "hping3 — UDP generation",
    'udp.rec.zeek': "Zeek — UDP analysis",
    'udp.pre0': { es: `
 0      7 8     15 16    23 24    31
┌────────────────┬────────────────┐
│  Source Port   │   Dest Port    │  (2 + 2 bytes)
├────────────────┼────────────────┤
│    Length      │   Checksum     │  (2 + 2 bytes)
└────────────────┴────────────────┘
         ↓
     DATA (payload)

TCP header: 20–60 bytes
UDP header:       8 bytes   ← 10x más pequeña`, en: `
 0      7 8     15 16    23 24    31
┌────────────────┬────────────────┐
│  Source Port   │   Dest Port    │  (2 + 2 bytes)
├────────────────┼────────────────┤
│    Length      │   Checksum     │  (2 + 2 bytes)
└────────────────┴────────────────┘
         ↓
     DATA (payload)

TCP header: 20–60 bytes
UDP header:       8 bytes   ← 10x smaller` },
    'udp.pre1': { es: `
Atacante (1.1.1.1)                   Reflector NTP
     │                                    │
     │── Query NTP monlist (46 bytes) ───►│
     │   src=VÍCTIMA (203.0.113.1)        │  ← IP spoofed
     │                                    │
     │                     VÍCTIMA ◄──────│── Respuesta (25,564 bytes)
     │                                    │   Factor: 556x

FACTORES DE AMPLIFICACIÓN CONOCIDOS:
  DNS ANY query:    ~28x   (consulta 40B → respuesta 1,130B)
  NTP monlist:     ~556x   (consulta 46B → respuesta 25,564B)
  SSDP:             ~30x
  Memcached:    ~51,000x   (¡el más peligroso!)
  CharGen:         ~358x
  QOTD:             ~60x`, en: `
Attacker (1.1.1.1)                   NTP Reflector
     │                                    │
     │── NTP monlist query (46 bytes) ───►│
     │   src=VICTIM (203.0.113.1)         │  ← spoofed IP
     │                                    │
     │                     VICTIM ◄───────│── Response (25,564 bytes)
     │                                    │   Factor: 556x

KNOWN AMPLIFICATION FACTORS:
  DNS ANY query:    ~28x   (query 40B → response 1,130B)
  NTP monlist:     ~556x   (query 46B → response 25,564B)
  SSDP:             ~30x
  Memcached:    ~51,000x   (the most dangerous!)
  CharGen:         ~358x
  QOTD:             ~60x` },
    'udp.pre2': { es: `
# Zeek conn.log — tráfico UDP normal (DNS)
ts=10:01:05  proto=udp  orig=192.168.1.100:54321
resp=8.8.8.8:53  orig_bytes=42  resp_bytes=78
conn_state=SF   # UDP: SF=ambos lados enviaron datos

# Zeek — UDP Flood (muchos datagramas, sin respuesta)
ts=10:05:00  proto=udp  orig=1.2.3.4:random
resp=10.0.0.5:random  orig_bytes=512  resp_bytes=0
conn_state=S0   ← sin respuesta (ICMP unreachable no registrado como resp)
... × 10,000 en 1s

# Zeek — Amplificación NTP (respuesta >> request)
ts=10:07:01  proto=udp  orig=ntp-server:123
resp=VÍCTIMA:random  orig_bytes=25564  resp_bytes=0
# El orig_bytes enorme desde NTP = amplificación en curso

# Suricata — NTP Amplificación
alert udp $EXTERNAL_NET 123 -> $HOME_NET any (
  msg:"ET DOS NTP Monlist Response Amplification";
  byte_test:1,>,5,0;
  threshold: type both, track by_src, count 5, seconds 1;
  classtype:denial-of-service; sid:2100400;)`, en: `
# Zeek conn.log — normal UDP traffic (DNS)
ts=10:01:05  proto=udp  orig=192.168.1.100:54321
resp=8.8.8.8:53  orig_bytes=42  resp_bytes=78
conn_state=SF   # UDP: SF=both sides sent data

# Zeek — UDP Flood (many datagrams, no response)
ts=10:05:00  proto=udp  orig=1.2.3.4:random
resp=10.0.0.5:random  orig_bytes=512  resp_bytes=0
conn_state=S0   ← no response (ICMP unreachable not logged as resp)
... × 10,000 in 1s

# Zeek — NTP Amplification (response >> request)
ts=10:07:01  proto=udp  orig=ntp-server:123
resp=VICTIM:random  orig_bytes=25564  resp_bytes=0
# The huge orig_bytes from NTP = amplification in progress

# Suricata — NTP Amplification
alert udp $EXTERNAL_NET 123 -> $HOME_NET any (
  msg:"ET DOS NTP Monlist Response Amplification";
  byte_test:1,>,5,0;
  threshold: type both, track by_src, count 5, seconds 1;
  classtype:denial-of-service; sid:2100400;)` },
    'udp.pre3': { es: `
MECANISMO:
  Payload enviado al Memcached (15 bytes):
    stats

  Respuesta Memcached (hasta 750,000 bytes):
    STAT pid 12345
 STAT uptime 3600
 ... (miles de líneas)

FACTOR DE AMPLIFICACIÓN: ×51,200x (en casos reales reportados)
ANCHO DE BANDA TÍPICO:
  1,000 servers × 750 KB × 8 bits = 6 Tbps sobre la víctima

COMANDO (shodan + exploit):
  shodan search "port:11211 product:Memcached"  → encontrar targets
  echo -e "stats
" | nc -u TARGET 11211
  # Spoofear IP origen = víctima para redirigir tráfico

DETECCIÓN:
  Netflow: UDP port 11211, respuestas >>requests (ratio anómalo)
  Zeek: conn.log, bytes enviados vs recibidos
  Shodan Monitor: alerta si tu IP aparece como Memcached expuesto

MITIGACIÓN:
  Deshabilitar UDP en Memcached: --listen=127.0.0.1 -U 0
  Firewall: bloquear port 11211 externamente
  Nunca exponer Memcached a Internet (solo localhost o VPN)`, en: `
MECHANISM:
  Payload sent to Memcached (15 bytes):
    stats

  Memcached response (up to 750,000 bytes):
    STAT pid 12345
 STAT uptime 3600
 ... (thousands of lines)

AMPLIFICATION FACTOR: ×51,200x (in reported real-world cases)
TYPICAL BANDWIDTH:
  1,000 servers × 750 KB × 8 bits = 6 Tbps on the victim

COMMAND (shodan + exploit):
  shodan search "port:11211 product:Memcached"  → find targets
  echo -e "stats
" | nc -u TARGET 11211
  # Spoof source IP = victim to redirect the traffic

DETECTION:
  Netflow: UDP port 11211, responses >>requests (anomalous ratio)
  Zeek: conn.log, bytes sent vs received
  Shodan Monitor: alert if your IP appears as exposed Memcached

MITIGATION:
  Disable UDP on Memcached: --listen=127.0.0.1 -U 0
  Firewall: block port 11211 externally
  Never expose Memcached to the Internet (only localhost or VPN)` },
    'udp.pre4': { es: `
MECANISMO:
  M-SEARCH request (110 bytes) → enviado a dispositivo UPnP
  Respuesta XML (~400 bytes) → redirigida a víctima (IP spoofed)

  REQUEST:
    M-SEARCH * HTTP/1.1
    HOST: 239.255.255.250:1900
    MAN: "ssdp:discover"
    ST: ssdp:all
    MX: 1

  RESPUESTA (ejemplo):
    HTTP/1.1 200 OK
    CACHE-CONTROL: max-age=1800
    LOCATION: http://192.168.1.1:49152/rootDesc.xml
    USN: uuid:device-UUID::upnp:rootdevice
    SERVER: Linux/2.6 UPnP/1.0 MiniUPnPd/1.9

FACTOR: ×30-75x
VECTORES CONOCIDOS: routers domésticos, smart TVs, cámaras IP, NAS

ESCANEO + EXPLOIT:
  masscan -p1900 --rate 10000 0.0.0.0/0 -oL ssdp_devices.txt
  python3 ssdp_amp.py --victims ssdp_devices.txt --target VICTIM_IP

DETECCIÓN:
  Netflow: UDP src port 1900, respuestas desde múltiples IPs
  Volumen anómalo de tráfico UDP hacia una única IP destino
  IDS: regla para respuestas SSDP fuera de red local

MITIGACIÓN:
  Deshabilitar UPnP en routers (especialmente la interfaz WAN)
  Firewall: bloquear UDP port 1900 hacia/desde Internet
  ISP: BCP38 para evitar spoofing en redes de origen`, en: `
MECHANISM:
  M-SEARCH request (110 bytes) → sent to a UPnP device
  XML response (~400 bytes) → redirected to the victim (spoofed IP)

  REQUEST:
    M-SEARCH * HTTP/1.1
    HOST: 239.255.255.250:1900
    MAN: "ssdp:discover"
    ST: ssdp:all
    MX: 1

  RESPONSE (example):
    HTTP/1.1 200 OK
    CACHE-CONTROL: max-age=1800
    LOCATION: http://192.168.1.1:49152/rootDesc.xml
    USN: uuid:device-UUID::upnp:rootdevice
    SERVER: Linux/2.6 UPnP/1.0 MiniUPnPd/1.9

FACTOR: ×30-75x
KNOWN VECTORS: home routers, smart TVs, IP cameras, NAS

SCAN + EXPLOIT:
  masscan -p1900 --rate 10000 0.0.0.0/0 -oL ssdp_devices.txt
  python3 ssdp_amp.py --victims ssdp_devices.txt --target VICTIM_IP

DETECTION:
  Netflow: UDP src port 1900, responses from multiple IPs
  Anomalous volume of UDP traffic toward a single destination IP
  IDS: rule for SSDP responses outside the local network

MITIGATION:
  Disable UPnP on routers (especially the WAN interface)
  Firewall: block UDP port 1900 to/from the Internet
  ISP: BCP38 to prevent spoofing on source networks` },
    'udp.pre5': { es: `
# Extracto A — Zeek conn.log (15 segundos de tráfico)
proto=udp, orig=10.0.0.100, resp=8.8.8.8:53, S=SF, bytes=42/78 × 450
proto=udp, orig=10.0.0.100, resp=1.1.1.1:53, S=SF, bytes=40/95 × 380

# Extracto B — NetFlow (10 segundos)
src=VARIED(230 IPs distintas)  dst=10.0.0.10  dport=VARIED(random)
proto=UDP  bytes_avg=512  packets=185,000  bandwidth=75 Mbps

# Extracto C — Zeek conn.log
proto=udp, orig=198.51.100.1:123, resp=10.0.0.20:49821
orig_bytes=25564  resp_bytes=0  conn_state=SF  × 3,200 flujos/s

# Extracto D — Zeek conn.log
proto=udp, orig=192.168.1.99  resp=192.168.1.50:multiple_ports
conn_state=S0  × 450 puertos distintos en 60s`, en: `
# Excerpt A — Zeek conn.log (15 seconds of traffic)
proto=udp, orig=10.0.0.100, resp=8.8.8.8:53, S=SF, bytes=42/78 × 450
proto=udp, orig=10.0.0.100, resp=1.1.1.1:53, S=SF, bytes=40/95 × 380

# Excerpt B — NetFlow (10 seconds)
src=VARIED(230 different IPs)  dst=10.0.0.10  dport=VARIED(random)
proto=UDP  bytes_avg=512  packets=185,000  bandwidth=75 Mbps

# Excerpt C — Zeek conn.log
proto=udp, orig=198.51.100.1:123, resp=10.0.0.20:49821
orig_bytes=25564  resp_bytes=0  conn_state=SF  × 3,200 flows/s

# Excerpt D — Zeek conn.log
proto=udp, orig=192.168.1.99  resp=192.168.1.50:multiple_ports
conn_state=S0  × 450 different ports in 60s` },
    'udp.pre6': { es: `
Zeek conn.log (último minuto):
  proto=udp, src=multiple_NTP_servers:123, dst=45.33.32.156:random
  orig_bytes=25,564 (NTP monlist response)
  resp_bytes=0
  flujos: 324,000/minuto
  bandwidth_inbound: 8.3 Gbps

NetFlow upstream:
  Los servidores NTP son legítimos (AS verificados, no spoofed)
  NO hay un único atacante visible`, en: `
Zeek conn.log (last minute):
  proto=udp, src=multiple_NTP_servers:123, dst=45.33.32.156:random
  orig_bytes=25,564 (NTP monlist response)
  resp_bytes=0
  flows: 324,000/minute
  bandwidth_inbound: 8.3 Gbps

NetFlow upstream:
  The NTP servers are legitimate (verified ASes, not spoofed)
  There is NO single visible attacker` },
    'udp.pre7': "# UDP Flood (educational / own lab)\nhping3 --udp -p 53 --flood target\n\n# UDP with a specific size\nhping3 --udp -p 80 -d 1400 target\n\n# Check whether NTP has monlist\nntpdc -n -c monlist NTP_SERVER",
    'udp.pre8': "nmap -sU target         # UDP scan (slow)\nnmap -sU -p 53,123,161,500 target  # specific ports\nnmap -sU --top-ports 20 target     # top 20 UDP\n\n# Detect NTP reflectors (lab)\nnmap -sU -p 123 --script ntp-monlist target",
    'udp.pre9': { es: `# Top destinos UDP (flood detection)
zeek-cut proto id.resp_h id.resp_p &lt; conn.log \\
  | awk '$1=="udp"' | sort | uniq -c | sort -rn | head

# Amplificación: resp_bytes >> orig_bytes desde UDP/123
zeek-cut proto id.orig_h id.orig_p orig_bytes resp_bytes &lt; conn.log \\
  | awk '$1=="udp" && $3=="123" && $4>1000'`, en: `# Top UDP destinations (flood detection)
zeek-cut proto id.resp_h id.resp_p &lt; conn.log \\
  | awk '$1=="udp"' | sort | uniq -c | sort -rn | head

# Amplification: resp_bytes >> orig_bytes from UDP/123
zeek-cut proto id.orig_h id.orig_p orig_bytes resp_bytes &lt; conn.log \\
  | awk '$1=="udp" && $3=="123" && $4>1000'` },
    'udp.opt16': "50 IPs (/26 — small network)",
    'udp.opt17': "254 IPs (/24 — typical network)",
    'udp.opt18': "1000 req/s (aggressive)",
    'udp.opt19': "500 devices",
    'udp.opt1': "64 bytes (minimum)",
    'udp.opt2': "1472 bytes (max without frag)",
    'udp.opt3': "65507 bytes (UDP maximum)",
    'udp.opt4': "1 Mbps (home connection)",
    'udp.opt5': "10 Mbps (basic VPS)",
    'udp.opt6': "Top 20 UDP ports (fast)",
    'udp.opt7': "Common services (DNS/NTP/DHCP/SNMP...)",
    'udp.opt8': "Wide range (1-1024) — slow",
    'udp.opt9': "Slow — stealthy (avoids ICMP rate-limit)",
    'udp.opt10': "Fast — triggers SOC alerts",
    'udp.opt11': "100 servers",
    'udp.opt12': "1,000 servers",
    'udp.opt13': "10,000 servers",
    'udp.opt14': "5,000 devices (typical)",
    'udp.opt15': "50,000 devices (campaign)",
    'udp.demo.memc.title': "🗄️ Demo: Memcached Amplification DDoS",
    'udp.demo.memc.desc':    { es: 'Memcached expuesto en UDP puede amplificar tráfico ×51,000x. El mayor DDoS registrado (1.7 Tbps en 2018) usó esta técnica.', en: 'Memcached exposed on UDP can amplify traffic ×51,000x. The largest recorded DDoS (1.7 Tbps in 2018) used this technique.' },
    'udp.demo.memc.panel': "Configure attack",
    'udp.demo.memc.victim': "Victim IP (spoofed):",
    'udp.demo.memc.servers': "Exposed Memcached servers:",
    'udp.demo.memc.btn': "▶ Simulate Memcached Amp.",
    'udp.demo.memc.result': "Attack flow",
    'udp.demo.ssdp.title': "📡 Demo: SSDP Amplification DDoS",
    'udp.demo.ssdp.desc':    { es: 'SSDP (Simple Service Discovery Protocol) usado por UPnP. Dispositivos IoT y routers domésticos responden M-SEARCH con ×75x más datos.', en: 'SSDP (Simple Service Discovery Protocol) used by UPnP. IoT devices and home routers respond to M-SEARCH with ×75x more data.' },
    'udp.demo.ssdp.panel': "Configure attack",
    'udp.demo.ssdp.victim': "Victim IP (spoofed):",
    'udp.demo.ssdp.devices': "Exposed UPnP devices:",
    'udp.demo.ssdp.btn': "▶ Simulate SSDP Amp.",
    'udp.demo.ssdp.result': "Attack flow",
    'udp.s9.title': "Attack 5: Memcached Amplification DDoS",
    'udp.s9.sub': "Amplification factor ×51,000x — the largest on record",
    'udp.s9.p1':     { es: 'Memcached es un sistema de caché en memoria. Si está expuesto en UDP (puerto 11211), un request de 15 bytes puede generar una respuesta de hasta 750 KB. En 2018, GitHub recibió 1.7 Tbps usando esta técnica.', en: 'Memcached is an in-memory caching system. If exposed on UDP (port 11211), a 15-byte request can generate a response of up to 750 KB. In 2018, GitHub received 1.7 Tbps using this technique.' },
    'udp.s10.title': "Attack 6: SSDP Amplification DDoS",
    'udp.s10.sub': "IoT and UPnP devices as DDoS attack reflectors",
    'udp.s10.p1':    { es: 'SSDP es parte de UPnP. Los dispositivos IoT, routers y smart TVs responden a M-SEARCH con descripciones XML completas. Un request de ~110 bytes genera una respuesta de ~400 bytes (×75x) redirigida a la víctima.', en: 'SSDP is part of UPnP. IoT devices, routers and smart TVs respond to M-SEARCH with full XML descriptions. A ~110 byte request generates a ~400 byte response (×75x) redirected to the victim.' },
    'udp.s1.p1': { es: 'UDP (User Datagram Protocol) es el protocolo de capa de transporte diseñado para velocidad sobre confiabilidad. No establece conexión, no garantiza entrega, no ordena paquetes.', en: 'UDP (User Datagram Protocol) is the transport layer protocol designed for speed over reliability. It does not establish connections, does not guarantee delivery, and does not order packets.' },
      'udp.ej6.title': "Memcached Amplification: ×51,000x",
      'udp.ej6.q': { es: 'Memcached por UDP tiene el factor de amplificación más alto conocido (×51.000x). ¿Cómo funciona el ataque? ¿Por qué no debería estar en UDP? Si encontrás un Memcached expuesto en el SOC, ¿qué hacés? ¿Cómo lo verificás con nmap?', en: 'Memcached over UDP has the highest known amplification factor (×51,000x). How does the attack work? Why should it not use UDP? If you find an exposed Memcached in the SOC, what do you do? How do you verify with nmap?' },
      'udp.ej6.ans': { es: 'CÓMO FUNCIONA:\n1. Request UDP spoofed → respuesta MB → ×51.000x\n2. Caso real: GitHub 2018 — 1.35 Tbps\n\nACCIONES SOC:\n  Firewall: bloquear UDP/11211 INMEDIATAMENTE\n  Reiniciar con: memcached -U 0\n\nVERIFICACIÓN:\n  nmap -sU -p 11211 --script memcached-info [target]', en: 'HOW IT WORKS:\n1. Spoofed UDP request → MB response → ×51,000x\n2. Real case: GitHub 2018 — 1.35 Tbps\n\nSOC ACTIONS:\n  Firewall: block UDP/11211 IMMEDIATELY\n  Restart with: memcached -U 0\n\nVERIFICATION:\n  nmap -sU -p 11211 --script memcached-info [target]' },
      'udp.ej7.title': "SSDP: identify vulnerable routers on the network",
      'udp.ej7.q': { es: 'SSDP (UPnP) permite autodescubrimiento de dispositivos. ¿Cómo lo usa un atacante para amplificación? ¿Qué dispositivos son vulnerables? ¿Cómo identificarías reflectores SSDP en la red corporativa? ¿Qué política aplicarías?', en: 'SSDP (UPnP) enables device autodiscovery. How does an attacker use it for amplification? What devices are vulnerable? How would you identify SSDP reflectors on the corporate network? What policy would you apply?' },
      'udp.ej7.ans': { es: 'AMPLIFICACIÓN: M-SEARCH request (~35b) → lista de servicios → ×30x\nDispositivos: routers hogareños, IoT, Smart TVs\n\nDETECCIÓN:\n  nmap -sU -p 1900 --script upnp-info 192.168.0.0/24\n  Zeek: udp dst_port 1900 hacia internet\n\nPOLÍTICA:\n  Bloquear UDP/1900 hacia internet en el perimeter\n  Deshabilitar UPnP en routers corporativos\n  VLAN separada para IoT', en: 'AMPLIFICATION: M-SEARCH request (~35b) → services list → ×30x\nDevices: home routers, IoT, Smart TVs\n\nDETECTION:\n  nmap -sU -p 1900 --script upnp-info 192.168.0.0/24\n  Zeek: udp dst_port 1900 to internet\n\nPOLICY:\n  Block UDP/1900 to internet at perimeter\n  Disable UPnP on corporate routers\n  Separate IoT VLAN' },
      'udp.rec.memcached.cve': "Memcached exposed on UDP port 11211. Enabled the 1.35 Tbps attack against GitHub (February 2018). Factor ×51,000x.",
      'udp.rec.ntp.cve': "NTP monlist command returns up to 600 hosts without authentication. Factor ×556x. Was the dominant amplification vector in 2013-2014.",
      'udp.rec.github': "The largest DDoS ever recorded at the time. Used Memcached as amplifier. GitHub mitigated in 10 minutes with Prolexic/Akamai.",
      'udp.rec.t1498': { es: 'DNS, NTP, Memcached, SSDP — todos los vectores de amplificación UDP en MITRE.', en: 'DNS, NTP, Memcached, SSDP — all UDP amplification vectors in MITRE.' },
      'udp.rec.t1557': "DHCP Starvation and Rogue DHCP server attacks for MitM.",
      'udp.rec.bcp38': "Standard for ISPs to filter traffic with spoofed IPs. Fundamental mitigation against UDP amplification.",
      'udp.rec.cf': "Cloudflare technical explanation with updated amplification factors for DNS, NTP, SSDP, Memcached.",
});
