import Phaser from 'phaser'

import PreloadScene from './scenes/PreloadScene'
import BootScene from './scenes/BootScene'
import MainMenuScene from './scenes/MainMenu' // ✅ FIXED
import OverworldScene from './scenes/OverworldScene'
import BattleScene from './scenes/BattleScene'
import FusionScene from './scenes/FusionScene'
import GameScene from './scenes/GameScene'

const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 180,
  zoom: 4,
  pixelArt: true,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    PreloadScene,
    BootScene,
    MainMenuScene,    // ✅ Included properly now
    OverworldScene,
    BattleScene,
    FusionScene,
    GameScene
  ]
}

export default new Phaser.Game(config)
