(function () {
  var brandName = 'SOUL Electronic Medical Records';
  var brandShortName = 'SOUL';
  var spaBase = typeof window.getOpenmrsSpaBase === 'function' ? window.getOpenmrsSpaBase() : '/openmrs/spa/';
  var logoHref = spaBase + 'assets/soul.png';
  var scheduled = false;

  function ensureTitle() {
    document.title = brandName;
  }

  function ensureFavicon() {
    var icons = document.querySelectorAll('link[rel*="icon"]');

    if (!icons.length) {
      var favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = logoHref;
      document.head.appendChild(favicon);
      return;
    }

    icons.forEach(function (icon) {
      icon.href = logoHref;
    });
  }

  function ensureHeaderLabel() {
    document.querySelectorAll('header[aria-label="OpenMRS"]').forEach(function (header) {
      header.setAttribute('aria-label', brandShortName);
    });
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

    if (!content || !tile || tile.dataset.soulBrandingApplied === 'true') {
      return;
    }

    tile.dataset.soulBrandingApplied = 'true';
    tile.classList.add('soul-brand-footer-card');
    content.classList.add('soul-brand-footer-content');
    content.replaceChildren(createFooterImage());
  }

  function createFooterImage() {
    var image = document.createElement('img');
    image.src = logoHref;
    image.alt = brandName;
    image.className = 'soul-brand-footer-image';
    return image;
  }

  function applyBranding() {
    ensureTitle();
    ensureFavicon();
    ensureHeaderLabel();
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
