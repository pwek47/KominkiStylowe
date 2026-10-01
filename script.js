document.documentElement.classList.add("js");

(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  /* Nagłówek – tło po przewinięciu */
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobilne */
  const setNav = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
  };
  toggle?.addEventListener("click", () => setNav(toggle.getAttribute("aria-expanded") !== "true"));
  nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  /* Animacje przy przewijaniu + aktywny link w menu */
  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

    const links = nav ? [...nav.querySelectorAll('ul a[href^="#"]')] : [];
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((l) => {
      const s = document.querySelector(l.getAttribute("href"));
      if (s) sectionObs.observe(s);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }

  /* Godziny otwarcia – podświetlenie dnia i status */
  const hours = { 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [10, 17] };
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Warsaw" }));
  const day = now.getDay();
  document.querySelectorAll(".hours tr").forEach((tr) => {
    if (tr.dataset.days.split(",").map(Number).includes(day)) tr.classList.add("today");
  });
  const status = document.getElementById("open-status");
  if (status) {
    const h = now.getHours() + now.getMinutes() / 60;
    const open = hours[day] && h >= hours[day][0] && h < hours[day][1];
    status.textContent = open ? "Otwarte" : "Zamknięte";
    status.classList.toggle("closed", !open);
    status.hidden = false;
  }

  /* Mapa Google ładowana dopiero po zgodzie (RODO / cookies) */
  document.getElementById("load-map")?.addEventListener("click", () => {
    const map = document.getElementById("map");
    map.innerHTML = '<iframe title="Mapa dojazdu – Kominki Stylowe, Ostrowiecka 163, Starachowice" ' +
      'src="https://maps.google.com/maps?q=Kominki%20Stylowe%2C%20Ostrowiecka%20163%2C%20Starachowice&z=15&output=embed" ' +
      'loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  });

  /* Galeria – podgląd zdjęć */
  const gallery = document.querySelector(".gallery");
  if (gallery) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Podgląd zdjęcia");
    box.innerHTML = '<button type="button" aria-label="Zamknij podgląd">&times;</button><figure><img alt=""><p></p></figure>';
    document.body.appendChild(box);
    const close = () => { box.hidden = true; document.body.style.overflow = ""; };
    box.addEventListener("click", (e) => { if (e.target === box || e.target.closest("button")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !box.hidden) close(); });

    gallery.querySelectorAll(".gallery-item").forEach((item) => {
      const img = item.querySelector("img");
      if (!img) return;
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", "Powiększ: " + img.alt);
      const open = () => {
        box.querySelector("img").src = img.currentSrc || img.src;
        box.querySelector("img").alt = img.alt;
        box.querySelector("p").textContent = item.querySelector("figcaption")?.textContent || "";
        box.hidden = false;
        document.body.style.overflow = "hidden";
        box.querySelector("button").focus();
      };
      item.addEventListener("click", open);
      item.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }

  /* Formularz kontaktowy – walidacja i wysyłka na biuro@kominkistylowe.pl (FormSubmit) */
  const form = document.getElementById("contact-form");
  if (form) {
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("form-submit");
    const setStatus = (type, text) => { statusEl.className = "form-status " + type; statusEl.textContent = text; };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("input:not([type=hidden]), textarea, select").forEach((f) => {
        if (f.name === "_honey") return;
        const ok = f.checkValidity();
        f.classList.toggle("invalid", !ok && f.type !== "checkbox");
        f.setAttribute("aria-invalid", String(!ok));
        if (!ok) valid = false;
      });
      if (!valid) {
        setStatus("error", "Uzupełnij wymagane pola (oznaczone *) i zaakceptuj zgodę.");
        form.querySelector(":invalid")?.focus();
        return;
      }

      const data = new FormData(form);
      const topic = data.get("Temat");
      data.set("_subject", `Zapytanie ze strony: ${topic} – ${data.get("Imię i nazwisko")}`);
      if (!data.get("email")) data.delete("email");

      submitBtn.disabled = true;
      submitBtn.textContent = "Wysyłanie…";
      setStatus("", "");
      try {
        const res = await fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || String(json.success) === "false") throw new Error(json.message || res.status);
        form.reset();
        form.querySelectorAll(".invalid").forEach((f) => f.classList.remove("invalid"));
        setStatus("ok", "Dziękujemy! Wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.");
      } catch (err) {
        setStatus("error", "Nie udało się wysłać wiadomości. Zadzwoń: 606 956 523 lub napisz na biuro@kominkistylowe.pl.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Wyślij zapytanie";
      }
    });
  }

  /* Filtrowanie realizacji */
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.classList.toggle("is-hidden", f !== "all" && item.dataset.category !== f);
      item.classList.toggle("gallery-wide", f === "all" && item.dataset.wide === "1");
    });
  }));
  document.querySelectorAll(".gallery-wide").forEach((el) => (el.dataset.wide = "1"));

  /* Przycisk "Zadzwoń" – chowamy go przy sekcji kontaktu, żeby nie zasłaniał formularza */
  const fab = document.querySelector(".call-fab");
  const contact = document.getElementById("kontakt");
  if (fab && contact && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => fab.classList.toggle("is-hidden", e.isIntersecting), { threshold: 0.05 }).observe(contact);
  }

  /* Rok w stopce */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
