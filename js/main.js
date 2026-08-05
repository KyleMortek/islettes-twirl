/**
 * Islettes' Elite — site behaviour.
 *
 * Fully static: no build step, no backend, no external requests. Every
 * page here works by reading and modifying the DOM that's already on
 * the page.
 */
(function () {
  'use strict';

/* ---------------------------------------------------------------- nav */

function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  setOpen(false);
  toggle.setAttribute('aria-controls', 'primary-navigation');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!nav.classList.contains('is-open'));
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') &&
        !nav.contains(e.target) && !toggle.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  nav.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => setOpen(false)));

  matchMedia('(min-width: 72em)').addEventListener('change', (ev) => {
    if (ev.matches) setOpen(false);
  });
}

function highlightCurrentPage() {
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    if (link.getAttribute('href') === here) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  addEventListener('scroll', update, { passive: true });
}

/* ------------------------------------------------------- handbook TOC */

function initTocScrollSpy() {
  const toc = document.querySelector('.toc');
  if (!toc) return;

  const links = new Map();
  toc.querySelectorAll('a[href^="#"]').forEach((a) => {
    const section = document.getElementById(a.getAttribute('href').slice(1));
    if (section) links.set(section, a);
  });
  if (!links.size) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      links.get(entry.target)?.classList.add('is-active');
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  links.forEach((_, section) => observer.observe(section));
}

/* --------------------------------------------------------------- gallery */

let lightboxDialog;

function ensureLightbox() {
  if (lightboxDialog) return lightboxDialog;

  lightboxDialog = document.createElement('dialog');
  lightboxDialog.className = 'lightbox';
  lightboxDialog.setAttribute('aria-label', 'Photo viewer');
  lightboxDialog.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close photo viewer">&times;</button>
    <figure data-lightbox-figure></figure>
  `;
  lightboxDialog.querySelector('.lightbox-close')
    .addEventListener('click', () => lightboxDialog.close());
  lightboxDialog.addEventListener('click', (e) => {
    if (e.target === lightboxDialog) lightboxDialog.close();
  });
  document.body.append(lightboxDialog);
  return lightboxDialog;
}

/** Any `.gallery-item` containing an <img> becomes a lightbox trigger. */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  items.forEach((img) => {
    const item = img.closest('.gallery-item');
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View larger: ${img.alt}`);

    const open = () => {
      const dlg = ensureLightbox();
      const figure = dlg.querySelector('[data-lightbox-figure]');
      const caption = item.querySelector('figcaption')?.textContent || '';
      figure.innerHTML = '';
      const full = document.createElement('img');
      full.src = img.currentSrc || img.src;
      full.alt = img.alt;
      figure.append(full);
      if (caption) {
        const cap = document.createElement('figcaption');
        cap.textContent = caption;
        figure.append(cap);
      }
      dlg.showModal();
    };

    item.addEventListener('click', open);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
}

/* -------------------------------------------------------- contact form */

function showFormMessage(form, text, kind) {
  let host = form.querySelector('[data-form-message]');
  if (!host) {
    host = document.createElement('div');
    host.setAttribute('data-form-message', '');
    form.prepend(host);
  }
  host.innerHTML = '';
  const box = document.createElement('div');
  box.className = `form-message form-message-${kind}`;
  box.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  const p = document.createElement('p');
  p.textContent = text;
  box.append(p);
  host.append(box);
  host.scrollIntoView({ block: 'nearest' });
}

/**
 * No backend is wired up yet, so the form hands the message to the
 * visitor's own email client via a mailto: link rather than pretending
 * to submit it somewhere. Nothing is silently discarded.
 */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const to = form.dataset.fallbackEmail || 'isletteselite@aol.com';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const name = data.name?.trim();
    const email = data.email?.trim();
    const message = data.message?.trim();

    if (!name || !email || !message) {
      showFormMessage(form, 'Please fill in your name, email, and message.', 'error');
      return;
    }

    const subject = data.subject?.trim() || `Message from ${name}`;
    const body =
      `${message}\n\n—\n${name}\n${email}`;

    const mailto = `mailto:${to}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    showFormMessage(
      form,
      `Your email app should now be open with this message ready to send to ${to}. ` +
      `If nothing happened, email us directly.`,
      'success',
    );
  });
}

/* ---------------------------------------------------------------- boot */

function boot() {
  initMobileNav();
  highlightCurrentPage();
  initHeaderScroll();
  initTocScrollSpy();
  initGalleryLightbox();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

})();
