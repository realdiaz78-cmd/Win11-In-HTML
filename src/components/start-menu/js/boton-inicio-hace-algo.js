document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startMenu = document.getElementById("start-menu");

  if (!startBtn || !startMenu) return;

  function setMenuState(isOpen) {
    startMenu.classList.toggle("open", isOpen);
    startMenu.setAttribute("aria-hidden", String(!isOpen));
    startBtn.classList.toggle("active", isOpen);
  }

  startBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isCurrentlyOpen = startMenu.classList.contains("open");
    setMenuState(!isCurrentlyOpen);
  });

  startMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (startMenu.classList.contains("open")) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && startMenu.classList.contains("open")) {
      setMenuState(false);
    }
  });
});
