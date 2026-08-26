/**
 * Flowline Interactive CFM Airflow Calculator
 * Real-time dynamic volume and ventilation calculator with presets and smart fan matching.
 */

export function initCfmCalculator() {
  const areaSlider = document.getElementById("cfm-area-slider");
  const heightSlider = document.getElementById("cfm-height-slider");
  const achSlider = document.getElementById("cfm-ach-slider");

  const areaDisplay = document.getElementById("cfm-area-display");
  const heightDisplay = document.getElementById("cfm-height-display");
  const achDisplay = document.getElementById("cfm-ach-display");
  const volumeDisplay = document.getElementById("cfm-volume-display");

  const cfmCounter = document.getElementById("cfm-counter-value");
  const m3hCounter = document.getElementById("cfm-m3h-value");
  const recTitle = document.getElementById("cfm-rec-title");
  const recDesc = document.getElementById("cfm-rec-desc");
  const inquireBtn = document.getElementById("cfm-inquire-btn");
  const presetButtons = document.querySelectorAll(".cfm-preset-btn");

  if (!areaSlider || !heightSlider || !achSlider || !cfmCounter) return;

  let currentDisplayedCfm = 0;
  let animFrame = 0;

  const presets = {
    warehouse: { area: 5000, height: 20, ach: 8, name: "Industrial Warehouse / Factory" },
    kitchen: { area: 800, height: 10, ach: 25, name: "Commercial Kitchen / Exhaust" },
    office: { area: 2500, height: 10, ach: 5, name: "Corporate Office / Retail" },
    parking: { area: 10000, height: 12, ach: 6, name: "Basement / Underground Parking" },
    gym: { area: 3500, height: 14, ach: 10, name: "Gymnasium / Fitness Center" }
  };

  function formatNumber(num) {
    return Math.round(num).toLocaleString();
  }

  function getSmartRecommendation(cfm, ach, area, height) {
    if (ach >= 20) {
      return {
        title: "Flowline Centrifugal Blower / Kitchen Exhaust Series",
        desc: "High static pressure and high-velocity grease/smoke extraction designed for continuous commercial kitchen duties."
      };
    } else if (area >= 4000 && height >= 16) {
      return {
        title: "Flowline HVLS Gearless PMSM Ceiling Fan or Axial Flow Fans",
        desc: "Maximum cubic airflow coverage per kilowatt with massive destratification and gentle industrial breeze."
      };
    } else if (cfm >= 8000) {
      return {
        title: "Flowline Heavy-Duty Industrial Axial Flow Fan Series",
        desc: "Engineered cast aluminum aerofoil adjustable blades delivering massive volumetric air displacement with high IE3 efficiency."
      };
    } else {
      return {
        title: "Flowline Direct Driven Centrifugal Fan (RDY/RML Series)",
        desc: "Compact, quiet, and vibration-isolated industrial blower for ducted airflow and clean air supply."
      };
    }
  }

  function animateCounter(targetCfm) {
    cancelAnimationFrame(animFrame);
    const startVal = currentDisplayedCfm;
    const diff = targetCfm - startVal;
    const duration = 300;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
      const val = startVal + diff * ease;

      cfmCounter.textContent = formatNumber(val);
      if (m3hCounter) {
        m3hCounter.textContent = formatNumber(val * 1.69901);
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        currentDisplayedCfm = targetCfm;
      }
    }
    animFrame = requestAnimationFrame(step);
  }

  function getMailData() {
    const area = parseFloat(areaSlider.value) || 0;
    const height = parseFloat(heightSlider.value) || 0;
    const ach = parseFloat(achSlider.value) || 0;
    const volume = area * height;
    const calculatedCfm = (volume * ach) / 60;
    const m3h = calculatedCfm * 1.69901;
    const rec = getSmartRecommendation(calculatedCfm, ach, area, height);

    const subject = `Inquiry for ${formatNumber(calculatedCfm)} CFM Airflow Calculation - Flowline India`;
    const body =
      `Hello Flowline Team,\n\n` +
      `I would like to inquire about a ventilation solution for my facility based on the following calculation from your website:\n\n` +
      `• Space Area: ${formatNumber(area)} sq.ft (${formatNumber(area * 0.0929)} m²)\n` +
      `• Ceiling Height: ${height} ft (${(height * 0.3048).toFixed(1)} m)\n` +
      `• Total Space Volume: ${formatNumber(volume)} cu.ft (${formatNumber(volume * 0.0283)} m³)\n` +
      `• Desired Air Changes (ACH): ${ach} ACH\n` +
      `• Calculated Airflow Requirement: ${formatNumber(calculatedCfm)} CFM (${formatNumber(m3h)} m³/h)\n` +
      `• Recommended System: ${rec.title}\n\n` +
      `Please review these parameters and provide engineering advice, fan selection confirmation, and a commercial quotation.\n\n` +
      `Thank you!`;

    return { subject, body, calculatedCfm };
  }

  function recalculate() {
    const area = parseFloat(areaSlider.value) || 0;
    const height = parseFloat(heightSlider.value) || 0;
    const ach = parseFloat(achSlider.value) || 0;

    const volume = area * height;
    const calculatedCfm = (volume * ach) / 60;

    // Update displays
    if (areaDisplay) areaDisplay.textContent = `${formatNumber(area)} sq.ft (${formatNumber(area * 0.0929)} m²)`;
    if (heightDisplay) heightDisplay.textContent = `${height} ft (${(height * 0.3048).toFixed(1)} m)`;
    if (achDisplay) achDisplay.textContent = `${ach} ACH`;
    if (volumeDisplay) volumeDisplay.textContent = `${formatNumber(volume)} cu.ft (${formatNumber(volume * 0.0283)} m³)`;

    // Animate target CFM
    animateCounter(calculatedCfm);

    // Smart Recommendation
    const rec = getSmartRecommendation(calculatedCfm, ach, area, height);
    if (recTitle) recTitle.textContent = rec.title;
    if (recDesc) recDesc.textContent = rec.desc;

    // Update Inquire Link
    if (inquireBtn) {
      const { subject, body } = getMailData();
      inquireBtn.href = `mailto:Info@flowlineindia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  function showCfmInquiryModal(calculatedCfm, mailBodyText, mailtoUrl) {
    let existingModal = document.getElementById("cfm-inquiry-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.id = "cfm-inquiry-modal";
    modal.className = "cfm-modal-wrapper";
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(5, 8, 15, 0.82);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      opacity: 0;
      transition: opacity 0.28s ease;
      padding: 1.25rem;
      box-sizing: border-box;
    `;

    modal.innerHTML = `
      <div class="cfm-modal-card" style="
        position: relative;
        background: #0f131c;
        border: 1px solid rgba(0, 229, 255, 0.35);
        border-radius: 1.25rem;
        max-width: 520px;
        width: 100%;
        padding: 2.25rem 2rem 2rem 2rem;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 229, 255, 0.18);
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transform: scale(0.92);
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        box-sizing: border-box;
      ">
        <!-- Manual Close Cross Button -->
        <button id="cfm-modal-close-btn" style="
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        " aria-label="Close Instructions">&times;</button>

        <!-- Modal Header -->
        <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.15rem;">
          <div style="
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: rgba(0, 229, 255, 0.15);
            border: 1px solid rgba(0, 229, 255, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: #00e5ff;
          ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.35rem; font-weight: 700; color: #ffffff; line-height: 1.25;">
              Airflow Data Copied!
            </h3>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.88rem; color: #00e5ff; font-weight: 600;">
              Calculated Airflow: ${formatNumber(calculatedCfm)} CFM
            </p>
          </div>
        </div>

        <p style="font-size: 0.93rem; color: #a0aec0; line-height: 1.55; margin-bottom: 1.25rem;">
          Your airflow calculation parameters have been automatically copied to your clipboard. Follow these step-by-step instructions to complete your email inquiry:
        </p>

        <!-- Step-by-Step Instructions -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.75rem;">

          <!-- Step 1 -->
          <div style="
            display: flex;
            gap: 0.85rem;
            background: rgba(255, 255, 255, 0.035);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.85rem 1rem;
            border-radius: 0.75rem;
            align-items: flex-start;
          ">
            <span style="
              background: #00e5ff;
              color: #080d14;
              font-weight: 800;
              font-size: 0.85rem;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              margin-top: 0.1rem;
            ">1</span>
            <div>
              <strong style="display: block; color: #ffffff; font-size: 0.95rem; margin-bottom: 0.2rem;">
                Open Your Email Account
              </strong>
              <span style="font-size: 0.86rem; color: #cbd5e0; line-height: 1.45;">
                Open your email app or webmail (such as <strong>Gmail, Outlook, Yahoo</strong>) and compose a new email to <strong style="color: #00e5ff;">Info@flowlineindia.com</strong>.
              </span>
            </div>
          </div>

          <!-- Step 2 -->
          <div style="
            display: flex;
            gap: 0.85rem;
            background: rgba(255, 255, 255, 0.035);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.85rem 1rem;
            border-radius: 0.75rem;
            align-items: flex-start;
          ">
            <span style="
              background: #00e5ff;
              color: #080d14;
              font-weight: 800;
              font-size: 0.85rem;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              margin-top: 0.1rem;
            ">2</span>
            <div>
              <strong style="display: block; color: #ffffff; font-size: 0.95rem; margin-bottom: 0.2rem;">
                Paste Your Calculation Data
              </strong>
              <span style="font-size: 0.86rem; color: #cbd5e0; line-height: 1.45;">
                Right-click inside the message body and select <strong style="color: #ffffff;">Paste</strong> (or press <kbd style="background: rgba(255,255,255,0.15); padding: 2px 6px; border-radius: 4px; font-family: monospace;">Ctrl + V</kbd> / <kbd style="background: rgba(255,255,255,0.15); padding: 2px 6px; border-radius: 4px; font-family: monospace;">Cmd + V</kbd>) to insert the complete report.
              </span>
            </div>
          </div>

          <!-- Step 3 -->
          <div style="
            display: flex;
            gap: 0.85rem;
            background: rgba(255, 255, 255, 0.035);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.85rem 1rem;
            border-radius: 0.75rem;
            align-items: flex-start;
          ">
            <span style="
              background: #00e5ff;
              color: #080d14;
              font-weight: 800;
              font-size: 0.85rem;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              margin-top: 0.1rem;
            ">3</span>
            <div>
              <strong style="display: block; color: #ffffff; font-size: 0.95rem; margin-bottom: 0.2rem;">
                Send Inquiry to Flowline Engineers
              </strong>
              <span style="font-size: 0.86rem; color: #cbd5e0; line-height: 1.45;">
                Click Send! Our engineering team will review your airflow requirements and respond promptly.
              </span>
            </div>
          </div>

        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: stretch;">
          <button id="cfm-modal-dismiss-btn" style="
            width: 100%;
            text-align: center;
            padding: 0.85rem 1.25rem;
            background: linear-gradient(135deg, #00e5ff 0%, #00b0ff 100%);
            color: #080d14;
            font-weight: 700;
            font-size: 0.95rem;
            border-radius: 0.65rem;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 229, 255, 0.35);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          ">
            Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Trigger smooth fade-in
    requestAnimationFrame(() => {
      modal.style.opacity = "1";
      const card = modal.querySelector(".cfm-modal-card");
      if (card) card.style.transform = "scale(1)";
    });

    function closeModal() {
      modal.style.opacity = "0";
      const card = modal.querySelector(".cfm-modal-card");
      if (card) card.style.transform = "scale(0.92)";
      setTimeout(() => {
        if (modal.parentNode) modal.parentNode.removeChild(modal);
      }, 280);
    }

    // Manual close cross button
    const closeBtn = modal.querySelector("#cfm-modal-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Dismiss button
    const dismissBtn = modal.querySelector("#cfm-modal-dismiss-btn");
    if (dismissBtn) dismissBtn.addEventListener("click", closeModal);

    // Backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Escape key
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }

  // Handle click on Inquire button to copy calculation summary & trigger centered instruction modal
  if (inquireBtn) {
    inquireBtn.addEventListener("click", () => {
      const { subject, body, calculatedCfm } = getMailData();
      const mailtoUrl = `mailto:Info@flowlineindia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      inquireBtn.href = mailtoUrl;

      // Copy clean text to clipboard
      if (typeof window.copyTextToClipboard === "function") {
        window.copyTextToClipboard(body);
      } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(body).catch(() => {});
      }

      // Open centered instruction modal
      showCfmInquiryModal(calculatedCfm, body, mailtoUrl);
    });
  }

  // Bind sliders
  [areaSlider, heightSlider, achSlider].forEach((slider) => {
    slider.addEventListener("input", () => {
      // Clear active preset state if user manually drags slider
      presetButtons.forEach((btn) => btn.classList.remove("active"));
      recalculate();
    });
  });

  // Preset buttons
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const presetKey = btn.getAttribute("data-preset");
      const config = presets[presetKey];
      if (!config) return;

      presetButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      areaSlider.value = config.area;
      heightSlider.value = config.height;
      achSlider.value = config.ach;

      recalculate();
    });
  });

  // Initial calculation
  currentDisplayedCfm = (parseFloat(areaSlider.value) * parseFloat(heightSlider.value) * parseFloat(achSlider.value)) / 60;
  if (cfmCounter) cfmCounter.textContent = formatNumber(currentDisplayedCfm);
  recalculate();
}
