/* wallsheet.js — draws the views on a wall sheet. One model, many views: every view of an object is
   drawn from its model (model_*.js), once as the RENDER (v1's Flash style) and once as the DRAWING in
   a hand (vellum, blue, glass, pencil). A cutaway shows both in one frame, split by a drafter's break
   line; on screen the seam drags (pointer, or arrow keys), in print it stands where the model puts it.
   The pencil hand is rough.js (vendor/rough.js, MIT, github.com/rough-stuff/rough); the others are
   crisp SVG. Colours are read from wallsheet_tokens.css by class or variable, never written here. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ?motion=all (the default) · data (only what the numbers drive) · still (the print, on screen)
  const motion = new URLSearchParams(location.search).get('motion');
  if (['all', 'data', 'still'].includes(motion)) document.documentElement.dataset.motion = motion;

  function el(name, attrs, parent) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const pts = (list) => list.map((p) => p.join(',')).join(' ');

  /* a crisp shape from a model part */
  function shape(p, cls, parent) {
    switch (p.t) {
      case 'rect':    return el('rect', { x: p.x, y: p.y, width: p.w, height: p.h, rx: p.rx, class: cls }, parent);
      case 'circle':  return el('circle', { cx: p.cx, cy: p.cy, r: p.r, class: cls }, parent);
      case 'ellipse': return el('ellipse', { cx: p.cx, cy: p.cy, rx: p.rx, ry: p.ry, class: cls }, parent);
      case 'line':    return el('line', { x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2, class: cls }, parent);
      case 'poly':    return el('polygon', { points: pts(p.pts), class: cls }, parent);
      case 'path':    return el('path', { d: p.d, class: cls }, parent);
    }
  }

  /* ── the render: v1's Flash style ── */
  function render(parts, g) {
    for (const p of parts) {
      if (p.t === 'g') {
        const gg = el('g', { class: p.anim || null, id: p.id, transform: p.transform }, g);
        if (p.origin) gg.style.transformOrigin = `${p.origin[0]}px ${p.origin[1]}px`;
        if (p.delay) gg.style.setProperty('--d', p.delay + 's');
        render(p.kids, gg);
      } else if (p.rc) {
        const s = shape(p, p.rc + (p.anim ? ' ' + p.anim : ''), g);
        if (p.style) s.setAttribute('style', p.style);
        if (p.delay) s.style.setProperty('--d', p.delay + 's');
      }
    }
  }

  /* ── the pens: crisp SVG, or rough.js for the pencil ── */
  const WEIGHT = { 'ln': 2, 'ln-open': 2, 'ln-heavy': 3.6, 'ln-heavy-fill': 3.6, 'ln-thin': 1.3, 'ln-fine': 1, 'ln-hidden': 1.5,
                   'ln-center': 1.2, 'ln-ext': 1, 'ln-tick': 2.6, 'ln-tag': 2, 'ln-dot': 1, 'ln-none': 0 };
  const HATCH = { bond: { angle: 90, gap: 29 }, roof: { angle: -35, gap: 14 }, earth: { angle: 45, gap: 12 } };   // rough.js: 90 is level

  function crispPen(g, id) {
    return {
      part(p, cls) {
        if (p.hatch) {
          shape(p, 'd-paper', g);
          shape(p, 'ln-none', g).setAttribute('fill', `url(#${id}-${p.hatch})`);
          if (cls !== 'ln-none') shape(p, cls === 'ln' ? 'ln-open' : cls, g).setAttribute('fill', 'none');
        } else shape(p, cls, g);
      },
      line: (x1, y1, x2, y2, cls) => el('line', { x1, y1, x2, y2, class: cls }, g),
      circle: (cx, cy, r, cls) => el('circle', { cx, cy, r, class: cls }, g),
      poly: (list, cls) => el('polygon', { points: pts(list), class: cls }, g)
    };
  }

  function roughPen(g, svg, hand) {
    const rc = rough.svg(svg);
    const css = getComputedStyle(hand);
    const LINE = css.getPropertyValue('--line').trim(), LINE2 = css.getPropertyValue('--line-2').trim();
    let seed = 11;
    const opts = (cls, extra) => Object.assign({
      seed: seed++, roughness: 1.25, bowing: 1.1, stroke: cls === 'ln-none' ? 'none' : (cls === 'ln-fine' ? LINE2 : LINE),
      strokeWidth: WEIGHT[cls] ?? 1.6, strokeLineDash: cls === 'ln-hidden' ? [12, 8] : cls === 'ln-center' ? [30, 8, 5, 8] : cls === 'ln-ext' ? [6, 6] : undefined
    }, extra || {});
    const draw = (p, o) => {
      switch (p.t) {
        case 'rect':    return rc.rectangle(p.x, p.y, p.w, p.h, o);
        case 'circle':  return rc.circle(p.cx, p.cy, p.r * 2, o);
        case 'ellipse': return rc.ellipse(p.cx, p.cy, p.rx * 2, p.ry * 2, o);
        case 'line':    return rc.line(p.x1, p.y1, p.x2, p.y2, o);
        case 'poly':    return rc.polygon(p.pts, o);
        case 'path':    return rc.path(p.d, o);
      }
    };
    return {
      part(p, cls) {
        if (p.t !== 'line') shape(p, 'd-paper', g);             // occlude what stands behind, as ink on paper does
        const extra = p.hatch ? { fill: LINE2, fillStyle: 'hachure', hachureAngle: HATCH[p.hatch].angle, hachureGap: HATCH[p.hatch].gap, fillWeight: 1 } : null;
        g.appendChild(draw(p, opts(cls, extra)));
      },
      line: (x1, y1, x2, y2, cls) => g.appendChild(rc.line(x1, y1, x2, y2, opts(cls))),
      circle: (cx, cy, r, cls) => {
        el('circle', { cx, cy, r, class: 'd-paper' }, g);
        g.appendChild(rc.circle(cx, cy, r * 2, opts(cls, cls === 'ln-dot' ? { fill: LINE, fillStyle: 'solid' } : null)));
      },
      poly: (list, cls) => {
        el('polygon', { points: pts(list), class: 'd-paper' }, g);
        g.appendChild(rc.polygon(list, opts(cls, cls === 'ln-dot' ? { fill: LINE, fillStyle: 'solid' } : null)));
      }
    };
  }

  /* ── the drawing: the model's parts in a hand, then its notes ── */
  function drawing(model, g, pen) {
    const walk = (parts, late) => {
      for (const p of parts) {
        if (p.t === 'g') walk(p.kids, late);
        else if (p.dc && !!p.last === late) pen.part(p, p.dc);
      }
    };
    walk(model.parts, false);
    walk(model.parts, true);                                    // hidden lines go on last, dashed
    notes(model, g, pen);
  }

  function text(g, x, y, str, cls, anchor) {
    const t = el('text', { x, y, class: cls, 'text-anchor': anchor || 'start' }, g);
    t.textContent = str;
    return t;
  }

  function notes(model, g, pen) {
    const N = model.notes;
    for (const c of N.centres) {
      pen.line(c.x, c.y1, c.x, c.y2, 'ln-center');
      pen.circle(c.x, c.y1 - 28, 26, 'ln-tag');
      text(g, c.x, c.y1 - 28, c.grid, 'ln-tagn', 'middle');
    }
    for (const l of N.levels) {
      if (l.from !== null) pen.line(l.from + 8, l.y, N.levelX - 6, l.y, 'ln-ext');
      pen.poly([[N.levelX - 12, l.y - 20], [N.levelX + 12, l.y - 20], [N.levelX, l.y]], 'ln-dot');
      text(g, 1434, l.y - 30, l.label, 'ln-lbl', 'end');
    }
    for (const d of N.dims) {
      pen.line(d.xs[0], d.y, d.xs[d.xs.length - 1], d.y, 'ln-thin');
      d.xs.forEach((x, i) => {
        pen.line(x, d.from, x, d.y + 16, 'ln-ext');
        pen.line(x - 10, d.y + 10, x + 10, d.y - 10, 'ln-tick');  // the architect's slash, not an arrow
        if (i) text(g, (d.xs[i - 1] + x) / 2, d.y - 14, d.labels[i - 1], 'ln-lbl', 'middle');
      });
    }
    for (const t of N.tags) {
      const [ax, ay] = t.at, [tx, ty] = t.tag, len = Math.hypot(ax - tx, ay - ty);
      pen.line(tx + (ax - tx) * 26 / len, ty + (ay - ty) * 26 / len, ax, ay, 'ln-thin');
      pen.circle(ax, ay, 5, 'ln-dot');
      const hex = Array.from({ length: 6 }, (_, i) => [tx + 25 * Math.cos(Math.PI / 6 + i * Math.PI / 3), ty + 25 * Math.sin(Math.PI / 6 + i * Math.PI / 3)]);
      pen.poly(hex, 'ln-tag');
      text(g, tx, ty + 1, String(t.n), 'ln-tagn', 'middle');
    }
  }

  /* the grounds each hand draws on: a hatch kit, and the paper's own texture */
  function defs(svg, id, hand) {
    const d = el('defs', {}, svg);
    const pat = (name, w, h, rot, draw) => {
      const p = el('pattern', { id: `${id}-${name}`, width: w, height: h, patternUnits: 'userSpaceOnUse', patternTransform: rot ? `rotate(${rot})` : null, y: name === 'bond' ? 470 : null }, d);
      draw(p);
    };
    pat('bond', 116, 58, 0, (p) => {                             // running bond, the masonry hatch
      el('path', { d: 'M0 0.6 H116 M0 29 H116 M0.6 0 V29 M58 29 V58', class: 'ln-fine' }, p);
    });
    pat('roof', 14, 14, -35, (p) => el('line', { x1: 0, y1: 0.6, x2: 14, y2: 0.6, class: 'ln-fine' }, p));
    pat('earth', 12, 12, 45, (p) => el('line', { x1: 0, y1: 0.6, x2: 12, y2: 0.6, class: 'ln-fine' }, p));
    if (hand === 'blue') pat('grid', 40, 40, 0, (p) => el('path', { d: 'M40 0 H0 V40', class: 'd-grid' }, p));
    if (hand === 'glass') {
      const rg = el('radialGradient', { id: `${id}-glow`, cx: '62%', cy: '30%', r: '75%' }, d);
      el('stop', { offset: '0', class: 'd-glow-a' }, rg); el('stop', { offset: '1', class: 'd-glow-b' }, rg);
    }
    if (hand === 'vellum') {
      const f = el('filter', { id: `${id}-mottle`, x: 0, y: 0, width: 1440, height: 960, filterUnits: 'userSpaceOnUse' }, d);
      el('feTurbulence', { type: 'fractalNoise', baseFrequency: '.006', numOctaves: 3, seed: 7, result: 'n' }, f);
      el('feColorMatrix', { in: 'n', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.8 0 0 0 -.62', result: 'a' }, f);
      el('feFlood', { class: 'd-mottle' }, f);
      el('feComposite', { in2: 'a', operator: 'in' }, f);
    }
    return d;
  }

  /* ── the cutaway: render left of the seam, drawing right of it, one frame ── */
  const seamPts = (sx, H) => [[sx, 0], [sx, 428], [sx + 28, 452], [sx - 28, 488], [sx, 512], [sx, H]];

  function cutaway(svg) {
    const model = window.MODELS[svg.dataset.model], hand = svg.dataset.hand, id = svg.id;
    const W = model.W, H = model.H;
    svg.classList.add(`hand-${hand}`);                          // the hatch patterns in <defs> inherit the hand from here
    const d = defs(svg, id, hand);
    const clipR = el('polygon', {}, el('clipPath', { id: `${id}-r` }, d));
    const clipD = el('polygon', {}, el('clipPath', { id: `${id}-d` }, d));

    const gD = el('g', { 'clip-path': `url(#${id}-d)`, class: `hand-${hand}` }, svg);
    el('rect', { width: W, height: H, class: 'd-paper' }, gD);
    if (hand === 'blue') el('rect', { width: W, height: H, fill: `url(#${id}-grid)` }, gD);
    if (hand === 'glass') el('rect', { width: W, height: H, fill: `url(#${id}-glow)` }, gD);
    if (hand === 'vellum') el('rect', { width: W, height: H, filter: `url(#${id}-mottle)`, opacity: .28 }, gD);
    const ink = el('g', {}, gD);
    drawing(model, ink, hand === 'pencil' ? roughPen(ink, svg, gD) : crispPen(ink, id));

    const gR = el('g', { 'clip-path': `url(#${id}-r)`, class: 'render' }, svg);
    render(model.parts, gR);

    const shade = el('polyline', { class: 'seam', transform: 'translate(7 0)', opacity: .22, 'clip-path': `url(#${id}-d)` }, svg);
    const seam = el('polyline', { class: 'seam' }, svg);
    const knob = el('g', {}, svg);
    el('circle', { cx: 0, cy: 470, r: 30, class: 'knob' }, knob);
    el('path', { d: 'M-8 458 L-19 470 L-8 482 Z M8 458 L19 470 L8 482 Z', class: 'knob-a' }, knob);

    let sx;
    const set = (x) => {
      sx = Math.max(40, Math.min(W - 40, x));
      const s = seamPts(sx, H);
      clipR.setAttribute('points', pts([[0, 0], ...s, [0, H]]));
      clipD.setAttribute('points', pts([[W, 0], ...s, [W, H]]));
      seam.setAttribute('points', pts(s));
      shade.setAttribute('points', pts(s));
      knob.setAttribute('transform', `translate(${sx} 0)`);
      svg.setAttribute('aria-valuenow', Math.round(sx / W * 100));
    };
    set(model.seam);

    const toView = (e) => {
      const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
      return p.matrixTransform(svg.getScreenCTM().inverse()).x;
    };
    let dragging = false;
    svg.addEventListener('pointerdown', (e) => { dragging = true; svg.setPointerCapture(e.pointerId); set(toView(e)); });
    svg.addEventListener('pointermove', (e) => { if (dragging) set(toView(e)); });
    svg.addEventListener('pointerup', () => { dragging = false; });
    svg.addEventListener('pointercancel', () => { dragging = false; });
    svg.addEventListener('dblclick', () => set(model.seam));
    svg.addEventListener('keydown', (e) => {
      const step = { ArrowLeft: -48, ArrowRight: 48 }[e.key];
      if (step) { set(sx + step); e.preventDefault(); }
      if (e.key === 'Home') { set(0); e.preventDefault(); }
      if (e.key === 'End') { set(W); e.preventDefault(); }
    });
    window.addEventListener('beforeprint', () => set(model.seam));
  }

  // the pieces other sheets build with (sheet_clock.js and the like)
  /* the event nights' glyphs, drawn in ink at a centre (7.2-7.4, C-101's; the burrow, 19 Oct). Shared by the sheets
     that name an event: C-101's clock, C-201's draw */
  const at = (x, y, s) => `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;
  const EVENT = {
    fog: (g, x, y, s) => el('path', { d: `M${x - 22 * s} ${y + 8 * s} a10 10 0 0 1 4 -18 a13 13 0 0 1 24 -6 a11 11 0 0 1 18 8 a9 9 0 0 1 -2 16 Z`, class: 'sc-glyph', transform: at(x, y, s) }, g),
    air: (g, x, y, s) => el('path', { d: `M${x - 26} ${y} Q${x - 14} ${y - 16} ${x - 4} ${y - 4} L${x} ${y - 10} L${x + 4} ${y - 4} Q${x + 14} ${y - 16} ${x + 26} ${y} Q${x + 12} ${y - 2} ${x + 6} ${y + 8} L${x} ${y + 2} L${x - 6} ${y + 8} Q${x - 12} ${y - 2} ${x - 26} ${y} Z`, class: 'sc-glyphf', transform: at(x, y, s) }, g),
    insurgents: (g, x, y, s) => {
      el('path', { d: `M${x - 18} ${y + 20} L${x - 10} ${y - 8} Q${x} ${y - 26} ${x + 10} ${y - 8} L${x + 18} ${y + 20} Z`, class: 'sc-glyphf', transform: at(x, y, s) }, g);
      el('circle', { cx: x, cy: y - 4, r: 6, class: 'sc-pip', transform: at(x, y, s) }, g);
    },
    burrow: (g, x, y, s) => {
      el('path', { d: `M${x - 26} ${y + 16} Q${x - 16} ${y - 14} ${x} ${y - 16} Q${x + 16} ${y - 14} ${x + 26} ${y + 16} Z`, class: 'sc-glyphf', transform: at(x, y, s) }, g);
      el('ellipse', { cx: x, cy: y + 4, rx: 8, ry: 5, class: 'sc-pip', transform: at(x, y, s) }, g);
    }
  };

  window.WALL = { el, pts, shape, render, text, crispPen, EVENT };

  const start = () => document.querySelectorAll('svg.view[data-model]').forEach(cutaway);
  // the pencil's lettering and the rough lines read fonts and tokens; wait for both
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
})();
