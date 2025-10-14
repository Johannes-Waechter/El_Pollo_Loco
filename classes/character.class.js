class Character extends MovableObjekt {

    height = 300;
    width = 125;
    y = 130; // Bodenhöhe
    x = 100;

    speedY = 0; // vertikale Geschwindigkeit
    acceleration = 1; // Gravitation

    world;

    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    images_jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.applyGravity();
        this.animate();
    }

    // Prüft, ob der Charakter in der Luft ist
    isaboveGround() {
        return this.y < 130; // Bodenhöhe = 130
    }

   
    // Animationen & Bewegung
    animate() {
        setInterval(() => {
  if (this.world.keyboard.up) {
            this.jump();
        }
            // Bewegung
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.moveRight()
            }
            if (this.world.keyboard.left && this.x > 100) {
               this.moveLeft(10);
               this.otherDirection = true;
            }

            // Animation
            if (this.isaboveGround()) {
                this.playAnimation(this.images_jumping);
            } else if (this.world.keyboard.left || this.world.keyboard.right) {
                this.playAnimation(this.images_walking);
            } else {
                this.img = this.imageCache[this.images_walking[0]]; // Idle
            }

            // Kamera folgen
            this.world.camera_x = -this.x + 100;

        }, 1000 / 10);
    }

    // Animation abspielen
    playAnimation(imagesArray) {
        if (!imagesArray) imagesArray = this.images_walking;
        this.currentImage = (this.currentImage + 1) % imagesArray.length;
        this.img = this.imageCache[imagesArray[this.currentImage]];
    }
}
