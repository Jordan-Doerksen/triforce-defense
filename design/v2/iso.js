/* iso.js — an isometric renderer for the art face, in v1's Flash style: flat faces, black ink outlines.
   The convention follows the isometric SVG libraries (elchininet/isometric and the like) without the
   dependency: plan x east, y south, z up; the camera stands to the north-east, so the north and east
   faces of a box show, and its top. Everything is queued with a depth and drawn far to near.
   Materials are CSS classes i-<mat>-t (top), -n (north face), -e (east face), in wallsheet_ds.css. */
(function () {
  const { el, pts, render } = window.WALL;
  const C30 = Math.cos(Math.PI / 6);

  window.ISO = function (g, view) {
    // view: { H: the plan's depth, k: scale, ox, oy: where the plan's south-west corner lands }
    const P = (x, y, z = 0) => [view.ox + ((view.H - y) - x) * C30 * view.k, view.oy + (((view.H - y) + x) * .5 - z) * view.k];
    const queue = [];
    const at = (depth, fn) => queue.push({ depth, fn });
    const poly = (parent, list, cls) => el('polygon', { points: pts(list.map((p) => P(...p))), class: cls }, parent);

    const api = {
      P,
      depth: (x, y) => (view.H - y) + x,                         // larger is nearer the camera
      // a box, its footprint x0..x1, y0..y1, from z0 up h
      box(x0, y0, x1, y1, z0, h, mat, d) {
        at(d ?? api.depth((x0 + x1) / 2, (y0 + y1) / 2), (p) => {
          poly(p, [[x0, y0, z0], [x1, y0, z0], [x1, y0, z0 + h], [x0, y0, z0 + h]], `i-${mat}-n`);
          poly(p, [[x1, y0, z0], [x1, y1, z0], [x1, y1, z0 + h], [x1, y0, z0 + h]], `i-${mat}-e`);
          poly(p, [[x0, y0, z0 + h], [x1, y0, z0 + h], [x1, y1, z0 + h], [x0, y1, z0 + h]], `i-${mat}-t`);
        });
      },
      // a hip roof on a box's top, rising rh to its ridge point
      roof(x0, y0, x1, y1, z, rh, mat, d) {
        const a = [(x0 + x1) / 2, (y0 + y1) / 2, z + rh];
        at((d ?? api.depth((x0 + x1) / 2, (y0 + y1) / 2)) + .5, (p) => {
          poly(p, [[x0, y1, z], [x1, y1, z], a], `i-${mat}-e`);
          poly(p, [[x0, y0, z], [x0, y1, z], a], `i-${mat}-e`);
          poly(p, [[x0, y0, z], [x1, y0, z], a], `i-${mat}-n`);
          poly(p, [[x1, y0, z], [x1, y1, z], a], `i-${mat}-t`);
        });
      },
      // a flat shape on the ground (or at height z): a list of plan points
      flat(list, cls, d, z = 0) { at(d ?? -1e4, (p) => poly(p, list.map(([x, y]) => [x, y, z]), cls)); },
      // a ring on the ground: a circle in plan, an ellipse on screen
      ring(cx, cy, r, cls, d, z = 0) {
        const list = Array.from({ length: 28 }, (_, i) => [cx + r * Math.cos(i * Math.PI / 14), cy + r * Math.sin(i * Math.PI / 14), z]);
        at(d ?? api.depth(cx, cy) - 40, (p) => poly(p, list, cls));
      },
      // a figure from figures.js, drawn at its own origin and stood at x, y
      sprite(parts, x, y, s, z = 0, cls) {
        at(api.depth(x, y) + 1, (p) => {
          const [sx, sy] = P(x, y, z);
          render(parts, el('g', { transform: `translate(${sx} ${sy}) scale(${s * view.k})`, class: cls || null }, p));
        });
      },
      // anything else, drawn by a function given the parent and the projection
      custom(d, fn) { at(d, (p) => fn(p, P)); },
      draw() { queue.sort((a, b) => a.depth - b.depth).forEach((q) => q.fn(g)); queue.length = 0; }
    };
    return api;
  };
})();
