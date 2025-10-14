class ThrowableObject extends MovableObjekt {
    width = 75;
    height = 75;
    isCollected = false; // wurde eingesammelt
    speedX = 0;
    speedY = 0;
    gravity = 0.5;

    image_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    image_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.image_rotation);
    this.loadImages(this.image_bottle);
    this.throw();

    // zufälliges Bodenbild auswählen
    const randomIndex = Math.floor(Math.random() * this.image_bottle.length);
    this.img = this.imageCache[this.image_bottle[randomIndex]];
  }
    throw() {
        this.speedY = 15; // Anfangsgeschwindigkeit nach oben
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
} 

}