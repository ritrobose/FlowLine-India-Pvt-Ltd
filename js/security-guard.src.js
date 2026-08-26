/**
 * FlowLine Anti-Right-Click & Anti-Inspection Security Guard
 * Touch and pointer scroll gestures are explicitly allowed for seamless tablet/mobile UX.
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
    if (!e) return true;
    
    // Always allow touch and pointer gestures so touch scrolling on tablets/mobile works
    if (e.pointerType === 'touch' || (e.touches && e.touches.length > 0)) {
      return true;
    }

    // Always allow typing/selecting inside input elements and textareas
    var targetTag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (targetTag === 'input' || targetTag === 'textarea') {
      return true;
    }

    if (e.type === 'contextmenu' || e.button === 2 || e.which === 3) {
      return killEvent(e);
    }
    if (e.type === 'copy' || e.type === 'cut') {
      return killEvent(e);
    }
  }

  // 1. Capture-phase window & document listeners for right-click and copy/cut
  var securityEvents = ['contextmenu', 'copy', 'cut'];
  for (var i = 0; i < securityEvents.length; i++) {
    window.addEventListener(securityEvents[i], handleMouse, true);
    document.addEventListener(securityEvents[i], handleMouse, true);
    if (document.documentElement) {
      document.documentElement.addEventListener(securityEvents[i], handleMouse, true);
    }
  }

  // 2. Direct property bindings for right-click
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

  // 3. Keyboard shortcuts prevention
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

  // 4. Console method suppression
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
