(function () {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("/* global styles */\n\n:focus-visible {\n  transition: var(--transition-default);\n  outline: currentColor solid 1px;\n  outline-offset: 0.25em;\n}\n\n.visually-hidden {\n  position: absolute !important;\n  margin: -1px !important;\n  padding: 0 !important;\n  border: 0 !important;\n  white-space: nowrap !important;\n  block-size: 1px !important;\n  clip: rect(0, 0, 0, 0) !important;\n  inline-size: 1px !important;\n  overflow: hidden !important;\n}\n\n* {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\nhtml.lenis,html.lenis body{height:auto}\n\n.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}\n\n.lenis [data-lenis-prevent],.lenis [data-lenis-prevent-wheel],.lenis [data-lenis-prevent-touch]{overscroll-behavior:contain}\n\n.lenis.lenis-smooth iframe{pointer-events:none}\n\n.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}\n\nbody {\n\n  /** {\n    backdrop-filter: unset !important;\n  } */\n}\n\nbody.js--locked {\n    overflow: hidden;\n    touch-action: pan-y !important;\n    padding-inline-end: var(--js-scrollbar-width);\n  }\n\nbody {\n\n  overflow: unset;\n  overflow-x: hidden;\n}\n\n[data-role='hover-trigger']:hover [data-role='hover'] {\n      opacity: 1;\n    }\n\n[data-role='hover-trigger']:hover [data-role='image'],\n    [data-role='hover-trigger']:hover [data-role='button'] {\n      border-radius: 1.25rem;\n    }\n\n[data-role='inner-hover-trigger']:hover [data-role='inner-hover'] {\n      opacity: 1;\n    }\n\n[data-role='inner-hover-trigger']:hover [data-role='inner-image'],\n    [data-role='inner-hover-trigger']:hover [data-role='inner-button'] {\n      border-radius: 1.25rem;\n    }\n\n@media (max-width: 767px) {\n    [data-role='inner-hover-trigger'] [data-role='inner-hover'] {\n      opacity: 1 !important;\n    }\n    [data-role='inner-hover-trigger'] [data-role='inner-image'],\n    [data-role='inner-hover-trigger'] [data-role='inner-button'] {\n      border-radius: 1.25rem !important;\n    }\n  }\n\n::-webkit-scrollbar-track {\n  background-color: var(--scrollbar-background-color);\n}\n\n::-webkit-scrollbar {\n  width: var(--scrollbar-width);\n  background-color: var(--scrollbar-background-color);\n}\n\n::-webkit-scrollbar-thumb {\n  background-color: var(--scrollbar-thumb-color);\n}\n\n* {\n  scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-background-color);\n  scrollbar-width: thin;\n}\n\nhtml::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\nhtml {\n  scrollbar-width: none;\n}\n\n.card.card--privacy,\n.layout.layout--privacy {\n  scrollbar-width: unset;\n}\n\n.card.card--privacy::-webkit-scrollbar, .layout.layout--privacy::-webkit-scrollbar {\n    display: none !important;\n    width: 6px;\n    height: auto;\n  }\n\n.card.card--privacy::-webkit-scrollbar-thumb, .layout.layout--privacy::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background-color: rgba(25, 25, 25, 0.5);\n  }\n\n@media (max-width: 991px) {\n    .card.card--privacy::-webkit-scrollbar, .layout.layout--privacy::-webkit-scrollbar {\n      display: none !important;\n    }\n  }\n\n::selection {\n  color: #fff !important;\n  background-color: #000 !important;\n  background-clip: unset !important;\n  -webkit-text-fill-color: #fff !important;\n}\n\ntextarea {\n  resize: vertical;\n}\n\n.w-webflow-badge {\n  display: none !important;\n}\n\n.w-richtext ol,\n  .w-richtext ul {\n    overflow: visible;\n  }\n\n.w-richtext > :first-child {\n    margin-block-start: 0;\n  }\n\n.w-richtext > :last-child {\n    margin-block-end: 0;\n  }\n[data-role='preloader'] {\n  opacity: 1;\n  overflow: hidden;\n}\n  /* transition: opacity 0.3s ease-in-out; */\n\n  [data-role='preloader'].js--hidden {\n    opacity: 0;\n    pointer-events: none;\n  }\n[data-role='main'] {\n  opacity: 1;\n  transition: opacity 0.3s ease-in-out;\n}\n[data-role='main'] [data-name='main-child'] {\n    transition: opacity 0.3s ease-in-out;\n  }\n[data-role='main'].js--hidden {\n    opacity: 0;\n    pointer-events: none;\n  }\n[data-role='main'].js--loading [data-name='main-child'] {\n      opacity: 0;\n      transition: opacity 0.3s ease-in-out;\n    }\n[data-role='loading-tag'] {\n  opacity: 0;\n}\n[data-role='loading-tag'].js--active {\n    top: unset;\n    left: unset;\n    transform: unset;\n  }\n[nav-link] {\n  position: relative;\n  margin-bottom: -0.5rem;\n  padding-bottom: 0.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n  [nav-link] .navigation-item__word {\n    display: inline-block;\n  }\n\n  [nav-link] .navigation-item__word .char {\n    display: inline-block;\n    transition: transform 0.4s ease-in-out;\n  }\n\n  [nav-link] .navigation-item__wrapper-word-double {\n    position: absolute;\n    top: 0.5rem;\n    left: 0;\n    opacity: 0;\n    transition: all 0.3s ease-in-out;\n    font-style: italic;\n    pointer-events: none;\n  }\n\n  [nav-link] .navigation-item__wrapper-word {\n    opacity: 1;\n    transition: opacity 0.3s ease-in-out;\n    pointer-events: none;\n  }\n\n  [nav-link] .navigation-item__wrapper-word-double .char {\n    transform: translate(0%, 125%);\n  }\n\n  [nav-link].js--active .navigation-item__wrapper-word-double {\n      top: 0;\n      opacity: 1;\n    }\n\n  [nav-link].js--active .navigation-item__wrapper-word {\n      opacity: 0;\n    }\n[data-widget='card-animation'] {\n  /* your styles */\n}\n[data-widget='content-reveal'][data-reveal] {\n    opacity: 0;\n    mask: linear-gradient(white, white);\n\n    /* WebKit префикс для Safari */\n    mask-repeat: no-repeat;\n    mask-size: 0% 0%;\n    transition-duration: 1250ms;\n\n    transition-property: mask-size, opacity;\n    transition-timing-function: ease-in-out;\n  }\n  [data-widget='content-reveal'][data-reveal='left top'] {\n    mask-position: left top;\n  }\n  [data-widget='content-reveal'][data-reveal='left center'] {\n    mask-position: left center;\n  }\n  [data-widget='content-reveal'][data-reveal='left bottom'] {\n    mask-position: left bottom;\n  }\n  [data-widget='content-reveal'][data-reveal='center top'] {\n    mask-position: center top;\n  }\n  [data-widget='content-reveal'][data-reveal='center center'] {\n    mask-position: center center;\n  }\n  [data-widget='content-reveal'][data-reveal='center bottom'] {\n    mask-position: center bottom;\n  }\n  [data-widget='content-reveal'][data-reveal='right top'] {\n    mask-position: right top;\n  }\n  [data-widget='content-reveal'][data-reveal='right center'] {\n    mask-position: right center;\n  }\n  [data-widget='content-reveal'][data-reveal='right bottom'] {\n    mask-position: right bottom;\n  }\n  [data-widget='content-reveal'][data-reveal-state='finish'] {\n    opacity: 1;\n    mask-size: 101% 101%;\n  }\n[data-widget='gallery-sticky'] {\n  /* your styles */\n}\n[data-widget='header'] {\n  backdrop-filter: blur(16px) !important;\n  -webkit-backdrop-filter: blur(16px) !important;\n  background-color: rgba(136, 140, 143, 0.45) !important;\n  box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.5), inset 0 0 50px rgba(255, 255, 255, 0.25), 0 8px 32px 0 rgba(0, 0, 0, 0.15) !important;\n  border: 1px solid rgba(255, 255, 255, 0.45) !important;\n  transition: backdrop-filter 0.35s ease, -webkit-backdrop-filter 0.35s ease, background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, border-radius 0.35s ease, max-width 0.35s ease;\n}\n\n[data-widget='header']:hover,\n[data-widget='header'].js--open {\n  background-color: rgba(136, 140, 143, 0.72) !important;\n  -webkit-backdrop-filter: blur(24px) !important;\n  backdrop-filter: blur(24px) !important;\n  border-color: rgba(255, 255, 255, 0.7) !important;\n  box-shadow: inset 0 0 35px rgba(255, 255, 255, 0.75), inset 0 0 70px rgba(255, 255, 255, 0.45), 0 12px 40px 0 rgba(0, 0, 0, 0.25) !important;\n}\n\n[data-widget='header'] .hover video,\n[data-widget='header'] .background__image video,\n[data-widget='header'] [data-role='hover'] video {\n  filter: blur(16px) !important;\n  -webkit-filter: blur(16px) !important;\n  transform: scaleY(-1) scale(1.15) !important;\n}\n\n  [data-widget='header']::before {\n    display: none !important;\n    content: none !important;\n  }\n\n  [data-widget='header']:hover .hover-overlay {\n      backdrop-filter: none !important;\n      background-color: transparent !important;\n    }\n\n  [data-widget='header'] [data-role='navmenu'] {\n    opacity: 0;\n    transition:\n      opacity 300ms ease,\n      height 400ms ease-in-out;\n    overflow: hidden;\n    will-change: opacity, height;\n  }\n\n  [data-widget='header'].js--open [data-role='navmenu'] {\n      opacity: 1;\n    }\n\n  @media (max-height: 600px) {\n\n  [data-widget='header'].js--open [data-role='navmenu'] {\n        max-height: calc(100vh - var(--size--header-height) - 1.25rem);\n        overflow: auto\n    }\n      }\n\n  [data-widget='header'].js--open .header__button .header__button-line--top {\n        transform: translate(0, 0) rotate(45deg);\n      }\n\n  [data-widget='header'].js--open .header__button .header__button-line--bottom {\n        transform: translate(0, 0) rotate(-45deg);\n      }\n\n  [data-widget='header'].js--open [data-role='hover'] {\n      opacity: 1;\n    }\n\n  [data-widget='header'].js--open [data-role='hover'] .hover-overlay {\n        backdrop-filter: none !important;\n      }\n[data-widget='header'] [data-role='navmenu'][aria-hidden='true'] {\n  pointer-events: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  [data-widget='header'] [data-role='navmenu'] {\n    transition: none;\n  }\n}\n[data-widget='image-parallax'] {\n  /* your styles */\n}\n[data-widget='text-split'] {\n  opacity: 0;\n  overflow: hidden;\n}\n\n  [data-widget='text-split'] .line {\n    position: relative;\n    margin-top: -0.01em;\n\n    /* margin-right: -.1em; */\n    padding-top: 0.01em;\n    /* padding-right: 0.1em; */\n  }\n\n  [data-widget='text-split'][data-start-opacity] .line {\n      margin-bottom: -0.3em;\n      padding-bottom: 0.1em;\n      overflow: hidden;\n    }\n\n  [data-widget='text-split'] .char {\n    display: inline-block;\n    opacity: 1;\n  }\n@keyframes marqueeMovingLine{0%{transform:translate(0)}to{transform:translate(-50%)}}[data-marquee-role=parent] [data-marquee-role=moving-line]{animation-play-state:running;animation-iteration-count:infinite;animation-timing-function:linear}[data-marquee-role=parent][data-marquee-state=disabled] [data-marquee-role=moving-line]{animation-name:none}[data-marquee-role=parent][data-marquee-state=enabled]{overflow:hidden;display:flex;flex-direction:row;justify-content:start}[data-marquee-role=parent][data-marquee-state=enabled] [data-marquee-role=moving-line]{animation-name:marqueeMovingLine;width:max-content}[data-marquee-role=parent][data-marquee-state=enabled] [data-marquee-role=list]{display:flex;gap:0;flex-direction:row;justify-content:start;width:max-content}[data-widget='marquee'] {\n  /* stylelint-enable keyframes-name-pattern */\n}[data-widget='marquee'].js--disabled [data-marquee-role='parent'] [data-marquee-role='moving-line'] {\n        animation-play-state: paused;\n      }/* stylelint-disable keyframes-name-pattern */@keyframes marqueeMovingLine {\n    0% {\n      transform: translateX(-50%);\n    }\n    100% {\n      transform: translateX(0);\n    }\n  }\n[data-widget='text-reveal'] {\n  /* your styles */\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
import { animate, spring } from "motion";
import { g as gsapWithCSS } from "./lib/50Lx19ak.js";
import { C as CLASSES } from "./lib/DxoHJvy8.js";
const initPreloaderAnimation = (onComplete) => {
  gsapWithCSS.set(".preloader-line", { autoAlpha: 0 });
  gsapWithCSS.set(".preloader-wrapper", { autoAlpha: 0 });
  gsapWithCSS.set(".center-sub-square", { autoAlpha: 0, scale: 0, rotation: 45 });
  gsapWithCSS.set(".preloader-square-logo", { autoAlpha: 0 });
  let flag1 = false;
  let flag2 = false;
  let flag3 = false;
  const tl = gsapWithCSS.timeline({
    defaults: { ease: "power1.inOut" },
    onComplete
  });
  tl.fromTo(".preloader-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }).fromTo(
    ".horizontal-1",
    { autoAlpha: 0, scaleX: 0, transformOrigin: "left center" },
    { autoAlpha: 1, scaleX: 1, transformOrigin: "left center", duration: 0.5 }
  ).fromTo(
    ".vertical-1",
    { autoAlpha: 0, scaleY: 0, transformOrigin: "bottom center" },
    {
      autoAlpha: 1,
      scaleY: 1,
      duration: 0.5,
      onUpdate: function () {
        if (!flag1 && this.progress() > 0.6) {
          flag1 = true;
          gsapWithCSS.to(".center-sub-square:nth-child(1)", {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.5)"
          });
        }
      }
    },
    "-=0.1"
  ).addLabel("afterVertical1").fromTo(
    ".vertical-2",
    { scaleY: 0, transformOrigin: "top center" },
    {
      autoAlpha: 1,
      scaleY: 1,
      transformOrigin: "top center",
      duration: 0.5,
      onUpdate: function () {
        if (!flag2 && this.progress() > 0.4) {
          flag2 = true;
          gsapWithCSS.to(".center-sub-square:nth-child(2)", {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.5)"
          });
        }
      }
    },
    "-=0.1"
  ).addLabel("afterVertical2").fromTo(
    ".horizontal-2",
    { scaleX: 0, transformOrigin: "right center" },
    {
      autoAlpha: 1,
      scaleX: 1,
      transformOrigin: "right center",
      duration: 0.5,
      onUpdate: function () {
        if (!flag3 && this.progress() > 0.5) {
          flag3 = true;
          gsapWithCSS.timeline().to(".center-sub-square:nth-child(3), .center-sub-square:nth-child(4)", {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.5)",
            stagger: {
              each: 0.1,
              from: "start"
            }
          });
        }
      }
    },
    "afterVertical2"
  ).to(
    ".preloader-square-logo",
    {
      autoAlpha: 1,
      // scale: 1,
      duration: 1.3,
      ease: "power1.inOut"
    },
    "afterVertical1"
  );
};
const SELECTORS = {
  PRELOADER: '[data-role="preloader"]',
  LOADING_TAG: '[data-role="loading-tag"]',
  MAIN_CONTENT: '[data-role="main"]'
};
const initPreloader = (callbackFunction) => {
  const mainContent = document.querySelector(SELECTORS.MAIN_CONTENT);
  const preloader = document.querySelector(SELECTORS.PRELOADER);
  const loadingTag = document.querySelector(SELECTORS.LOADING_TAG);
  const minDisplayTime = 300;
  let loadStartTime;
  let cleanupCursor;
  let progressInterval = null;
  if (mainContent) {
    mainContent.classList.add(CLASSES.HIDDEN);
    mainContent.classList.add(CLASSES.LOADING);
  }
  if (!preloader) {
    if (mainContent) {
      mainContent.classList.remove(CLASSES.HIDDEN);
      mainContent.classList.remove(CLASSES.LOADING);
    }
    document.body.classList.remove(CLASSES.LOCKED);
    if (callbackFunction) callbackFunction();
    return;
  }
  function initLoadingCursor() {
    if (!loadingTag) return;
    document.body.style.cursor = "none";
    gsapWithCSS.set(loadingTag, { autoAlpha: 0 });
    gsapWithCSS.to(loadingTag, {
      autoAlpha: 1,
      duration: 0.3
    });
    const moveCursor = (e) => {
      loadingTag.classList.add(CLASSES.ACTIVE);
      gsapWithCSS.to(loadingTag, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.9,
        ease: "power2.out"
      });
    };
    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "";
    };
  }
  function updateLoadingProgress(progress) {
    if (!loadingTag) return;
    const overlay = loadingTag.querySelector(".loading-tag-overlay");
    if (overlay) {
      gsapWithCSS.to(overlay, {
        width: `${progress}%`,
        duration: 0.2,
        ease: "power1.out"
      });
    }
  }
  function simulateLoadingProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      updateLoadingProgress(progress);
    }, 200);
    return interval;
  }
  function startPreloader() {
    loadStartTime = Date.now();
    document.body.classList.add(CLASSES.LOCKED);
    cleanupCursor = initLoadingCursor();
    progressInterval = loadingTag ? simulateLoadingProgress() : null;
    initPreloaderAnimation(() => {
      handlePageLoad();
    });
    setTimeout(function () {
      if (!mainContent || mainContent.classList.contains(CLASSES.HIDDEN)) {
        handlePageLoad();
      }
    }, 3000);
  }
  startPreloader();
  function handlePageLoad() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - loadStartTime;
    const remainingTime = minDisplayTime - elapsedTime;
    if (remainingTime > 0) {
      setTimeout(hidePreloaderAndShowContent, remainingTime);
    } else {
      hidePreloaderAndShowContent();
    }
  }
  function hidePreloaderAndShowContent() {
    hidePreloaderAnimation(() => {
      showContent(initOtherFeatures);
    });
  }
  function hidePreloaderAnimation(callback) {
    if (preloader) {
      gsapWithCSS.to(preloader, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: function () {
          preloader.classList.add(CLASSES.HIDDEN);
          preloader.style.display = "none";
          preloader.style.pointerEvents = "none";
          if (callback) callback();
        }
      });
    } else if (callback) {
      callback();
    }
  }
  function showContent(callback) {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
    updateLoadingProgress(100);
    if (cleanupCursor) {
      cleanupCursor();
      cleanupCursor = void 0;
    }
    if (loadingTag) {
      gsapWithCSS.to(loadingTag, {
        autoAlpha: 0,
        duration: 0.3
      });
    }
    if (callback) callback();
    if (mainContent) {
      mainContent.classList.remove(CLASSES.HIDDEN);
      mainContent.classList.remove(CLASSES.LOADING);
    }
  }
  function initOtherFeatures() {
    if (callbackFunction) callbackFunction();
  }
  window.addEventListener("error", function () {
    setTimeout(hidePreloaderAndShowContent, 1e3);
  });
  return () => {
    document.body.style.cursor = "";
    if (loadingTag) {
      gsapWithCSS.set(loadingTag, { autoAlpha: 0, x: 0, y: 0 });
    }
  };
};

function initMapModal() {
  const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.442749842013!2d77.13823267634288!3d28.653966983447935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d031cc9796f57%3A0xd2a0138943e0fc40!2sFlowline%20India%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";
  const exactDestination = "Flowline India Pvt Ltd, Industrial Area, 3/24, Block 3, Kirti Nagar, New Delhi, 110015";
  const encodedDestination = encodeURIComponent(exactDestination);

  const POPULAR_LOCATIONS = [
    "Agra, Uttar Pradesh",
    "Ahmedabad, Gujarat",
    "Amritsar, Punjab",
    "Anand Vihar, New Delhi",
    "Bangalore / Bengaluru, Karnataka",
    "Bhopal, Madhya Pradesh",
    "Chandigarh, Punjab & Haryana",
    "Chennai, Tamil Nadu",
    "Connaught Place, New Delhi",
    "Dehradun, Uttarakhand",
    "Delhi Cantt, New Delhi",
    "Dwarka, New Delhi",
    "Faridabad, Haryana",
    "Ghaziabad, Uttar Pradesh",
    "Greater Noida, Uttar Pradesh",
    "Gurugram / Gurgaon, Haryana",
    "Guwahati, Assam",
    "Hyderabad, Telangana",
    "IGIA Airport (DEL), New Delhi",
    "Indirapuram, Ghaziabad",
    "Indore, Madhya Pradesh",
    "Jaipur, Rajasthan",
    "Janakpuri, New Delhi",
    "Kanpur, Uttar Pradesh",
    "Karol Bagh, New Delhi",
    "Kirti Nagar Metro Station, New Delhi",
    "Kochi, Kerala",
    "Kolkata, West Bengal",
    "Lucknow, Uttar Pradesh",
    "Ludhiana, Punjab",
    "Meerut, Uttar Pradesh",
    "Mumbai, Maharashtra",
    "Nagpur, Maharashtra",
    "New Delhi Railway Station, New Delhi",
    "Noida, Uttar Pradesh",
    "Patna, Bihar",
    "Pune, Maharashtra",
    "Rajouri Garden, New Delhi",
    "Rohini, New Delhi",
    "Surat, Gujarat",
    "Varanasi, Uttar Pradesh",
    "Vasant Kunj, New Delhi"
  ].sort((a, b) => a.localeCompare(b));

  function getOrCreateModal() {
    let modal = document.getElementById("map-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "map-modal";
      modal.className = "map-modal";
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML = `
        <div class="map-modal__overlay"></div>
        <div class="map-modal__container">
          <button class="map-modal__close" aria-label="Close map">&times;</button>
          <div class="map-modal__header">
            <span class="map-modal__tag">.LOCATION &amp; DIRECTIONS</span>
            <h3 class="map-modal__title">Flowline India Pvt Ltd</h3>
            <p class="map-modal__subtitle">Industrial Area, 3/24, Block 3, Kirti Nagar, New Delhi, 110015</p>
          </div>
          <div class="map-modal__directions-bar">
            <div class="map-modal__input-wrapper">
              <svg class="map-modal__input-icon" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <input type="text" id="map-origin-input" class="map-modal__input" placeholder="Type your location or select from dropdown..." autocomplete="off" />
              <div id="map-autocomplete-dropdown" class="map-modal__autocomplete-dropdown" style="display: none;">
                <div class="autocomplete-item autocomplete-item--gps" id="map-gps-btn">
                  <svg class="autocomplete-item__icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
                  <span id="map-gps-text">📍 Use My Current Location (GPS)</span>
                </div>
                <div id="map-suggestions-container"></div>
              </div>
            </div>
            <button id="map-directions-btn" class="map-modal__btn map-modal__btn--primary" type="button">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.43 10.59l-9.01-9.01c-.75-.75-1.97-.75-2.72 0l-9.01 9.01c-.75.75-.75 1.97 0 2.72l9.01 9.01c.75.75 1.97.75 2.72 0l9.01-9.01c.75-.75.75-1.97 0-2.72zM12 18.5L5.5 12 12 5.5l6.5 6.5-6.5 6.5z"/><path d="M13 8v3h-3v2h3v3l4-4z"/></svg>
              Get Directions
            </button>
            <a id="map-fullscreen-btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}" target="_blank" rel="noopener noreferrer" class="map-modal__btn map-modal__btn--secondary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
              Google Maps
            </a>
          </div>
          <div class="map-modal__body">
            <iframe id="map-modal-iframe" src="${iframeSrc}" width="100%" height="420" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const mapIframeEl = modal.querySelector("#map-modal-iframe");
      if (mapIframeEl) {
        mapIframeEl.addEventListener("error", () => {
          mapIframeEl.src = "https://www.openstreetmap.org/export/embed.html?bbox=77.130808%2C28.647046%2C77.150808%2C28.657046&layer=mapnik&marker=28.652046%2C77.140808";
        });
      }

      const closeBtn = modal.querySelector(".map-modal__close");
      const overlay = modal.querySelector(".map-modal__overlay");
      const originInput = modal.querySelector("#map-origin-input");
      const directionsBtn = modal.querySelector("#map-directions-btn");
      const dropdown = modal.querySelector("#map-autocomplete-dropdown");
      const gpsBtn = modal.querySelector("#map-gps-btn");
      const gpsText = modal.querySelector("#map-gps-text");
      const suggestionsContainer = modal.querySelector("#map-suggestions-container");

      let currentGpsLocation = null;

      function openModal() {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        document.body.classList.add("js--locked");
      }

      function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        document.body.classList.remove("js--locked");
        hideDropdown();
      }

      function showDropdown() {
        dropdown.style.display = "block";
      }

      function hideDropdown() {
        dropdown.style.display = "none";
      }

      let debounceTimer = null;

      function renderSuggestions(filterText = "") {
        const query = filterText.trim();

        if (!query) {
          const initialList = POPULAR_LOCATIONS.slice().sort((a, b) => a.localeCompare(b));
          suggestionsContainer.innerHTML = initialList.map(loc => `
            <div class="autocomplete-item" data-value="${loc}">
              <svg class="autocomplete-item__icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${loc}</span>
            </div>
          `).join("");
          return;
        }

        const localMatches = POPULAR_LOCATIONS.filter(loc => loc.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.localeCompare(b));
        if (localMatches.length > 0) {
          suggestionsContainer.innerHTML = localMatches.map(loc => `
            <div class="autocomplete-item" data-value="${loc}">
              <svg class="autocomplete-item__icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${loc}</span>
            </div>
          `).join("");
        } else {
          suggestionsContainer.innerHTML = `<div class="autocomplete-no-match">Searching live places for "${query}"...</div>`;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=25&addressdetails=1`, {
            headers: { "Accept-Language": "en" }
          })
            .then(res => res.json())
            .then(data => {
              if (data && data.length > 0) {
                const placeNames = data.map(item => item.display_name).sort((a, b) => a.localeCompare(b));
                suggestionsContainer.innerHTML = placeNames.map(loc => `
                  <div class="autocomplete-item" data-value="${loc}">
                    <svg class="autocomplete-item__icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    <span>${loc}</span>
                  </div>
                `).join("");
              } else if (localMatches.length === 0) {
                suggestionsContainer.innerHTML = `<div class="autocomplete-no-match">Press Enter or click Get Directions to search in Google Maps</div>`;
              }
            })
            .catch(() => { });
        }, 300);
      }

      const mapIframe = modal.querySelector(".map-modal__body iframe");

      function updateEmbeddedMapRoute(originAddress) {
        if (!originAddress) {
          mapIframe.src = iframeSrc;
          return;
        }

        const destAddress = "Flowline India Pvt Ltd, Industrial Area, 3/24, Block 3, Kirti Nagar, New Delhi, 110015";
        const routeEmbedUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(originAddress)}&daddr=${encodeURIComponent(destAddress)}&output=embed`;

        mapIframe.src = routeEmbedUrl;

        let routeTag = modal.querySelector("#map-route-status");
        if (!routeTag) {
          routeTag = document.createElement("div");
          routeTag.id = "map-route-status";
          routeTag.className = "map-modal__route-status";
          const bodyContainer = modal.querySelector(".map-modal__body");
          bodyContainer.parentNode.insertBefore(routeTag, bodyContainer);
        }

        const displayLabel = originAddress.length > 45 ? originAddress.substring(0, 45) + "..." : originAddress;
        routeTag.innerHTML = `
          <span class="route-status__icon">🛣️</span>
          <span class="route-status__text">Route from <strong>${displayLabel}</strong> to <strong>Flowline India Pvt Ltd</strong></span>
          <button class="route-status__reset" type="button" title="Reset map to default pin">Reset Map &times;</button>
        `;

        const resetBtn = routeTag.querySelector(".route-status__reset");
        resetBtn.addEventListener("click", () => {
          mapIframe.src = iframeSrc;
          routeTag.remove();
          originInput.value = "";
          currentGpsLocation = null;
        });
      }

      function selectLocation(val) {
        originInput.value = val;
        hideDropdown();
        updateEmbeddedMapRoute(val);
      }

      // GPS Location Button
      gpsBtn.addEventListener("click", () => {
        if ("geolocation" in navigator) {
          gpsText.textContent = "📍 Detecting your GPS location...";
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;
              currentGpsLocation = `${lat},${lng}`;
              const label = `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
              originInput.value = label;
              gpsText.textContent = "📍 Use My Current Location (GPS)";
              hideDropdown();
              updateEmbeddedMapRoute(currentGpsLocation);
            },
            (err) => {
              gpsText.textContent = "⚠️ GPS Permission Denied / Unavailable";
              setTimeout(() => {
                gpsText.textContent = "📍 Use My Current Location (GPS)";
              }, 3000);
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } else {
          gpsText.textContent = "⚠️ Geolocation not supported by browser";
        }
      });

      // Suggestion Item Click
      suggestionsContainer.addEventListener("click", (e) => {
        const item = e.target.closest(".autocomplete-item");
        if (item) {
          const loc = item.getAttribute("data-value");
          if (loc) {
            currentGpsLocation = null;
            selectLocation(loc);
          }
        }
      });

      // Input Focus & Keyup
      originInput.addEventListener("focus", () => {
        renderSuggestions(originInput.value);
        showDropdown();
      });

      originInput.addEventListener("input", () => {
        currentGpsLocation = null;
        renderSuggestions(originInput.value);
        showDropdown();
      });

      // Close dropdown on click outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".map-modal__input-wrapper")) {
          hideDropdown();
        }
      });

      function launchDirections() {
        const val = currentGpsLocation || originInput.value.trim();
        if (val) {
          updateEmbeddedMapRoute(val);
        }

        let googleMapsDirUrl;
        if (currentGpsLocation) {
          googleMapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentGpsLocation}&destination=${encodedDestination}`;
        } else {
          const userOrigin = originInput.value.trim();
          if (userOrigin) {
            googleMapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(userOrigin)}&destination=${encodedDestination}`;
          } else {
            googleMapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;
          }
        }
        window.open(googleMapsDirUrl, "_blank", "noopener,noreferrer");
      }

      closeBtn.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);
      directionsBtn.addEventListener("click", launchDirections);
      originInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          hideDropdown();
          launchDirections();
        }
      });

      // Isolate wheel / touch scroll inside map modal
      modal.addEventListener("wheel", (e) => {
        e.stopPropagation();
      }, { passive: true });

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
          closeModal();
        }
      });

      modal._open = openModal;
    }
    return modal;
  }

  document.addEventListener("click", (e) => {
    const target = e.target.closest(".contact-location-box, a[href='#location']");
    if (target) {
      const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        const currentHref = target.getAttribute("href");
        if (!currentHref || currentHref === "#location" || currentHref === "javascript:void(0)") {
          e.preventDefault();
          window.open("https://www.google.com/maps/search/?api=1&query=Flowline+India+Pvt+Ltd,+Industrial+Area,+3/24,+Block+3,+Kirti+Nagar,+New+Delhi,+110015", "_blank", "noopener,noreferrer");
        }
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const modal = getOrCreateModal();
      if (modal._open) {
        modal._open();
      } else {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        document.body.classList.add("js--locked");
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMapModal);
} else {
  initMapModal();
}
(() => {
  let ModuleType;
  ((ModuleType2) => {
    ModuleType2["Widgets"] = "widgets";
    ModuleType2["Features"] = "features";
  })(ModuleType || (ModuleType = {}));
  const projectName = "DB-Longbow";
  const baseSourceUrl = "https://cdn.digitalbutlers.me/projects";
  const isLocalMode = false;
  const getUrl = (segments) => {
    return new URL(segments.join("/")).toString();
  };
  const getModuleUrl = ({ moduleType, moduleName }) => {
    !window.location.hostname.endsWith("webflow.io") && !isLocalMode && false;
    const modeFolder = "dev";
    const origin = window.location.origin;
    const segmentsLocal = [.../* @__PURE__ */ new Set([origin, "src", moduleType, moduleName, "index.ts"])];
    const segmentsRemote = [baseSourceUrl, projectName, modeFolder, `${moduleName}.js`];
    const sourceUrl = isLocalMode ? segmentsLocal : segmentsRemote;
    return getUrl(sourceUrl);
  };
  const initWidgets = () => {
    const loadWidget = async (widgetName) => {
      const moduleUrl = getModuleUrl({ moduleType: "widgets", moduleName: widgetName });
      try {
        await import(
          /* @vite-ignore */
          moduleUrl
        );
      } catch (error) {
        console.error(`Error load widget "${widgetName}":`, error);
      }
    };
    document.querySelectorAll("[data-widget]").forEach((widgetEl) => {
      const widgetName = widgetEl.getAttribute("data-widget");
      widgetName && loadWidget(widgetName);
    });
  };
  const initFeatures = async () => {
    const moduleUrl = getModuleUrl({
      moduleType: "features",
      moduleName: "features"
      /* Features */
    });
    try {
      await import(
        /* @vite-ignore */
        moduleUrl
      );
    } catch (error) {
      console.error(`Error features load:`, error);
    }
  };
  const initProductModal = () => {
    const openTriggers = document.querySelectorAll("[data-open-modal]");
    if (!openTriggers.length) return;

    let savedScrollY = 0;

    const lockBodyScroll = () => {
      savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      if (window.lenis && typeof window.lenis.stop === "function") {
        window.lenis.stop();
      }
    };

    const unlockBodyScroll = () => {
      if (document.querySelectorAll(".product-modal.is-active").length > 0) return;
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";

      // Restore exact scroll position
      window.scrollTo(0, savedScrollY);

      if (window.lenis) {
        if (typeof window.lenis.start === "function") {
          window.lenis.start();
        }
        if (typeof window.lenis.scrollTo === "function") {
          window.lenis.scrollTo(savedScrollY, { immediate: true });
        }
      }
    };

    openTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const modalKey = trigger.getAttribute("data-open-modal");
        let modal = document.getElementById(`product-modal-${modalKey}`);
        if (!modal && modalKey === "axial-flow-fan") {
          modal = document.getElementById("product-modal-axial");
        }
        if (!modal && modalKey === "inline-flow-fan") {
          modal = document.getElementById("product-modal-inline");
        }
        if (!modal && (modalKey === "centrifugal-fan" || modalKey === "belt-driven-centrifugal-fan")) {
          modal = document.getElementById("product-modal-centrifugal");
        }
        if (!modal && (modalKey === "didw-backward-curved-fan" || modalKey === "didw")) {
          modal = document.getElementById("product-modal-didw");
        }
        if (!modal && (modalKey === "sisw-forward-fan" || modalKey === "sisw")) {
          modal = document.getElementById("product-modal-sisw-forward-fan");
        }
        if (!modal && (modalKey === "didw-direct-driven-fan" || modalKey === "ddm")) {
          modal = document.getElementById("product-modal-didw-direct-driven-fan");
        }
        if (!modal && (modalKey === "direct-drive-fan" || modalKey === "dd")) {
          modal = document.getElementById("product-modal-direct-drive-fan");
        }
        if (!modal && (modalKey === "aerofoil-blades-centrifugal-fan" || modalKey === "rml" || modalKey === "rlm")) {
          modal = document.getElementById("product-modal-aerofoil-blades-centrifugal-fan");
        }
        if (!modal) {
          modal = document.getElementById(`product-modal-${modalKey}`) || document.getElementById(modalKey);
        }
        if (!modal) {
          modal = document.getElementById(modalKey);
        }
        if (modal) {
          modal.classList.add("is-active");
          modal.setAttribute("aria-hidden", "false");
          lockBodyScroll();
        }
      });
    });

    const allModals = document.querySelectorAll(".product-modal");
    allModals.forEach((modal) => {
      const closeTriggers = modal.querySelectorAll("[data-close-modal]");
      const closeModal = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        modal.classList.remove("is-active");
        modal.setAttribute("aria-hidden", "true");
        unlockBodyScroll();
      };
      closeTriggers.forEach((trigger) => {
        trigger.addEventListener("click", closeModal);
      });

      modal.addEventListener("wheel", (e) => {
        const scrollable = e.target.closest(".product-modal__content");
        if (!scrollable) return;
        e.stopPropagation();
      }, { passive: true });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".product-modal.is-active").forEach((modal) => {
          modal.classList.remove("is-active");
          modal.setAttribute("aria-hidden", "true");
        });
        unlockBodyScroll();
      }
    });
  };

  const initVideos = () => {
    document.querySelectorAll("video").forEach((video) => {
      video.load();
      video.play().catch(() => { });
    });
  };

  // Ultra-Smooth WebGL-Quality DOM Tilt Engine (Lerp + rAF + Compositor Optimization)
  const createLerpTiltCard = (cardElement, wrapperElement, options = {}) => {
    if (!cardElement || !wrapperElement) return;

    const {
      maxTilt = 10,
      easeFactor = 0.08,
      hoverScale = 1.04,
      restScale = 1.02,
      baseTranslate = "translate3d(0px, 0px, 50px)",
      threshold = 0.001
    } = options;

    let isHovered = false;
    let targetNormX = 0;
    let targetNormY = 0;

    let currentRotateX = 0;
    let currentRotateY = 0;
    let currentScale = restScale;

    let rafId = null;

    const render = () => {
      const targetRotateX = -targetNormY * maxTilt;
      const targetRotateY = targetNormX * maxTilt;
      const targetScale = isHovered ? hoverScale : restScale;

      currentRotateX += (targetRotateX - currentRotateX) * easeFactor;
      currentRotateY += (targetRotateY - currentRotateY) * easeFactor;
      currentScale += (targetScale - currentScale) * easeFactor;

      const rx = Math.round(currentRotateX * 1000) / 1000;
      const ry = Math.round(currentRotateY * 1000) / 1000;
      const s = Math.round(currentScale * 1000) / 1000;

      cardElement.style.transform = `${baseTranslate} rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s}, ${s}, 1)`;

      const deltaX = Math.abs(targetRotateX - currentRotateX);
      const deltaY = Math.abs(targetRotateY - currentRotateY);
      const deltaScale = Math.abs(targetScale - currentScale);

      if (deltaX < threshold && deltaY < threshold && deltaScale < threshold) {
        currentRotateX = targetRotateX;
        currentRotateY = targetRotateY;
        currentScale = targetScale;
        const finalRx = Math.round(currentRotateX * 1000) / 1000;
        const finalRy = Math.round(currentRotateY * 1000) / 1000;
        const finalS = Math.round(currentScale * 1000) / 1000;
        cardElement.style.transform = `${baseTranslate} rotateX(${finalRx}deg) rotateY(${finalRy}deg) scale3d(${finalS}, ${finalS}, 1)`;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    };

    wrapperElement.addEventListener("mousemove", (e) => {
      const rect = wrapperElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      targetNormX = Math.max(-1, Math.min(1, normX));
      targetNormY = Math.max(-1, Math.min(1, normY));
      isHovered = true;

      startLoop();
    }, { passive: true });

    wrapperElement.addEventListener("mouseenter", () => {
      isHovered = true;
      startLoop();
    }, { passive: true });

    wrapperElement.addEventListener("mouseleave", () => {
      isHovered = false;
      targetNormX = 0;
      targetNormY = 0;
      startLoop();
    }, { passive: true });
  };

  const initCompanyProfileStickyVideo = () => {
    const section = document.querySelector(".company-profile-sticky-section");
    const headingAnchor = document.getElementById("cp-heading-anchor");
    const descContainer = document.getElementById("cp-description-container");
    const descParagraph = document.getElementById("cp-description-paragraph");
    const solHeadingAnchor = document.getElementById("sol-heading-anchor");
    const solDescContainer = document.getElementById("sol-description-container");
    const solDescParagraph = document.getElementById("sol-description-paragraph");
    const video = section ? section.querySelector(".cp-bg-video") : null;
    if (!section || !headingAnchor || !descContainer || !descParagraph) return;

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      let isPlayPending = false;

      const safePlay = () => {
        if (video.paused && !isPlayPending) {
          isPlayPending = true;
          const p = video.play();
          if (p !== undefined) {
            p.then(() => {
              isPlayPending = false;
            }).catch(() => {
              isPlayPending = false;
            });
          } else {
            isPlayPending = false;
          }
        }
      };

      // Native loop restart fallback
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        safePlay();
      });

      video.addEventListener("pause", () => {
        setTimeout(safePlay, 50);
      });

      video.addEventListener("stalled", () => {
        safePlay();
      });

      video.addEventListener("waiting", () => {
        safePlay();
      });

      video.addEventListener("canplay", () => {
        safePlay();
      });

      safePlay();

      const onUserInteraction = () => {
        safePlay();
      };
      window.addEventListener("scroll", onUserInteraction, { passive: true });
      window.addEventListener("click", onUserInteraction, { passive: true });
      window.addEventListener("touchstart", onUserInteraction, { passive: true });
      window.addEventListener("wheel", onUserInteraction, { passive: true });
    }

    // --- Act 1: Split Company Profile description into word spans ---
    const cpRawText = descParagraph.textContent.trim();
    const cpWords = cpRawText.split(/\s+/);
    const cpPhraseKeywords = ["backed", "by", "over", "two", "decades", "of", "engineering", "excellence"];
    let cpPhraseStartIndex = -1;
    for (let i = 0; i <= cpWords.length - cpPhraseKeywords.length; i++) {
      const match = cpPhraseKeywords.every((kw, kIdx) => {
        const clean = cpWords[i + kIdx].toLowerCase().replace(/[^a-z0-9]/g, "");
        return clean === kw;
      });
      if (match) {
        cpPhraseStartIndex = i;
        break;
      }
    }
    const cpPhraseEndIndex = cpPhraseStartIndex !== -1 ? cpPhraseStartIndex + cpPhraseKeywords.length - 1 : -1;

    descParagraph.innerHTML = cpWords
      .map((w, idx) => {
        const isPulse = cpPhraseStartIndex !== -1 && idx >= cpPhraseStartIndex && idx <= cpPhraseEndIndex;
        return `<span class="cp-desc-word${isPulse ? " is-pulse-glow" : ""}" data-word-idx="${idx}">${w}</span>`;
      })
      .join(" ");

    const cpWordSpans = descParagraph.querySelectorAll(".cp-desc-word");
    const cpTotalWords = cpWordSpans.length;

    // --- Act 2: Split Solutions editorial blocks into word spans ---
    let solWordSpans = [];
    let solTotalWords = 0;
    if (solDescContainer) {
      let globalIdx = 0;
      const elementsToSplit = solDescContainer.querySelectorAll(".sol-block-title, .sol-paragraph");
      elementsToSplit.forEach((el) => {
        const text = el.textContent.trim();
        const words = text.split(/\s+/);
        const isTitle = el.classList.contains("sol-block-title");
        el.innerHTML = words
          .map((w) => {
            const idx = globalIdx++;
            return `<span class="cp-desc-word${isTitle ? " is-pulse-glow" : ""}" data-word-idx="${idx}">${w}</span>`;
          })
          .join(" ");
      });

      solWordSpans = solDescContainer.querySelectorAll(".cp-desc-word");
      solTotalWords = solWordSpans.length;
    }

    const solBlock1 = document.getElementById("sol-block-1");
    const solBlock2 = document.getElementById("sol-block-2");
    const solBlock3 = document.getElementById("sol-block-3");

    // --- Interactive Mouse Cursor Physics Tilt for Solutions Text ---
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onMouseMove = (e) => {
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      targetTiltX = ((e.clientX / w) - 0.5) * 2; // -1 to +1
      targetTiltY = ((e.clientY / h) - 0.5) * 2; // -1 to +1
    };

    const onMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    const smoothstep = (min, max, val) => {
      const x = clamp((val - min) / (max - min), 0, 1);
      return x * x * (3 - 2 * x);
    };

    let rafId = null;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const totalScrollable = section.offsetHeight - windowHeight;

      if (totalScrollable <= 0) return;

      // Progress normalized from 0.0 (top touches top) to 1.0 (bottom reaches bottom)
      const progress = clamp(-rect.top / totalScrollable, 0, 1);

      if (video && video.paused && progress > 0 && progress < 1) {
        video.play().catch(() => { });
      }

      // =========================================================================
      // MULTI-ACT TIMELINE MAP (Total Track 1200vh):
      // ACT 1: Company Profile (0.00 -> 0.35)
      // INTERMISSION 1: 3 Wheel Scrolls Clean Space (0.35 -> 0.40)
      // ACT 2: Our Solutions:
      //   - 0.40 -> 0.44: Title fades in
      //   - 0.44 -> 0.50: Title dwells in center
      //   - 0.50 -> 0.56: Title slides up to top dock (-31vh, scale 0.90)
      //   - 0.56 -> 0.61: 2-scroll delay (clean video view)
      //   - 0.61 -> 0.67: Sub-section 1 enters from LEFT (-100vw -> 0)
      //   - 0.67 -> 0.73: Sub-section 2 enters from RIGHT (+100vw -> 0)
      //   - 0.73 -> 0.79: Sub-section 3 enters from LEFT (-100vw -> 0)
      //   - 0.79 -> 0.87: 3 FULL WHEEL SCROLLS DWELL (all 3 subsections resting & organized)
      //   - 0.87 -> 0.93: ALL 3 SUBSECTIONS EXIT TO OPPOSITE SIDES (1 & 3 -> RIGHT, 2 -> LEFT, Title -> LEFT)
      //   - 0.93 -> 1.00: HOLD EMPTY SECTION FOR 3 WHEEL SCROLLS (clean background video)
      // =========================================================================

      // --- ACT 1 CALCULATIONS ---
      let cpTitleOpacity = 0;
      let cpTitleSlideProgress = 0;
      let cpDescOpacity = 0;
      let cpReadProgress = 0;
      let cpExitProgress = 0;

      if (progress < 0.01) {
        cpTitleOpacity = 0;
      } else if (progress >= 0.01 && progress < 0.04) {
        cpTitleOpacity = smoothstep(0.01, 0.04, progress);
      } else if (progress >= 0.04 && progress < 0.10) {
        cpTitleOpacity = 1;
        cpTitleSlideProgress = 0;
      } else if (progress >= 0.10 && progress < 0.16) {
        cpTitleOpacity = 1;
        cpTitleSlideProgress = smoothstep(0.10, 0.16, progress);
      } else if (progress >= 0.16 && progress < 0.21) {
        cpTitleOpacity = 1;
        cpTitleSlideProgress = 1;
        cpDescOpacity = 0;
      } else if (progress >= 0.21 && progress < 0.25) {
        cpTitleOpacity = 1;
        cpTitleSlideProgress = 1;
        cpDescOpacity = smoothstep(0.21, 0.25, progress);
      } else if (progress >= 0.25 && progress < 0.31) {
        cpTitleOpacity = 1;
        cpTitleSlideProgress = 1;
        cpDescOpacity = 1;
        cpReadProgress = smoothstep(0.25, 0.31, progress);
      } else if (progress >= 0.31 && progress < 0.35) {
        cpTitleOpacity = 1;
        cpTitleSlideProgress = 1;
        cpDescOpacity = 1;
        cpReadProgress = 1;
      } else if (progress >= 0.35 && progress < 0.39) {
        cpTitleOpacity = 1;
        cpTitleSlideProgress = 1;
        cpDescOpacity = 1;
        cpReadProgress = 1;
        cpExitProgress = smoothstep(0.35, 0.39, progress);
      } else {
        cpTitleOpacity = 0;
        cpTitleSlideProgress = 1;
        cpDescOpacity = 0;
        cpExitProgress = 1;
      }

      // --- ACT 2 CALCULATIONS ---
      let solTitleOpacity = 0;
      let solTitleSlideProgress = 0;
      let solExitProgress = 0;

      // Subsection 1: Enters from Left (-100vw -> 0), Exits to Right (0 -> +120vw)
      let b1X = 0;
      let b1Opacity = 0;

      // Subsection 2: Enters from Right (+100vw -> 0), Exits to Left (0 -> -120vw)
      let b2X = 0;
      let b2Opacity = 0;

      // Subsection 3: Enters from Left (-100vw -> 0), Exits to Right (0 -> +120vw)
      let b3X = 0;
      let b3Opacity = 0;

      if (progress < 0.40) {
        solTitleOpacity = 0;
        b1X = -100;
        b2X = 100;
        b3X = -100;
      } else if (progress >= 0.40 && progress < 0.44) {
        solTitleOpacity = smoothstep(0.40, 0.44, progress);
        solTitleSlideProgress = 0;
        b1X = -100;
        b2X = 100;
        b3X = -100;
      } else if (progress >= 0.44 && progress < 0.50) {
        solTitleOpacity = 1;
        solTitleSlideProgress = 0;
        b1X = -100;
        b2X = 100;
        b3X = -100;
      } else if (progress >= 0.50 && progress < 0.56) {
        solTitleOpacity = 1;
        solTitleSlideProgress = smoothstep(0.50, 0.56, progress);
        b1X = -100;
        b2X = 100;
        b3X = -100;
      } else if (progress >= 0.56 && progress < 0.61) {
        solTitleOpacity = 1;
        solTitleSlideProgress = 1;
        b1X = -100;
        b2X = 100;
        b3X = -100;
      } else if (progress >= 0.61 && progress < 0.67) {
        // Block 1 enters from Left
        solTitleOpacity = 1;
        solTitleSlideProgress = 1;
        const in1 = smoothstep(0.61, 0.67, progress);
        b1X = -100 * (1 - in1);
        b1Opacity = in1;
        b2X = 100;
        b3X = -100;
      } else if (progress >= 0.67 && progress < 0.73) {
        // Block 1 is resting, Block 2 enters from Right
        solTitleOpacity = 1;
        solTitleSlideProgress = 1;
        b1X = 0;
        b1Opacity = 1;
        const in2 = smoothstep(0.67, 0.73, progress);
        b2X = 100 * (1 - in2);
        b2Opacity = in2;
        b3X = -100;
      } else if (progress >= 0.73 && progress < 0.79) {
        // Block 1 & 2 resting, Block 3 enters from Left
        solTitleOpacity = 1;
        solTitleSlideProgress = 1;
        b1X = 0;
        b1Opacity = 1;
        b2X = 0;
        b2Opacity = 1;
        const in3 = smoothstep(0.73, 0.79, progress);
        b3X = -100 * (1 - in3);
        b3Opacity = in3;
      } else if (progress >= 0.79 && progress < 0.87) {
        // 3 FULL WHEEL SCROLLS DWELL: All 3 blocks resting on screen together
        solTitleOpacity = 1;
        solTitleSlideProgress = 1;
        b1X = 0;
        b1Opacity = 1;
        b2X = 0;
        b2Opacity = 1;
        b3X = 0;
        b3Opacity = 1;
      } else if (progress >= 0.87 && progress < 0.93) {
        // ALL 3 BLOCKS EXIT TO OPPOSITE SIDES
        solTitleOpacity = 1;
        solTitleSlideProgress = 1;
        solExitProgress = smoothstep(0.87, 0.93, progress);

        // Block 1 (came from Left) exits to RIGHT
        b1X = 120 * solExitProgress;
        b1Opacity = 1 - solExitProgress;

        // Block 2 (came from Right) exits to LEFT
        b2X = -120 * solExitProgress;
        b2Opacity = 1 - solExitProgress;

        // Block 3 (came from Left) exits to RIGHT
        b3X = 120 * solExitProgress;
        b3Opacity = 1 - solExitProgress;
      } else {
        // 0.93 -> 1.00: HOLD EMPTY SECTION FOR 3 WHEEL SCROLLS
        solTitleOpacity = 0;
        solTitleSlideProgress = 1;
        solExitProgress = 1;
        b1Opacity = 0;
        b2Opacity = 0;
        b3Opacity = 0;
        b1X = 120;
        b2X = -120;
        b3X = 120;
      }

      // --- APPLY ACT 1 TRANSFORMS ---
      const cpTargetTopVh = window.innerWidth <= 767 ? -24 : -25;
      const cpCurrentYVh = cpTargetTopVh * cpTitleSlideProgress;
      const targetScale = 0.90;
      const cpCurrentScale = 1 - (1 - targetScale) * cpTitleSlideProgress;
      const cpTitleExitX = -120 * cpExitProgress;

      headingAnchor.style.opacity = (cpTitleOpacity * (1 - cpExitProgress)).toFixed(3);
      headingAnchor.style.transform = `translate3d(calc(-50% + ${cpTitleExitX.toFixed(2)}vw), calc(-50% + ${cpCurrentYVh.toFixed(2)}vh), 0) scale(${cpCurrentScale.toFixed(3)})`;

      const cpDescExitX = 120 * cpExitProgress;
      descContainer.style.opacity = (cpDescOpacity * (1 - cpExitProgress)).toFixed(3);
      descContainer.style.transform = `translate3d(calc(-50% + ${cpDescExitX.toFixed(2)}vw), -50%, 0)`;
      descContainer.style.pointerEvents = (cpDescOpacity > 0.5 && cpExitProgress < 0.5) ? "auto" : "none";

      if (cpDescOpacity > 0.01 && cpExitProgress < 1) {
        const activeCount = Math.ceil(cpReadProgress * cpTotalWords);
        cpWordSpans.forEach((span, idx) => {
          if (idx < activeCount) {
            span.classList.add("is-lit");
          } else {
            span.classList.remove("is-lit");
          }
        });
      }

      // --- APPLY ACT 2 TRANSFORMS & 3D CURSOR TILT ---
      if (solHeadingAnchor && solDescContainer) {
        // High dock at -31vh ensures ZERO overlap with subsections below
        const solTargetTopVh = window.innerWidth <= 767 ? -26 : -31;
        const solCurrentYVh = solTargetTopVh * solTitleSlideProgress;
        const solCurrentScale = 1 - (1 - targetScale) * solTitleSlideProgress;
        const solTitleExitX = -120 * solExitProgress;

        solHeadingAnchor.style.opacity = (solTitleOpacity * (1 - solExitProgress)).toFixed(3);
        solHeadingAnchor.style.transform = `translate3d(calc(-50% + ${solTitleExitX.toFixed(2)}vw), calc(-50% + ${solCurrentYVh.toFixed(2)}vh), 0) scale(${solCurrentScale.toFixed(3)})`;

        // Smooth Lerp cursor physics
        currentTiltX += (targetTiltX - currentTiltX) * 0.08;
        currentTiltY += (targetTiltY - currentTiltY) * 0.08;

        const tiltPxX = currentTiltX * 16;
        const tiltPxY = currentTiltY * 12;
        const tiltRotX = -currentTiltY * 3;
        const tiltRotY = currentTiltX * 4;

        // Container is active while any block is visible
        const containerOpacity = Math.max(b1Opacity, b2Opacity, b3Opacity);
        solDescContainer.style.opacity = containerOpacity.toFixed(3);
        solDescContainer.style.transform = `translate3d(calc(-50% + ${tiltPxX.toFixed(2)}px), calc(-50% + ${tiltPxY.toFixed(2)}px), 0) rotateX(${tiltRotX.toFixed(2)}deg) rotateY(${tiltRotY.toFixed(2)}deg)`;
        solDescContainer.style.pointerEvents = containerOpacity > 0.5 ? "auto" : "none";

        // Apply individual block translations & opacities
        if (solBlock1) {
          solBlock1.style.opacity = b1Opacity.toFixed(3);
          solBlock1.style.transform = `translate3d(${b1X.toFixed(2)}vw, 0, 0)`;
        }
        if (solBlock2) {
          solBlock2.style.opacity = b2Opacity.toFixed(3);
          solBlock2.style.transform = `translate3d(${b2X.toFixed(2)}vw, 0, 0)`;
        }
        if (solBlock3) {
          solBlock3.style.opacity = b3Opacity.toFixed(3);
          solBlock3.style.transform = `translate3d(${b3X.toFixed(2)}vw, 0, 0)`;
        }

        // Word illumination on visible blocks
        if (solWordSpans.length > 0) {
          solWordSpans.forEach((span) => {
            span.classList.add("is-lit");
          });
        }
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          render();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    render();
  };

  const initProductsPortfolioScrollHighlight = () => {
    const card = document.querySelector(".products-portfolio-card");
    const paragraph = document.querySelector(".portfolio-scroll-highlight-paragraph");
    if (!paragraph || !card) return;

    const rawText = paragraph.textContent.trim();
    const words = rawText.split(/\s+/);

    paragraph.innerHTML = words
      .map((word, wordIdx) => {
        const delay = (0.15 + wordIdx * 0.015).toFixed(2);
        return `<span class="portfolio-highlight-word" style="font-family: 'Satoshi', sans-serif !important; transition-delay: ${delay}s;">${word}</span>`;
      })
      .join(" ");

    const wordSpans = paragraph.querySelectorAll(".portfolio-highlight-word");

    const entryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.classList.add("js--animated");
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -40px 0px" }
    );
    entryObserver.observe(card);

    const updateWordHighlight = () => {
      const rect = paragraph.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const startPoint = windowHeight * 0.85;
      const endPoint = windowHeight * 0.35;

      let progress = (startPoint - rect.top) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(1, progress));

      const activeIndex = Math.floor(progress * wordSpans.length);

      wordSpans.forEach((span, index) => {
        if (index <= activeIndex) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });
    };

    // 3D Parallax Tilt Card - Our Solutions Box
    const portfolioCardWrapper = card.closest(".products-portfolio-card-wrapper") || card;
    createLerpTiltCard(card, portfolioCardWrapper, {
      baseTranslate: "translate3d(0px, 0px, 50px)",
      maxTilt: 10,
      easeFactor: 0.08,
      restScale: 1.02,
      hoverScale: 1.04
    });

    // Throttled scroll listener using requestAnimationFrame for smooth word highlight updates
    let portfolioScrollHighlightRafId = null;
    const onPortfolioScrollHighlight = () => {
      if (portfolioScrollHighlightRafId === null) {
        portfolioScrollHighlightRafId = requestAnimationFrame(() => {
          updateWordHighlight();
          portfolioScrollHighlightRafId = null;
        });
      }
    };

    window.addEventListener("scroll", onPortfolioScrollHighlight, { passive: true });
    window.addEventListener("resize", onPortfolioScrollHighlight, { passive: true });
    updateWordHighlight();
  };

  const initValuesLeadershipScrollHighlight = () => {
    const card = document.querySelector(".values-leadership-card");
    const paragraphs = document.querySelectorAll(".values-leadership-text-wrapper p");
    if (paragraphs.length === 0 || !card) return;

    let globalWordIdx = 0;
    let allWordSpans = [];

    paragraphs.forEach((p) => {
      const rawText = p.textContent.trim();
      const words = rawText.split(/\s+/);
      p.innerHTML = words
        .map((word) => {
          const delay = (0.15 + (globalWordIdx++) * 0.008).toFixed(2);
          const cleanWord = word.replace(/[.,;:]/g, "");
          const isBold = ["NICOTRA", "Gebhardt", "Amrita", "Singh"].includes(cleanWord);
          const fontWeight = isBold ? "700" : "300";
          const extraClass = isBold ? " bold-word" : "";
          return `<span class="values-highlight-word${extraClass}" style="font-family: 'Satoshi', sans-serif !important; font-weight: ${fontWeight} !important; transition-delay: ${delay}s;">${word}</span>`;
        })
        .join(" ");
      allWordSpans.push(...p.querySelectorAll(".values-highlight-word"));
    });

    const entryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.classList.add("js--animated");
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
    );
    entryObserver.observe(card);

    const updateWordHighlight = () => {
      const wrapper = document.querySelector(".values-leadership-text-wrapper");
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const startPoint = windowHeight * 0.85;
      const endPoint = windowHeight * 0.25;

      let progress = (startPoint - rect.top) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(1, progress));

      const activeIndex = Math.floor(progress * allWordSpans.length);

      allWordSpans.forEach((span, index) => {
        if (index <= activeIndex) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });
    };

    // 3D Parallax Tilt Card - Trust & Excellence Box
    const valuesCardWrapper = card.closest(".values-leadership-card-wrapper") || card;
    createLerpTiltCard(card, valuesCardWrapper, {
      baseTranslate: "translate3d(0px, 0px, 50px)",
      maxTilt: 10,
      easeFactor: 0.08,
      restScale: 1.02,
      hoverScale: 1.04
    });

    window.addEventListener("scroll", updateWordHighlight, { passive: true });
    window.addEventListener("resize", updateWordHighlight, { passive: true });
    updateWordHighlight();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileHeaderNav);
  } else {
    initMobileHeaderNav();
  }

  initPreloader(() => {
    initWidgets();
    initFeatures();
    initProductModal();
    initVideos();
    initCompanyProfileStickyVideo();
    initProductsPortfolioScrollHighlight();
    initValuesLeadershipScrollHighlight();
  });

  function initMobileHeaderNav() {
    let lastToggleTime = 0;
    let lastScrollY = window.scrollY;

    const toggleHeaderNav = (e) => {
      if (e && e.type !== "click" && e.pointerType === "mouse") {
        return;
      }

      const now = Date.now();
      if (now - lastToggleTime < 300) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }
        return;
      }
      lastToggleTime = now;


      if (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      }

      const header = document.querySelector(".header");
      const nav = document.querySelector(".navmenu");
      if (!header || !nav) return;

      const isOpen = header.classList.contains("js--open") || nav.classList.contains("visible");

      if (isOpen) {
        header.classList.remove("js--open");
        nav.classList.remove("visible");
      } else {
        header.classList.add("js--open");
        nav.classList.add("visible");
        lastScrollY = window.scrollY;
      }
    };

    const eventNames = ["pointerdown", "touchstart", "click"];
    const selectors = [
      ".header__button",
      "[data-role='header-button']",
      ".button--ghost",
      ".header__button-line"
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((btn) => {
        eventNames.forEach((evt) => {
          btn.addEventListener(evt, toggleHeaderNav, { capture: true, passive: false });
        });
      });
    });

    document.querySelectorAll(".navmenu a").forEach((link) => {
      link.addEventListener("click", () => {
        const header = document.querySelector(".header");
        const nav = document.querySelector(".navmenu");
        if (header) header.classList.remove("js--open");
        if (nav) nav.classList.remove("visible");
      });
    });

    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header");
      const nav = document.querySelector(".navmenu");
      if (!header || !nav) return;
      if (header.classList.contains("js--open") || nav.classList.contains("visible")) {
        if (Math.abs(window.scrollY - lastScrollY) > 25) {
          header.classList.remove("js--open");
          nav.classList.remove("visible");
        }
      }
    }, { passive: true });
  }
})();





