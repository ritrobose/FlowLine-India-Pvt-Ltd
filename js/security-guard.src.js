/**
 * FlowLine Security Guard - DevTools F12 Shortcut Prevention Only
 * Touch and mouse drag events are 100% untouched for full native tablet/touchscreen scrolling.
 */
(function () {
  'use strict';

  // Keyboard DevTools shortcuts prevention
  window.addEventListener('keydown', function (e) {
    var isCmdOrCtrl = e.ctrlKey || e.metaKey;
    var key = e.key ? e.key.toLowerCase() : '';
    var keyCode = e.keyCode || e.which;

    if (e.key === 'F12' || keyCode === 123) {
      if (e.preventDefault) e.preventDefault();
      return false;
    }
    if (isCmdOrCtrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k' || keyCode === 73 || keyCode === 74 || keyCode === 67 || keyCode === 75)) {
      if (e.preventDefault) e.preventDefault();
      return false;
    }
    if (isCmdOrCtrl && (key === 'u' || key === 's' || keyCode === 85 || keyCode === 83)) {
      if (e.preventDefault) e.preventDefault();
      return false;
    }
  }, true);
})();
