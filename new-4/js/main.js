(function () {
  'use strict';

  // Marks JS as active so CSS can gate the reveal animation on it — without
  // this class, .reveal elements stay at full opacity (no-JS/blocked-JS safe).
  document.documentElement.classList.add('js');

  // Scroll reveal: fade/slide sections and cards in once, on first view.
  // Wrapped defensively so any unexpected error still reveals everything
  // instead of leaving content stuck at opacity:0.
  try {
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      }
    }
  } catch (err) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Stat count-up: animate the "9%" figure once it scrolls into view.
  try {
    var statNumber = document.querySelector('.stat-number');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (statNumber && 'IntersectionObserver' in window && !reduceMotion) {
      var match = statNumber.textContent.match(/[\d.]+/);
      if (match) {
        var target = parseFloat(match[0]);
        var prefix = statNumber.textContent.slice(0, match.index);
        var suffix = statNumber.textContent.slice(match.index + match[0].length);
        var statObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            statObserver.unobserve(entry.target);
            var start = null;
            var duration = 900;
            function step(ts) {
              if (!start) start = ts;
              var progress = Math.min((ts - start) / duration, 1);
              statNumber.textContent = prefix + Math.round(progress * target) + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
        }, { threshold: 0.4 });
        statObserver.observe(statNumber);
      }
    }
  } catch (err) {
    // Leave the static value already in the markup.
  }

  // Header scroll shadow + mobile autohide (frees up viewport height while
  // reading down, reappears on any upward scroll for quick access to nav).
  var header = document.getElementById('site-header');
  var nav = document.getElementById('site-nav');
  var lastScrollY = window.scrollY;
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    if (!nav.classList.contains('is-open')) {
      if (y > lastScrollY && y > header.offsetHeight + 24) {
        header.classList.add('is-hidden');
      } else if (y < lastScrollY) {
        header.classList.remove('is-hidden');
      }
    }
    lastScrollY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) header.classList.remove('is-hidden');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });

  // Contact form: validate, then hand off to the user's email client
  var form = document.getElementById('contact-form');
  var successMsg = form.querySelector('.form-success');

  function setFieldError(field, hasError) {
    field.classList.toggle('has-error', hasError);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var messageField = document.getElementById('message');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var nameOk = nameField.value.trim().length > 0;
    var emailOk = emailPattern.test(emailField.value.trim());
    var messageOk = messageField.value.trim().length > 0;

    setFieldError(nameField.closest('.field'), !nameOk);
    setFieldError(emailField.closest('.field'), !emailOk);
    setFieldError(messageField.closest('.field'), !messageOk);

    if (!nameOk || !emailOk || !messageOk) {
      successMsg.hidden = true;
      var firstInvalid = form.querySelector('.has-error input, .has-error textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var org = document.getElementById('organization').value.trim();
    var bodyLines = [
      'From: ' + nameField.value.trim() + ' (' + emailField.value.trim() + ')',
      org ? 'Organization: ' + org : null,
      '',
      messageField.value.trim()
    ].filter(function (line) { return line !== null; });

    var mailto = 'mailto:contact@geoxsbiotech.com' +
      '?subject=' + encodeURIComponent('Partnership inquiry from ' + nameField.value.trim()) +
      '&body=' + encodeURIComponent(bodyLines.join('\n'));

    window.location.href = mailto;
    successMsg.hidden = false;
  });

  // Glass specular highlight: every frosted panel catches a soft light
  // that follows the pointer, as if the surface were real ground glass.
  // One coherent motion system shared by every panel, not a per-element effect.
  try {
    var glassSelector = '.pillar-featured, .stat-callout, .contact-form, ' +
      '.team-grid, .pillar-grid-quad, .pillar-grid-duo, .pillar-stack, .header-inner';
    var reduceMotionForGlass = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotionForGlass && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('pointermove', function (e) {
        var panel = e.target.closest ? e.target.closest(glassSelector) : null;
        if (!panel) return;
        var rect = panel.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width) * 100;
        var my = ((e.clientY - rect.top) / rect.height) * 100;
        panel.style.setProperty('--mx', mx + '%');
        panel.style.setProperty('--my', my + '%');
      }, { passive: true });
    }
  } catch (err) {
    // Panels keep their default top-centered highlight.
  }

  // Island indicator: one capsule slides and resizes between nav links,
  // tracking whichever one the visitor is about to choose — this variant's
  // one signature motion, a Dynamic-Island-style focal element in the header.
  try {
    var islandNav = document.getElementById('site-nav');
    var islandLinks = islandNav ? Array.prototype.slice.call(islandNav.querySelectorAll('a')) : [];
    if (islandNav && islandLinks.length) {
      var island = document.createElement('span');
      island.className = 'nav-island';
      island.setAttribute('aria-hidden', 'true');
      islandNav.insertBefore(island, islandNav.firstChild);

      function moveIslandTo(link) {
        var navWidth = islandNav.clientWidth;
        var rightInset = navWidth - (link.offsetLeft + link.offsetWidth);
        island.style.clipPath = 'inset(0 ' + rightInset + 'px 0 ' + link.offsetLeft + 'px round 9999px)';
      }
      islandLinks.forEach(function (link) {
        link.addEventListener('pointerenter', function () {
          islandNav.classList.add('is-tracking');
          moveIslandTo(link);
        });
      });
      islandNav.addEventListener('pointerleave', function () {
        islandNav.classList.remove('is-tracking');
      });
    }
  } catch (err) {
    // Nav links keep their default hover color change without the island.
  }

  // Interactive molecular background: a lightweight canvas node network in
  // the hero that drifts on its own and responds to pointer/touch proximity.
  // It only takes over from the static CSS watermark once motion is allowed
  // and a 2D context is available — the watermark stays the safe fallback.
  try {
    var heroEl = document.querySelector('.hero');
    var canvas = heroEl && heroEl.querySelector('.molecular-canvas');
    var reduceMotionMQ = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    var ctx = canvas && canvas.getContext && canvas.getContext('2d');

    if (heroEl && ctx && !(reduceMotionMQ && reduceMotionMQ.matches)) {
      var nodes = [];
      var pointer = { x: 0, y: 0, active: false };
      var box = { width: 0, height: 0 };
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      var rafId = null;
      var running = false;

      var rootStyle = getComputedStyle(document.documentElement);
      function hexToRgb(hex) {
        var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || '').trim());
        return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [110, 122, 108];
      }
      var lineRgb = hexToRgb(rootStyle.getPropertyValue('--outline'));
      var accentRgb = hexToRgb(rootStyle.getPropertyValue('--secondary'));

      function seedNodes() {
        var count = Math.max(18, Math.min(52, Math.round((box.width * box.height) / 15000)));
        nodes = [];
        for (var i = 0; i < count; i++) {
          nodes.push({
            x: Math.random() * box.width,
            y: Math.random() * box.height,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: 1.4 + Math.random() * 1.6
          });
        }
      }

      function resize() {
        var rect = heroEl.getBoundingClientRect();
        box.width = rect.width;
        box.height = rect.height;
        canvas.width = Math.round(box.width * dpr);
        canvas.height = Math.round(box.height * dpr);
        canvas.style.width = box.width + 'px';
        canvas.style.height = box.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seedNodes();
      }

      function step() {
        ctx.clearRect(0, 0, box.width, box.height);
        var connectDist = Math.max(90, Math.min(box.width, box.height) * 0.16);
        var influenceR = 120;
        var i, n;

        for (i = 0; i < nodes.length; i++) {
          n = nodes[i];
          if (pointer.active) {
            var dx = n.x - pointer.x, dy = n.y - pointer.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < influenceR && d > 0.01) {
              var f = (1 - d / influenceR) * 0.55;
              n.vx += (dx / d) * f * 0.06;
              n.vy += (dy / d) * f * 0.06;
            }
          }
          n.vx *= 0.98; n.vy *= 0.98;
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > box.width) n.vx *= -1;
          if (n.y < 0 || n.y > box.height) n.vy *= -1;
          n.x = Math.max(0, Math.min(box.width, n.x));
          n.y = Math.max(0, Math.min(box.height, n.y));
        }

        for (i = 0; i < nodes.length; i++) {
          for (var j = i + 1; j < nodes.length; j++) {
            var a = nodes[i], b = nodes[j];
            var ddx = a.x - b.x, ddy = a.y - b.y;
            var dist = Math.sqrt(ddx * ddx + ddy * ddy);
            if (dist > connectDist) continue;
            var near = pointer.active && (
              Math.hypot(a.x - pointer.x, a.y - pointer.y) < influenceR ||
              Math.hypot(b.x - pointer.x, b.y - pointer.y) < influenceR
            );
            var rgb = near ? accentRgb : lineRgb;
            var alpha = (1 - dist / connectDist) * (near ? 0.4 : 0.16);
            ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        for (i = 0; i < nodes.length; i++) {
          n = nodes[i];
          var isNear = pointer.active && Math.hypot(n.x - pointer.x, n.y - pointer.y) < influenceR;
          var rgb2 = isNear ? accentRgb : lineRgb;
          ctx.fillStyle = 'rgba(' + rgb2[0] + ',' + rgb2[1] + ',' + rgb2[2] + ',' + (isNear ? 0.45 : 0.22) + ')';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (running) rafId = requestAnimationFrame(step);
      }

      function updatePointer(e) {
        var rect = heroEl.getBoundingClientRect();
        var x = e.clientX - rect.left, y = e.clientY - rect.top;
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          pointer.x = x; pointer.y = y; pointer.active = true;
        } else {
          pointer.active = false;
        }
      }
      function clearPointer() { pointer.active = false; }

      function start() {
        if (running) return;
        running = true;
        window.addEventListener('pointermove', updatePointer, { passive: true });
        window.addEventListener('pointerdown', updatePointer, { passive: true });
        window.addEventListener('pointerup', clearPointer, { passive: true });
        window.addEventListener('pointercancel', clearPointer, { passive: true });
        rafId = requestAnimationFrame(step);
      }
      function stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        window.removeEventListener('pointermove', updatePointer);
        window.removeEventListener('pointerdown', updatePointer);
        window.removeEventListener('pointerup', clearPointer);
        window.removeEventListener('pointercancel', clearPointer);
      }

      var resizeTimer = null;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        var heroObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && document.visibilityState === 'visible') start();
            else stop();
          });
        }, { threshold: 0.05 });
        heroObserver.observe(heroEl);
      } else {
        start();
      }

      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
          stop();
        } else if (heroEl.getBoundingClientRect().top < window.innerHeight) {
          start();
        }
      });

      if (reduceMotionMQ && reduceMotionMQ.addEventListener) {
        reduceMotionMQ.addEventListener('change', function (e) {
          if (e.matches) {
            stop();
            heroEl.classList.remove('js-canvas-active');
          }
        });
      }

      resize();
      heroEl.classList.add('js-canvas-active');
    }
  } catch (err) {
    // Static CSS watermark (already in the markup) remains the fallback.
  }
})();
