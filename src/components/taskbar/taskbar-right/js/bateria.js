document.addEventListener("DOMContentLoaded", () => {
  const BATTERY_ICON_BASE = "public/img/taskbar/taskbar-right/iconos-de-bandeja/";

  const batteryIcon = document.getElementById("battery-icon");
  const batteryPercent = document.getElementById("battery-percent");
  const batteryWidget = document.getElementById("battery-widget");

  function selectBatteryIcon(levelPercent, isCharging) {
    if (isCharging) {
      return `${BATTERY_ICON_BASE}bateria-cargando.png`;
    }
    if (levelPercent <= 20) {
      return `${BATTERY_ICON_BASE}batería-baja.png`;
    }
    if (levelPercent <= 65) {
      return `${BATTERY_ICON_BASE}bateria-a-la mitad.png`;
    }
    return `${BATTERY_ICON_BASE}bateria-llena.png`;
  }

  function renderBattery(level, charging) {
    const percent = Math.round(level * 100);
    if (batteryPercent) {
      batteryPercent.textContent = `${percent}%`;
    }
    if (batteryIcon) {
      batteryIcon.src = selectBatteryIcon(percent, charging);
      batteryIcon.alt = charging
        ? `Cargando (${percent}%)`
        : `Batería al ${percent}%`;
    }
    if (batteryWidget) {
      batteryWidget.title = charging
        ? `Cargando - ${percent}%`
        : `Batería - ${percent}%`;
    }
  }

  async function initBattery() {
    if (!("getBattery" in navigator)) {
      if (batteryPercent) batteryPercent.textContent = "AC";
      if (batteryIcon) batteryIcon.src = `${BATTERY_ICON_BASE}bateria-cargando.png`;
      return;
    }

    try {
      const battery = await navigator.getBattery();
      const updateAll = () => renderBattery(battery.level, battery.charging);

      updateAll();
      battery.addEventListener("levelchange", updateAll);
      battery.addEventListener("chargingchange", updateAll);
    } catch (err) {
      console.error("Error al leer la batería:", err);
      if (batteryPercent) batteryPercent.textContent = "--%";
    }
  }

  initBattery();
});
