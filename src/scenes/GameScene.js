export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Player setup
    this.player = this.add.rectangle(400, 300, 32, 32, 0x00ffff);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.direction = { up: false, down: false, left: false, right: false };

    this.addMobileControls();
  }

  update() {
    const speed = 200;
    const body = this.player.body;

    body.setVelocity(0);

    if (this.cursors.left.isDown || this.direction.left) {
      body.setVelocityX(-speed);
    }
    if (this.cursors.right.isDown || this.direction.right) {
      body.setVelocityX(speed);
    }
    if (this.cursors.up.isDown || this.direction.up) {
      body.setVelocityY(-speed);
    }
    if (this.cursors.down.isDown || this.direction.down) {
      body.setVelocityY(speed);
    }
  }

  addMobileControls() {
    const directions = ['left', 'right', 'up', 'down'];
    const positions = {
      left: { x: 60, y: 540 },
      right: { x: 140, y: 540 },
      up: { x: 100, y: 500 },
      down: { x: 100, y: 580 }
    };

    directions.forEach(dir => {
      const btn = this.add.text(positions[dir].x, positions[dir].y, dir[0].toUpperCase(), {
        font: '20px Arial',
        fill: '#ffffff',
        backgroundColor: '#333'
      }).setPadding(10).setInteractive().setScrollFactor(0);

      btn.on('pointerdown', () => this.direction[dir] = true);
      btn.on('pointerup', () => this.direction[dir] = false);
      btn.on('pointerout', () => this.direction[dir] = false);
    });
  }
}
