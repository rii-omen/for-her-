/* ================================================
   MUSIC.JS — Music player for Surprise 3
================================================ */
var musicPlaying = false;

function toggleMusic() {
  var audio    = document.getElementById('bgAudio');
  var disc     = document.getElementById('musicDisc');
  var btn      = document.getElementById('musicBtn');
  var barFill  = document.getElementById('musicBarFill');

  if (musicPlaying) {
    audio.pause();
    disc.classList.remove('playing');
    btn.textContent = '▶';
    musicPlaying = false;
  } else {
    audio.play().catch(function() {});
    disc.classList.add('playing');
    btn.textContent = '⏸';
    musicPlaying = true;
  }
}

window.addEventListener('DOMContentLoaded', function() {
  var audio   = document.getElementById('bgAudio');
  var barFill = document.getElementById('musicBarFill');
  var disc    = document.getElementById('musicDisc');
  var btn     = document.getElementById('musicBtn');

  audio.addEventListener('timeupdate', function() {
    if (audio.duration) {
      barFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    }
  });
  audio.addEventListener('ended', function() {
    disc.classList.remove('playing');
    btn.textContent = '▶';
    musicPlaying = false;
    barFill.style.width = '0%';
  });
});
