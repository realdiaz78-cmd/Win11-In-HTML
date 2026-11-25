document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchPanel = document.getElementById("search-panel");
  const searchInput = document.getElementById("search-input");
  const startMenu = document.getElementById("start-menu");

  if (!searchBtn || !searchPanel) return;

  function setSearchState(isOpen) {
    searchPanel.classList.toggle("open", isOpen);
    searchPanel.setAttribute("aria-hidden", String(!isOpen));
    searchBtn.classList.toggle("active", isOpen);

    if (isOpen) {
      if (startMenu && startMenu.classList.contains("open")) {
        startMenu.classList.remove("open");
        startMenu.setAttribute("aria-hidden", "true");
        const startBtn = document.getElementById("start-btn");
        if (startBtn) startBtn.classList.remove("active");
      }
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 50);
      }
    }
  }

  searchBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isCurrentlyOpen = searchPanel.classList.contains("open");
    setSearchState(!isCurrentlyOpen);
  });

  searchPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (searchPanel.classList.contains("open")) {
      setSearchState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchPanel.classList.contains("open")) {
      setSearchState(false);
    }
  });
});
