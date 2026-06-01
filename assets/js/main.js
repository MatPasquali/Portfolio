/* ============================================================
   main.js — interactions, i18n switching, animations
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Language ---------- */
  const STORAGE_KEY = "mp-lang";
  let lang = localStorage.getItem(STORAGE_KEY) || "pt";

  function applyLang(next) {
    lang = next;
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = I18N[next][key];
      if (val === undefined) return;
      if (el.tagName === "META") el.setAttribute("content", val);
      else el.textContent = val;
    });

    // toggle button state
    document.querySelector(".lang-toggle__pt").classList.toggle("is-active", next === "pt");
    document.querySelector(".lang-toggle__en").classList.toggle("is-active", next === "en");

    renderProjects(next);
    typeName(); // re-run typewriter so the greeting matches language
  }

  const langBtn = document.getElementById("lang-toggle");
  langBtn.addEventListener("click", () => applyLang(lang === "pt" ? "en" : "pt"));

  /* ---------- Projects render ---------- */
  function renderProjects(l) {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    const items = PROJECTS[l] || PROJECTS.pt;
    grid.innerHTML = items.map((p) => `
      <article class="card reveal">
        <div class="card__top">
          <span class="card__icon">&lt;/&gt;</span>
          <span class="card__lang">${p.lang}</span>
        </div>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__tags">${p.tags.map((t) => `<span class="card__tag">${t}</span>`).join("")}</div>
        <a class="card__link" href="${p.url}" target="_blank" rel="noopener">${l === "pt" ? "ver repo" : "view repo"} →</a>
      </article>`).join("");

    // re-observe newly created reveal elements + attach cursor glow
    grid.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    grid.querySelectorAll(".card").forEach(attachGlow);
  }

  function attachGlow(card) {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  /* ---------- Typewriter for name ---------- */
  let typeTimer = null;
  function typeName() {
    const el = document.getElementById("typed-name");
    if (!el) return;
    clearTimeout(typeTimer);
    const text = lang === "pt"
      ? "Mateus de Pasquali da Silva"
      : "Mateus de Pasquali da Silva";
    el.textContent = "";
    let i = 0;
    (function tick() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i++);
        typeTimer = setTimeout(tick, 55);
      }
    })();
  }

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  function initReveal() {
    document.querySelectorAll(".section, .terminal, .hero__stats").forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* ---------- Animated counters ---------- */
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      (function up() {
        cur = Math.min(target, cur + step);
        el.textContent = cur + (cur >= target ? "+" : "");
        if (cur < target) requestAnimationFrame(up);
      })();
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  /* ---------- Navbar scroll state + mobile menu ---------- */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 30);
  }, { passive: true });

  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav__links");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    menuBtn.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuBtn.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Particle background ---------- */
  function initCanvas() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(90, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(54,226,196,.7)";
        ctx.fill();
        // links
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = dx * dx + dy * dy;
          if (dist < 16000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(110,231,255,${0.12 * (1 - dist / 16000)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    cancelAnimationFrame(raf);
    draw();
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    applyLang(lang);              // also renders projects + typewriter
    initReveal();
    document.querySelectorAll(".stat__num").forEach((el) => countObserver.observe(el));
    initCanvas();
  });
})();
