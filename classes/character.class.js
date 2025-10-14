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
 images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    images_idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    images_longIdle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_longIdle);
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
  if (this.world.keyboard.space) {
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
            } 
            else if (this.world.keyboard.left || this.world.keyboard.right) {
                this.playAnimation(this.images_walking);
            } 
            else if (this.hurt()==true) {
              this.playAnimation(this.images_hurt);
            }
             else if (this.isdead()==true) {
              this.playAnimation(this.images_dead);
              this.img = this.imageCache['img/You won, you lost/You lost.png'];

              // this.world.gameOver();
            }
            else {
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

 

    // gameOver(){
    //     document.getElementById('game-over').classList.remove('d-none');
    //     document.getElementById('restart-button').classList.remove('d-none');
    // }

}