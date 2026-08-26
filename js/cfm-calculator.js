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

  // Handle click on Inquire button to copy calculation summary & notify user
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

      // Display toast notification
      if (typeof window.showNotification === "function") {
        window.showNotification(
          "Airflow Calculation Copied!",
          `<strong>${formatNumber(calculatedCfm)} CFM</strong> calculation details copied to clipboard. Opening mail client...`,
          true
        );
      }
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
