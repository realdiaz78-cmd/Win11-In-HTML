document.addEventListener("DOMContentLoaded", () => {
  const taskViewBtn = document.getElementById("task-view-btn");
  const taskViewPanel = document.getElementById("task-view-panel");
  const desktopsBar = document.getElementById("virtual-desktops-bar");
  const newDesktopBtn = document.getElementById("new-desktop-btn");
  const activeDesktopLabel = document.getElementById("active-desktop-label");
  const startMenu = document.getElementById("start-menu");
  const startBtn = document.getElementById("start-btn");
  const searchPanel = document.getElementById("search-panel");
  const searchBtn = document.getElementById("search-btn");

  if (!taskViewBtn || !taskViewPanel) return;

  let activeDesktopNumber = 1;

  function closeOtherOverlays() {
    if (startMenu && startMenu.classList.contains("open")) {
      startMenu.classList.remove("open");
      startMenu.setAttribute("aria-hidden", "true");
    }
    if (startBtn) startBtn.classList.remove("active");

    if (searchPanel && searchPanel.classList.contains("open")) {
      searchPanel.classList.remove("open");
      searchPanel.setAttribute("aria-hidden", "true");
    }
    if (searchBtn) searchBtn.classList.remove("active");
  }

  function setTaskViewState(isOpen) {
    taskViewPanel.classList.toggle("open", isOpen);
    taskViewPanel.setAttribute("aria-hidden", String(!isOpen));
    taskViewBtn.classList.toggle("active", isOpen);

    if (isOpen) {
      closeOtherOverlays();
    }
  }

  function selectDesktop(card) {
    if (!desktopsBar || !card) return;
    const allCards = desktopsBar.querySelectorAll(".virtual-desktop-card");
    allCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    const desktopNum = card.dataset.desktopNumber;
    if (desktopNum) {
      activeDesktopNumber = desktopNum;
      if (activeDesktopLabel) {
        activeDesktopLabel.textContent = `Escritorio ${desktopNum}`;
      }
    }
  }

  function createVirtualDesktop() {
    if (!desktopsBar || !newDesktopBtn) return;

    const currentCards = desktopsBar.querySelectorAll(".virtual-desktop-card");
    const nextNumber = currentCards.length + 1;

    const card = document.createElement("div");
    card.className = "virtual-desktop-card";
    card.dataset.desktopNumber = String(nextNumber);

    const label = document.createElement("span");
    label.className = "virtual-desktop-label";
    label.textContent = `Escritorio ${nextNumber}`;

    card.appendChild(label);
    card.addEventListener("click", () => {
      selectDesktop(card);
    });

    desktopsBar.insertBefore(card, newDesktopBtn);
    selectDesktop(card);
  }

  if (desktopsBar) {
    const initialCards = desktopsBar.querySelectorAll(".virtual-desktop-card");
    initialCards.forEach((card) => {
      card.addEventListener("click", () => {
        selectDesktop(card);
      });
    });
  }

  if (newDesktopBtn) {
    newDesktopBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      createVirtualDesktop();
    });
  }

  taskViewBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isCurrentlyOpen = taskViewPanel.classList.contains("open");
    setTaskViewState(!isCurrentlyOpen);
  });

  taskViewPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (taskViewPanel.classList.contains("open")) {
      setTaskViewState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && taskViewPanel.classList.contains("open")) {
      setTaskViewState(false);
    }
  });
});
