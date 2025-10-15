class Character extends MovableObjekt {
    height = 300;
    width = 125;
    y = 130; // Bodenhöhe
    x = 100;

    speedY = 0;
    acceleration = 1;

    deathFrameIndex = 0;
    deathPlaying = false;
    deathTimer = 0;

    idleTimer = 0;
    isGameOver = false;
    gameOverImg = new Image();

    world;

    audio_jump = new Audio('audio/825575_9415332-lq.mp3');

    game_over_audio = new Audio('audio/game-over.mp3')
    walk_audio = new Audio('audio/walk.mp3')

    hurt_audio = new Audio('audio/hurt.mp3')

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

        this.gameOverImg.src = 'img/You won, you lost/Game Over.png';

        this.applyGravity();
        this.animate();
    }

    isaboveGround() {
        return this.y < 130;
    }
    isdead() {
        return this.energy <= 0; // nur true, wenn der Charakter wirklich tot ist
    }
    animate() {
        setInterval(() => {
            // --- Tod ---
            if (this.isdead()) {
                if (!this.deathPlaying) {
                    this.deathPlaying = true;
                    this.deathFrameIndex = 0;
                    this.deathTimer = 0;
                }

                this.deathTimer += 100;
                if (this.deathTimer >= 100) {
                    this.deathTimer = 0;
                    if (this.deathFrameIndex < this.images_dead.length) {
                        this.img = this.imageCache[this.images_dead[this.deathFrameIndex]];
                        this.deathFrameIndex++;
                    }
                }

                // Game Over einmalig auslösen
                if (this.deathFrameIndex >= this.images_dead.length && !this.isGameOver) {
                    this.gameOver();
                    this.game_over_audio.currentTime = 0;
                    this.game_over_audio.play();
                    moving = true;

                }

                return; // keine weiteren Animationen nach Tod
            }

            // --- Bewegung & Sprung ---
            let moving = false;
            if (this.world.keyboard.space) {
                this.jump();
                this.audio_jump.currentTime = 0;
                this.audio_jump.play();
                moving = true;
            }

            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walk_audio.currentTime = 0;
                this.walk_audio.play();
                moving = true;
            }


            if (this.world.keyboard.left && this.x > 100) {
                this.moveLeft(10);
                this.otherDirection = true;
                this.walk_audio.currentTime = 0;
                this.walk_audio.play();
                moving = true;
            }

            // --- Animationen ---
            if (this.isaboveGround()) {
                this.playAnimation(this.images_jumping);
                this.idleTimer = 0;
            }

            else if (this.hurt()) {
                this.playAnimation(this.images_hurt);
                this.hurt_audio.currentTime = 0;
                this.hurt_audio.play();
                this.idleTimer = 0;


            }
            else if (moving) {
                this.playAnimation(this.images_walking);
                this.idleTimer = 0;
            }
            else {
                this.idleTimer += 100;
                if (this.idleTimer >= 2000) { this.playAnimation(this.images_longIdle); }
                else { this.playAnimation(this.images_idle); }
            }

            this.world.camera_x = -this.x + 100;
        }, 100);
    }



playAnimation(imagesArray) {
    if (!imagesArray) imagesArray = this.images_walking;
    this.currentImage = (this.currentImage + 1) % imagesArray.length;
    this.img = this.imageCache[imagesArray[this.currentImage]];
}

gameOver() {
    if (this.isGameOver) return; // nur einmal
    this.isGameOver = true;

    // Restart Button nur einmal sichtbar machen
    const restartBtn = document.getElementById('restart-button');
    restartBtn.classList.remove('d-none');
}


}
