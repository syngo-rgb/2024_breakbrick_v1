export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: "MainScene" });
    }
  
    preload() {
    
    }
  
    create() {
      let halfwidth = this.game.config.width / 2;
      let halfheight = this.game.config.height / 2;

      // Crear la pala

      this.paddle = this.add.rectangle(400, 550, 50, 200, 0x3aaddc).setDisplaySize(100, 20);
      this.physics.add.existing(this.paddle);
      let paddleBody = this.paddle.body; 
      paddleBody.setImmovable(true);
  
      // Crear la pelota
      this.circle = this.add.circle(400, 300, 8, 0xdadc3a, 1.0).setDisplaySize(20, 20);
      this.physics.add.existing(this.circle);
      let circleBody = this.circle.body;
    
      circleBody.setCollideWorldBounds(true);
      circleBody.setBounce(1, 1);
      circleBody.setVelocity(150, -150); // Velocidad inicial
  
      // Colisión entre la pelota y la pala
      this.physics.add.collider(this.circle, this.paddle, this.hitPaddle, null, this);
    
      // Crear un obstáculo
      this.brick = this.add.rectangle(300, 250, halfwidth, halfheight, 0xdc5a3a).setDisplaySize(100, 50);
      this.physics.add.existing(this.brick);
      let brickBody = this.brick.body;
      brickBody.setImmovable(true);
  
      // Colisión entre la pelota y el obstáculo
      this.physics.add.collider(this.circle, this.brick, this.hitBrick, null, this);
  
      // Seguir el puntero del mouse para mover la pala
      this.input.on('pointermove', (pointer) => {
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 50, 750); // Limita el movimiento de la pala
      });
    }
  
    update() {
     
    }
  
    hitPaddle(circle, paddle) {
      // Lógica para cuando la pelota golpea la pala
      let diff = 0;
  
      if (circle.x < paddle.x) {
        // Pelota a la izquierda de la pala
        diff = paddle.x - circle.x;
        circle.body.setVelocityX(-10 * diff);
      } else if (circle.x > paddle.x) {
        // Pelota a la derecha de la pala
        diff = circle.x - paddle.x;
        circle.body.setVelocityX(10 * diff);
      } else {
        // Pelota justo en el centro
        circle.body.setVelocityX(2 + Math.random() * 8);
      }
    }
  
    hitBrick(circle, brick) {
      // Destruir el obstáculo cuando la pelota lo golpee
      brick.destroy();
    }
  }
  
  