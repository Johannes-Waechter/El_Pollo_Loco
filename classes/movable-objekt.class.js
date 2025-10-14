class MovableObjekt extends drawableObject {

  otherDirection = false;
  speedY = 0;
  acceleration = 2;
energy = 100;
lastHit = 0;
  applyGravity() {
    setInterval(() => {
      if (this.isaboveGround() || this.speedY > 0) {
        this.y -= this.speedY; // nach oben bewegen
        this.speedY -= this.acceleration; // Schwerkraft
        if (this.y > 130) {
          this.y = 130;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  isaboveGround() {
    return this.y < 130; // Bodenhöhe = 130
  }

  jump() {
    if (!this.isaboveGround()) {
      this.speedY = 18; // Sprungkraft
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
    else{
      this.lastHit = new Date().getTime();
    }
  }
  
  hurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
    timepassed = timepassed / 1000;
    return timepassed < 1; // wenn kleiner als 5 Sekunden

  }

  isdead() {
    if (this.energy == 0) {
      return true;
    }
}
  moveRight() {
    this.x += 10;
    this.otherDirection = false;
  }

  moveLeft(speed = 10) { // default 10 px, falls kein Wert übergeben
    this.x -= speed;

  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}

