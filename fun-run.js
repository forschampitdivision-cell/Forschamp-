// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(30px)";
      setTimeout(() => {
        entry.target.style.transition = "all 0.6s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, 100);
    }
  });
});

document
  .querySelectorAll(".feature-card, .distance-card, .content-box")
  .forEach((el) => {
    observer.observe(el);
  });

console.log("🏃 FORSCHAMP Fun Run 2026 - Ready to roll! 🤠");
