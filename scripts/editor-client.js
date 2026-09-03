/**
 * Local In-Browser Visual Editor Client
 * Injected only during localhost development preview.
 */
(function () {
  if (window.__LOCAL_DEV_EDITOR_ACTIVE__) return;
  window.__LOCAL_DEV_EDITOR_ACTIVE__ = true;

  // Unblock right-click & text selection in local dev mode
  window.addEventListener('contextmenu', (e) => e.stopImmediatePropagation(), true);
  window.addEventListener('selectstart', (e) => e.stopImmediatePropagation(), true);

  let isEditMode = false;
  let hoveredElement = null;
  let activeEditableElement = null;
  let hasUnsavedChanges = false;
  let changeCount = 0;

  // Create isolated container
  const hostEl = document.createElement('div');
  hostEl.id = '__local_editor_root__';
  document.body.appendChild(hostEl);

  const shadow = hostEl.attachShadow({ mode: 'open' });

  // Inject styles for the editor toolbar & badges
  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    .editor-pill-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 6px 8px 6px 16px;
      box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.25);
      color: #f8fafc;
      font-size: 13px;
      font-weight: 500;
      user-select: none;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
    }

    .editor-pill-container:hover {
      box-shadow: 0 16px 40px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2);
    }

    .brand-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
      letter-spacing: 0.02em;
      color: #38bdf8;
      font-size: 12px;
      text-transform: uppercase;
      padding-right: 6px;
      border-right: 1px solid rgba(255, 255, 255, 0.12);
    }

    .brand-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      display: inline-block;
    }

    .brand-dot.editing {
      background: #38bdf8;
      box-shadow: 0 0 8px #38bdf8;
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }

    .btn {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 9999px;
      border: none;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.15s ease;
      outline: none;
    }

    .btn-toggle {
      background: rgba(255, 255, 255, 0.08);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .btn-toggle:hover {
      background: rgba(255, 255, 255, 0.16);
      color: #ffffff;
    }
    .btn-toggle.active {
      background: #2563eb;
      color: #ffffff;
      border-color: #3b82f6;
      box-shadow: 0 0 14px rgba(59, 130, 246, 0.5);
    }

    .btn-save {
      background: #059669;
      color: #ffffff;
      border: 1px solid #10b981;
      display: none;
      animation: fadeIn 0.2s ease;
    }
    .btn-save:hover {
      background: #047857;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
    }
    .btn-save.visible {
      display: inline-flex;
    }

    .changes-badge {
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 999px;
      font-weight: 700;
    }

    /* Floating Toast */
    .toast {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 10px 22px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
      z-index: 2147483647;
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .toast.success { border-color: #10b981; }
    .toast.error { border-color: #ef4444; }

    /* Modal for Image Edit */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 2147483647;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .modal-overlay.open {
      display: flex;
    }
    .modal-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 24px;
      width: 440px;
      max-width: 90vw;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      color: #f8fafc;
    }
    .modal-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .modal-field {
      margin-bottom: 14px;
    }
    .modal-field label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #94a3b8;
      margin-bottom: 6px;
      text-transform: uppercase;
    }
    .modal-field input {
      width: 100%;
      padding: 9px 12px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: #fff;
      font-size: 13px;
      outline: none;
    }
    .modal-field input:focus {
      border-color: #38bdf8;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  shadow.appendChild(style);

  // Global Page Overlay Styles for Element Hovering
  const pageStyle = document.createElement('style');
  pageStyle.id = '__local_editor_page_styles__';
  pageStyle.textContent = `
    .__editor_highlight__ {
      outline: 2px dashed #0284c7 !important;
      outline-offset: 3px !important;
      cursor: pointer !important;
      position: relative !important;
      background-color: rgba(14, 165, 233, 0.07) !important;
      transition: background-color 0.15s ease !important;
    }

    .__editor_editing__ {
      outline: 2px solid #10b981 !important;
      outline-offset: 3px !important;
      background-color: rgba(16, 185, 129, 0.08) !important;
      cursor: text !important;
    }

    body.__editor_mode_active__ a {
      cursor: pointer !important;
    }
  `;
  document.head.appendChild(pageStyle);

  // Build UI Elements
  const toolbar = document.createElement('div');
  toolbar.className = 'editor-pill-container';
  toolbar.innerHTML = `
    <div class="brand-tag">
      <span class="brand-dot" id="statusDot"></span>
      Editor
    </div>
    <button class="btn btn-toggle" id="toggleBtn" title="Click to turn on visual element selection & editing">
      <span>✏️</span> Edit Mode
    </button>
    <button class="btn btn-save" id="saveBtn" title="Save changes directly to local HTML file (Ctrl+S)">
      <span>💾</span> Save
      <span class="changes-badge" id="changeBadge">0</span>
    </button>
  `;
  shadow.appendChild(toolbar);

  // Toast UI
  const toast = document.createElement('div');
  toast.className = 'toast';
  shadow.appendChild(toast);

  function showToast(message, type = 'success', duration = 3000) {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
      toast.className = 'toast';
    }, duration);
  }

  // Image Modal UI
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-title">🖼️ Edit Image Properties</div>
      <div class="modal-field">
        <label>Image Source URL / Path</label>
        <input type="text" id="imgSrcInput" placeholder="assets/example.png or https://..." />
      </div>
      <div class="modal-field">
        <label>Alt Text Description</label>
        <input type="text" id="imgAltInput" placeholder="Image description..." />
      </div>
      <div class="modal-actions">
        <button class="btn btn-toggle" id="cancelImgBtn">Cancel</button>
        <button class="btn btn-toggle" style="background:#0284c7;border-color:#38bdf8;" id="saveImgBtn">Update Image</button>
      </div>
    </div>
  `;
  shadow.appendChild(modal);

  let targetedImg = null;
  const imgSrcInput = modal.querySelector('#imgSrcInput');
  const imgAltInput = modal.querySelector('#imgAltInput');

  modal.querySelector('#cancelImgBtn').onclick = () => {
    modal.classList.remove('open');
    targetedImg = null;
  };

  modal.querySelector('#saveImgBtn').onclick = () => {
    if (targetedImg) {
      targetedImg.src = imgSrcInput.value.trim();
      targetedImg.alt = imgAltInput.value.trim();
      recordChange();
      showToast('Image updated! Hit Save to persist.');
    }
    modal.classList.remove('open');
    targetedImg = null;
  };

  // Button handlers
  const toggleBtn = toolbar.querySelector('#toggleBtn');
  const saveBtn = toolbar.querySelector('#saveBtn');
  const statusDot = toolbar.querySelector('#statusDot');
  const changeBadge = toolbar.querySelector('#changeBadge');

  function recordChange() {
    hasUnsavedChanges = true;
    changeCount++;
    changeBadge.textContent = changeCount;
    saveBtn.classList.add('visible');
  }

  function toggleEditMode() {
    isEditMode = !isEditMode;
    if (isEditMode) {
      document.body.classList.add('__editor_mode_active__');
      toggleBtn.classList.add('active');
      toggleBtn.innerHTML = `<span>✓</span> Done Editing`;
      statusDot.classList.add('editing');
      showToast('Edit mode ON: Click any text or image to edit!', 'success', 2500);
    } else {
      exitCurrentEditing();
      document.body.classList.remove('__editor_mode_active__');
      toggleBtn.classList.remove('active');
      toggleBtn.innerHTML = `<span>✏️</span> Edit Mode`;
      statusDot.classList.remove('editing');
      clearHoverHighlight();
    }
  }

  toggleBtn.onclick = toggleEditMode;

  function clearHoverHighlight() {
    if (hoveredElement) {
      hoveredElement.classList.remove('__editor_highlight__');
      hoveredElement = null;
    }
  }

  function exitCurrentEditing() {
    if (activeEditableElement) {
      activeEditableElement.removeAttribute('contenteditable');
      activeEditableElement.classList.remove('__editor_editing__');
      activeEditableElement = null;
    }
  }

  // Determine if element is eligible for text editing
  function isEditableTarget(el) {
    if (!el || el === hostEl || hostEl.contains(el) || el === document.body || el === document.documentElement) {
      return false;
    }
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'NOSCRIPT' || el.tagName === 'SVG' || el.tagName === 'PATH') {
      return false;
    }
    return true;
  }

  // Hover detection
  document.addEventListener('mouseover', (e) => {
    if (!isEditMode || activeEditableElement) return;
    const target = e.target;
    if (!isEditableTarget(target)) return;

    if (hoveredElement && hoveredElement !== target) {
      hoveredElement.classList.remove('__editor_highlight__');
    }

    hoveredElement = target;
    hoveredElement.classList.add('__editor_highlight__');
  }, true);

  document.addEventListener('mouseout', (e) => {
    if (!isEditMode || activeEditableElement) return;
    if (hoveredElement && hoveredElement === e.target) {
      hoveredElement.classList.remove('__editor_highlight__');
      hoveredElement = null;
    }
  }, true);

  // Click to edit
  document.addEventListener('click', (e) => {
    if (!isEditMode) return;
    
    // Ignore clicks inside our editor root
    if (e.composedPath().some(el => el === hostEl)) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    if (!isEditableTarget(target)) return;

    // Handle Images
    if (target.tagName === 'IMG') {
      targetedImg = target;
      imgSrcInput.value = target.getAttribute('src') || '';
      imgAltInput.value = target.getAttribute('alt') || '';
      modal.classList.add('open');
      return;
    }

    // Handle Text elements
    if (activeEditableElement && activeEditableElement !== target) {
      exitCurrentEditing();
    }

    clearHoverHighlight();
    activeEditableElement = target;
    target.classList.add('__editor_editing__');
    target.setAttribute('contenteditable', 'true');
    target.focus();

    let originalContent = target.innerHTML;

    const onBlurOrInput = () => {
      if (target.innerHTML !== originalContent) {
        originalContent = target.innerHTML;
        recordChange();
      }
    };

    target.addEventListener('input', onBlurOrInput);
    target.addEventListener('blur', () => {
      onBlurOrInput();
      target.removeEventListener('input', onBlurOrInput);
      exitCurrentEditing();
    }, { once: true });

  }, true);

  // Keyboard Shortcuts: Ctrl+S / Cmd+S to Save, Escape to exit element
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      savePageContent();
      return;
    }
    if (e.key === 'Escape' && activeEditableElement) {
      exitCurrentEditing();
    }
  });

  // Save changes to disk via local dev server
  async function savePageContent() {
    exitCurrentEditing();
    clearHoverHighlight();

    showToast('Saving changes to disk...', 'success', 2000);

    try {
      // Clone DOM to clean all editor artifacts
      const clone = document.documentElement.cloneNode(true);

      // Remove editor root
      const editorRoot = clone.querySelector('#__local_editor_root__');
      if (editorRoot) editorRoot.remove();

      // Remove page styles
      const pageStyles = clone.querySelector('#__local_editor_page_styles__');
      if (pageStyles) pageStyles.remove();

      // Remove injected editor script
      const editorScript = clone.querySelector('script[src*="editor-client.js"]');
      if (editorScript) editorScript.remove();

      // Clean temporary editing classes & attributes
      clone.classList.remove('__editor_mode_active__');
      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        el.classList.remove('__editor_highlight__', '__editor_editing__');
        if (el.getAttribute('class') === '') el.removeAttribute('class');
        el.removeAttribute('contenteditable');
      });

      const fullHtml = '<!DOCTYPE html>\n' + clone.outerHTML;

      const res = await fetch('/api/save-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          html: fullHtml
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        hasUnsavedChanges = false;
        changeCount = 0;
        changeBadge.textContent = '0';
        saveBtn.classList.remove('visible');
        showToast(`Saved to ${data.file}! (Backup saved)`, 'success', 4000);
      } else {
        showToast(`Failed: ${data.message || 'Unknown error'}`, 'error', 4000);
      }
    } catch (err) {
      console.error('Error saving page:', err);
      showToast('Network error while saving.', 'error', 4000);
    }
  }

  saveBtn.onclick = savePageContent;

  console.log('%c[Flowline Local Editor] Active. Press "Edit Mode" in the bottom-right corner to edit text.', 'color: #38bdf8; font-weight: bold;');
})();
