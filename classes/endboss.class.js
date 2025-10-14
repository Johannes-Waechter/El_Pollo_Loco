class endboss extends MovableObjekt {

  height = 300;
  width = 200;
  x = 3000;
  y = 150;
  
    images_walking = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png', 
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png', 
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',   


  ];
constructor() {
  super().loadImage(this.images_walking[0]); // nur EIN Bild laden
  this.loadImages(this.images_walking);       // dann ALLE Bilder ins Cache laden
  this.x = 1750;
  this.animate()
  
}

animate() {
  setInterval(() => {
    this.playAnimation(this.images_walking);
  }, 200);
}

}