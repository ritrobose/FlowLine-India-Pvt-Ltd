/**
 * FlowLine Fail-Safe Security & Right-Click Prevention Guard
 */
(function () {
  'use strict';

  function block(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    }
    return false;
  }

  // 1. Immediately bind contextmenu prevention to all event targets
  var events = ['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'];
  for (var i = 0; i < events.length; i++) {
    window.addEventListener(events[i], block, true);
    document.addEventListener(events[i], block, true);
    if (document.documentElement) {
      document.documentElement.addEventListener(events[i], block, true);
    }
  }

  // Direct property overwrites
  window.oncontextmenu = block;
  document.oncontextmenu = block;

  document.addEventListener('DOMContentLoaded', function () {
    if (document.body) {
      document.body.oncontextmenu = block;
      document.body.addEventListener('contextmenu', block, true);
    }
  });

  // 2. Keyboard shortcut prevention
  window.addEventListener('keydown', function (e) {
    var isCmdOrCtrl = e.ctrlKey || e.metaKey;
    var key = e.key ? e.key.toLowerCase() : '';
    var keyCode = e.keyCode || e.which;

    if (e.key === 'F12' || keyCode === 123) {
      return block(e);
    }
    if (isCmdOrCtrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k' || keyCode === 73 || keyCode === 74 || keyCode === 67 || keyCode === 75)) {
      return block(e);
    }
    if (isCmdOrCtrl && (key === 'u' || key === 's' || key === 'p' || keyCode === 85 || keyCode === 83 || keyCode === 80)) {
      return block(e);
    }
  }, true);

  // 3. DevTools Detector & Debugger Loop
  try {
    setInterval(function () {
      var startTime = performance.now();
      debugger;
      var endTime = performance.now();
      if (endTime - startTime > 100) {
        try {
          eval('debugger;');
        } catch (err) {}
      }
    }, 300);
  } catch (err) {}

  // 4. Disable Console Logging
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
