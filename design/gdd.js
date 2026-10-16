/* gdd.js — the living parts of the design document: the sky, the clock (night/day), the rail,
   the towns' tabs tied to the map, the nights strip, the rituals and the boss, the council filter,
   and the Warcraft-style tooltip. Colours come from warglass_tokens.css (GAME-07). */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const tok = () => getComputedStyle(root);

  // ── the sky: slow stars, drifting embers; both read the tokens each frame so day fades them ──
  const canvas = document.getElementById('sky');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, stars = [], embers = [];
  function size() {
    W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight;
    stars = Array.from({ length: Math.round(W * H / 8000) }, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.85, r: Math.random() * 1.3 + .3,
      p: Math.random() * Math.PI * 2, s: .4 + Math.random() * .8
    }));
    embers = Array.from({ length: 22 }, () => ember(true));
  }
  function ember(init) {
    return { x: Math.random() * W, y: init ? Math.random() * H : H + 10, v: .15 + Math.random() * .35,
      d: (Math.random() - .5) * .25, r: .8 + Math.random() * 1.6, a: .3 + Math.random() * .5, life: 0 };
  }
  function draw(t) {
    const T = tok();
    const STAR = T.getPropertyValue('--star-rgb').trim(), SA = parseFloat(T.getPropertyValue('--star-alpha')) || 0;
    const EMBER = T.getPropertyValue('--ember-rgb').trim();
    ctx.clearRect(0, 0, W, H);
    if (SA > 0) for (const s of stars) {
      const tw = reduced ? 1 : .55 + .45 * Math.sin(t * .0006 * s.s + s.p);
      ctx.fillStyle = `rgba(${STAR},${SA * tw})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduced) {
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.v; e.x += e.d + Math.sin((t * .001) + i) * .15; e.life += 1;
        if (e.y < -10) embers[i] = ember(false);
        const a = e.a * Math.min(1, e.life / 120) * (e.y / H) * (root.hasAttribute('data-day') ? .35 : 1);
        ctx.fillStyle = `rgba(${EMBER},${a})`;
        ctx.shadowColor = `rgba(${EMBER},.8)`; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(draw);   // reduced motion: one still frame, no loop
    }
  }
  window.addEventListener('resize', () => { size(); if (reduced) draw(0); }); size(); requestAnimationFrame(draw);

  // ── the clock: night (default) or day; remembered per viewer ──
  const clock = document.getElementById('clock');
  const cState = document.getElementById('clock-state'), cSub = document.getElementById('clock-sub');
  function setDay(day, save) {
    if (day) root.setAttribute('data-day', ''); else root.removeAttribute('data-day');
    clock.setAttribute('aria-pressed', String(day));
    cState.textContent = day ? 'Day' : 'Night';
    cSub.textContent = day ? 'the push window' : 'the waves come';
    if (save) { try { localStorage.setItem('tfd-day', day ? '1' : '0'); } catch (_) { /* storage may be blocked; the page is fine without it */ } }
    if (reduced) draw(0);
  }
  try { setDay(localStorage.getItem('tfd-day') === '1', false); } catch (_) { setDay(false, false); }
  clock.addEventListener('click', () => setDay(!root.hasAttribute('data-day'), true));

  // ── panels wake as you reach them; the rail follows ──
  const panels = [...document.querySelectorAll('.panel')];
  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .08 });
  panels.forEach(p => io.observe(p));
  const rail = [...document.querySelectorAll('.rail a')];
  const byHash = new Map(rail.map(a => [a.getAttribute('href').slice(1), a]));
  const io2 = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      rail.forEach(a => a.classList.toggle('is-active', byHash.get(id) === a));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  panels.forEach(p => io2.observe(p));

  // ── the towns: tabs and the map agree ──
  const tabs = [...document.querySelectorAll('.tab[data-town]')];
  const mapTowns = [...document.querySelectorAll('.map g[data-town]')];
  function showTown(name) {
    tabs.forEach(t => { const on = t.dataset.town === name; t.setAttribute('aria-selected', String(on)); document.getElementById('town-' + t.dataset.town).hidden = !on; });
    mapTowns.forEach(g => g.classList.toggle('is-on', g.dataset.town === name));
  }
  tabs.forEach(t => t.addEventListener('click', () => showTown(t.dataset.town)));
  mapTowns.forEach(g => {
    g.addEventListener('click', () => showTown(g.dataset.town));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showTown(g.dataset.town); } });
  });
  showTown('hill');

  // ── the nights: 13 sealed; the hard mode, planned, doubles it ──
  const strip = document.getElementById('nights-strip'), out = document.getElementById('nights-out'), modes = [...document.querySelectorAll('[data-nights]')];
  function renderNights(n) {
    out.textContent = `${n} nights · ~${Math.round(n * 3)} min`;
    strip.innerHTML = '';
    for (let i = 1; i <= n; i++) {
      const el = document.createElement('div');
      el.className = 'night' + (i === n ? ' final' : '') + (i > 1 ? ' push' : '');
      el.setAttribute('data-tt-title', i === n ? `Night ${i} · the final wave` : `Night ${i}`);
      el.setAttribute('data-tt', i === 1 ? 'The first wave. The day before it is for building.' : i === n ? 'Hold until relief. The King\'s army arrives. The boss comes weakened by every ritual torn down.' : i === 3 ? 'A wave on each gate. A night like this may also bring an event: an air raid, insurgents in the base, an evil fog (unsealed).' : 'A wave on each gate. The day before it was a push window: go north, raid, break a ritual.');
      el.setAttribute('tabindex', '0');
      el.innerHTML = `<span class="d"></span><span class="n"><b>${i}</b></span>`;
      strip.appendChild(el);
    }
  }
  modes.forEach(b => b.addEventListener('click', () => { modes.forEach(x => x.setAttribute('aria-pressed', String(x === b))); renderNights(+b.dataset.nights); }));
  renderNights(13);

  // ── the rituals and the boss ──
  const rituals = [...document.querySelectorAll('.ritual')], bossBar = document.getElementById('boss-bar'), bossOut = document.getElementById('boss-out');
  function boss() {
    const down = rituals.filter(r => r.getAttribute('aria-pressed') === 'true').length;
    const w = [100, 70, 40, 0][down];
    bossBar.style.setProperty('--w', w + '%');
    bossOut.textContent = down === 0 ? 'full strength' : down === 3 ? 'all three down: the match ends early' : `${down} of 3 rituals down · weakened`;
  }
  rituals.forEach(r => r.addEventListener('click', () => { r.setAttribute('aria-pressed', String(r.getAttribute('aria-pressed') !== 'true')); boss(); }));
  boss();

  // ── the council filter ──
  const filters = [...document.querySelectorAll('[data-filter]')], verdicts = [...document.querySelectorAll('.verdict')];
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.setAttribute('aria-pressed', String(x === f)));
    verdicts.forEach(v => { v.hidden = f.dataset.filter !== 'all' && v.dataset.v !== f.dataset.filter; });
  }));

  // ── the tooltip: gold title, white body, a blue cost line ──
  const tip = document.getElementById('tip');
  let tipFor = null;
  function showTip(el) {
    tipFor = el;
    tip.innerHTML = '';
    const b = document.createElement('b'); b.textContent = el.dataset.ttTitle || ''; tip.appendChild(b);
    tip.appendChild(document.createTextNode(el.dataset.tt || ''));
    if (el.dataset.ttCost) { const i = document.createElement('i'); i.textContent = el.dataset.ttCost; tip.appendChild(i); }
    tip.classList.add('show'); tip.setAttribute('aria-hidden', 'false');
    placeTip(el.getBoundingClientRect());
  }
  function placeTip(r) {
    const w = tip.offsetWidth, h = tip.offsetHeight, pad = 10;
    let x = r.left + r.width / 2 - w / 2, y = r.top - h - pad;
    if (y < pad) y = r.bottom + pad;
    x = Math.max(pad, Math.min(window.innerWidth - w - pad, x));
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hideTip() { tipFor = null; tip.classList.remove('show'); tip.setAttribute('aria-hidden', 'true'); }
  document.addEventListener('mouseover', (e) => { const el = e.target.closest('[data-tt]'); if (el && el !== tipFor) showTip(el); else if (!el && tipFor) hideTip(); });
  document.addEventListener('focusin', (e) => { const el = e.target.closest('[data-tt]'); if (el) showTip(el); });
  document.addEventListener('focusout', (e) => { if (e.target.closest && e.target.closest('[data-tt]')) hideTip(); });
  document.addEventListener('scroll', () => { if (tipFor) placeTip(tipFor.getBoundingClientRect()); }, { passive: true });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideTip(); });
})();
