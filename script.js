const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll(".nav-links a");
const themeButtons = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

function setTheme(theme) {
  root.dataset.theme = theme;

  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // Ignore storage errors in restricted browser contexts.
  }

  themeButtons.forEach((button) => {
    const isDark = theme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Alternar para tema claro" : "Alternar para tema escuro");
    button.title = "Alternar tema claro/escuro";
  });

  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "dark" ? "#12100f" : "#fafaf9");
  }
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch {
  savedTheme = "light";
}

setTheme(savedTheme === "dark" ? "dark" : "light");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton && menu) {
    setMenu(false);
  }
});
