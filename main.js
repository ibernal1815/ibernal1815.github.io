document.addEventListener('DOMContentLoaded', function() {

  // AUDIO
  var AC = window.AudioContext || window.webkitAudioContext;
  var ac = null, sfx = false;
  function getAC() { if (!ac) ac = new AC(); if (ac.state === 'suspended') ac.resume(); return ac; }
  function tone(f, d, v, t) {
    if (!sfx) return;
    v = v || 0.09; t = t || 'square';
    try {
      var ctx = getAC(), o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = t; o.frequency.value = f;
      g.gain.setValueAtTime(v, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d);
      o.start(); o.stop(ctx.currentTime + d);
    } catch(e) {}
  }
  function playOpen() { [440,660,880].forEach(function(f,i){ setTimeout(function(){ tone(f,0.06,0.065,'square'); },i*40); }); }
  function playSweep() { [200,350,500,700,900].forEach(function(f,i){ setTimeout(function(){ tone(f,0.09,0.065,'sawtooth'); },i*70); }); }
  function playEnter() { [150,250,400,600,900,1200].forEach(function(f,i){ setTimeout(function(){ tone(f,0.18,0.07,'sawtooth'); },i*55); }); }

  var soundBtn = document.getElementById('soundBtn');
  soundBtn.onclick = function() {
    sfx = !sfx;
    soundBtn.textContent = sfx ? 'SFX ON' : 'SFX';
    soundBtn.classList.toggle('sfx-on', sfx);
    if (sfx) playOpen();
  };

  // MATRIX
  var cv = document.getElementById('matrix-bg');
  var cx = cv.getContext('2d');
  function rsz() { cv.width = window.innerWidth; cv.height = window.innerHeight; } rsz();
  window.addEventListener('resize', rsz);
  var drops = [];
  function initDrops() { drops = []; for (var i = 0; i < Math.floor(cv.width/20); i++) drops.push(1); }
  initDrops();
  window.addEventListener('resize', initDrops);
  setInterval(function() {
    cx.fillStyle = 'rgba(5,10,5,0.05)'; cx.fillRect(0,0,cv.width,cv.height);
    cx.fillStyle = '#00ff41'; cx.font = '13px monospace';
    for (var i = 0; i < drops.length; i++) {
      cx.fillText(String.fromCharCode(0x30A0 + Math.random()*96), i*20, drops[i]*20);
      if (drops[i]*20 > cv.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 65);

  // SPLASH
  var SEGS = 10;
  var segsWrap = document.getElementById('spSegs');
  for (var si = 0; si < SEGS; si++) {
    var segEl = document.createElement('div'); segEl.className = 'sp-seg';
    var fillEl = document.createElement('div'); fillEl.className = 'sp-seg-fill';
    segEl.appendChild(fillEl); segsWrap.appendChild(segEl);
  }
  var segFills = Array.from(document.querySelectorAll('.sp-seg-fill'));
  var phases = [
    {t:'INITIALIZING KERNEL MODULES',        d:480},
    {t:'VERIFYING CRYPTOGRAPHIC SIGNATURES',  d:530},
    {t:'LOADING THREAT INTELLIGENCE FEEDS',   d:500},
    {t:'ESTABLISHING SECURE CHANNEL TLS 1.3', d:560},
    {t:'AUTHENTICATING IDENTITY TOKEN',       d:460},
    {t:'MAPPING MITRE ATT&CK FRAMEWORK',      d:510},
    {t:'INTEGRITY CHECK PASSED',              d:440},
    {t:'ACCESS GRANTED',                      d:480}
  ];
  var phEl   = document.getElementById('spPhase');
  var titEl  = document.getElementById('spTitle');
  var enterEl = document.getElementById('spEnter');
  var splashEl = document.getElementById('splash');
  var spBtn = document.getElementById('spBtn');
  var pi = 0, segsUsed = 0;

  function runPhase() {
    if (pi >= phases.length) {
      titEl.textContent = 'CONNECTION ESTABLISHED';
      phEl.innerHTML = '<span style="color:#00ff41">&gt;</span> AWAITING OPERATOR...';
      playSweep();
      setTimeout(function() {
        splashEl.classList.add('ready');
        enterEl.classList.add('show');
        window.addEventListener('keydown', onKey);
      }, 650);
      return;
    }
    var p = phases[pi];
    phEl.innerHTML = '<span style="color:#00ff41">&gt;</span> ' + p.t;
    tone(380 + pi*50, 0.1, 0.07, 'square');
    var target = Math.round(((pi + 1) / phases.length) * SEGS);
    while (segsUsed < target && segsUsed < segFills.length) {
      segFills[segsUsed].style.width = '100%';
      segsUsed++;
    }
    pi++;
    setTimeout(runPhase, p.d);
  }

  function onKey(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doEnter(); }
  }

  function doEnter() {
    window.removeEventListener('keydown', onKey);
    playEnter();
    splashEl.style.transition = 'opacity 0.65s';
    splashEl.style.opacity = '0';
    setTimeout(function() {
      splashEl.style.display = 'none';
      startMain();
    }, 700);
  }

  spBtn.addEventListener('click', doEnter);
  setTimeout(runPhase, 350);

  // MAIN
  function startMain() {
    typewriterStart();
    countUp();
  }

  // TYPEWRITER
  var roles = ['SOC_ANALYST.exe','DETECTION_ENGINEER.sh','CYSA_ANALYST.py','SYSADMIN_PRO.bat','PURPLE_TEAMER.go'];
  var ri = 0, ci = 0, del = false;
  var twEl = document.getElementById('hero-tw');
  function typewriterStart() { twStep(); }
  function twStep() {
    var cur = roles[ri];
    if (!del) { twEl.textContent = cur.slice(0,ci++); if (ci > cur.length) { del=true; setTimeout(twStep,1800); return; } }
    else { twEl.textContent = cur.slice(0,ci--); if (ci < 0) { del=false; ri=(ri+1)%roles.length; ci=0; } }
    setTimeout(twStep, del ? 50 : 85);
  }

  // COUNT UP
  function countUp() {
    document.querySelectorAll('[data-count]').forEach(function(el) {
      var target = +el.dataset.count, cur = 0, step = target/40;
      var iv = setInterval(function() {
        cur = Math.min(cur+step, target);
        el.textContent = Math.round(cur) + '+';
        if (cur >= target) clearInterval(iv);
      }, 40);
    });
  }

  // REVEAL ON SCROLL
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold: 0.07});
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });

  // TABS
  window.switchTab = function(name, btn) {
    document.querySelectorAll('.tl-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.tl-panel').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    var panel = document.getElementById('tl-' + name);
    if (panel) panel.classList.add('active');
    playOpen();
  };

  // ACCORDION
  window.toggleAcc = function(head) {
    var body = head.nextElementSibling;
    var wasOpen = head.classList.contains('open');
    document.querySelectorAll('.acc-head.open').forEach(function(h) {
      h.classList.remove('open'); h.nextElementSibling.classList.remove('open');
    });
    if (!wasOpen) { head.classList.add('open'); body.classList.add('open'); playOpen(); }
  };

  // BLOG FILTER
  window.filterBlog = function(cat, btn) {
    document.querySelectorAll('.f-btn').forEach(function(b) { b.classList.remove('on'); });
    btn.classList.add('on');
    document.querySelectorAll('.blog-card').forEach(function(c) {
      var show = cat === 'all' || c.dataset.cat === cat;
      c.style.opacity = show ? '1' : '0.15';
      c.style.transform = show ? 'none' : 'scale(0.97)';
      c.style.transition = 'opacity 0.3s,transform 0.3s';
    });
  };

  // HAMBURGER
  window.toggleNav = function() {
    var l = document.getElementById('navLinks'), b = document.getElementById('hamburger');
    var o = l.classList.toggle('open'); b.classList.toggle('open', o);
  };
  window.closeNav = function() {
    var l = document.getElementById('navLinks'), b = document.getElementById('hamburger');
    l.classList.remove('open'); b.classList.remove('open');
  };
  document.addEventListener('click', function(e) {
    var nav = document.querySelector('nav');
    if (nav && !nav.contains(e.target)) closeNav();
  });

  // MISC
  var yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();
  window.addEventListener('scroll', function() {
    var bt = document.getElementById('backTop');
    if (bt) bt.classList.toggle('show', window.scrollY > 400);
  });

}); // end DOMContentLoaded
