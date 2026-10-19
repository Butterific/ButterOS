(function () {
  let erudaLoaded = false;

  function loadEruda() {
    if (erudaLoaded) {
      if (window.eruda) eruda.show();
      return;
    }

    const script = document.createElement('script');
    script.id = 'eruda-script';
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    script.onload = () => {
      if (window.eruda) {
        eruda.init();
        erudaLoaded = true;
      }
    };
    document.head.appendChild(script);
  }

  function removeEruda() {
    if (window.eruda && typeof eruda.destroy === 'function') {
      eruda.destroy();
      erudaLoaded = false;
    }

    const scriptTag = document.getElementById('eruda-script');
    if (scriptTag) {
      scriptTag.remove();
    }
  }

  if (localStorage.getItem('eurdaEnabled') === 'true') {
    loadEruda();
  }

  const originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    originalSetItem(key, value);

    if (key === 'eurdaEnabled') {
      if (String(value) === 'true') {
        loadEruda();
      } else {
        removeEruda();
      }
    }
  };
})();