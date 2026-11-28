(() => {
  const LIGHT_ICON = "public/img/taskbar/search.png";
  const DARK_ICON = "public/img/taskbar/white-search.png";

  function isDarkThemeActive() {
    if (
      window.win11SettingsState &&
      typeof window.win11SettingsState.darkTheme === "boolean"
    ) {
      return window.win11SettingsState.darkTheme;
    }
    return (
      document.body.classList.contains("dark-theme") ||
      document.documentElement.classList.contains("dark-theme")
    );
  }

  function syncSearchIcons() {
    const dark = isDarkThemeActive();
    const targetSrc = dark ? DARK_ICON : LIGHT_ICON;

    const searchImgs = document.querySelectorAll(
      '#search-btn img, .search-bar-wrap img, img[alt="Search"]'
    );

    searchImgs.forEach((img) => {
      if (img.getAttribute("src") !== targetSrc) {
        img.setAttribute("src", targetSrc);
      }
    });
  }

  window.syncWin11SearchIcon = syncSearchIcons;

  window.addEventListener("DOMContentLoaded", () => {
    syncSearchIcons();

    const bodyObserver = new MutationObserver(syncSearchIcons);
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"]
    });

    const htmlObserver = new MutationObserver(syncSearchIcons);
    htmlObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    const themeTile = document.getElementById("qs-theme-tile");
    if (themeTile) {
      themeTile.addEventListener("click", () => {
        setTimeout(syncSearchIcons, 0);
      });
    }

    setInterval(syncSearchIcons, 250);
  });
})();
