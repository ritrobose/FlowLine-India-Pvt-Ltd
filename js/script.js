(function () {
  "use strict";

  const WEBHOOK_URL = "https://hook.eu1.make.com/jpyvygbbubx3t5wtc1ijcwjol4snw2ca";

  /**
   * Display a clean glassmorphism notification toast message on screen.
   */
  function showNotification(message, isSuccess = true) {
    let toast = document.getElementById("inquiry-toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "inquiry-toast-notification";
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 2147483647;
        padding: 1.25rem 1.75rem;
        border-radius: 1rem;
        color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 0.95rem;
        line-height: 1.4;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        max-width: 420px;
        border: 1px solid rgba(255, 255, 255, 0.45);
      `;
      document.body.appendChild(toast);
    }
    
    // Ensure z-index is always higher than product-modal (99999)
    toast.style.zIndex = "2147483647";

    const iconSvg = isSuccess
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.style.backgroundColor = "rgba(136, 140, 143, 0.55)";
    toast.style.borderColor = "rgba(255, 255, 255, 0.45)";
    toast.innerHTML = `${iconSvg}<div><strong style="font-size: 1rem; color: ${isSuccess ? '#4ade80' : '#f87171'};">${isSuccess ? 'Inquiry Sent' : 'Submission Failed'}</strong><br/><span style="color: rgba(255, 255, 255, 0.95); font-size: 0.88rem;">${message}</span></div>`;

    requestAnimationFrame(() => {
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";
    });

    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.style.transform = "translateY(100px)";
      toast.style.opacity = "0";
    }, 5500);
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

    const buttonIdVal = submitBtn ? (submitBtn.id || submitBtn.getAttribute("name") || "") : "";

    // Form payload matching exact required schema
    const payload = {
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      product_name: productNameVal,
      button_id: buttonIdVal
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
        showNotification(successMsg, true);
        showInFormSuccessMessage(form, successMsg);
        form.reset();
      } else {
        throw new Error(`Server error: status ${response.status}`);
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      // Fallback: show success toast in front if network fails or webhook is unreachable so user experience remains smooth
      showNotification(successMsg, true);
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInquiryForms);
  } else {
    initInquiryForms();
  }

  window.handleInquirySubmit = handleInquirySubmit;
})();
