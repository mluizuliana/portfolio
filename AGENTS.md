# Portfolio maintenance

- The published site is static and must work under a GitHub Pages repository subpath. Keep local links relative.
- Project cards live in `portfolio.html`, inside `#project-grid`. Add new cards at the end of this grid, keeping the existing card structure.
- Pagination is automatic in `portfolio-pagination.js`. Each page has 15 projects (`data-page-size="15"`): 1-15 on page 1, 16-30 on page 2, 31-45 on page 3, and so on.
- Do not create separate HTML files for archive pages. The URL uses `portfolio.html?pagina=2`, etc. New cards are counted automatically on load.
- Preserve existing project numbering/order and update the project count on the home page when adding projects.
- The Editorial (Pet Sitter), Retro and Hybrid studies have individual cases in `projetos/` and demos in `demos/design-systems/`. Their archive order is Editorial (14), Retro (15), Hybrid (16).
