/* brief.js — the living parts of the brief: the night sky, the plates waking as you reach them,
   the rail, and the hall's music (generated in the browser; swap for a real track by replacing
   startMusic/stopMusic with an <audio> element if one is ever chosen). */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // colours come from deck_vellum_tokens.css (GAME-07); a missing token draws nothing, never a wrong colour
  const tok = getComputedStyle(document.documentElement);
  const STAR = tok.getPropertyValue('--star-rgb').trim(), EMBER = tok.getPropertyValue('--ember-rgb').trim();

  // ── the sky: slow stars and a few drifting embers ──
  const canvas = document.getElementById('sky');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, stars = [], embers = [];
  function size() {
    W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight;
    stars = Array.from({ length: Math.round(W * H / 9000) }, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.9, r: Math.random() * 1.2 + .3,
      p: Math.random() * Math.PI * 2, s: .4 + Math.random() * .8
    }));
    embers = Array.from({ length: 18 }, () => ember(true));
  }
  function ember(init) {
    return { x: Math.random() * W, y: init ? Math.random() * H : H + 10, v: .15 + Math.random() * .35,
      d: (Math.random() - .5) * .25, r: .8 + Math.random() * 1.6, a: .3 + Math.random() * .5, life: 0 };
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const tw = reduced ? 1 : .55 + .45 * Math.sin(t * .0006 * s.s + s.p);
      ctx.fillStyle = `rgba(${STAR},${.35 * tw})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduced) {
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.v; e.x += e.d + Math.sin((t * .001) + i) * .15; e.life += 1;
        if (e.y < -10) embers[i] = ember(false);
        const a = e.a * Math.min(1, e.life / 120) * (e.y / H);
        ctx.fillStyle = `rgba(${EMBER},${a})`;
        ctx.shadowColor = `rgba(${EMBER},.8)`; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    if (!reduced) requestAnimationFrame(draw);   // reduced motion: one still frame, no loop
  }
  window.addEventListener('resize', () => { size(); if (reduced) draw(0); }); size(); requestAnimationFrame(draw);

  // ── plates wake as you reach them; the rail follows ──
  const plates = [...document.querySelectorAll('.slide')];
  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .12 });
  plates.forEach(p => io.observe(p));

  const rail = [...document.querySelectorAll('.rail a[data-plate]')];
  const sections = rail.map(a => document.getElementById(a.dataset.plate)).filter(Boolean);
  const io2 = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) rail.forEach(a => a.classList.toggle('is-active', a.dataset.plate === e.target.id)); });
  }, { threshold: .4 });
  sections.forEach(s => io2.observe(s));

  // ── the hall's music: a low hall drone, a slow fifth, and a lute string now and then ──
  let ac = null, master = null, nodes = [], pluckTimer = null;
  function startMusic() {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
    master.gain.linearRampToValueAtTime(.16, ac.currentTime + 3);
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = .6; lp.connect(master);
    // the drone: D2 and A2, slightly detuned, slowly breathing
    [[73.42, 0], [73.42, 4], [110, -3], [146.83, 2]].forEach(([f, det], i) => {
      const o = ac.createOscillator(); o.type = i % 2 ? 'triangle' : 'sawtooth'; o.frequency.value = f; o.detune.value = det;
      const g = ac.createGain(); g.gain.value = i < 2 ? .22 : .12;
      const lfo = ac.createOscillator(); lfo.frequency.value = .05 + i * .013; const lg = ac.createGain(); lg.gain.value = .06;
      lfo.connect(lg); lg.connect(g.gain); lfo.start();
      o.connect(g); g.connect(lp); o.start(); nodes.push(o, lfo);
    });
    // the lute: a plucked note from a dorian set, every few seconds
    const notes = [146.83, 174.61, 196, 220, 246.94, 293.66, 329.63];
    const pluck = () => {
      const o = ac.createOscillator(); o.type = 'triangle'; o.frequency.value = notes[Math.floor(Math.random() * notes.length)] * (Math.random() < .3 ? 2 : 1);
      const g = ac.createGain(); const t = ac.currentTime;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09, t + .01); g.gain.exponentialRampToValueAtTime(.0008, t + 2.6);
      const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1800;
      o.connect(f); f.connect(g); g.connect(master); o.start(t); o.stop(t + 2.8);
      pluckTimer = setTimeout(pluck, 1800 + Math.random() * 4200);
    };
    pluckTimer = setTimeout(pluck, 1200);
  }
  function stopMusic() {
    if (!ac) return;
    clearTimeout(pluckTimer);
    master.gain.linearRampToValueAtTime(0, ac.currentTime + 1.2);
    // expected: stop() throws InvalidStateError on a node that already stopped; ok to swallow,
    // because the context closes on the next line and releases every node either way.
    const a = ac; setTimeout(() => { nodes.forEach(n => { try { n.stop(); } catch (_) { /* expected, see above */ } }); a.close(); }, 1400);
    ac = null; nodes = [];
  }
  const btn = document.getElementById('music');
  btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', on); btn.classList.toggle('on', on);
    btn.textContent = on ? '♪  The hall hums' : '♪  The hall is quiet';
    on ? startMusic() : stopMusic();
  });
})();
