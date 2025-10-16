class chicken extends MovableObjekt {
  height = 80;
  width = 70;
  y = 350;

  images_walking = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',

  ];

  images_dead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 200 + Math.random() * (3000 - 200);
    this.loadImages(this.images_walking)
    this.animateImg();
    this.speed = 0.2 + Math.random() * 0.3; // 0.2–0.5 px pro Frame
    this.animate();
    // this.loadImages(this.images_dead);


  }


  animateImg() {
    setInterval(() => {
      let i = this.currentImage % this.images_walking.length;
      let path = this.images_walking[i];
      this.img = this.imageCache[path]
      this.currentImage++;
    }, 100);
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
      if (this.x + this.width < 0) {
        this.x = 720 + Math.random() * 200;
      }
    }, 1000 / 60);
  }

}