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

  // Header scroll shadow
  var header = document.getElementById('site-header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
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
})();
