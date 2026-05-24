# Snake Game — React + Vite

Implementación del juego clásico Snake desarrollada con React y Vite como parte del Laboratorio 6 del curso de Desarrollo Web.

---

## Enlace de juego Deployeado

**https://snake-game-en4wnqbdt-salco-s-projects.vercel.app/**

---

## Descripción

El proyecto consiste en una aplicación web interactiva del juego Snake. El énfasis del desarrollo estuvo puesto en la arquitectura de la aplicación: separación de responsabilidades en componentes React, manejo de estado con hooks y comunicación entre componentes mediante props.

---

## Tecnologías

- **React 19** — biblioteca de UI, componentes, props, estado
- **Vite** — herramienta de build y servidor de desarrollo
- **CSS puro** — estilos con variables CSS, sin librerías externas

---

## Estructura del proyecto

```
snake-game/
├── src/
│   ├── components/
│   │   ├── Board.jsx          # Contenedor visual del tablero
│   │   ├── Snake.jsx          # Representación de los segmentos
│   │   ├── Food.jsx           # Elemento de comida
│   │   ├── Score.jsx          # Visualización del puntaje
│   │   ├── StartScreen.jsx    # Pantalla de inicio
│   │   └── GameOverScreen.jsx # Pantalla de fin de juego
│   ├── utils/
│   │   └── gameUtils.js       # Funciones puras de lógica del juego
│   ├── constants.js           # Configuración centralizada
│   ├── App.jsx                # Componente raíz: estado y game loop
│   ├── App.css
│   ├── index.css              # Estilos globales
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Funcionalidades implementadas

### Juego base
- Movimiento continuo de la serpiente con control por teclado
- Crecimiento al consumir comida
- Detección de colisiones con paredes y con el propio cuerpo
- Sistema de puntaje
- Pantalla de inicio y pantalla de Game Over con opción de reinicio

### Extras
- **Dificultad progresiva** — la velocidad aumenta cada 5 puntos (de 150 ms/tick hasta un mínimo de 60 ms/tick)
- **Récord persistente** — el puntaje máximo se guarda en `localStorage` entre sesiones
- **Respuesta inmediata al teclado** — el movimiento se aplica en el mismo instante del keypress y reinicia el intervalo, eliminando el delay perceptible
- **Cola de direcciones** — las entradas rápidas del teclado se encolan (máximo 2) para no perder inputs entre ticks
- **Animaciones CSS** — pulso en la comida, transición en overlays

### Decisiones técnicas
- `useState` para snake, food, score, highScore, speed y gameState
- `useEffect` para el game loop (`setInterval`), el listener de teclado y la sincronización de refs
- `useRef` para evitar stale closures dentro del intervalo (snake, food, score, speed, dirección)
- Lógica del juego extraída a funciones puras en `gameUtils.js` (`generateFood`, `checkWallCollision`, `checkSelfCollision`, `calcSpeed`)
- Constantes globales centralizadas en `constants.js`

---

## Instalación y ejecución

**Requisitos:** Node.js 18 o superior.

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd lab6-snake/snake-game

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abrir el navegador en `http://localhost:5173`.

Para generar una build de producción:

```bash
npm run build
```

---

## Controles

| Tecla | Acción |
|---|---|
| `↑` / `W` | Mover arriba |
| `↓` / `S` | Mover abajo |
| `←` / `A` | Mover izquierda |
| `→` / `D` | Mover derecha |

---

## Autor

Diego Andre Calderon Salazar 241263 — Universidad del Valle de Guatemala
