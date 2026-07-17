/* ============================================================
   tcp/app.js — Demo Lab: TCP
   Protocolos Red SOC · @xavimape
   Demos: 1) Three-Way Handshake
          2) SYN Flood visualizer
          3) Port Scan simulator
   ============================================================ */

'use strict';

const tcpDemo = (function () {
  function createLogger(id) { const el=document.getElementById(id); return el ? SOC.createLogger(el) : { log: async()=>{}, clear:()=>{} }; }
  const rand    = SOC.rand;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;


  // ─── Generadores de números aleatorios ────────────────────────
  const randSeq = () => rand(1000, 65000);
  const randPort = () => rand(49152, 65535);

  // ─── Demo 1: Three-Way Handshake ──────────────────────────────

  const PORT_SERVICES = {
    '80':   'HTTP',
    '443':  'HTTPS/TLS',
    '22':   'SSH',
    '3389': 'RDP',
    '445':  'SMB',
  };

  async function runHandshake() {
    const src  = document.getElementById('tcp-src').value.trim() || '192.168.1.100';
    const dst  = document.getElementById('tcp-dst').value.trim() || '93.184.216.34';
    const port = document.getElementById('tcp-port').value;
    const svc  = PORT_SERVICES[port] || 'unknown';
    const out  = document.getElementById('tcp-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const srcPort = randPort();
    const seqC    = randSeq();   // sequence number del cliente
    const seqS    = randSeq();   // sequence number del servidor

    await L.log(t(`── Estableciendo conexión TCP ───────────────────`, `── Establishing TCP connection ──────────────────`), 'muted', 0);
    await L.log(`   ${src}:${srcPort} → ${dst}:${port} (${svc})`, 'muted', 100);
    await L.log('', 'muted', 200);

    // [1] SYN
    await L.log(`[1] SYN ──────────────────────────────────────────`, 'info', 0);
    await L.log(`   ${src}:${srcPort}  →→→  ${dst}:${port}`, 'info', 100);
    await L.log(`   Flags: SYN=1  Seq=${seqC}  Ack=0  Win=65535`, 'muted', 100);
    await L.log(t(`   Estado cliente: SYN_SENT`, `   Client state: SYN_SENT`), 'warning', 100);
    await L.log('', 'muted', 300);

    // [2] SYN-ACK
    await L.log(`[2] SYN-ACK ──────────────────────────────────────`, 'info', 0);
    await L.log(`   ${dst}:${port}  →→→  ${src}:${srcPort}`, 'info', 100);
    await L.log(`   Flags: SYN=1 ACK=1  Seq=${seqS}  Ack=${seqC + 1}`, 'muted', 100);
    await L.log(t(`   Estado servidor: SYN_RECEIVED`, `   Server state: SYN_RECEIVED`), 'warning', 100);
    await L.log('', 'muted', 300);

    // [3] ACK
    await L.log(`[3] ACK ──────────────────────────────────────────`, 'success', 0);
    await L.log(`   ${src}:${srcPort}  →→→  ${dst}:${port}`, 'success', 100);
    await L.log(`   Flags: ACK=1  Seq=${seqC + 1}  Ack=${seqS + 1}`, 'muted', 100);
    await L.log('', 'muted', 300);

    await L.log(t(`✓ CONEXIÓN ESTABLECIDA — ESTABLISHED`, `✓ CONNECTION ESTABLISHED — ESTABLISHED`), 'success', 0);
    await L.log(`  ${src}:${srcPort} ⟺ ${dst}:${port}`, 'success', 100);
    await L.log('', 'muted', 200);

    // DATA
    await L.log(t(`── Transferencia de datos ───────────────────────`, `── Data transfer ────────────────────────────────`), 'muted', 0);
    await L.log(`   PSH-ACK: request ${svc} (${rand(200, 1500)} bytes)`, 'muted', 200);
    await L.log(`   PSH-ACK: response ${svc} (${rand(2000, 12000)} bytes)`, 'muted', 300);
    await L.log('', 'muted', 200);

    // FIN
    await L.log(t(`── Cierre de conexión (4-way FIN) ───────────────`, `── Connection teardown (4-way FIN) ──────────────`), 'muted', 0);
    await L.log(t(`   FIN-ACK → servidor`, `   FIN-ACK → server`), 'muted', 200);
    await L.log(t(`   ACK     ← servidor`, `   ACK     ← server`), 'muted', 100);
    await L.log(t(`   FIN-ACK ← servidor`, `   FIN-ACK ← server`), 'muted', 100);
    await L.log(t(`   ACK     → servidor`, `   ACK     → server`), 'muted', 100);
    await L.log(t(`✓ CONEXIÓN CERRADA — TIME_WAIT → CLOSED`, `✓ CONNECTION CLOSED — TIME_WAIT → CLOSED`), 'success', 100);
    await L.log('', 'muted', 100);
    await L.log(`Zeek conn.log: state=SF  orig_bytes=~${rand(200,1500)}  resp_bytes=~${rand(2000,12000)}`, 'muted', 0);
  }

  // ─── Demo 2: SYN Flood ────────────────────────────────────────

  async function runSYNFlood() {
    const target = document.getElementById('syn-target').value.trim() || '10.0.0.1';
    const rate   = parseInt(document.getElementById('syn-rate').value);
    const out    = document.getElementById('syn-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const backlogMax = 128;
    let   backlogUsed = 0;
    const rateLabel = rate >= 100000 ? '100,000' : rate.toLocaleString();

    await L.log(`── SYN Flood → ${target}:80/443 ──────────────────`, 'danger', 0);
    await L.log(t(`   Tasa de ataque: ${rateLabel} SYN/s con IPs spoofed`, `   Attack rate: ${rateLabel} SYN/s with spoofed IPs`), 'danger', 100);
    await L.log(t(`   SYN cookies: DESACTIVADAS`, `   SYN cookies: DISABLED`), 'danger', 100);
    await L.log(t(`   TCP backlog máx: ${backlogMax} conexiones`, `   TCP backlog max: ${backlogMax} connections`), 'warning', 100);
    await L.log('', 'muted', 400);

    // Simular llenado del backlog
    const steps = Math.min(6, backlogMax);
    for (let i = 1; i <= steps; i++) {
      const fill = Math.round((i / steps) * 100);
      backlogUsed = Math.round((i / steps) * backlogMax);
      const pct  = '█'.repeat(Math.round(fill / 10)) + '░'.repeat(10 - Math.round(fill / 10));
      const ip   = `${rand(1,254)}.${rand(1,254)}.${rand(1,254)}.${rand(1,254)}`;
      const type = fill < 60 ? 'warning' : 'danger';
      await L.log(t(`   SYN de ${ip}:${randPort()} → backlog [${pct}] ${backlogUsed}/${backlogMax}`, `   SYN from ${ip}:${randPort()} → backlog [${pct}] ${backlogUsed}/${backlogMax}`), type, 250);
    }

    await L.log('', 'muted', 200);

    if (rate >= 10000) {
      await L.log(t(`🚨 BACKLOG SATURADO — ${backlogMax}/${backlogMax} entradas semi-abiertas`, `🚨 BACKLOG SATURATED — ${backlogMax}/${backlogMax} half-open entries`), 'danger', 0);
      await L.log(t(`   El servidor NO puede aceptar nuevas conexiones legítimas`, `   The server CANNOT accept new legitimate connections`), 'danger', 200);
      await L.log(t(`   CPU softirq: ${rand(70,98)}%  (procesando paquetes SYN)`, `   CPU softirq: ${rand(70,98)}%  (processing SYN packets)`), 'danger', 200);
      await L.log(t(`   Latencia TCP: ~${rand(8,20)}s  (usuarios reales expulsados)`, `   TCP latency: ~${rand(8,20)}s  (real users kicked out)`), 'danger', 200);
    } else {
      await L.log(t(`⚠️  Backlog llegando al límite — degradación de servicio`, `⚠️  Backlog reaching the limit — service degradation`), 'warning', 0);
      await L.log(t(`   Conexiones legítimas comienzan a fallar`, `   Legitimate connections start to fail`), 'warning', 200);
    }

    await L.log('', 'muted', 300);
    await L.log(t(`── Mitigación ───────────────────────────────────`, `── Mitigation ───────────────────────────────────`), 'muted', 0);
    await L.log(`   sysctl -w net.ipv4.tcp_syncookies=1`, 'success', 200);
    await L.log(t(`   → Sin reservar TCB: backlog siempre libre para legítimos`, `   → No TCB reserved: backlog always free for legitimate ones`), 'success', 100);

    if (rate >= 100000) {
      await L.log(t(`   + Notificar ISP para null-routing upstream`, `   + Notify ISP for upstream null-routing`), 'success', 200);
      await L.log(t(`   + Activar scrubbing center / CDN DDoS protection`, `   + Enable scrubbing center / CDN DDoS protection`), 'success', 100);
    }
  }

  // ─── Demo 3: Port Scan ────────────────────────────────────────

  const PORTS_TOP20 = [
    { port: 21,   svc: 'FTP',        state: 'closed' },
    { port: 22,   svc: 'SSH',        state: 'open'   },
    { port: 23,   svc: 'Telnet',     state: 'closed' },
    { port: 25,   svc: 'SMTP',       state: 'filtered'},
    { port: 53,   svc: 'DNS',        state: 'open'   },
    { port: 80,   svc: 'HTTP',       state: 'open'   },
    { port: 110,  svc: 'POP3',       state: 'closed' },
    { port: 135,  svc: 'RPC',        state: 'closed' },
    { port: 139,  svc: 'NetBIOS',    state: 'closed' },
    { port: 143,  svc: 'IMAP',       state: 'closed' },
    { port: 443,  svc: 'HTTPS',      state: 'open'   },
    { port: 445,  svc: 'SMB',        state: 'filtered'},
    { port: 993,  svc: 'IMAPS',      state: 'closed' },
    { port: 995,  svc: 'POP3S',      state: 'closed' },
    { port: 1723, svc: 'PPTP',       state: 'closed' },
    { port: 3306, svc: 'MySQL',      state: 'open'   },
    { port: 3389, svc: 'RDP',        state: 'filtered'},
    { port: 5900, svc: 'VNC',        state: 'closed' },
    { port: 8080, svc: 'HTTP-Alt',   state: 'open'   },
    { port: 8443, svc: 'HTTPS-Alt',  state: 'closed' },
  ];

  const STATE_RESPONSE = {
    'open':     { resp: 'SYN-ACK', flag: '✓ OPEN    ', type: 'danger'  },
    'closed':   { resp: 'RST-ACK', flag: '✗ CLOSED  ', type: 'muted'   },
    'filtered': { resp: '(none)',   flag: '? FILTERED', type: 'warning' },
  };

  async function runPortScan() {
    const target = document.getElementById('scan-target').value.trim() || '192.168.1.50';
    const range  = document.getElementById('scan-range').value;
    const out    = document.getElementById('scan-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const ports = range === 'top20' ? PORTS_TOP20 :
                  range === 'top100' ? PORTS_TOP20.concat([
                    {port:8888,svc:'HTTP-Dev',state:'closed'},
                    {port:6379,svc:'Redis',state:'open'},
                    {port:27017,svc:'MongoDB',state:'filtered'},
                  ]) : PORTS_TOP20;

    const srcPort = randPort();
    await L.log(`── Nmap SYN scan → ${target} ──────────────────────`, 'warning', 0);
    await L.log(t(`   Modo: -sS (SYN stealth scan)`, `   Mode: -sS (SYN stealth scan)`), 'warning', 100);
    await L.log(t(`   Origen: ${rand(10,200)}.${rand(10,200)}.${rand(1,254)}.${rand(1,254)}:${srcPort}`, `   Source: ${rand(10,200)}.${rand(10,200)}.${rand(1,254)}.${rand(1,254)}:${srcPort}`), 'muted', 100);
    await L.log('', 'muted', 200);

    let openCount = 0;
    for (const { port, svc, state } of ports) {
      const r = STATE_RESPONSE[state];
      if (state === 'open') openCount++;
      const line = `   ${r.flag}  ${String(port).padStart(5)}/${svc.padEnd(10)}  ← ${r.resp}`;
      await L.log(line, r.type, 120);
    }

    await L.log('', 'muted', 200);
    await L.log(t(`── Resumen ───────────────────────────────────────`, `── Summary ───────────────────────────────────────`), 'muted', 0);
    await L.log(t(`   Puertos escaneados: ${ports.length}`, `   Ports scanned: ${ports.length}`), 'muted', 100);
    await L.log(t(`   Abiertos: ${openCount}   Filtrados: ${ports.filter(p=>p.state==='filtered').length}   Cerrados: ${ports.filter(p=>p.state==='closed').length}`, `   Open: ${openCount}   Filtered: ${ports.filter(p=>p.state==='filtered').length}   Closed: ${ports.filter(p=>p.state==='closed').length}`), 'warning', 100);
    await L.log('', 'muted', 100);
    await L.log(t(`── IOC en Zeek conn.log ─────────────────────────`, `── IOC in Zeek conn.log ─────────────────────────`), 'muted', 0);
    await L.log(t(`   ${ports.length} conexiones con conn_state=S0/REJ en <30s`, `   ${ports.length} connections with conn_state=S0/REJ in <30s`), 'danger', 100);
    await L.log(t(`   Origen único → ${ports.length} puertos distintos → PORT SCAN`, `   Single source → ${ports.length} distinct ports → PORT SCAN`), 'danger', 100);
    await L.log(`   Sigma: unique_dst_ports > 15 from same src in 60s`, 'warning', 100);
  }

  function reset() {
    document.getElementById('tcp-src').value  = '192.168.1.100';
    document.getElementById('tcp-dst').value  = '93.184.216.34';
    document.getElementById('tcp-port').value = '443';
    const out = document.getElementById('tcp-output');
    out.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando simulación TCP...</span></div>';
  }

  // ─── Demo 3: TCP Session Hijacking ─────────────────────────────

  async function runHijack() {
    const seq = parseInt(document.getElementById('hijack-seq').value) || 48291;
    const L = createLogger('hijack-output');
    L.clear();

    const victim = `10.0.0.${rand(10,50)}`;
    const server = `10.0.0.1`;
    const sport  = randPort();

    const difficulty = seq < 100000 ? t('FACIL (ISN predecible)','EASY (predictable ISN)') :
                       seq > 3000000000 ? t('DIFICIL (ISN alto)','HARD (high ISN)') : t('MODERADO','MODERATE');

    await L.log('=== TCP SESSION HIJACKING ===', 'header', 0);
    await L.log(t(`Victima: ${victim}:${sport} vs ${server}:80`, `Victim: ${victim}:${sport} vs ${server}:80`), 'warn', 150);
    await L.log(t(`SEQ actual: ${seq}   [${difficulty}]`, `Current SEQ: ${seq}   [${difficulty}]`), 'warn', 150);
    await L.log('', 'info', 50);
    await L.log(t('[ Fase 1: Sniffing pasivo ]', '[ Phase 1: Passive sniffing ]'), 'header', 200);
    await L.log(t(`Captura en red: ${victim} -> ${server}`, `Network capture: ${victim} -> ${server}`), 'recv', 300);
    await L.log(t(`SEQ observado: ${seq}  ACK esperado: ${seq + 1}`, `Observed SEQ: ${seq}  Expected ACK: ${seq + 1}`), 'recv', 300);
    await L.log('', 'info', 100);
    await L.log(t('[ Fase 2: Prediccion de SEQ ]', '[ Phase 2: SEQ prediction ]'), 'header', 200);
    const nextSeq = seq + rand(1, 512);
    await L.log(t(`SEQ estimado: ${nextSeq}`, `Estimated SEQ: ${nextSeq}`), 'warn', 300);
    await L.log(t('Ventana TCP 65535 bytes = margen de error', 'TCP window 65535 bytes = error margin'), 'warn', 200);
    await L.log('', 'info', 100);
    await L.log(t('[ Fase 3: Inyeccion de paquete ]', '[ Phase 3: Packet injection ]'), 'header', 200);
    await L.log(`hping3 --spoof ${victim} -p 80 --setseq ${nextSeq} ${server}`, 'code', 300);
    await L.log('', 'info', 100);

    if (seq < 100000) {
      await L.log(t('[ HIJACKING EXITOSO ]', '[ HIJACKING SUCCESSFUL ]'), 'danger', 200);
      await L.log(t('SEQ predecible -> sesion tomada, datos inyectados', 'Predictable SEQ -> session taken over, data injected'), 'danger', 200);
    } else {
      await L.log(t('[ HIJACKING FALLIDO ]', '[ HIJACKING FAILED ]'), 'warning', 200);
      await L.log(t('SEQ fuera de ventana -> servidor descarta paquete', 'SEQ out of window -> server drops packet'), 'muted', 200);
      await L.log(t('ISN aleatorio (RFC 6528) protege contra este ataque', 'Random ISN (RFC 6528) protects against this attack'), 'info', 300);
    }

    await L.log('', 'info', 100);
    await L.log(t('[ Deteccion SOC ]', '[ SOC Detection ]'), 'header', 200);
    await L.log(t('Zeek: misma sesion, IP origen distinta', 'Zeek: same session, different source IP'), 'info', 200);
    await L.log('Suricata: ET TCP SESSION HIJACKING ATTEMPT', 'danger', 200);
    await L.log('MITRE: T1557 (MitM) + T1185 (Session Hijacking)', 'info', 200);
  }

  function resetHijack() {
    const el = document.getElementById('hijack-output');
    if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[->]</span><span class="log-info">Esperando simulacion TCP...</span></div>';
  }

  // ─── Demo 4: RST Injection ───────────────────

  async function runRSTInjection() {
    const src = document.getElementById('rst-src')?.value.trim() || '10.0.0.5';
    const dst = document.getElementById('rst-dst')?.value.trim() || '10.0.0.100';
    const L = createLogger('rst-output');
    L.clear();
    await L.log('=== RST INJECTION ATTACK ===', 'header', 0);
    await L.log(t(`Víctima: ${src} ↔ ${dst}`, `Victim: ${src} ↔ ${dst}`), 'warn', 100);
    await L.log('', 'info', 50);
    await L.log(t('[ Paso 1: Sniffing de la conexión ]', '[ Step 1: Connection sniffing ]'), 'header', 200);
    await L.log(t(`Captura TCP: ${src}:${rand(40000,60000)} → ${dst}:80`, `TCP capture: ${src}:${rand(40000,60000)} → ${dst}:80`), 'recv', 300);
    const seq = rand(1000000000, 3000000000);
    await L.log(`SEQ number: ${seq}`, 'warn', 200);
    await L.log('', 'info', 50);
    await L.log(t('[ Paso 2: Forjar paquete RST ]', '[ Step 2: Forge RST packet ]'), 'header', 200);
    await L.log(`hping3 -R -s 80 --spoof ${dst} -p ${rand(40000,60000)} --win 0 --setseq ${seq} ${src}`, 'code', 300);
    await L.log('FLAGS: RST=1, SYN=0, ACK=0, FIN=0', 'attack', 200);
    await L.log(t(`SEQ forjado: ${seq} (debe estar en ventana)`, `Forged SEQ: ${seq} (must be in window)`), 'attack', 200);
    await L.log('', 'info', 50);
    await L.log(t('[ Paso 3: Conexión terminada ]', '[ Step 3: Connection terminated ]'), 'header', 200);
    await L.log(t('TCP RST enviado → ambos extremos cierran la conexión', 'TCP RST sent → both ends close the connection'), 'danger', 300);
    await L.log(t('Transferencia interrumpida — sesión destruida', 'Transfer interrupted — session destroyed'), 'danger', 300);
    await L.log('', 'info', 50);
    await L.log('MITRE: T1499.004 — Application or System Exploitation', 'info', 200);
  }

  function resetRST() {
    const el = document.getElementById('rst-output');
    if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando simulación RST...</span></div>';
  }

  // ─── Demo 5: Port Scan → ver runPortScan() arriba (línea ~172).
  //     Se eliminó una segunda declaración duplicada de runPortScan() que
  //     pisaba a la primera y leía IDs inexistentes (tcp-scan-target /
  //     tcp-scan-range), por eso el escaneo ignoraba el "Target IP".
  //     Fix Fase 1 #1 (PLAN_DE_ACCION_BUGS.md), 2026-07-05.

  function reset() {
    ['tcp-output','syn-output','hijack-output','rst-output','scan-output',
     'ack-output','spoof-output'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando simulación TCP...</span></div>';
    });
  }

  // ─── Demo 6: ACK Flood ──────────────────────────────────────────

  async function runACKFlood() {
    const target = document.getElementById('ack-target').value.trim() || '10.0.0.1';
    const rate   = parseInt(document.getElementById('ack-rate').value) || 100000;
    const L = createLogger('ack-output');
    L.clear();

    const gbps = ((rate * 60 * 8) / 1e9).toFixed(2);

    await L.log('=== ACK FLOOD DoS ATTACK ===', 'header', 0);
    await L.log(`Target: ${target}`, 'warn', 100);
    await L.log(`Rate: ${rate.toLocaleString()} pkt/s`, 'attack', 100);
    await L.log('', 'info', 50);

    await L.log(t('[ PRINCIPIO DEL ATAQUE ]', '[ ATTACK PRINCIPLE ]'), 'header', 200);
    await L.log(t('Paquetes ACK con SEQ/ACK aleatorios → sin conexión previa', 'ACK packets with random SEQ/ACK → no prior connection'), 'info', 200);
    await L.log(t('El servidor debe verificar cada ACK contra su tabla de conexiones', 'The server must check each ACK against its connection table'), 'warn', 200);
    await L.log(t('Con suficiente volumen → tabla desbordada → CPU al 100%', 'With enough volume → table overflow → CPU at 100%'), 'attack', 300);
    await L.log('', 'info', 50);

    await L.log(t('[ COMANDO ]', '[ COMMAND ]'), 'header', 200);
    await L.log(`hping3 -A --rand-source --flood -p 80 ${target}`, 'code', 300);
    await L.log('# -A = ACK flag, --rand-source = IP spoofing, --flood = max rate', 'info', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ FLUJO DE PAQUETES ]', '[ PACKET FLOW ]'), 'header', 200);
    for (let i = 0; i < 6; i++) {
      const srcIP = `${rand(1,200)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
      const seq   = rand(100000, 999999999);
      await L.log(`${srcIP}:${rand(1024,65535)} → ${target}:80  ACK  seq=${seq}  win=65535`, 'attack', 120);
    }
    await L.log(t(`... × ${rate.toLocaleString()} por segundo ...`, `... × ${rate.toLocaleString()} per second ...`), 'danger', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ IMPACTO ]', '[ IMPACT ]'), 'header', 200);
    await L.log(t(`Tráfico: ~${gbps} Gbps sobre el target`, `Traffic: ~${gbps} Gbps on the target`), 'danger', 300);
    await L.log(t('CPU servidor: procesando RST responses o descartando', 'Server CPU: processing RST responses or dropping'), 'danger', 200);
    await L.log(t('Conexiones legítimas: rechazadas o con alta latencia', 'Legitimate connections: rejected or with high latency'), 'danger', 200);
    await L.log('', 'info', 50);
    await L.log('MITRE: T1498.001 — Direct Network Flood', 'info', 200);
  }

  function resetACK() {
    const el = document.getElementById('ack-output');
    if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando simulación TCP...</span></div>';
  }

  // ─── Demo 7: TCP Spoofing ────────────────────────────────────────

  async function runTCPSpoof() {
    const src    = document.getElementById('spoof-src').value.trim() || '192.168.1.100';
    const target = document.getElementById('spoof-target').value.trim() || '10.0.0.5';
    const attack = document.getElementById('spoof-type').value;
    const L = createLogger('spoof-output');
    L.clear();

    await L.log('=== TCP IP SPOOFING ===', 'header', 0);
    await L.log(t(`IP falsa (origen): ${src}`, `Spoofed IP (source): ${src}`), 'warn', 100);
    await L.log(`Target: ${target}`, 'attack', 100);
    await L.log(t(`Técnica: ${attack}`, `Technique: ${attack}`), 'info', 100);
    await L.log('', 'info', 50);

    if (attack === 'blind') {
      await L.log('[ BLIND TCP SPOOFING ]', 'header', 200);
      await L.log(t('El atacante NO puede ver la respuesta del target', 'The attacker CANNOT see the target response'), 'warn', 200);
      await L.log(t('Debe adivinar/predecir el ISN (Initial Sequence Number)', 'Must guess/predict the ISN (Initial Sequence Number)'), 'warn', 200);
      await L.log('', 'info', 50);
      await L.log(t('[ PASO 1: Silenciar la IP fuente ]', '[ STEP 1: Silence the source IP ]'), 'header', 200);
      await L.log(t(`iptables -A OUTPUT -d ${target} -j DROP  # en ${src}`, `iptables -A OUTPUT -d ${target} -j DROP  # on ${src}`), 'code', 300);
      await L.log(t('Sin esta regla, el OS real enviaría RST al recibir respuesta', 'Without this rule, the real OS would send RST upon receiving a response'), 'info', 200);
      await L.log('', 'info', 50);
      await L.log(t('[ PASO 2: Sondear ISN del target ]', '[ STEP 2: Probe the target ISN ]'), 'header', 200);
      const isn = rand(1000000000, 3000000000);
      await L.log(t(`Enviando SYN legítimo para obtener ISN...`, `Sending legitimate SYN to obtain ISN...`), 'send', 200);
      await L.log(`SYN → ${target}:80`, 'send', 200);
      await L.log(t(`SYN-ACK ← ISN del server: ${isn}`, `SYN-ACK ← server ISN: ${isn}`), 'recv', 300);
      await L.log('', 'info', 50);
      await L.log(t('[ PASO 3: Spoofear SYN ]', '[ STEP 3: Spoof SYN ]'), 'header', 200);
      await L.log(`hping3 -S --spoof ${src} -p 80 -c 1 --setseq ${rand(1,1000000)} ${target}`, 'code', 300);
      await L.log(t(`Target responde con SYN-ACK a ${src} (no al atacante)`, `Target replies with SYN-ACK to ${src} (not to the attacker)`), 'warn', 300);
      await L.log('', 'info', 50);
      await L.log(t('[ PASO 4: Completar handshake a ciegas ]', '[ STEP 4: Complete handshake blindly ]'), 'header', 200);      await L.log(t('ACK enviado con SEQ/ACK predichos (ciego)', 'ACK sent with predicted SEQ/ACK (blind)'), 'code', 300);
      await L.log(t('Datos inyectados en la sesion TCP activa', 'Data injected into the active TCP session'), 'danger', 300);
    } else {
      await L.log('[ TCP SESSION RESET via SPOOFING ]', 'header', 200);
      await L.log(t('Objetivo: terminar conexiones TCP legitimas', 'Objective: terminate legitimate TCP connections'), 'warn', 200);
      await L.log('', 'info', 50);
      const seq3 = rand(1000000000, 2000000000);
      await L.log(`Sniffed connection: ${src}:${rand(40000,60000)} vs ${target}:443`, 'recv', 200);
      await L.log(t(`SEQ en ventana: ${seq3}`, `SEQ in window: ${seq3}`), 'recv', 200);
      await L.log('', 'info', 50);
      await L.log(`hping3 -R --spoof ${src} --setseq ${seq3} -p 443 ${target}`, 'code', 300);
      await L.log(t('RST enviado con IP spoofed -> conexion destruida', 'RST sent with spoofed IP -> connection destroyed'), 'danger', 300);
      await L.log(t('Detectado en IDS como: RST fuera de ventana', 'Detected in IDS as: RST out of window'), 'warn', 200);
    }

    await L.log('', 'info', 50);
    await L.log('MITRE: T1557 MitM · T1499 Network DoS', 'info', 200);
  }

  function resetSpoof() {
    const el = document.getElementById('spoof-output');
    if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[->]</span><span class="log-info">Esperando simulacion TCP...</span></div>';
  }

  return { runHandshake, runSYNFlood, runHijack, resetHijack,
           runRSTInjection, resetRST, runPortScan,
           runACKFlood, resetACK, runTCPSpoof, resetSpoof, reset };

})();

window.tcpDemo = tcpDemo;
