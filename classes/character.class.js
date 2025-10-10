class Character extends MovableObjekt {

  height = 300;
  width = 125;
  y = 140;

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
      let i = this.currentImage % this.images_walking.length;
      let path = this.images_walking[i];
      this.img = this.imageCache[path]
      this.currentImage++;
    }, 100);
  }

  jump() {

  }
}