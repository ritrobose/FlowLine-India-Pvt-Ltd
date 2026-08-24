/**
 * Values & Leadership (Trust & Excellence) Section Controller
 * Flowline India Private Limited
 */
export function initValuesLeadership() {
  const section = document.getElementById('values-leadership-section');
  if (!section) return;

  // 1. Intersection Observer for Scroll-Based Entrance Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
      }
    });
  }, observerOptions);

  observer.observe(section);

  // 2. 3D Subtle Tilt Parallax on the Right Frosted Glass Card
  const frostedCard = section.querySelector('.values-frosted-card');
  if (frostedCard && window.matchMedia('(pointer: fine)').matches) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      // Subtle tilt rotation
      const rotateX = -deltaY * 6;
      const rotateY = deltaX * 8;

      frostedCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    section.addEventListener('mouseleave', () => {
      frostedCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      frostedCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    section.addEventListener('mouseenter', () => {
      frostedCard.style.transition = 'none';
    });
  }

  // 3. Subtle Parallax on the background fan image based on page scroll
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const bgImg = section.querySelector('.values-trust-bg-image');
      if (bgImg) {
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const translateY = (scrollPercent - 0.5) * 40;
        bgImg.style.transform = `translateY(${translateY}px) scale(1.02)`;
      }
    }
  }, { passive: true });
}
