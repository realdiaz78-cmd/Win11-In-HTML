document.addEventListener("DOMContentLoaded", () => {
  const OPENWEATHER_API_KEY = "e45d2267f6b13dbcf45141b0353e5289";
  const ICON_BASE_PATH = "public/img/taskbar/taskbar-left/";

  const weatherIcon = document.getElementById("weather-icon");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherDesc = document.getElementById("weather-desc");

  function selectWeatherImage(weatherId, iconCode) {
    const isNight = iconCode && iconCode.endsWith("n");

    // Códigos de tormenta en OpenWeather (200 - 232)
    if (weatherId >= 200 && weatherId < 300) {
      // 210-221 son tormentas eléctricas secas/aisladas -> lightning.png
      if (weatherId >= 210 && weatherId <= 221) {
        return `${ICON_BASE_PATH}lightning.png`;
      }
      // Tormentas con lluvia fuerte -> storm.png
      return `${ICON_BASE_PATH}storm.png`;
    }

    // Llovizna (300 - 321) y Lluvia (500 - 531)
    if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
      return `${ICON_BASE_PATH}rain.png`;
    }

    // Despejado (800)
    if (weatherId === 800) {
      return isNight ? `${ICON_BASE_PATH}moon.png` : `${ICON_BASE_PATH}sunny.png`;
    }

    // Nublado, neblina, nieve o atmósfera (700 - 781 y 801 - 804)
    return `${ICON_BASE_PATH}cloudy.png`;
  }

  async function detectLocation() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("Location lookup failed");
      const data = await response.json();
      return {
        lat: data.latitude,
        lon: data.longitude,
        city: data.city,
        country: data.country_name
      };
    } catch (error) {
      console.warn("No se pudo detectar la ubicación por IP, usando ubicación por defecto:", error);
      return {
        lat: -32.9468,
        lon: -60.6393,
        city: "Rosario",
        country: "Argentina"
      };
    }
  }

  async function updateWeather() {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "TU_API_KEY_DE_OPENWEATHER_AQUI") {
      weatherTemp.textContent = "24°C";
      weatherDesc.textContent = "Sunny";
      weatherIcon.src = `${ICON_BASE_PATH}sunny.png`;
      console.info("Win11 Weather: Agrega tu API Key de OpenWeather en weather.js para clima en vivo.");
      return;
    }

    try {
      const location = await detectLocation();
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("OpenWeather API error");
      
      const weatherData = await response.json();
      const temp = Math.round(weatherData.main.temp);
      const condition = weatherData.weather[0];

      weatherTemp.textContent = `${temp}°C`;
      weatherDesc.textContent = condition.main;
      weatherIcon.src = selectWeatherImage(condition.id, condition.icon);
      weatherIcon.alt = condition.description;
    } catch (error) {
      console.error("Error obteniendo el clima:", error);
      weatherTemp.textContent = "--°C";
      weatherDesc.textContent = "Unavailable";
      weatherIcon.src = `${ICON_BASE_PATH}cloudy.png`;
    }
  }

  updateWeather();
  // Actualizar automáticamente cada 15 minutos
  setInterval(updateWeather, 15 * 60 * 1000);
});
