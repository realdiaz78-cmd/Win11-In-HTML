document.addEventListener("DOMContentLoaded", () => {
  const lockScreenEl = document.getElementById("lock-screen");
  const lockTimeEl = document.getElementById("lock-time");
  const lockDateEl = document.getElementById("lock-date");
  const lockUserNameEl = document.getElementById("lock-user-name");
  const loginPanelEl = document.getElementById("lock-login-panel");
  const signInBtnEl = document.getElementById("lock-signin-btn");

  if (!lockScreenEl) return;

  function getPrefs() {
    const st = window.win11SettingsState || {};
    return {
      locale: st.locale || "es-AR",
      time24h: st.time24h !== undefined ? st.time24h : true,
      username: st.username || "Usuario"
    };
  }

  function updateLockClock() {
    const { locale, time24h, username } = getPrefs();
    const now = new Date();

    if (lockTimeEl) {
      lockTimeEl.textContent = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !time24h
      });
    }

    if (lockDateEl) {
      const formattedDate = now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long"
      });
      lockDateEl.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    if (lockUserNameEl) {
      lockUserNameEl.textContent = username;
    }
  }

  function enterLoginMode() {
    updateLockClock();
    lockScreenEl.classList.add("login-mode");
    lockScreenEl.setAttribute("data-stage", "login");
  }

  function unlockToDesktop() {
    lockScreenEl.classList.add("unlocked");
    lockScreenEl.setAttribute("aria-hidden", "true");
    lockScreenEl.setAttribute("data-stage", "unlocked");
  }

  function lockScreen() {
    if (typeof window.closeWin11SystemPanels === "function") {
      window.closeWin11SystemPanels();
    }
    updateLockClock();
    lockScreenEl.classList.remove("unlocked");
    lockScreenEl.classList.remove("login-mode");
    lockScreenEl.setAttribute("aria-hidden", "false");
    lockScreenEl.setAttribute("data-stage", "clock");
  }

  updateLockClock();
  setInterval(updateLockClock, 1000);

  // Al tocar el fondo de pantalla: se difumina y muestra el avatar arriba y el botón abajo
  lockScreenEl.addEventListener("click", (e) => {
    if (lockScreenEl.classList.contains("unlocked")) return;
    if (loginPanelEl && loginPanelEl.contains(e.target)) return;

    if (!lockScreenEl.classList.contains("login-mode")) {
      enterLoginMode();
    }
  });

  // Al tocar "Iniciar sesión": lleva al escritorio
  if (signInBtnEl) {
    signInBtnEl.addEventListener("click", (e) => {
      e.stopPropagation();
      unlockToDesktop();
    });
  }

  window.lockWin11Screen = lockScreen;
  window.unlockWin11Screen = unlockToDesktop;
  window.updateLockClock = updateLockClock;
});

