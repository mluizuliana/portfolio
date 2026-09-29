const projectGrid = document.querySelector("[data-page-size]");
const pagination = document.querySelector(".project-pagination");
const paginationStatus = document.querySelector(".project-pagination-status");

if (projectGrid && pagination && paginationStatus) {
  const cards = [...projectGrid.querySelectorAll(":scope > .project-list-card")];
  const pageSize = Math.max(1, Number(projectGrid.dataset.pageSize) || 15);
  const pageCount = Math.max(1, Math.ceil(cards.length / pageSize));

  cards.forEach((card, index) => {
    const number = card.querySelector(".project-list-number");
    if (number) number.textContent = String(index + 1).padStart(2, "0");
  });

  function pageUrl(page) {
    const url = new URL(window.location.href);
    if (page === 1) url.searchParams.delete("pagina");
    else url.searchParams.set("pagina", String(page));
    return url;
  }

  function renderPage(scroll = false) {
    const requested = Number(new URL(window.location.href).searchParams.get("pagina"));
    const page = Math.min(pageCount, Math.max(1, Number.isInteger(requested) ? requested : 1));
    const start = (page - 1) * pageSize;

    cards.forEach((card, index) => {
      card.hidden = index < start || index >= start + pageSize;
    });

    const links = [];
    function addLink(number, label, accessibleLabel) {
      const link = document.createElement("a");
      link.href = pageUrl(number).href;
      link.textContent = label;
      link.setAttribute("aria-label", accessibleLabel);
      link.setAttribute("aria-controls", projectGrid.id);
      if (number === page) link.setAttribute("aria-current", "page");
      links.push(link);
    }

    if (page > 1) addLink(page - 1, "Anterior", "Ir para a página anterior");
    for (let number = 1; number <= pageCount; number++) {
      addLink(number, String(number), `Página ${number}`);
    }
    if (page < pageCount) addLink(page + 1, "Próxima", "Ir para a próxima página");

    pagination.replaceChildren(...links);
    pagination.hidden = pageCount <= 1;
    paginationStatus.textContent = `Página ${page} de ${pageCount} · ${cards.length} projetos`;
    document.title = page === 1 ? "Portfólio | Meigan Luiz" : `Portfólio · Página ${page} | Meigan Luiz`;

    const canonical = pageUrl(page);
    if (canonical.href !== window.location.href) history.replaceState(null, "", canonical);
    if (scroll) {
      projectGrid.scrollIntoView({ block: "start", behavior: "instant" });
      const heading = cards[start]?.querySelector("h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }
  }

  pagination.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (link.hasAttribute("aria-current")) return;
    history.pushState(null, "", link.href);
    renderPage(true);
  });

  window.addEventListener("popstate", () => renderPage(true));
  renderPage();
}
