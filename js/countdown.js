/* ================================================
   COUNTDOWN.JS — June 8 2026 12:00 PM IST
   IST = UTC+5:30 → UTC target = June 8 2026 06:30:00
================================================ */
var TARGET_UTC = Date.UTC(2026, 5, 8, 14, 30, 0);
var cdDone     = false;

function pad2(n) { return String(n).padStart(2, '0'); }

function tickCountdown() {
  if (cdDone) return;
  var diff = TARGET_UTC - Date.now();

  if (diff <= 0) {
    document.getElementById('cdDays').textContent  = '00';
    document.getElementById('cdHours').textContent = '00';
    document.getElementById('cdMins').textContent  = '00';
    document.getElementById('cdSecs').textContent  = '00';
    unlockSurprises();
    cdDone = true;
    return;
  }

  document.getElementById('cdDays').textContent  = pad2(Math.floor(diff / 86400000));
  document.getElementById('cdHours').textContent = pad2(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('cdMins').textContent  = pad2(Math.floor((diff % 3600000) / 60000));
  document.getElementById('cdSecs').textContent  = pad2(Math.floor((diff % 60000) / 1000));
}

function unlockSurprises() {
  document.getElementById('curtain').classList.add('unlocked');
  triggerUnlockBurst();
}

tickCountdown();
setInterval(tickCountdown, 1000);
