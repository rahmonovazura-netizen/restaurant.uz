// ===== Shifo Tibbiyot Markazi - Umumiy skript =====

// Har bir sahifada takrorlanadigan header va footer
const HEADER_HTML = `
<div class="topbar">
  <div class="container">
    <span>📍 Toshkent sh., Shifokorlar ko'chasi, 12-uy</span>
    <span>📞 <a href="tel:+998712000000">+998 71 200 00 00</a> &nbsp;|&nbsp; ✉️ info@shifo.uz</span>
  </div>
</div>
<header class="header" id="header">
  <nav class="container nav">
    <a href="index.html" class="logo">
      <span class="logo-icon">✚</span> Shifo Markazi
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Bosh sahifa</a></li>
      <li><a href="about.html">Biz haqimizda</a></li>
      <li><a href="services.html">Xizmatlar</a></li>
      <li><a href="departments.html">Bo'limlar</a></li>
      <li><a href="doctors.html">Shifokorlar</a></li>
      <li><a href="pricing.html">Narxlar</a></li>
      <li><a href="insurance.html">Sug'urta</a></li>
      <li><a href="gallery.html">Galereya</a></li>
      <li><a href="news.html">Yangiliklar</a></li>
      <li><a href="faq.html">Savollar</a></li>
      <li><a href="careers.html">Vakansiyalar</a></li>
      <li><a href="contact.html">Aloqa</a></li>
    </ul>
    <div class="nav-actions">
      <button class="theme-toggle" id="themeToggle" title="Mavzuni o'zgartirish">🌙</button>
      <a href="appointment.html" class="btn">Qabulga yozilish</a>
      <button class="menu-toggle" id="menuToggle" aria-label="Menyu">☰</button>
    </div>
  </nav>
</header>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4>Shifo Markazi</h4>
        <p>Zamonaviy uskunalar va malakali shifokorlar bilan sizning sog'lig'ingiz xizmatida.</p>
      </div>
      <div>
        <h4>Tezkor havolalar</h4>
        <ul>
          <li><a href="services.html">Xizmatlar</a></li>
          <li><a href="doctors.html">Shifokorlar</a></li>
          <li><a href="appointment.html">Qabulga yozilish</a></li>
          <li><a href="pricing.html">Narxlar</a></li>
        </ul>
      </div>
      <div>
        <h4>Ma'lumot</h4>
        <ul>
          <li><a href="patient-rights.html">Bemor huquqlari</a></li>
          <li><a href="faq.html">Ko'p so'raladigan savollar</a></li>
          <li><a href="news.html">Yangiliklar</a></li>
          <li><a href="careers.html">Vakansiyalar</a></li>
        </ul>
      </div>
      <div>
        <h4>Aloqa</h4>
        <ul>
          <li>📞 +998 71 200 00 00</li>
          <li>🚑 Shoshilinch: <a href="emergency.html">103 / 1003</a></li>
          <li>🕘 Dush–Shan: 08:00 – 20:00</li>
          <li>✉️ info@shifo.uz</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Shifo Tibbiyot Markazi. Barcha huquqlar himoyalangan.</div>
  </div>
</footer>
<button class="to-top" id="toTop" aria-label="Yuqoriga">↑</button>`;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Header va footer joylash
  const headerSlot = document.getElementById("header-slot");
  const footerSlot = document.getElementById("footer-slot");
  if (headerSlot) headerSlot.outerHTML = HEADER_HTML;
  if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

  // 2. Joriy sahifa menyusini faollashtirish
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  // 3. Mobil menyu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  // 4. Mavzu (kunduzgi / tungi rejim) - localStorage'da saqlanadi
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  if (themeBtn) {
    themeBtn.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
      localStorage.setItem("theme", isDark ? "light" : "dark");
      themeBtn.textContent = isDark ? "🌙" : "☀️";
    });
  }

  // 5. Header soyasi va "yuqoriga" tugmasi
  const header = document.getElementById("header");
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 400);
  });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // 6. Scroll animatsiyasi
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("visible"));
  }

  // 7. Raqamlar animatsiyasi (statistika)
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = +el.dataset.count;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = start.toLocaleString("uz-UZ") + (el.dataset.suffix || "");
    }, 25);
  });

  // 8. FAQ accordion
  document.querySelectorAll(".accordion-header").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      item.classList.toggle("open");
    });
  });

  // 9. Shifokorlarni filtrlash
  const filterBtns = document.querySelectorAll(".filter-btn");
  const doctorCards = document.querySelectorAll("[data-spec]");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      doctorCards.forEach(card => {
        card.style.display = (f === "all" || card.dataset.spec === f) ? "" : "none";
      });
    });
  });

  // 10. Galereya lightbox
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    document.querySelectorAll(".gallery-item img").forEach(img => {
      img.parentElement.addEventListener("click", () => {
        lbImg.src = img.src;
        lightbox.classList.add("show");
      });
    });
    lightbox.addEventListener("click", () => lightbox.classList.remove("show"));
  }

  // 11. Qabulga yozilish formasi validatsiyasi
  const form = document.getElementById("appointmentForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[data-required]").forEach(field => {
        const group = field.closest(".form-group");
        const empty = !field.value.trim();
        let badPhone = false;
        if (field.type === "tel") {
          badPhone = !/^\+?\d{9,13}$/.test(field.value.replace(/[\s()-]/g, ""));
        }
        const bad = empty || badPhone;
        group.classList.toggle("invalid", bad);
        if (bad) valid = false;
      });
      if (valid) {
        document.getElementById("successMsg").style.display = "block";
        form.reset();
      }
    });
  }

  // 12. Aloqa formasi
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const ok = document.getElementById("contactSuccess");
      ok.style.display = "block";
      contactForm.reset();
    });
  }

  // 13. Narxlar: kunlik / oylik tanlash (ixtiyoriy)
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll("[data-tab-panel]").forEach(p => {
        p.style.display = p.dataset.tabPanel === btn.dataset.tab ? "" : "none";
      });
    });
  });
});
