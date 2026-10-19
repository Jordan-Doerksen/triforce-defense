/* model_province.js — THE PROVINCE (Decisions 1.2 · 1.5, amended), as one model: the overrun north, the
   three towns, the river, the roads, the ridge and the forest. The geometry is Plate I's map
   (design/index.html), redrawn to the 1.5 amendment and called accurate by the owner's corrections;
   T-101's locator draws from it now, M-101 will later. Coordinates: Plate I's 640 x 470 frame. */
(function () {
  (window.MODELS = window.MODELS || {}).province = {
    W: 640, H: 440, frame: [10, 10, 630, 430],
    wild: 'M10 10 H630 V150 Q560 178 480 168 Q400 158 320 174 Q240 190 160 172 Q90 160 10 178 Z',
    rituals: [[200, 96], [330, 72], [470, 102]],
    ridge: [10, 10, 70, 430],                // 1.5 amended: a mountain ridge down the whole west border
    forest: [588, 10, 630, 430],             // and a thick forest down the whole east
    towns: {
      hill:   { x: 76,  y: 204, w: 88,  h: 60, gate: [120, 204] },
      valley: { x: 262, y: 338, w: 112, h: 72, gate: [318, 338] },
      forest: { x: 466, y: 218, w: 104, h: 60, gate: [518, 218] }
    },
    river: [
      'M66 10 C66.7 14.7, 70.3 29.3, 70 38 C69.7 46.7, 62.0 54.7, 64 62 C66.0 69.3, 73.3 76.3, 82 82 C90.7 87.7, 109.0 89.3, 116 96 C123.0 102.7, 126.7 114.0, 124 122 C121.3 130.0, 106.3 136.0, 100 144 C93.7 152.0, 86.3 162.3, 86 170 C85.7 177.7, 96.0 184.3, 98 190 C100.0 195.7, 96.0 199.7, 98 204 C100.0 208.3, 104.3 215.0, 110 216 C115.7 217.0, 125.3 209.0, 132 210 C138.7 211.0, 144.7 219.3, 150 222 C155.3 224.7, 161.7 225.3, 164 226',
      'M176 246 C179.0 247.7, 189.3 251.3, 194 256 C198.7 260.7, 199.0 270.0, 204 274 C209.0 278.0, 218.0 277.3, 224 280 C230.0 282.7, 235.7 285.7, 240 290 C244.3 294.3, 249.7 299.3, 250 306 C250.3 312.7, 246.0 322.7, 242 330 C238.0 337.3, 227.3 343.0, 226 350 C224.7 357.0, 228.0 365.3, 234 372 C240.0 378.7, 255.3 387.2, 262 390 C268.7 392.8, 272.0 389.2, 274 389'
    ],
    falls: [164, 224, 180, 246],
    lake: 'M268 386 C 272 368, 306 362, 324 372 S 342 400, 318 404 S 270 404, 268 386 Z',
    roads: {
      hillValley: 'M150 264 C153.7 266.7, 163.0 274.7, 172 280 C181.0 285.3, 193.3 289.7, 204 296 C214.7 302.3, 226.3 308.7, 236 318 C245.7 327.3, 257.7 346.3, 262 352',
      valleyForest: 'M374 362 C378.7 360.3, 393.0 358.0, 402 352 C411.0 346.0, 420.7 334.7, 428 326 C435.3 317.3, 439.7 309.7, 446 300 C452.3 290.3, 462.7 273.3, 466 268'
    },
    shortRoads: ['M128 202 C 136 186, 150 168, 176 148', 'M326 334 C 330 290, 338 220, 346 158', 'M512 214 C 506 196, 498 180, 488 160'],
    bridge: [243.7, 326.7, 51.4]             // the bridge on the hill-valley road (non-negotiable)
  };
})();
