// src/main.js
import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1d1d1d',
  parent: 'game',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [PreloadScene, GameScene]
};

new Phaser.Game(config);
// Splash screen
const splash = document.createElement("div");
splash.style.position = "fixed";
splash.style.top = "0";
splash.style.left = "0";
splash.style.width = "100%";
splash.style.height = "100%";
splash.style.backgroundColor = "black";
splash.style.color = "white";
splash.style.display = "flex";
splash.style.justifyContent = "center";
splash.style.alignItems = "center";
splash.style.fontSize = "24px";
splash.style.fontFamily = "monospace";
splash.innerText = "Rise of the Elites!";
document.body.appendChild(splash);

// Delay before starting the game
setTimeout(() => {
  splash.remove();
  startGame();
}, 2000);

// Main game function
function startGame() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  // Player setup
  const player = {
    x: 100,
    y: 100,
    size: 30,
    color: "cyan",
    speed: 5,
  };

  // Movement flags
  let moveLeft = false;
  let moveRight = false;
  let moveUp = false;
  let moveDown = false;

  // Handle key presses (for desktop)
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") moveLeft = true;
    if (e.key === "ArrowRight") moveRight = true;
    if (e.key === "ArrowUp") moveUp = true;
    if (e.key === "ArrowDown") moveDown = true;
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") moveLeft = false;
    if (e.key === "ArrowRight") moveRight = false;
    if (e.key === "ArrowUp") moveUp = false;
    if (e.key === "ArrowDown") moveDown = false;
  });

  // Mobile touch buttons (optional)
  createTouchControls();

  // Game loop
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player
    if (moveLeft) player.x -= player.speed;
    if (moveRight) player.x += player.speed;
    if (moveUp) player.y -= player.speed;
    if (moveDown) player.y += player.speed;

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}

// Create on-screen controls for mobile
function createTouchControls() {
  const buttons = [
    { id: "left", label: "←", on: () => (moveLeft = true), off: () => (moveLeft = false) },
    { id: "right", label: "→", on: () => (moveRight = true), off: () => (moveRight = false) },
    { id: "up", label: "↑", on: () => (moveUp = true), off: () => (moveUp = false) },
    { id: "down", label: "↓", on: () => (moveDown = true), off: () => (moveDown = false) },
  ];

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.display = "flex";
  container.style.gap = "10px";
  document.body.appendChild(container);

  buttons.forEach((btn) => {
    const el = document.createElement("button");
    el.id = btn.id;
    el.textContent = btn.label;
    el.style.fontSize = "20px";
    el.style.padding = "10px";
    el.style.borderRadius = "10px";
    el.style.backgroundColor = "#333";
    el.style.color = "white";
    el.style.border = "none";

    el.addEventListener("touchstart", (e) => {
      e.preventDefault();
      btn.on();
    });
    el.addEventListener("touchend", (e) => {
      e.preventDefault();
      btn.off();
    });

    container.appendChild(el);
  });
}
