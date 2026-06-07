/* ================================================
   LANDING.JS — Heart click, particles, petals, day stars
================================================ */

/* ---- Day sparkle stars ---- */
(function spawnDayStars() {
  for (var i = 0; i < 20; i++) {
    var s = document.createElement('div');
    s.style.cssText = [
      'position:fixed', 'pointer-events:none', 'z-index:0',
      'left:'  + (Math.random() * 100)  + '%',
      'top:'   + (Math.random() * 100)  + '%',
      'font-size:' + (0.5 + Math.random() * 0.8) + 'rem',
      'opacity:' + (0.1 + Math.random() * 0.28),
      'animation:twinkle ' + (2 + Math.random() * 3) + 's ease-in-out infinite ' + (Math.random() * 3) + 's',
      'color:' + (Math.random() > 0.5 ? '#ff6eb4' : '#a855f7')
    ].join(';');
    s.textContent = '✦';
    document.body.appendChild(s);
  }
})();

/* ---- Petal rain ---- */
(function startPetalRain() {
  var arr = ['🌸','🌺','🌷','💮','🏵️'];
  setInterval(function() {
    var p = document.createElement('div');
    p.className = 'petal';
    p.textContent = arr[Math.floor(Math.random() * arr.length)];
    var dur = 6 + Math.random() * 8;
    p.style.cssText = [
      'left:' + (Math.random() * 100) + '%',
      'font-size:1.1rem',
      '--pd:' + dur + 's',
      '--px:' + ((Math.random() - 0.5) * 160) + 'px'
    ].join(';');
    document.body.appendChild(p);
    setTimeout(function() { p.remove(); }, dur * 1000 + 200);
  }, 1500);
})();

/* ---- Particle burst helper ---- */
function spawnParticles(emojis, count, originY) {
  var expl = document.getElementById('explosion');
  for (var i = 0; i < count; i++) {
    (function(idx) {
      setTimeout(function() {
        var el = document.createElement('div');
        el.className = 'particle';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        var angle = Math.random() * Math.PI * 2;
        var dist  = 130 + Math.random() * 300;
        el.style.cssText = [
          'left:50%',
          'top:' + (originY || '50%'),
          'font-size:' + (1.2 + Math.random() * 1.5) + 'rem',
          '--tx:' + (Math.cos(angle) * dist) + 'px',
          '--ty:' + (Math.sin(angle) * dist) + 'px',
          '--rot:' + ((Math.random() - 0.5) * 720) + 'deg',
          'animation-delay:' + (Math.random() * 0.5) + 's'
        ].join(';');
        expl.appendChild(el);
        setTimeout(function() { el.remove(); }, 2300);
      }, idx * 18);
    })(i);
  }
}

/* ---- Balloon launcher helper ---- */
function spawnBalloons(emojis, count, minDur) {
  for (var b = 0; b < count; b++) {
    (function(idx) {
      setTimeout(function() {
        var bal = document.createElement('div');
        bal.className = 'balloon';
        bal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        var dur  = (minDur || 4) + Math.random() * 4;
        var lean = (Math.random() - 0.5) * 30;
        bal.style.cssText = [
          'left:' + (5 + Math.random() * 90) + '%',
          'font-size:' + (2.5 + Math.random() * 1.5) + 'rem',
          '--dur:' + dur + 's',
          '--lean:' + lean + 'deg',
          'animation-delay:' + (Math.random() * 1.5) + 's'
        ].join(';');
        document.body.appendChild(bal);
        setTimeout(function() { bal.remove(); }, (dur + 2) * 1000);
      }, idx * 110);
    })(b);
  }
}

/* ---- Unlock burst (countdown hits 0) ---- */
function triggerUnlockBurst() {
  spawnParticles(['🎉','🎊','💗','💜','✨','🌸','🎁','🎀'], 40, '65%');
}

/* ---- Main trigger — heart button click ---- */
function triggerSurprise() {
  
  var BURST   = ['💗','💕','💜','✨','🌸','💖','⭐','🌟','💝','🌷','🎉','🎊','🌺'];
  var BALLS   = ['🎈','🎀','🎊','🎉','🪅'];
  var EXTRA   = ['🎈','🎉','🎀','💜','💗'];

  spawnParticles(BURST, 50, '50%');
  spawnBalloons(BALLS, 14, 4);

  setTimeout(function() {
    var landing = document.getElementById('landing');
    landing.classList.add('fade-out');

    setTimeout(function() {
      landing.style.display = 'none';

      var main = document.getElementById('mainContent');
      main.style.display   = 'block';
      main.style.opacity   = '0';
      main.style.transform = 'scale(0.96)';
      main.style.transition = 'opacity 1.2s ease, transform 1.2s ease';

      // force reflow then animate in
      main.getBoundingClientRect();
      main.style.opacity   = '1';
      main.style.transform = 'scale(1)';

      // show bunny
      document.getElementById('bunny').style.display = 'block';

      // refresh star canvas size
      resizeStarCanvas();
      generateStars();

      // extra balloons
      spawnBalloons(EXTRA, 8, 5);

    }, 1300);
  }, 600);
}
