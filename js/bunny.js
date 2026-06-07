/* ================================================
   BUNNY.JS — Natural scroll-driven bunny smile
   Locks at gentle arc (max h=7px) at 55% scroll.
   Based on reference: compact upward curve, not wide.
================================================ */

var SMILE_FRAMES = [
  { w: 12, h: 0,  top: 43 },  // 0%  — neutral flat line
  { w: 14, h: 2,  top: 43 },  // 14% — barely there
  { w: 16, h: 4,  top: 42 },  // 28% — gentle hint
  { w: 18, h: 6,  top: 42 },  // 42% — soft smile
  { w: 20, h: 7,  top: 41 },  // 55% — NATURAL RESTING SMILE ← LOCK POINT
];
var SMILE_LOCK = 0.55;

function updateBunnySmile(scrollPct) {
  var mouth = document.getElementById('bunnyMouth');
  if (!mouth) return;

  // clamp: never animate beyond the lock point
  var clamped = Math.min(scrollPct, SMILE_LOCK);
  var raw     = (clamped / SMILE_LOCK) * (SMILE_FRAMES.length - 1);
  var lo      = Math.floor(raw);
  var hi      = Math.min(lo + 1, SMILE_FRAMES.length - 1);
  var t       = raw - lo;

  var a = SMILE_FRAMES[lo];
  var b = SMILE_FRAMES[hi];

  function lerp(x, y) { return x + (y - x) * t; }

  mouth.style.width     = lerp(a.w,   b.w)   + 'px';
  mouth.style.height    = lerp(a.h,   b.h)   + 'px';
  mouth.style.top       = lerp(a.top, b.top) + 'px';
  mouth.style.left      = '50%';
  mouth.style.transform = 'translateX(-50%)';
}
