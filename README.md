# Win11 in HTML

Simulación modular de escritorio **Windows 11** hecha con HTML, CSS y JavaScript puro, con gestor de ventanas, menú de inicio, búsqueda, vista de tareas, personalización, persistencia en `localStorage` y aplicaciones independientes cargadas desde `src/components/apps/`.

## Características principales

* **Escritorio y gestión de ventanas**: arrastrar, enfocar, minimizar, maximizar y cerrar ventanas, además de vista de tareas y escritorios virtuales.
* **Accesos directos y papelera**: accesos directos en el escritorio (`Este equipo`, `Usuario`, `Papelera de reciclaje`, `Explorador`, `Microsoft Store` y `Microsoft Edge`) con arrastre hacia la papelera y persistencia en `localStorage`.
* **Personalización y ajustes**: cambio de fondo de pantalla y ajustes del sistema (pantalla, redes, cuentas, hora e idioma, juegos, accesibilidad, privacidad y actualizaciones).
* **Barra de tareas y widgets**: widget del clima, menú de inicio, búsqueda, vista de tareas, estado de batería y mini calendario emergente al tocar la fecha y hora.
* **Catálogo de aplicaciones en `src/components/apps/`**:
  * **Explorador** (`src/components/apps/explorer/index.html`)
  * **Edge** (`src/components/apps/edge/index.html`)
  * **Notepad** (`src/components/apps/notepad/index.html`)
  * **Paint** (`src/components/apps/paint/index.html`)
  * **Calculadora** (`src/components/apps/calculator/index.html`)
  * **MS Store** (`src/components/apps/store/index.html`)
  * **Terminal** (`src/components/apps/terminal/index.html`)
  * **El Tiempo** (`src/components/apps/weather/index.html`)
  * **Fotos** (`src/components/apps/photos/index.html`)
  * **Outlook** (`src/components/apps/outlook/index.html`)
  * **Media Player** (`src/components/apps/media-player/index.html`)
  * **Xbox** (`src/components/apps/xbox/index.html` — mini-juegos jugables en `<canvas>`)
  * **Grabadora** (`src/components/apps/recorder/index.html`)
  * **Mapas** (`src/components/apps/maps/index.html` — mapas reales con OpenStreetMap / Leaflet)
  * **Notas rápidas** (`src/components/apps/notes/index.html`)
  * **Administrador de tareas** (`src/components/apps/task-manager/index.html`)

## Estructura del proyecto

```text
├── index.html
├── README.md
├── public/
│   └── img/
│       ├── apps/icons/
│       ├── desktop/
│       ├── taskbar/
│       └── wallpaper/
└── src/
    └── components/
        ├── apps/
        ├── search/
        ├── start-menu/
        ├── taskbar/
        └── task-view/
