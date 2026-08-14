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
        z-index: 10000;
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
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
      document.body.appendChild(toast);
    }

    const iconSvg = isSuccess
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.style.backgroundColor = isSuccess ? "rgba(20, 45, 28, 0.92)" : "rgba(55, 20, 20, 0.92)";
    toast.style.borderColor = isSuccess ? "rgba(74, 222, 128, 0.4)" : "rgba(248, 113, 113, 0.4)";
    toast.innerHTML = `${iconSvg}<div><strong style="font-size: 1rem; color: ${isSuccess ? '#4ade80' : '#f87171'};">${isSuccess ? 'Inquiry Sent' : 'Submission Failed'}</strong><br/><span style="color: rgba(255, 255, 255, 0.9); font-size: 0.88rem;">${message}</span></div>`;

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
   * Main inquiry form submit handler.
   */
  async function handleInquirySubmit(event) {
    event.preventDefault();
    const form = event.currentTarget || event.target;

    // Locate submit button
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector(".glass-submit-btn");
    const originalBtnText = submitBtn ? submitBtn.textContent : "Send Inquiry";

    // Extract Name, Phone, and Email values
    const inputs = Array.from(form.querySelectorAll("input"));
    let nameVal = "";
    let phoneVal = "";
    let emailVal = "";

    inputs.forEach((input) => {
      const type = (input.type || "").toLowerCase();
      const placeholder = (input.placeholder || "").toLowerCase();
      const name = (input.name || "").toLowerCase();

      if (type === "email" || name.includes("email") || placeholder.includes("email")) {
        emailVal = input.value.trim();
      } else if (type === "tel" || name.includes("phone") || name.includes("tel") || placeholder.includes("phone")) {
        phoneVal = input.value.trim();
      } else if (type === "text" || name.includes("name") || placeholder.includes("name")) {
        nameVal = input.value.trim();
      }
    });

    // Form payload matching exact required schema
    const payload = {
      name: nameVal,
      phone: phoneVal,
      email: emailVal
    };

    // Temporarily disable submit button & change text to "Sending..."
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = originalBtnText;
      submitBtn.textContent = "Sending...";
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200) {
        showNotification("Thank you! Your inquiry has been transmitted successfully. Our technical team will contact you shortly.", true);
        form.reset();
      } else {
        throw new Error(`Server error: status ${response.status}`);
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      showNotification("Failed to send inquiry. Please check your connection and try again.", false);
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
