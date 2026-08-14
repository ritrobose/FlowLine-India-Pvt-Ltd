/**
 * FlowLine Absolute Anti-Right-Click & Anti-Inspection Security Guard
 */
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
    if (!e) return false;
    if (e.type === 'contextmenu' || e.button === 2 || e.which === 3) {
      return killEvent(e);
    }
    if (e.type === 'dragstart' || e.type === 'selectstart' || e.type === 'copy' || e.type === 'cut') {
      return killEvent(e);
    }
  }

  // 1. Capture-phase window & document listeners
  var mouseEvents = ['contextmenu', 'mousedown', 'mouseup', 'auxclick', 'pointerdown', 'pointerup', 'dragstart', 'selectstart', 'copy', 'cut'];
  for (var i = 0; i < mouseEvents.length; i++) {
    window.addEventListener(mouseEvents[i], handleMouse, true);
    document.addEventListener(mouseEvents[i], handleMouse, true);
    if (document.documentElement) {
      document.documentElement.addEventListener(mouseEvents[i], handleMouse, true);
    }
  }

  // 2. Direct property bindings
  window.oncontextmenu = handleMouse;
  document.oncontextmenu = handleMouse;

  // 3. Attach handler to body when ready
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

  // 4. Keyboard shortcuts prevention
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

  // 5. Console method suppression
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
