class Character extends MovableObjekt {

  height = 300;
  width = 125;
  y = 140;

  world;

  images_walking = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.images_walking)
    this.animate();
  }

 animate() {
    setInterval(() => {
      

        if (this.world.keyboard.right) {
            this.x += 30; // Bewegung nach rechts
            this.walkAnimation();
            this.otherDirection = false;
        }
        if (this.world.keyboard.left) {
            this.x -= 30; // Bewegung nach links
            this.walkAnimation();
            this.otherDirection = true;
        }
        this.world.camera_x = -this.x;
    }, 100);
}

  walkAnimation() {
    this.currentImage = (this.currentImage + 1) % this.images_walking.length;
    this.img = this.imageCache[this.images_walking[this.currentImage]];
}

  jump() {

  }
}