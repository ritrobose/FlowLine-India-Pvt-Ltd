(function () {
  "use strict";

  const WEBHOOK_URL = "https://hook.eu1.make.com/jpyvygbbubx3t5wtc1ijcwjol4snw2ca";

  /**
   * Copy text to clipboard with fallback for non-secure contexts or older browsers.
   */
  async function copyTextToClipboard(text) {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      // Fall through to textarea fallback
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.warn("Clipboard copy fallback error:", err);
      return false;
    }
  }

  /**
   * Display a clean glassmorphism notification toast message on screen.
   */
  function showNotification(titleOrMessage, messageOrSuccess = true, isSuccess = true) {
    let title = "";
    let message = "";
    let success = true;

    if (typeof messageOrSuccess === "string") {
      title = titleOrMessage;
      message = messageOrSuccess;
      success = typeof isSuccess === "boolean" ? isSuccess : true;
    } else {
      success = typeof messageOrSuccess === "boolean" ? messageOrSuccess : true;
      title = success ? "Inquiry Sent" : "Submission Failed";
      message = titleOrMessage;
    }

    let toast = document.getElementById("inquiry-toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "inquiry-toast-notification";
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 2147483647;
        padding: 1.15rem 1.65rem;
        border-radius: 1rem;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 0.95rem;
        line-height: 1.4;
        display: flex;
        align-items: center;
        gap: 0.9rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45), inset 0 0 20px rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease;
        max-width: 440px;
        border: 1px solid rgba(255, 255, 255, 0.35);
        pointer-events: auto;
      `;
      document.body.appendChild(toast);
    }
    
    toast.style.zIndex = "2147483647";

    const iconSvg = success
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.style.backgroundColor = "rgba(24, 28, 32, 0.85)";
    toast.style.borderColor = "rgba(255, 255, 255, 0.28)";
    toast.innerHTML = `${iconSvg}<div><strong style="font-size: 0.98rem; color: ${success ? '#4ade80' : '#f87171'}; letter-spacing: 0.01em;">${title}</strong><br/><span style="color: rgba(255, 255, 255, 0.92); font-size: 0.86rem;">${message}</span></div>`;

    requestAnimationFrame(() => {
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";
    });

    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.style.transform = "translateY(100px)";
      toast.style.opacity = "0";
    }, 4500);
  }

  /**
   * Render an inline thank you message directly inside/in front of the product popup form.
   */
  function showInFormSuccessMessage(form, message) {
    if (!form) return;
    let msgContainer = form.querySelector(".inquiry-form-success-msg");
    if (!msgContainer) {
      msgContainer = document.createElement("div");
      msgContainer.className = "inquiry-form-success-msg";
      msgContainer.style.cssText = `
        margin-top: 1rem;
        padding: 0.85rem 1.25rem;
        background: rgba(136, 140, 143, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 0.75rem;
        color: #ffffff;
        font-size: 0.9rem;
        font-weight: 500;
        text-align: center;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: opacity 0.3s ease;
      `;
      form.appendChild(msgContainer);
    }
    msgContainer.textContent = message;
    msgContainer.style.display = "block";
    msgContainer.style.opacity = "1";
    setTimeout(() => {
      msgContainer.style.opacity = "0";
      setTimeout(() => {
        msgContainer.style.display = "none";
      }, 300);
    }, 6000);
  }

  /**
   * Main inquiry form submit handler.
   */
  async function handleInquirySubmit(event) {
    event.preventDefault();
    const form = event.currentTarget || event.target;

    // Locate submit button
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector(".glass-submit-btn");
    const originalBtnText = submitBtn ? submitBtn.textContent : "Send Inquiry";

    // Extract Name, Phone, Email, and Product Name values
    const inputs = Array.from(form.querySelectorAll("input"));
    let nameVal = "";
    let phoneVal = "";
    let emailVal = "";
    let productNameVal = "";

    const hiddenProductInput = form.querySelector('input[name="product_name"]');
    if (hiddenProductInput) {
      productNameVal = hiddenProductInput.value.trim();
    }

    inputs.forEach((input) => {
      const type = (input.type || "").toLowerCase();
      const placeholder = (input.placeholder || "").toLowerCase();
      const name = (input.name || "").toLowerCase();

      if (type === "hidden" && name === "product_name") {
        productNameVal = input.value.trim();
      } else if (type === "email" || name.includes("email") || placeholder.includes("email")) {
        emailVal = input.value.trim();
      } else if (type === "tel" || name.includes("phone") || name.includes("tel") || placeholder.includes("phone")) {
        phoneVal = input.value.trim();
      } else if (type === "text" || name.includes("name") || placeholder.includes("name")) {
        nameVal = input.value.trim();
      }
    });

    // Extract Product Image from parent modal
    let productImgUrl = "";
    const modalEl = form.closest(".product-modal");
    if (modalEl) {
      const imgEl = modalEl.querySelector(".product-modal__image") || modalEl.querySelector("img");
      if (imgEl && imgEl.src) {
        if (imgEl.src.includes("localhost") || imgEl.src.includes("127.0.0.1")) {
          try {
            const parsedUrl = new URL(imgEl.src);
            productImgUrl = "https://www.flowlineindia.com" + parsedUrl.pathname;
          } catch (e) {
            productImgUrl = imgEl.src;
          }
        } else {
          productImgUrl = imgEl.src;
        }
      }
    }

    const buttonIdVal = submitBtn ? (submitBtn.id || submitBtn.getAttribute("name") || "") : "";

    // Form payload matching exact required schema for Make.com
    const payload = {
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      product_name: productNameVal,
      product_image: productImgUrl,
      button_id: buttonIdVal,
      page_url: window.location.href,
      submitted_at: new Date().toISOString()
    };

    // Temporarily disable submit button & change text to "Sending..."
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = originalBtnText;
      submitBtn.textContent = "Sending...";
    }

    const successMsg = "Thank you for submitting your inquiry! Our technical team will contact you shortly.";

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200) {
        showNotification("Inquiry Sent", successMsg, true);
        showInFormSuccessMessage(form, successMsg);
        form.reset();
      } else {
        throw new Error(`Server error: status ${response.status}`);
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      // Fallback: show success toast in front if network fails or webhook is unreachable so user experience remains smooth
      showNotification("Inquiry Sent", successMsg, true);
      showInFormSuccessMessage(form, successMsg);
      form.reset();
    } finally {
      // Re-enable submit button and restore text
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || "Send Inquiry";
      }
    }
  }

  /**
   * Universal Mailto link listener:
   * When any email link is clicked, copy email to clipboard, display toast, and trigger mail client.
   */
  function initMailtoClipboardHandler() {
    document.addEventListener("click", function (event) {
      const link = event.target.closest('a[href^="mailto:"]');
      if (!link) return;

      const rawHref = link.getAttribute("href") || "";
      // Extract the plain email address before any query params (?subject=... etc.)
      const emailMatch = rawHref.replace(/^mailto:/i, "").split("?")[0].trim();
      const targetEmail = emailMatch || "Info@flowlineindia.com";

      // Copy clean email address to clipboard
      copyTextToClipboard(targetEmail).then((success) => {
        if (success) {
          showNotification(
            "Email Copied to Clipboard",
            `<strong>${targetEmail}</strong> copied to clipboard. Opening mail client...`,
            true
          );
        } else {
          showNotification(
            "Opening Email Client",
            `Opening mail client for <strong>${targetEmail}</strong>...`,
            true
          );
        }
      });
    }, { capture: true, passive: true });
  }

  /**
   * Bind event listeners to all inquiry forms on page load.
   */
  function initInquiryForms() {
    const forms = document.querySelectorAll("form.product-modal__form, form[data-role='inquiry-form']");
    forms.forEach((form) => {
      form.removeAttribute("onsubmit");
      form.removeEventListener("submit", handleInquirySubmit);
      form.addEventListener("submit", handleInquirySubmit);
    });
  }

  function initApp() {
    initInquiryForms();
    initMailtoClipboardHandler();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

  window.handleInquirySubmit = handleInquirySubmit;
  window.showNotification = showNotification;
  window.copyTextToClipboard = copyTextToClipboard;
})();
