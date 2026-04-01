(function () {
  var brandName = 'NIDANHS';
  var brandShortName = 'NIDANHS';
  var spaBase = typeof window.getOpenmrsSpaBase === 'function' ? window.getOpenmrsSpaBase() : '/openmrs/spa/';
  var primaryLogoHref = spaBase + 'assets/logo.png';
  var fallbackLogoHref = spaBase + 'assets/file.svg';
  var scheduled = false;

  function withLogoFallback(element) {
    element.src = primaryLogoHref;
    element.addEventListener(
      'error',
      function () {
        element.src = fallbackLogoHref;
      },
      { once: true },
    );
  }

  function ensureTitle() {
    document.title = brandName;
  }

  function ensureFavicon() {
    var icons = document.querySelectorAll('link[rel*="icon"]');

    if (!icons.length) {
      var favicon = document.createElement('link');
      favicon.rel = 'icon';
      withLogoFallback(favicon);
      document.head.appendChild(favicon);
      return;
    }

    icons.forEach(function (icon) {
      withLogoFallback(icon);
    });
  }

  function ensureHeaderLabel() {
    document.querySelectorAll('header[aria-label="OpenMRS"]').forEach(function (header) {
      header.setAttribute('aria-label', brandShortName);
    });
  }

  function improveTopNavBranding() {
    var brandLink = document.querySelector('a.cds--header__name');

    if (!brandLink || brandLink.dataset.nidanhsTopNavApplied === 'true') {
      return;
    }

    brandLink.dataset.nidanhsTopNavApplied = 'true';
    brandLink.classList.add('nidanhs-topnav-brand');
    brandLink.replaceChildren(createTopNavBranding());
  }

  function createTopNavBranding() {
    var wrapper = document.createElement('span');
    wrapper.className = 'nidanhs-topnav-brand-wrapper';

    var image = document.createElement('img');
    image.className = 'nidanhs-topnav-logo';
    image.alt = brandName;
    withLogoFallback(image);

    var label = document.createElement('span');
    label.className = 'nidanhs-topnav-name';
    label.textContent = brandShortName;

    wrapper.append(image, label);
    return wrapper;
  }

  function replaceLoginFooter() {
    var openmrsLogo =
      document.querySelector('svg[aria-label="OpenMRS Logo"]') ||
      document.querySelector('svg[aria-label="OpenMRS logo"]');

    if (!openmrsLogo) {
      return;
    }

    var content = openmrsLogo.parentElement;
    var tile = content && content.parentElement;

    if (!content || !tile || tile.dataset.nidanhsBrandingApplied === 'true') {
      return;
    }

    tile.dataset.nidanhsBrandingApplied = 'true';
    tile.classList.add('nidanhs-brand-footer-card');
    content.classList.add('nidanhs-brand-footer-content');
    content.replaceChildren(createFooterBranding());
  }

  function createFooterBranding() {
    var wrapper = document.createElement('div');
    wrapper.className = 'nidanhs-brand-footer-wrapper';

    var image = document.createElement('img');
    image.alt = brandName;
    image.className = 'nidanhs-brand-footer-image';
    withLogoFallback(image);

    var label = document.createElement('span');
    label.className = 'nidanhs-brand-footer-name';
    label.textContent = brandName;

    wrapper.append(image, label);
    return wrapper;
  }

  function applyBranding() {
    ensureTitle();
    ensureFavicon();
    ensureHeaderLabel();
    improveTopNavBranding();
    replaceLoginFooter();
  }

  function scheduleApplyBranding() {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      applyBranding();
    });
  }

  document.addEventListener('DOMContentLoaded', scheduleApplyBranding);
  window.addEventListener('load', scheduleApplyBranding);
  scheduleApplyBranding();

  var observer = new MutationObserver(function () {
    scheduleApplyBranding();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
