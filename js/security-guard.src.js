/**
 * FlowLine Bulletproof Anti-Right-Click & Security Guard Source
 */
(function () {
  'use strict';

  function blockEvent(e) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
    return false;
  }

  // 1. Right Click & Selection Prevention across window, document, body
  ['contextmenu', 'dragstart', 'selectstart'].forEach(function (evtType) {
    window.addEventListener(evtType, blockEvent, true);
    document.addEventListener(evtType, blockEvent, true);
    if (document.documentElement) {
      document.documentElement.addEventListener(evtType, blockEvent, true);
    }
    document.addEventListener('DOMContentLoaded', function () {
      if (document.body) {
        document.body.addEventListener(evtType, blockEvent, true);
      }
    });
  });

  // Direct property bindings
  window.oncontextmenu = blockEvent;
  document.oncontextmenu = blockEvent;

  // 2. Disable DevTools Keyboard Shortcuts & View Source
  function handleKeyDown(e) {
    const isCmdOrCtrl = e.ctrlKey || e.metaKey;
    const key = e.key ? e.key.toLowerCase() : '';
    const keyCode = e.keyCode || e.which;

    // F12 key
    if (e.key === 'F12' || keyCode === 123) {
      return blockEvent(e);
    }

    // Ctrl+Shift+I (Inspector), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Picker), Ctrl+Shift+K
    if (isCmdOrCtrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k' || keyCode === 73 || keyCode === 74 || keyCode === 67 || keyCode === 75)) {
      return blockEvent(e);
    }

    // Ctrl+U (View Source), Ctrl+S (Save Page), Ctrl+P (Print Page)
    if (isCmdOrCtrl && (key === 'u' || key === 's' || key === 'p' || keyCode === 85 || keyCode === 83 || keyCode === 80)) {
      return blockEvent(e);
    }
  }

  window.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('keydown', handleKeyDown, true);

  // 3. DevTools Detection & Infinite Debugger Loop
  function antiDebug() {
    function triggerTrap() {
      try {
        (function () {
          (function a() {
            try {
              (function b(i) {
                if (('' + i / i).length !== 1 || i % 20 === 0) {
                  (function () {}).constructor('debugger')();
                } else {
                  debugger;
                }
                b(++i);
              })(0);
            } catch (e) {
              setTimeout(a, 50);
            }
          })();
        })();
      } catch (err) {}
    }

    setInterval(function () {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();
      if (endTime - startTime > 100) {
        triggerTrap();
      }
    }, 250);

    const threshold = 160;
    function checkDimensions() {
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        triggerTrap();
      }
    }
    window.addEventListener('resize', checkDimensions);
    setInterval(checkDimensions, 500);
  }

  antiDebug();

  // 4. Overwrite Console Methods
  if (typeof window.console !== 'undefined') {
    const noop = function () {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'assert', 'profile'];
    methods.forEach(function (m) {
      try {
        window.console[m] = noop;
      } catch (e) {}
    });
  }
})();
