/* ── Matrix Rain (easter egg) ──
 * Fondo animado tipo "lluvia Matrix" que solo se activa mientras el mouse
 * está sobre el crédito "by Javier Mapelli" (.site-author) en el header.
 * Vive detrás de todo el contenido (canvas fijo, z-index:-1, pointer-events:none)
 * así que nunca bloquea clics ni tapa el hub.
 */
(function () {
  const canvas = document.getElementById('matrix-rain');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*+=-~`<>()[]{}|/\\';
  const fontSize = 18;
  const speed = 1;
  const brightProbability = 0.08;

  let width = 0;
  let height = 0;
  let drops = [];
  let rafId = null;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / fontSize);
    const newDrops = [];
    for (let i = 0; i < columns; i++) {
      newDrops[i] = drops[i] !== undefined ? drops[i] : Math.floor(Math.random() * -100);
    }
    drops = newDrops;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (Math.random() < brightProbability) {
        ctx.fillStyle = '#b0ffb0';
      } else {
        const intensity = 80 + Math.floor(Math.random() * 100);
        ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
      }

      ctx.fillText(char, x, y);
      drops[i] += speed;

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      if (Math.random() > 0.999) {
        drops[i] = 0;
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (rafId !== null) return; // ya corriendo
    resize();
    canvas.classList.add('active');
    rafId = requestAnimationFrame(draw);
  }

  function stop() {
    canvas.classList.remove('active');
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    // Limpia el canvas para que no quede un residuo negro al volver a activarlo
    ctx.clearRect(0, 0, width, height);
  }

  window.addEventListener('resize', () => {
    if (rafId !== null) resize();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('.site-author');
    if (!trigger) return;
    trigger.addEventListener('mouseenter', start);
    trigger.addEventListener('mouseleave', stop);
    // Soporte táctil: activar con un tap sostenido / focus también
    trigger.addEventListener('focus', start);
    trigger.addEventListener('blur', stop);
  });
})();
