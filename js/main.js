(function () {
  'use strict';

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
