document.addEventListener("DOMContentLoaded", () => {
  const clockTime = document.getElementById("clock-time");
  const clockDate = document.getElementById("clock-date");

  function updateDateTime() {
    const now = new Date();

    if (clockTime) {
      clockTime.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    if (clockDate) {
      clockDate.textContent = now.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    }
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
});
