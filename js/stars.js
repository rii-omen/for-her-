/* ================================================
   STARS.JS — Night sky canvas
================================================ */
var starCanvas = document.getElementById('starCanvas');
var starCtx    = starCanvas.getContext('2d');
var stars      = [];
var starRafId;

function resizeStarCanvas() {
  starCanvas.width  = window.innerWidth;
  starCanvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
}

function generateStars() {
  stars = [];
  for (var i = 0; i < 200; i++) {
    stars.push({
      x:  Math.random() * starCanvas.width,
      y:  Math.random() * starCanvas.height,
      r:  0.4 + Math.random() * 1.9,
      ph: Math.random() * Math.PI * 2,
      sp: 0.4 + Math.random() * 1.8,
      c:  Math.random() > 0.55 ? '#f9d5ff' : '#fffde7'
    });
  }
}

function drawStars(nightPct) {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  var t = Date.now() / 1000;
  for (var i = 0; i < stars.length; i++) {
    var s  = stars[i];
    var fl = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starCtx.fillStyle  = s.c;
    starCtx.globalAlpha = nightPct * fl;
    starCtx.fill();
  }
  starCtx.globalAlpha = 1;
}

function animateStars(nightPct) {
  cancelAnimationFrame(starRafId);
  if (nightPct <= 0.01) {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    return;
  }
  drawStars(nightPct);
  starRafId = requestAnimationFrame(function() { animateStars(nightPct); });
}

function applyNight(nightPct) {
  document.getElementById('bg-day').style.opacity   = 1 - nightPct;
  document.getElementById('bg-night').style.opacity = nightPct;
  starCanvas.style.opacity = nightPct;
  animateStars(nightPct);
  if (nightPct > 0.05) {
    document.body.classList.add('night-mode');
  } else {
    document.body.classList.remove('night-mode');
  }
}

// init
resizeStarCanvas();
generateStars();
window.addEventListener('resize', function() {
  resizeStarCanvas();
  generateStars();
});
