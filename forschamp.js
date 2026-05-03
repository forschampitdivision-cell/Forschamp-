// --- 1. Mobile Menu Logic ---
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("nav a");

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      nav.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });
}

// --- 2. Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// --- 3. Scroll Animations ---
const appearanceOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const appearanceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("wanted-poster")) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 150);
      }

      if (entry.target.classList.contains("stat-number")) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        animateCounter(entry.target, target, 2000);
        appearanceObserver.unobserve(entry.target);
      }
    }
  });
}, appearanceOptions);

document.querySelectorAll(".wanted-poster, .stat-number").forEach((el) => {
  if (!el.classList.contains("stat-number")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  }
  appearanceObserver.observe(el);
});

// --- 4. Counter Engine ---
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString("id-ID");
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString("id-ID");
    }
  }, 16);
}

// --- 5. Header Hide/Show on Scroll ---
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      header.style.transform =
        scrollTop > lastScrollTop && scrollTop > 100
          ? "translateY(-100%)"
          : "translateY(0)";
    }
    lastScrollTop = scrollTop;
  },
  { passive: true },
);

// --- 6. Hero Parallax ---
const hero = document.querySelector(".hero");
window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
      hero.style.opacity = 1 - scrolled / 800;
    }
  },
  { passive: true },
);

// --- 7. Countdown Timer ---
const countdownElement = document.getElementById("countdown-timer");
if (countdownElement) {
  const targetDate = new Date("August 15, 2026 00:00:00").getTime();
  const updateCountdown = setInterval(() => {
    const distance = targetDate - new Date().getTime();
    if (distance < 0) {
      clearInterval(updateCountdown);
      countdownElement.textContent = "PENDAFTARAN DITUTUP";
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    countdownElement.textContent = `${days} Hari ${hours} Jam ${minutes} Menit`;
  }, 1000);
}

// --- 8. Logo Interaction ---
const logo = document.querySelector(".logo");
if (logo) {
  logo.addEventListener("mouseenter", function () {
    this.style.transform = "rotate(10deg) scale(1.1)";
  });
  logo.addEventListener("mouseleave", function () {
    this.style.transform = "rotate(0deg) scale(1)";
  });
}

console.log("🤠 FORSCHAMP 2026: System Initialized. Yeehaw!");
