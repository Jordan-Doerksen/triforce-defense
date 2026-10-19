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
    // 1.5, clarified by the owner on T-101: the mountains ring the hill, the ridge on the west and its
    // spurs north-west and south-west of the town; the hill is their foothill, and its high ground
    // falls away east to the falls and south to the valley
    spurs: {
      nw: [[80, 190], [96, 186], [84, 178]],
      sw: [[86, 298], [110, 304], [134, 298], [96, 326], [122, 332], [84, 352], [108, 358]]
    },
    forest: [588, 10, 630, 430],             // and a thick forest down the whole east
    towns: {
      hill:   { x: 76,  y: 204, w: 88,  h: 60, gate: [120, 204] },
      valley: { x: 262, y: 338, w: 112, h: 72, gate: [318, 338] },
      forest: { x: 466, y: 218, w: 104, h: 60, gate: [518, 218] }
    },
    // the river runs downhill the whole way (1.5, clarified): from a spring high in the ridge, out of
    // the mountains into the hill's west wall, across the town, over the falls at its east wall, then
    // down past the bridge into the valley's lake. Plate I drew the upper reach out of the north; this
    // reach replaces it, and meets the town model's river at the walls.
    spring: [24, 132],
    river: [
      'M24 132 C30 146, 34 164, 44 180 C52 193, 62 207, 76 213 C82 215, 88 215.5, 93 216.8 C98 218.3, 100 220.2, 103.3 221.1 C108 222.4, 111 222.7, 115.6 222.8 C120 223, 124 223.7, 128.8 223.7 C134 223.6, 140 222.6, 146.4 222.8 C152 223, 158 223.6, 164 224',
      'M176 246 C179.0 247.7, 189.3 251.3, 194 256 C198.7 260.7, 199.0 270.0, 204 274 C209.0 278.0, 218.0 277.3, 224 280 C230.0 282.7, 235.7 285.7, 240 290 C244.3 294.3, 249.7 299.3, 250 306 C250.3 312.7, 246.0 322.7, 242 330 C238.0 337.3, 227.3 343.0, 226 350 C224.7 357.0, 228.0 365.3, 234 372 C240.0 378.7, 255.3 387.2, 262 390 C268.7 392.8, 272.0 389.2, 274 389'
    ],
    falls: [164, 224, 180, 246],
    // the relief, for M-101 (heights in drawing units, [ ] drawn, not sealed): the floor is a bowl that
    // falls to the valley's lake; the hill's high ground is a plateau, a cliff where the falls drop and
    // a ramp south of them, where the road goes down beside the falls; the ridge stands over it all
    relief: {
      floor: 14, low: [300, 384], bowl: 320,
      // its edges, each with the width its slope runs out over: north (a slope the waves climb to the
      // gate), east (the cliff the falls drop), south-east and south (the ramp), west (into the ridge)
      plateau: { z: 46, poly: [[66, 182], [168, 182], [168, 262], [148, 290], [66, 302]], slope: [14, 5, 26, 26, 0] },
      ridge: { z: 96, x: 70, face: 10 },
      spur: { z: 64, r: 15 }
    },
    // the section M-101 cuts, jogged so it takes all three towns: west to east through the ridge, the
    // hill and the falls, down through the valley and its lake, up through the forest town
    section: [[12, 232], [214, 232], [214, 376], [420, 376], [420, 246], [628, 246]],
    // across the wild, from the end of the hill's short road to the end of the forest's: open ground
    crossing: [[176, 148], [488, 160]],
    lake: 'M268 386 C 272 368, 306 362, 324 372 S 342 400, 318 404 S 270 404, 268 386 Z',
    roads: {
      hillValley: 'M150 264 C153.7 266.7, 163.0 274.7, 172 280 C181.0 285.3, 193.3 289.7, 204 296 C214.7 302.3, 226.3 308.7, 236 318 C245.7 327.3, 257.7 346.3, 262 352',
      valleyForest: 'M374 362 C378.7 360.3, 393.0 358.0, 402 352 C411.0 346.0, 420.7 334.7, 428 326 C435.3 317.3, 439.7 309.7, 446 300 C452.3 290.3, 462.7 273.3, 466 268'
    },
    shortRoads: ['M128 202 C 136 186, 150 168, 176 148', 'M326 334 C 330 290, 338 220, 346 158', 'M512 214 C 506 196, 498 180, 488 160'],
    bridge: [243.7, 326.7, 51.4]             // the bridge on the hill-valley road (non-negotiable)
  };
})();
