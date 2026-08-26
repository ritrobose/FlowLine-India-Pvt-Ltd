(function () {
  'use strict';

  function killEvent(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    }
    return false;
  }

  function handleMouse(e) {
    if (!e) return true;
    if (e.pointerType === 'touch' || (e.touches && e.touches.length > 0)) {
      return true;
    }
    var targetTag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (targetTag === 'input' || targetTag === 'textarea') {
      return true;
    }
    if (e.type === 'contextmenu' || e.button === 2 || e.which === 3) {
      return killEvent(e);
    }
    if (e.type === 'dragstart' || e.type === 'selectstart' || e.type === 'copy' || e.type === 'cut') {
      return killEvent(e);
    }
  }

  var securityEvents = ['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'];
  for (var i = 0; i < securityEvents.length; i++) {
    window.addEventListener(securityEvents[i], handleMouse, true);
    document.addEventListener(securityEvents[i], handleMouse, true);
    if (document.documentElement) {
      document.documentElement.addEventListener(securityEvents[i], handleMouse, true);
    }
  }

  window.oncontextmenu = handleMouse;
  document.oncontextmenu = handleMouse;

  function attachAll() {
    if (document.body) {
      document.body.oncontextmenu = handleMouse;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachAll);
  } else {
    attachAll();
  }

  window.addEventListener('keydown', function (e) {
    var isCmdOrCtrl = e.ctrlKey || e.metaKey;
    var key = e.key ? e.key.toLowerCase() : '';
    var keyCode = e.keyCode || e.which;

    if (e.key === 'F12' || keyCode === 123) {
      return killEvent(e);
    }
    if (isCmdOrCtrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k' || keyCode === 73 || keyCode === 74 || keyCode === 67 || keyCode === 75)) {
      return killEvent(e);
    }
    if (isCmdOrCtrl && (key === 'u' || key === 's' || key === 'p' || keyCode === 85 || keyCode === 83 || keyCode === 80)) {
      return killEvent(e);
    }
  }, true);

  if (typeof window.console !== 'undefined') {
    var noop = function () {};
    var methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir'];
    for (var j = 0; j < methods.length; j++) {
      try {
        window.console[methods[j]] = noop;
      } catch (err) {}
    }
  }
})();