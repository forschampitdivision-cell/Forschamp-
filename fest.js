/**
 * FORSCHAMP Fest 2026 - Official Script
 */

// 1. Smooth Scrolling dengan Perbaikan Selektor
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return; // Abaikan jika link hanya "#"

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// 2. Scroll Reveal Animation (Lebih Profesional)
const revealOptions = {
  threshold: 0.15, // Elemen muncul setelah 15% terlihat
  rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen masuk viewport
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Tambahkan class 'active' (nanti diatur di CSS)
      entry.target.classList.add("reveal-active");
      
      // Berhenti mengamati setelah animasi jalan (biar hemat resource)
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

// Target elemen yang ingin diberi animasi
const elementsToAnimate = document.querySelectorAll(
  ".feature-card, .content-box, .payment-section, .section-title"
);

elementsToAnimate.forEach((el) => {
  // Berikan state awal melalui class CSS
  el.classList.add("reveal-hidden");
  revealOnScroll.observe(el);
});

console.log("🤠 FORSCHAMP Fest 2026 - Scripts Loaded & Ready!");
