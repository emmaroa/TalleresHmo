(async function () {
  async function inject(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error("No pude cargar: " + url);
    el.innerHTML = await res.text();
  }

  function setActiveLink() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__link").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if (href === path) a.classList.add("is-active");
    });
  }

  function setupMobileMenu() {
    const toggle = document.querySelector(".nav__toggle");
    const links = document.querySelector("[data-nav-links]");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  try {
    await inject("site-nav", "components/navbar.html");
    setActiveLink();
    setupMobileMenu();
  } catch (e) {
    console.warn(e);
  }
})();
