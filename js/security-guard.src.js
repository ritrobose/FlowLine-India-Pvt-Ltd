/**
 * FlowLine Fail-Safe Anti-Right-Click & Security Guard Source
 */
(function () {
  'use strict';

  function blockRightClick(e) {
    if (!e) return false;
    if (e.type === 'contextmenu' || e.button === 2 || e.which === 3) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
      return false;
    }
    if (e.type === 'dragstart' || e.type === 'selectstart') {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      return false;
    }
  }

  // Bind right-click & mouse event traps across capturing phase
  var events = ['contextmenu', 'mousedown', 'mouseup', 'auxclick', 'dragstart', 'selectstart', 'copy', 'cut'];
  for (var i = 0; i < events.length; i++) {
    window.addEventListener(events[i], blockRightClick, true);
    document.addEventListener(events[i], blockRightClick, true);
    if (document.documentElement) {
      document.documentElement.addEventListener(events[i], blockRightClick, true);
    }
  }

  // Direct property bindings
  window.oncontextmenu = blockRightClick;
  document.oncontextmenu = blockRightClick;

  document.addEventListener('DOMContentLoaded', function () {
    if (document.body) {
      document.body.oncontextmenu = blockRightClick;
      document.body.addEventListener('contextmenu', blockRightClick, true);
      document.body.addEventListener('mousedown', blockRightClick, true);
      document.body.addEventListener('auxclick', blockRightClick, true);
    }
  });

  // Keyboard shortcut prevention
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
    if (isCmdOrCtrl && (key === 'u' || key === 's' || key === 'p' || keyCode === 85 || keyCode === 83 || keyCode === 80)) {
      if (e.preventDefault) e.preventDefault();
      return false;
    }
  }, true);

  // Disable Console Output
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
