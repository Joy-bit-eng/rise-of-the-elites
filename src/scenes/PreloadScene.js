export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Background color
    this.cameras.main.setBackgroundColor('#000');

    // Show splash text
    this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      'Rise of the Elites!',
      {
        font: '28px monospace',
        fill: '#ffffff'
      }
    ).setOrigin(0.5);

    // Example preload (add real assets later)
    // this.load.image('player', 'assets/player.png');
  }

  create() {
    // After 2 seconds, start the main game
    this.time.delayedCall(2000, () => {
      this.scene.start('GameScene');
    });
  }
}
