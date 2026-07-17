/* ============================================================
   udp/app.js — Demo Lab: UDP
   Protocolos Red SOC · @xavimape
   Demos: 1) UDP vs TCP — comparación de datagramas
          2) UDP Flood visualizer
          3) Amplificación UDP (NTP/DNS/Memcached)
   ============================================================ */

'use strict';

const udpDemo = (function () {
  function createLogger(id) { const el=document.getElementById(id); return el ? SOC.createLogger(el) : { log: async()=>{}, clear:()=>{} }; }
  const rand    = SOC.rand;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;


  const randPort = () => rand(49152, 65535);

  // ─── Configuración de protocolos UDP comunes ────────────────────
  const PROTO_MAP = {
    dns: {
      name: 'DNS',
      sport: 53,
      dport: 'random-high',
      req: 42,
      resp: 78,
      label: 'query A/AAAA',
      respLabel: 'response 1 RR',
      note: { es: 'Firewall puede ver el contenido — DNS tunneling usa este canal', en: 'Firewall can see the content — DNS tunneling uses this channel' },
    },
    dhcp: {
      name: 'DHCP',
      sport: 68,
      dport: 67,
      req: 342,
      resp: 548,
      label: 'DISCOVER broadcast',
      respLabel: 'OFFER (IP + lease)',
      note: { es: 'DHCP usa broadcast — no requiere IP previa. Riesgo: DHCP starvation', en: 'DHCP uses broadcast — no prior IP needed. Risk: DHCP starvation' },
    },
    ntp: {
      name: 'NTP',
      sport: 123,
      dport: 123,
      req: 48,
      resp: 48,
      label: 'client request (poll)',
      respLabel: 'server response (stratum)',
      note: { es: 'NTP monlist puede dar respuestas de hasta 25,564 bytes — amplificación', en: 'NTP monlist can return responses up to 25,564 bytes — amplification' },
    },
    syslog: {
      name: 'Syslog',
      sport: 514,
      dport: 514,
      req: 150,
      resp: 0,
      label: 'log message (RFC 5424)',
      respLabel: '(no response — fire and forget)',
      note: { es: 'Syslog UDP no confirma entrega — pueden perderse logs bajo carga', en: 'Syslog UDP does not confirm delivery — logs can be lost under load' },
    },
    snmp: {
      name: 'SNMP',
      sport: 161,
      dport: 161,
      req: 80,
      resp: 200,
      label: 'GetRequest OID',
      respLabel: 'GetResponse (valores)',
      note: { es: 'SNMPv1/v2c usan community strings en claro — riesgo de espionaje', en: 'SNMPv1/v2c use cleartext community strings — eavesdropping risk' },
    },
  };

  // ─── Demo 1: UDP vs TCP Comparación ───────────────────────────

  async function runCompare() {
    const src   = document.getElementById('udp-src').value.trim()  || '10.0.0.1';
    const dst   = document.getElementById('udp-dst').value.trim()  || '192.168.1.50';
    const proto = document.getElementById('udp-proto').value;
    const cfg   = PROTO_MAP[proto];
    const out   = document.getElementById('udp-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const srcPort = cfg.dport === 'random-high' ? randPort() : cfg.sport;
    const dstPort = cfg.dport === 'random-high' ? cfg.sport  : cfg.dport;

    await L.log(t(`── Protocolo ${cfg.name} sobre UDP ─────────────────────`, `── Protocol ${cfg.name} over UDP ───────────────────────`), 'info', 0);
    await L.log(`   ${src}:${srcPort} → ${dst}:${dstPort}`, 'muted', 100);
    await L.log('', 'muted', 200);

    // Sin handshake
    await L.log(t(`[×] SIN CONEXIÓN PREVIA — datagrama directo`, `[×] NO PRIOR CONNECTION — direct datagram`), 'warning', 0);
    await L.log(t(`   TCP necesitaría: SYN → SYN-ACK → ACK antes del primer byte`, `   TCP would need: SYN → SYN-ACK → ACK before the first byte`), 'muted', 100);
    await L.log(t(`   UDP: primer paquete = datos inmediatos`, `   UDP: first packet = immediate data`), 'success', 100);
    await L.log('', 'muted', 300);

    // Request UDP
    await L.log(`[1] REQUEST UDP (${cfg.req} bytes)`, 'info', 0);
    await L.log(`   src=${src}:${srcPort}  dst=${dst}:${dstPort}`, 'muted', 100);
    await L.log(`   Cabecera: SrcPort=${srcPort} | DstPort=${dstPort} | Len=${cfg.req + 8} | Chk=0x${rand(0x1000,0xffff).toString(16).toUpperCase()}`, 'muted', 100);
    await L.log(t(`   Payload: ${cfg.label} (${cfg.req} bytes datos + 8 bytes header)`, `   Payload: ${cfg.label} (${cfg.req} bytes data + 8 bytes header)`), 'muted', 100);
    await L.log(t(`   Sin ACK — no se espera confirmación de llegada`, `   No ACK — no delivery confirmation expected`), 'warning', 200);
    await L.log('', 'muted', 300);

    if (cfg.resp > 0) {
      // Response
      await L.log(`[2] RESPONSE UDP (${cfg.resp} bytes)`, 'success', 0);
      await L.log(`   src=${dst}:${dstPort}  dst=${src}:${srcPort}`, 'muted', 100);
      await L.log(`   ${cfg.respLabel}`, 'muted', 100);
      await L.log(t(`   RTT total: ~${rand(1, 15)}ms  (vs TCP ~${rand(20, 60)}ms con handshake)`, `   Total RTT: ~${rand(1, 15)}ms  (vs TCP ~${rand(20, 60)}ms with handshake)`), 'success', 100);
    } else {
      await L.log(t(`[2] SIN RESPUESTA — ${cfg.name} es unidireccional`, `[2] NO RESPONSE — ${cfg.name} is unidirectional`), 'muted', 0);
      await L.log(t(`   Fire-and-forget: el emisor no sabe si llegó`, `   Fire-and-forget: the sender doesn't know if it arrived`), 'warning', 100);
    }

    await L.log('', 'muted', 200);
    await L.log(`── Zeek conn.log ─────────────────────────────────`, 'muted', 0);
    const connState = cfg.resp > 0 ? 'SF' : 'S0';
    await L.log(`   proto=udp  orig=${src}:${srcPort}  resp=${dst}:${dstPort}`, 'muted', 100);
    await L.log(`   orig_bytes=${cfg.req}  resp_bytes=${cfg.resp}  conn_state=${connState}`, 'muted', 100);
    await L.log(`   duration=~0.001s`, 'muted', 100);
    await L.log('', 'muted', 200);
    await L.log(t(`⚠ Nota SOC: ${cfg.note.es}`, `⚠ SOC note: ${cfg.note.en}`), 'warning', 0);
  }

  // ─── Demo 2: UDP Flood ─────────────────────────────────────────

  async function runFlood() {
    const target = document.getElementById('flood-target').value.trim() || '10.0.0.5';
    const size   = parseInt(document.getElementById('flood-size').value);
    const rate   = parseInt(document.getElementById('flood-rate').value);
    const out    = document.getElementById('flood-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const bw = Math.round((size + 8 + 20) * rate * 8 / 1_000_000); // Mbps aprox
    const rateLabel = rate.toLocaleString();

    await L.log(`── UDP Flood → ${target} ─────────────────────────────`, 'danger', 0);
    await L.log(t(`   Tamaño datagrama: ${size} bytes (UDP) + 28 bytes (IP+UDP header)`, `   Datagram size: ${size} bytes (UDP) + 28 bytes (IP+UDP header)`), 'muted', 100);
    await L.log(t(`   Tasa: ${rateLabel} pps   Ancho de banda: ~${bw} Mbps`, `   Rate: ${rateLabel} pps   Bandwidth: ~${bw} Mbps`), 'danger', 100);
    await L.log(t(`   Puertos destino: RANDOM (sin patrón — evita port-based ACL)`, `   Destination ports: RANDOM (no pattern — evades port-based ACL)`), 'danger', 100);
    await L.log(t(`   IPs origen: SPOOFED (sin handshake = verificación imposible)`, `   Source IPs: SPOOFED (no handshake = verification impossible)`), 'danger', 100);
    await L.log('', 'muted', 400);

    // Simular efecto en el servidor
    await L.log(t(`── Estado del servidor víctima ───────────────────`, `── Victim server state ───────────────────────────`), 'warning', 0);
    await L.log('', 'muted', 200);

    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      const pct      = Math.round((i / steps) * 100);
      const cpu      = Math.min(95, Math.round(pct * 0.85));
      const icmpLoad = Math.round(pct * 0.6);
      const barLen   = Math.round(pct / 10);
      const bar      = '█'.repeat(barLen) + '░'.repeat(10 - barLen);
      const type     = pct < 50 ? 'warning' : 'danger';
      const ip       = `${rand(1,254)}.${rand(1,254)}.${rand(1,254)}.${rand(1,254)}`;

      await L.log(t(`   UDP de ${ip}:${randPort()} → ${target}:${rand(1024,65535)}`, `   UDP from ${ip}:${randPort()} → ${target}:${rand(1024,65535)}`), type, 200);
      await L.log(t(`   Saturación [${bar}] ${pct}%   CPU: ${cpu}%  ICMP-unreachable: ${icmpLoad}%/s`, `   Saturation [${bar}] ${pct}%   CPU: ${cpu}%  ICMP-unreachable: ${icmpLoad}%/s`), type, 100);
    }

    await L.log('', 'muted', 300);

    if (rate >= 100000) {
      await L.log(t(`🚨 ENLACE SATURADO — ${bw} Mbps de basura UDP`, `🚨 LINK SATURATED — ${bw} Mbps of UDP garbage`), 'danger', 0);
      await L.log(t(`   El servidor ya no puede responder a tráfico legítimo`, `   The server can no longer respond to legitimate traffic`), 'danger', 200);
      await L.log(t(`   ICMP "Port Unreachable" agota la CPU generando respuestas`, `   ICMP "Port Unreachable" drains the CPU generating responses`), 'danger', 200);
    } else if (rate >= 10000) {
      await L.log(t(`⚠️  DEGRADACIÓN SEVERA — ${bw} Mbps de tráfico malicioso`, `⚠️  SEVERE DEGRADATION — ${bw} Mbps of malicious traffic`), 'danger', 0);
      await L.log(t(`   Pérdida de paquetes legítimos: ~${rand(30,70)}%`, `   Legitimate packet loss: ~${rand(30,70)}%`), 'warning', 200);
    } else {
      await L.log(t(`⚠️  DEGRADACIÓN LEVE — ${bw} Mbps — detectable pero manejable`, `⚠️  MILD DEGRADATION — ${bw} Mbps — detectable but manageable`), 'warning', 0);
    }

    await L.log('', 'muted', 300);
    await L.log(t(`── Defensa ──────────────────────────────────────`, `── Defense ──────────────────────────────────────`), 'muted', 0);
    await L.log(t(`   iptables -A INPUT -p udp --dport 1:1023 -j DROP  # puertos sin servicio`, `   iptables -A INPUT -p udp --dport 1:1023 -j DROP  # ports with no service`), 'success', 200);
    await L.log(`   iptables -A OUTPUT -p icmp --icmp-type 3 -m limit --limit 10/s -j ACCEPT`, 'success', 100);
    await L.log(t(`   → Limita ICMP unreachable salientes (previene agotamiento CPU)`, `   → Limits outbound ICMP unreachable (prevents CPU exhaustion)`), 'success', 100);
    if (rate >= 100000) {
      await L.log(t(`   + Contactar ISP para null-routing / tráfico scrubbing`, `   + Contact ISP for null-routing / traffic scrubbing`), 'success', 200);
      await L.log(t(`   + BGP blackhole si el volumen supera la capacidad del uplink`, `   + BGP blackhole if volume exceeds uplink capacity`), 'success', 100);
    }

    await L.log('', 'muted', 200);
    await L.log(`── Zeek IOC ─────────────────────────────────────`, 'muted', 0);
    await L.log(t(`   Miles de conn_state=S0 desde IPs distintas → mismo dst, misma ventana de tiempo`, `   Thousands of conn_state=S0 from different IPs → same dst, same time window`), 'warning', 100);
    await L.log(`   Sigma: count(src_ip) by dst_ip > 1000 where proto=udp AND state=S0 / 10s`, 'warning', 100);
  }

  // ─── Demo 3: Amplificación UDP ─────────────────────────────────

  const AMP_FACTORS = {
    dns:       { name: 'DNS ANY',   factor: 28,    reqBytes: 40,   respBytes: 1120,  port: 53,    cve: 'N/A — protocol by design' },
    ntp:       { name: 'NTP monlist', factor: 556, reqBytes: 46,   respBytes: 25564, port: 123,   cve: 'CVE-2013-5211' },
    ssdp:      { name: 'SSDP',      factor: 30,    reqBytes: 110,  respBytes: 3300,  port: 1900,  cve: 'N/A — UPnP by design' },
    memcached: { name: 'Memcached', factor: 51000, reqBytes: 15,   respBytes: 765000,port: 11211, cve: 'CVE-2018-1000115' },
  };

  async function runAmplification() {
    const victim = document.getElementById('amp-victim').value.trim() || '203.0.113.1';
    const proto  = document.getElementById('amp-proto').value;
    const bwMbps = parseInt(document.getElementById('amp-bw').value);
    const cfg    = AMP_FACTORS[proto];
    const out    = document.getElementById('amp-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const attackerPPS  = Math.round((bwMbps * 1_000_000 / 8) / cfg.reqBytes);
    const generatedBw  = Math.round(bwMbps * cfg.factor);
    const reflectorIP  = `${rand(1,254)}.${rand(1,254)}.${rand(1,254)}.${rand(1,254)}`;

    await L.log(t(`── Amplificación ${cfg.name} ──────────────────────────`, `── ${cfg.name} amplification ──────────────────────────`), 'danger', 0);
    await L.log(t(`   Puerto reflector: UDP/${cfg.port}`, `   Reflector port: UDP/${cfg.port}`), 'muted', 100);
    await L.log(t(`   Factor de amplificación: ${cfg.factor.toLocaleString()}×`, `   Amplification factor: ${cfg.factor.toLocaleString()}×`), 'danger', 100);
    if (cfg.cve !== 'N/A — protocolo by design' && cfg.cve !== 'N/A — UPnP by design') {
      await L.log(`   CVE: ${cfg.cve}`, 'warning', 100);
    }
    await L.log('', 'muted', 300);

    await L.log(t(`── Flujo del ataque ─────────────────────────────`, `── Attack flow ──────────────────────────────────`), 'muted', 0);
    await L.log('', 'muted', 200);
    await L.log(t(`PASO 1 — Atacante envía request SPOOFED:`, `STEP 1 — Attacker sends SPOOFED request:`), 'warning', 0);
    await L.log(`   src=SPOOFED(${victim})  dst=${reflectorIP}:${cfg.port}`, 'muted', 100);
    await L.log(`   payload: ${cfg.reqBytes} bytes (${cfg.name} request)`, 'muted', 100);
    await L.log(t(`   Tasa del atacante: ${attackerPPS.toLocaleString()} req/s`, `   Attacker rate: ${attackerPPS.toLocaleString()} req/s`), 'muted', 100);
    await L.log('', 'muted', 300);

    await L.log(t(`PASO 2 — Reflector procesa y responde a la "fuente":`, `STEP 2 — Reflector processes and replies to the "source":`), 'danger', 0);
    await L.log(t(`   src=${reflectorIP}:${cfg.port}  dst=${victim}  ← responde a la VÍCTIMA`, `   src=${reflectorIP}:${cfg.port}  dst=${victim}  ← replies to the VICTIM`), 'danger', 100);
    await L.log(t(`   payload: ${cfg.respBytes >= 100000 ? (cfg.respBytes/1000).toFixed(0)+'K' : cfg.respBytes} bytes (${cfg.factor}× más grande)`, `   payload: ${cfg.respBytes >= 100000 ? (cfg.respBytes/1000).toFixed(0)+'K' : cfg.respBytes} bytes (${cfg.factor}× larger)`), 'danger', 100);
    await L.log('', 'muted', 300);

    await L.log(t(`── Impacto calculado ────────────────────────────`, `── Calculated impact ────────────────────────────`), 'muted', 0);
    await L.log(t(`   Ancho de banda atacante:   ${bwMbps} Mbps (${bwMbps < 10 ? 'conexión doméstica' : bwMbps < 100 ? 'VPS básico' : 'servidor dedicado'})`, `   Attacker bandwidth:   ${bwMbps} Mbps (${bwMbps < 10 ? 'home connection' : bwMbps < 100 ? 'basic VPS' : 'dedicated server'})`), 'muted', 200);
    await L.log(t(`   Tráfico hacia la víctima:  ${generatedBw.toLocaleString()} Mbps (${generatedBw >= 1000 ? (generatedBw/1000).toFixed(1) + ' Gbps' : generatedBw + ' Mbps'})`, `   Traffic toward the victim:  ${generatedBw.toLocaleString()} Mbps (${generatedBw >= 1000 ? (generatedBw/1000).toFixed(1) + ' Gbps' : generatedBw + ' Mbps'})`), 'danger', 200);
    await L.log(t(`   Ratio de amplificación:    ${cfg.factor.toLocaleString()}× el ancho de banda del atacante`, `   Amplification ratio:    ${cfg.factor.toLocaleString()}× the attacker's bandwidth`), 'danger', 100);
    await L.log('', 'muted', 200);

    if (generatedBw >= 100000) {
      await L.log(t(`🚨 ATAQUE CATASTRÓFICO — ${(generatedBw/1000).toFixed(0)} Gbps`, `🚨 CATASTROPHIC ATTACK — ${(generatedBw/1000).toFixed(0)} Gbps`), 'danger', 0);
      await L.log(t(`   Comparable al ataque GitHub 2018 (1.35 Tbps Memcached)`, `   Comparable to the 2018 GitHub attack (1.35 Tbps Memcached)`), 'danger', 100);
      await L.log(t(`   NINGÚN uplink corporativo puede absorber esto sin scrubbing`, `   NO corporate uplink can absorb this without scrubbing`), 'danger', 100);
    } else if (generatedBw >= 1000) {
      await L.log(t(`🚨 ATAQUE SEVERO — ${(generatedBw/1000).toFixed(1)} Gbps`, `🚨 SEVERE ATTACK — ${(generatedBw/1000).toFixed(1)} Gbps`), 'danger', 0);
      await L.log(t(`   Saturará la mayoría de uplinks corporativos`, `   Will saturate most corporate uplinks`), 'danger', 100);
    } else {
      await L.log(t(`⚠️  ATAQUE MODERADO — ${generatedBw} Mbps`, `⚠️  MODERATE ATTACK — ${generatedBw} Mbps`), 'warning', 0);
      await L.log(t(`   Puede saturar uplinks pequeños / redes residenciales`, `   Can saturate small uplinks / residential networks`), 'warning', 100);
    }

    await L.log('', 'muted', 300);
    await L.log(t(`── Mitigación ───────────────────────────────────`, `── Mitigation ───────────────────────────────────`), 'muted', 0);

    if (proto === 'ntp') {
      await L.log(t(`   Para reflectores NTP: deshabilitar monlist en /etc/ntp.conf`, `   For NTP reflectors: disable monlist in /etc/ntp.conf`), 'success', 200);
      await L.log(t(`   restrict default noquery → impide consultas externas`, `   restrict default noquery → blocks external queries`), 'success', 100);
    } else if (proto === 'memcached') {
      await L.log(t(`   URGENTE: memcached NUNCA debe estar expuesto a Internet`, `   URGENT: memcached must NEVER be exposed to the Internet`), 'danger', 200);
      await L.log(t(`   bind-address 127.0.0.1  en /etc/memcached.conf`, `   bind-address 127.0.0.1  in /etc/memcached.conf`), 'success', 100);
      await L.log(`   iptables -A INPUT -p udp --dport 11211 -j DROP`, 'success', 100);
    } else if (proto === 'ssdp') {
      await L.log(t(`   Bloquear UDP/1900 desde Internet en el firewall perimetral`, `   Block UDP/1900 from the Internet at the perimeter firewall`), 'success', 200);
      await L.log(t(`   UPnP no debe ser accesible desde redes externas`, `   UPnP must not be accessible from external networks`), 'success', 100);
    } else {
      await L.log(t(`   Filtrar respuestas ${cfg.name} de alto volumen desde Internet`, `   Filter high-volume ${cfg.name} responses from the Internet`), 'success', 200);
    }

    await L.log(t(`   BCP38: los ISPs deben filtrar paquetes con src_ip spoofed`, `   BCP38: ISPs should filter packets with spoofed src_ip`), 'success', 200);
    await L.log(t(`   → Sin spoofing = sin amplificación (el atacante se expone)`, `   → No spoofing = no amplification (the attacker exposes themselves)`), 'success', 100);
    await L.log('', 'muted', 200);
    await L.log(t(`── Zeek IOC (víctima) ──────────────────────────`, `── Zeek IOC (victim) ───────────────────────────`), 'muted', 0);
    await L.log(`   proto=udp  src_port=${cfg.port}  orig_bytes>1000  resp_bytes=0  conn_state=SF`, 'warning', 100);
    await L.log(t(`   Miles de flujos/s desde IPs ${cfg.name} distintas hacia misma víctima`, `   Thousands of flows/s from different ${cfg.name} IPs toward the same victim`), 'warning', 100);
  }

  // ─── Demo 4: UDP Port Scan ─────────────────────────────────────

  const UDP_PORTS = {
    top20: [
      { port: 53,  service: 'DNS',       proto: 'dns' },
      { port: 67,  service: 'DHCP',      proto: 'dhcp' },
      { port: 68,  service: 'DHCP-client',proto:'dhcp' },
      { port: 69,  service: 'TFTP',      proto: 'tftp' },
      { port: 123, service: 'NTP',        proto: 'ntp' },
      { port: 137, service: 'NetBIOS-NS', proto: 'netbios' },
      { port: 138, service: 'NetBIOS-DG', proto: 'netbios' },
      { port: 161, service: 'SNMP',       proto: 'snmp' },
      { port: 162, service: 'SNMP-trap',  proto: 'snmp' },
      { port: 500, service: 'IKE-IPSec',  proto: 'ike' },
      { port: 514, service: 'Syslog',     proto: 'syslog' },
      { port: 520, service: 'RIP',        proto: 'rip' },
      { port: 1194,service: 'OpenVPN',    proto: 'vpn' },
      { port: 1900,service: 'UPnP-SSDP',  proto: 'ssdp' },
      { port: 4500,service: 'IKE-NAT',    proto: 'ike' },
      { port: 5353,service: 'mDNS',       proto: 'mdns' },
      { port: 5355,service: 'LLMNR',      proto: 'llmnr' },
      { port: 11211,service:'Memcached',  proto: 'memcached' },
      { port: 27015,service:'GameServer', proto: 'game' },
      { port: 51820,service:'WireGuard',  proto: 'vpn' },
    ],
    services: [53, 67, 123, 161, 500, 514, 1900, 5353, 5355, 11211],
    full: null,
  };

  const OPEN_PORTS_MAP = {
    '192.168.1.1':  [53, 67, 161, 520],
    '192.168.0.1':  [53, 67, 123],
    '10.0.0.1':     [53, 161, 500],
    'default':      [53, 123, 161],
  };

  async function runPortScan() {
    const target = document.getElementById('scan-target').value.trim() || '192.168.1.1';
    const type   = document.getElementById('scan-type').value;
    const speed  = document.getElementById('scan-speed').value;
    const out    = document.getElementById('scan-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const ports = type === 'services'
      ? UDP_PORTS.top20.filter(p => UDP_PORTS.services.includes(p.port))
      : type === 'full'
      ? UDP_PORTS.top20.concat([
          { port: 17,  service: 'QOTD' },   { port: 19,  service: 'CharGen' },
          { port: 111, service: 'RPCbind' }, { port: 177, service: 'XDMCP' },
          { port: 623, service: 'IPMI' },    { port: 631, service: 'IPP' },
        ])
      : UDP_PORTS.top20;

    const openPorts  = OPEN_PORTS_MAP[target] || OPEN_PORTS_MAP['default'];
    const delay      = speed === 'slow' ? 220 : speed === 'fast' ? 40 : 100;
    const totalPorts = ports.length;

    await L.log('── UDP Port Scan ──────────────────────────────────', 'info', 0);
    await L.log(t('   Target: ' + target + '   Puertos: ' + totalPorts + '   Velocidad: ' + speed, '   Target: ' + target + '   Ports: ' + totalPorts + '   Speed: ' + speed), 'muted', 100);
    await L.log(t('   (ICMP rate-limit del OS puede ralentizar el scan)', '   (OS ICMP rate-limit can slow down the scan)'), 'warning', 100);
    await L.log('', 'muted', 300);

    let openCount = 0, closedCount = 0, filteredCount = 0;

    for (const { port, service } of ports) {
      const isOpen     = openPorts.includes(port);
      const isFiltered = !isOpen && Math.random() < 0.35;
      const isClosed   = !isOpen && !isFiltered;

      const padPort = String(port).padStart(5);
      if (isOpen) {
        openCount++;
        await L.log('   ' + padPort + '/udp  OPEN      ' + service + t('  <- respuesta recibida', '  <- response received'), 'success', delay);
      } else if (isFiltered) {
        filteredCount++;
        await L.log('   ' + padPort + '/udp  FILTERED  ' + service + t('  <- sin respuesta', '  <- no response'), 'warning', delay);
      } else {
        closedCount++;
        await L.log('   ' + padPort + '/udp  CLOSED    ' + service + '  <- ICMP Port Unreachable', 'muted', delay);
      }
    }

    await L.log('', 'muted', 200);
    await L.log(t('── Resumen ──────────────────────────────────────────', '── Summary ──────────────────────────────────────────'), 'muted', 0);
    await L.log(t('   Abiertos:  ', '   Open:  ') + openCount + '   Filtrados: ' + filteredCount + '   Cerrados: ' + closedCount, 'info', 100);
    if (openPorts.includes(123)) {
      await L.log(t('WARNING NTP/123 abierto -> verificar monlist: ntpdc -n -c monlist ', 'WARNING NTP/123 open -> check monlist: ntpdc -n -c monlist ') + target, 'danger', 0);
    }
    if (openPorts.includes(161)) {
      await L.log(t('WARNING SNMP/161 abierto -> probar community "public": snmpwalk -v2c -c public ', 'WARNING SNMP/161 open -> try community "public": snmpwalk -v2c -c public ') + target, 'danger', 0);
    }
    if (openPorts.includes(11211)) {
      await L.log(t('CRITICO Memcached/11211 expuesto -> bloquear inmediatamente (amplificacion x51000)', 'CRITICAL Memcached/11211 exposed -> block immediately (amplification x51000)'), 'danger', 0);
    }
    await L.log('', 'muted', 200);
    await L.log('   MITRE T1046 -- Network Service Discovery', 'muted', 100);
  }

  function resetScan() {
    const out = document.getElementById('scan-output');
    if (out) out.innerHTML = '<div class="log-line"><span class="log-time">[->]</span><span class="log-info">' + t('Esperando simulacion UDP...','Waiting for UDP simulation...') + '</span></div>';
    const tEl = document.getElementById('scan-target'); if(tEl) tEl.value = '192.168.1.1';
    const s = document.getElementById('scan-type');   if(s) s.value = 'top20';
    const v = document.getElementById('scan-speed');  if(v) v.value = 'normal';
  }

  // ─── Demo 5: DHCP Starvation ───────────────────────────────────

  function randMac() {
    return Array.from({length: 6}, () => rand(0, 255).toString(16).padStart(2, '0')).join(':');
  }

  async function runDHCPStarvation() {
    const server = document.getElementById('dhcp-server').value.trim() || '192.168.1.1';
    const pool   = parseInt(document.getElementById('dhcp-pool').value);
    const rate   = parseInt(document.getElementById('dhcp-rate').value);
    const out    = document.getElementById('dhcp-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const timeToExhaust = Math.ceil(pool / rate);
    const subnet = server.split('.').slice(0, 3).join('.') + '.0';

    await L.log('── DHCP Starvation -> ' + server + ' ───────────────', 'danger', 0);
    await L.log(t('   Herramienta: yersinia -G / dhcpstarv / scapy', '   Tool: yersinia -G / dhcpstarv / scapy'), 'muted', 100);
    await L.log('   Pool: ' + subnet + '/24 (' + pool + ' IPs)   Tasa: ' + rate + ' req/s', 'danger', 100);
    await L.log(t('   Tiempo estimado para agotar pool: ~', '   Estimated time to exhaust pool: ~') + timeToExhaust + 's', 'danger', 100);
    await L.log('', 'muted', 300);
    await L.log(t('── Ataque en progreso ───────────────────────────────', '── Attack in progress ───────────────────────────────'), 'danger', 0);

    const steps = Math.min(pool, 8);
    for (let i = 0; i < steps; i++) {
      const mac     = randMac();
      const fakeIP  = server.split('.').slice(0,3).join('.') + '.' + rand(2, 254);
      const usedPct = Math.round(((i + 1) / steps) * 100);
      const remaining = pool - Math.round(((i + 1) / steps) * pool);
      const barLen  = Math.round(usedPct / 10);
      const bar     = '█'.repeat(barLen) + '░'.repeat(10 - barLen);
      const type    = usedPct < 70 ? 'warning' : 'danger';
      await L.log('   DISCOVER  src_mac=' + mac + '  xid=' + rand(0x100000, 0xFFFFFF).toString(16), type, 80);
      await L.log('   OFFER     ' + fakeIP + ' asignada  [' + bar + '] ' + usedPct + '%  (' + remaining + ' IPs restantes)', type, 60);
    }

    await L.log('', 'muted', 200);
    await L.log(t('CRITICO POOL AGOTADO -- ', 'CRITICAL POOL EXHAUSTED -- ') + pool + ' IPs asignadas a MACs falsas', 'danger', 0);
    await L.log('', 'muted', 100);
    await L.log(t('── Impacto en host legitimo ──────────────────────────', '── Impact on legitimate host ─────────────────────────'), 'danger', 0);
    await L.log('   HOST -> DHCP DISCOVER (broadcast)', 'muted', 300);
    await L.log(t('   DHCP -> sin respuesta (pool vacio) o NACK', '   DHCP -> no response (empty pool) or NACK'), 'danger', 200);
    await L.log(t('   HOST -> APIPA 169.254.x.x (sin acceso a red corporativa)', '   HOST -> APIPA 169.254.x.x (no corporate network access)'), 'danger', 200);
    await L.log('', 'muted', 200);
    await L.log(t('── Escenario Rogue DHCP ──────────────────────────────', '── Rogue DHCP scenario ───────────────────────────────'), 'warning', 0);
    await L.log(t('   Atacante levanta DHCP propio -> gateway=IP_ATACANTE -> MITM completo', '   Attacker sets up own DHCP -> gateway=ATTACKER_IP -> full MITM'), 'danger', 200);
    await L.log('   MITRE ATT&CK: T1557.003 -- DHCP Spoofing', 'muted', 150);
    await L.log('', 'muted', 200);
    await L.log(t('── Mitigaciones ─────────────────────────────────────', '── Mitigations ──────────────────────────────────────'), 'muted', 0);
    await L.log(t('   OK DHCP Snooping en switches -- solo permite DHCP desde puertos trunk', '   OK DHCP Snooping on switches -- only allows DHCP from trunk ports'), 'success', 150);
    await L.log('   OK Dynamic ARP Inspection (DAI)', 'success', 150);
    await L.log(t('   OK Port security -- limita MACs por puerto', '   OK Port security -- limits MACs per port'), 'success', 150);
    await L.log(t('   OK 802.1X -- autenticacion de dispositivos', '   OK 802.1X -- device authentication'), 'success', 150);
  }

  function resetDHCP() {
    const out = document.getElementById('dhcp-output');
    if (out) out.innerHTML = '<div class="log-line"><span class="log-time">[->]</span><span class="log-info">' + t('Esperando simulacion UDP...','Waiting for UDP simulation...') + '</span></div>';
    const s = document.getElementById('dhcp-server'); if(s) s.value = '192.168.1.1';
    const p = document.getElementById('dhcp-pool');   if(p) p.value = '254';
    const r = document.getElementById('dhcp-rate');   if(r) r.value = '100';
  }

  // ─── Reset general ────────────────────────────────────────────

  function reset() {
    const out = document.getElementById('udp-output');
    if (out) out.innerHTML = '<div class="log-line"><span class="log-time">[->]</span><span class="log-info">' + t('Esperando simulacion UDP...','Waiting for UDP simulation...') + '</span></div>';
  }


  function resetMemc() { const el=document.getElementById('memc-output'); if(el) el.innerHTML=''; }
  function resetSSDP() { const el=document.getElementById('ssdp-output'); if(el) el.innerHTML=''; }

  async function runMemcached() {
    const victim  = document.getElementById('memc-victim').value.trim() || '203.0.113.10';
    const servers = parseInt(document.getElementById('memc-servers').value);
    const L = createLogger('memc-output');
    L.clear();

    const reqSize  = 15;
    const respSize = rand(50000, 750000);
    const amp      = Math.floor(respSize / reqSize);
    const gbps     = ((servers * respSize * 8) / 1e9).toFixed(1);

    await L.log('=== MEMCACHED AMPLIFICATION DDoS ===', 'header', 0);
    await L.log(t(`Víctima (IP spoofed): ${victim}`, `Victim (spoofed IP): ${victim}`), 'warn', 100);
    await L.log(t(`Servidores Memcached: ${servers.toLocaleString()} expuestos`, `Memcached servers: ${servers.toLocaleString()} exposed`), 'attack', 100);
    await L.log(t(`Factor amplificación: ×${amp.toLocaleString()}x`, `Amplification factor: ×${amp.toLocaleString()}x`), 'danger', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 1: Enumerar Memcached expuestos ]', '[ STEP 1: Enumerate exposed Memcached ]'), 'header', 200);
    await L.log('shodan search "port:11211 product:Memcached" --fields ip_str', 'code', 300);
    await L.log(t(`Encontrados: ${servers.toLocaleString()} servidores con UDP 11211 abierto`, `Found: ${servers.toLocaleString()} servers with UDP 11211 open`), 'attack', 300);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 2: Preparar payload (15 bytes) ]', '[ STEP 2: Prepare payload (15 bytes) ]'), 'header', 200);
    await L.log('\\x00\\x00\\x00\\x00\\x00\\x01\\x00\\x00stats\\r\\n', 'code', 200);
    await L.log(t('→ Solicitud UDP: stats → respuesta con toda la info del servidor', '→ UDP request: stats → response with all the server info'), 'info', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 3: Spoofear IP origen y disparar ]', '[ STEP 3: Spoof source IP and fire ]'), 'header', 200);
    await L.log(t(`Origen falsificado: ${victim}  Puerto: 11211`, `Spoofed source: ${victim}  Port: 11211`), 'attack', 300);
    for (let i = 0; i < 4; i++) {
      const srvIP = `${rand(1,200)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
      await L.log(`UDP ${reqSize}B → Memcached ${srvIP}:11211`, 'send', 100);
    }
    await L.log(t(`... ×${servers.toLocaleString()} simultáneamente ...`, `... ×${servers.toLocaleString()} simultaneously ...`), 'attack', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 4: Respuestas dirigidas a víctima ]', '[ STEP 4: Responses directed at victim ]'), 'header', 200);
    for (let i = 0; i < 3; i++) {
      const srvIP = `${rand(1,200)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
      const r = rand(50000,750000);
      await L.log(`Memcached ${srvIP}:11211 → ${victim}  ${r.toLocaleString()} bytes`, 'danger', 150);
    }
    await L.log(t(`... ×${servers.toLocaleString()} respuestas simultáneas ...`, `... ×${servers.toLocaleString()} simultaneous responses ...`), 'danger', 200);
    await L.log('', 'info', 50);

    await L.log('[ IMPACTO ]', 'header', 200);
    await L.log(t(`Tráfico total sobre ${victim}: ~${gbps} Gbps`, `Total traffic on ${victim}: ~${gbps} Gbps`), 'danger', 300);
    await L.log(t(`Request enviado: ${reqSize} bytes → Respuesta: ~${(respSize/1024).toFixed(0)} KB (×${amp.toLocaleString()}x)`, `Request sent: ${reqSize} bytes → Response: ~${(respSize/1024).toFixed(0)} KB (×${amp.toLocaleString()}x)`), 'attack', 200);
    await L.log('', 'info', 50);
    await L.log('MITRE: T1498.002 — Reflection Amplification', 'info', 200);
    await L.log(t('Mitigación: deshabilitar UDP en Memcached (-U 0)', 'Mitigation: disable UDP on Memcached (-U 0)'), 'warn', 200);
  }

  async function runSSDP() {
    const victim  = document.getElementById('ssdp-victim').value.trim() || '203.0.113.20';
    const devices = parseInt(document.getElementById('ssdp-devices').value);
    const L = createLogger('ssdp-output');
    L.clear();

    const reqSize  = 110;
    const respSize = rand(3300, 8250);   // respuesta agregada UPnP: factor ×30-75 (ver tabla AMP: SSDP respBytes 3300 / 110 = 30×)
    const amp      = Math.floor(respSize / reqSize);
    const mbps     = ((devices * respSize * 8) / 1e6).toFixed(1);

    await L.log('=== SSDP AMPLIFICATION DDoS ===', 'header', 0);
    await L.log(t(`Víctima (IP spoofed): ${victim}`, `Victim (spoofed IP): ${victim}`), 'warn', 100);
    await L.log(t(`Dispositivos UPnP:    ${devices.toLocaleString()}`, `UPnP devices:    ${devices.toLocaleString()}`), 'attack', 100);
    await L.log(t(`Factor amplificación: ×${amp}x`, `Amplification factor: ×${amp}x`), 'danger', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 1: Escanear dispositivos UPnP ]', '[ STEP 1: Scan UPnP devices ]'), 'header', 200);
    await L.log('masscan -p1900 --rate 50000 0.0.0.0/0 -oL ssdp_list.txt', 'code', 300);
    await L.log(t(`${devices.toLocaleString()} dispositivos responden al puerto 1900/UDP`, `${devices.toLocaleString()} devices respond on port 1900/UDP`), 'attack', 300);
    await L.log(t('Tipos: routers domésticos, smart TVs, cámaras IP, NAS', 'Types: home routers, smart TVs, IP cameras, NAS'), 'info', 200);
    await L.log('', 'info', 50);

    await L.log('[ PASO 2: Payload M-SEARCH (110 bytes) ]', 'header', 200);
    await L.log('M-SEARCH * HTTP/1.1', 'code', 100);
    await L.log('HOST: 239.255.255.250:1900', 'code', 100);
    await L.log('MAN: "ssdp:discover"', 'code', 100);
    await L.log('ST: ssdp:all', 'code', 100);
    await L.log('MX: 1', 'code', 100);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 3: Spoofear src=victim y enviar ]', '[ STEP 3: Spoof src=victim and send ]'), 'header', 200);
    await L.log(`python3 ssdp_amp.py --target ${victim} --list ssdp_list.txt`, 'code', 300);
    for (let i = 0; i < 4; i++) {
      const devIP = `${rand(1,200)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
      await L.log(`M-SEARCH → ${devIP}:1900 (spoofed src: ${victim})`, 'send', 100);
    }
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 4: Respuestas XML a la víctima ]', '[ STEP 4: XML responses to the victim ]'), 'header', 200);
    for (let i = 0; i < 3; i++) {
      const devIP = `${rand(1,200)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
      await L.log(`${devIP}:1900 → ${victim}  HTTP/1.1 200 OK  ${respSize} bytes`, 'danger', 120);
    }
    await L.log(t(`... ×${devices.toLocaleString()} dispositivos ...`, `... ×${devices.toLocaleString()} devices ...`), 'danger', 200);
    await L.log('', 'info', 50);

    await L.log('[ IMPACTO ]', 'header', 200);
    await L.log(t(`Tráfico sobre víctima: ~${mbps} Mbps (${(parseFloat(mbps)/1000).toFixed(2)} Gbps)`, `Traffic on victim: ~${mbps} Mbps (${(parseFloat(mbps)/1000).toFixed(2)} Gbps)`), 'danger', 300);
    await L.log(t(`Amplificación: ${reqSize} B → ${respSize} B  (×${amp}x)`, `Amplification: ${reqSize} B → ${respSize} B  (×${amp}x)`), 'attack', 200);
    await L.log('', 'info', 50);
    await L.log('MITRE: T1498.002 — Reflection Amplification', 'info', 200);
    await L.log(t('Mitigación: deshabilitar UPnP en routers (interfaz WAN)', 'Mitigation: disable UPnP on routers (WAN interface)'), 'warn', 200);
  }

  return { runCompare, runFlood, runAmplification, runPortScan, resetScan,
           runDHCPStarvation, resetDHCP,
           runMemcached, resetMemc, runSSDP, resetSSDP, reset };

})();


window.udpDemo = udpDemo;
