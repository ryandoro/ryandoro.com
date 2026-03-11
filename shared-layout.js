(function () {
  const sharedHeaderNodes = document.querySelectorAll('.site-header[data-shared-header="true"]');
  const sharedNavNodes = document.querySelectorAll('#secondary[data-shared-nav="true"]');
  const sharedFooterNodes = document.querySelectorAll('.site-footer[data-shared-footer="true"]');
  const currentPathname = normalizePathname(window.location.pathname);
  const shouldHighlightNav = currentPathname !== '/';

  function normalizePathname(pathname) {
    let normalized = pathname || '/';

    normalized = normalized.replace(/\/+$/, '');
    if (normalized === '') normalized = '/';

    if (normalized === '/index.html') return '/';
    if (normalized.endsWith('/index.html')) {
      normalized = normalized.slice(0, -'/index.html'.length) || '/';
    }

    normalized = normalized.replace(/\/+$/, '');
    return normalized || '/';
  }

  function markLinkActive(link) {
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');

    // Only auto-expand parent menus when the active link is a submenu item.
    const isSubMenuLink = Boolean(link.closest('.sub-menu'));
    if (!isSubMenuLink) return;

    const parentMenuItem = link.closest('.menu-item-has-children');
    if (!parentMenuItem) return;

    parentMenuItem.classList.add('is-expanded');
    parentMenuItem.classList.remove('is-collapsed');

    const parentChevron = parentMenuItem.querySelector('.menu-chevron');
    if (parentChevron) {
      parentChevron.setAttribute('aria-expanded', 'true');
    }
  }

  sharedHeaderNodes.forEach((header) => {
    const prefix = header.getAttribute('data-root-prefix') || '';

    header.innerHTML = [
      `<a class="brand" href="${prefix}index.html" aria-label="Ryan Doro home">`,
      `  <img class="brand-badge" src="${prefix}images/cropped-RD-WHITE-GEMINI-logo.png" alt="Ryan Doro logo" width="80" height="80" loading="eager" fetchpriority="high" decoding="async">`,
      '  <span class="brand-name">RYAN DORO</span>',
      '</a>',
      ' <button class="secondary-toggle" aria-expanded="false" aria-controls="secondary">Menu</button>'
    ].join('');

    header.classList.add('is-hydrated');
  });

  const socialMarkup = [
    '<nav class="social-navigation" aria-label="Social">',
    '  <ul class="menu">',
    '    <li class="menu-item">',
    '      <a class="social-link" href="https://x.com/ImRyanDoro" target="_blank" rel="noreferrer noopener" aria-label="X (formerly Twitter)">',
    '        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
    '          <path d="M18.9 2h3.7l-8.2 9.4L24 22h-7.5l-5.9-7.6L4 22H.3l8.8-10.1L0 2h7.7l5.3 7z" fill="currentColor"/>',
    '        </svg>',
    '      </a>',
    '    </li>',
    '    <li class="menu-item">',
    '      <a class="social-link" href="https://www.facebook.com/ryan.doro" target="_blank" rel="noreferrer noopener" aria-label="Facebook">',
    '        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
    '          <path d="M13.6 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4 1.4-4 4.1V11H8v3.1h2.5V22z" fill="currentColor"/>',
    '        </svg>',
    '      </a>',
    '    </li>',
    '    <li class="menu-item">',
    '      <a class="social-link" href="https://www.instagram.com/imryandoro/" target="_blank" rel="noreferrer noopener" aria-label="Instagram">',
    '        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
    '          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2m0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zm9.8 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6" fill="currentColor"/>',
    '        </svg>',
    '      </a>',
    '    </li>',
    '    <li class="menu-item">',
    '      <a class="social-link" href="https://www.linkedin.com/in/ryandoroprogramming/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">',
    '        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
    '          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.2 0 5 2.8 5 6.4V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8-1.8 0-2 1.3-2 2.7V21h-4z" fill="currentColor"/>',
    '        </svg>',
    '      </a>',
    '    </li>',
    '    <li class="menu-item">',
    '      <a class="social-link" href="https://github.com/ryandoro" target="_blank" rel="noreferrer noopener" aria-label="GitHub">',
    '        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
    '          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.3 1.19-3.12-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.19a11.1 11.1 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.59.23 2.77.12 3.06.74.82 1.19 1.86 1.19 3.12 0 4.42-2.69 5.39-5.26 5.67.41.36.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" fill="currentColor"/>',
    '        </svg>',
    '      </a>',
    '    </li>',
    '  </ul>',
    '</nav>'
  ].join('');

  sharedNavNodes.forEach((secondary) => {
    const prefix = secondary.getAttribute('data-root-prefix') || '';

    const navMarkup = [
      '<nav class="main-navigation" aria-label="Primary">',
      '  <ul class="nav-menu">',
      '    <li class="menu-item menu-item-has-children is-collapsed">',
      '      <div class="menu-parent">',
      `        <a class="menu-parent-link" href="${prefix}index.html">MISSION</a>`,
      '        <button class="menu-chevron" type="button" aria-expanded="false" aria-label="Toggle Mission submenu">',
      '          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
      '            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
      '          </svg>',
      '        </button>',
      '      </div>',
      '      <ul class="sub-menu">',
      `        <li class="menu-item"><a href="${prefix}about.html">ABOUT RYAN DORO</a></li>`,
      '      </ul>',
      '    </li>',
      '    <li class="menu-item menu-item-has-children is-collapsed">',
      '      <div class="menu-parent">',
      `        <a class="menu-parent-link" href="${prefix}training.html">PERSONAL TRAINING</a>`,
      '        <button class="menu-chevron" type="button" aria-expanded="false" aria-label="Toggle Personal Training submenu">',
      '          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
      '            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
      '          </svg>',
      '        </button>',
      '      </div>',
      '      <ul class="sub-menu">',
      `        <li class="menu-item"><a href="${prefix}approach.html">DISCOVER RYAN\'S APPROACH</a></li>`,
      `        <li class="menu-item"><a href="${prefix}custom-programs.html">CUSTOM PROGRAMS</a></li>`,
      `        <li class="menu-item"><a href="${prefix}testimonials.html">TESTIMONIALS</a></li>`,
      '      </ul>',
      '    </li>',
      `    <li class="menu-item"><a href="${prefix}portfolio.html">PORTFOLIO</a></li>`,
      `    <li class="menu-item"><a href="${prefix}blog.html">BLOG</a></li>`,
      '  </ul>',
      '</nav>'
    ].join('');

    secondary.innerHTML = `${navMarkup}${socialMarkup}`;

    if (shouldHighlightNav) {
      const navLinks = Array.from(secondary.querySelectorAll('.main-navigation a[href]'));
      let hasExactMatch = false;

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPathname = normalizePathname(new URL(href, window.location.href).pathname);
        if (linkPathname !== currentPathname) return;

        markLinkActive(link);
        hasExactMatch = true;
      });

      // Treat individual blog posts as part of the main BLOG section.
      if (!hasExactMatch && currentPathname.startsWith('/blog/')) {
        const blogLink = navLinks.find((link) => {
          const href = link.getAttribute('href');
          if (!href) return false;
          const linkPathname = normalizePathname(new URL(href, window.location.href).pathname);
          return linkPathname === '/blog.html';
        });

        if (blogLink) {
          markLinkActive(blogLink);
        }
      }
    }

    secondary.classList.add('is-hydrated');
  });

  sharedFooterNodes.forEach((footer) => {
    const prefix = footer.getAttribute('data-root-prefix') || '';

    footer.innerHTML = [
      ` <p>&copy; <span class="js-year">${new Date().getFullYear()}</span> Ryan Doro. All Rights Reserved.</p>`,
      ` <a class="footer-brand" href="${prefix}index.html" aria-label="Ryan Doro home">`,
      `   <img class="brand-badge" src="${prefix}images/cropped-RD-WHITE-GEMINI-logo.png" alt="Ryan Doro logo">`,
      '   <span class="brand-name">RYAN DORO</span>',
      ' </a>'
    ].join('');
  });

  const toggle = document.querySelector('.secondary-toggle');
  const secondary = document.getElementById('secondary');

  if (toggle && secondary) {
    toggle.addEventListener('click', () => {
      const isOpen = secondary.classList.toggle('toggled-on');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const parentMenus = document.querySelectorAll('.menu-item-has-children');

  parentMenus.forEach((item) => {
    if (!item.classList.contains('is-expanded') && !item.classList.contains('is-collapsed')) {
      item.classList.add('is-collapsed');
    }

    const chevron = item.querySelector('.menu-chevron');
    if (!chevron) return;

    const isExpanded = item.classList.contains('is-expanded');
    chevron.setAttribute('aria-expanded', String(isExpanded));

    chevron.addEventListener('click', () => {
      const nextExpanded = !item.classList.contains('is-expanded');
      item.classList.toggle('is-expanded', nextExpanded);
      item.classList.toggle('is-collapsed', !nextExpanded);
      chevron.setAttribute('aria-expanded', String(nextExpanded));
    });
  });

  const yearTargets = document.querySelectorAll('.js-year');
  if (yearTargets.length) {
    const currentYear = new Date().getFullYear();
    yearTargets.forEach((node) => {
      node.textContent = currentYear;
    });
  }
})();
