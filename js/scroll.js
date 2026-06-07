/* ================================================
   SCROLL.JS — Unified scroll: bunny + night + video
================================================ */

window.addEventListener('scroll', handleScroll, { passive: true });

function handleScroll() {
  var main = document.getElementById('mainContent');
  if (!main || main.style.display === 'none') return;

  var scrollY   = window.scrollY;
  var maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
  var sp        = Math.min(scrollY / maxScroll, 1);

  // 1. Bunny smile
  if (typeof updateBunnySmile === 'function') {
    updateBunnySmile(sp);
  }

  // 2. Night transition (starts at 30% scroll)
  var nightPct = Math.max(0, Math.min((sp - 0.30) / 0.55, 1));
  if (typeof applyNight === 'function') {
    applyNight(nightPct);
  }

  // 3. Scroll-video reveal
  var svFrame = document.getElementById('svFrame');
  if (svFrame) {
    var rect = svFrame.getBoundingClientRect();
    var inV  = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
    if (inV) svFrame.classList.add('in-view');
    else     svFrame.classList.remove('in-view');
  }
}

// auto-hide video placeholder when loaded
window.addEventListener('DOMContentLoaded', function() {
  var mainVid = document.getElementById('mainVid');
  if (mainVid) {
    mainVid.addEventListener('loadeddata', function() {
      var ph = document.getElementById('svPlaceholder');
      if (ph) ph.style.display = 'none';
    });
  }
  var s1vid = document.getElementById('s1Vid');
  if (s1vid) {
    s1vid.addEventListener('loadeddata', function() {
      var ph = document.getElementById('s1Placeholder');
      if (ph) ph.style.display = 'none';
    });
  }
});
