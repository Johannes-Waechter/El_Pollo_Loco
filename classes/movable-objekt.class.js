class MovableObjekt {
  x = 120;
  y = 300;
  img;
  height = 200;
  width = 100;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;

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
  loadImage(path) {
    this.img = new Image()
    this.img.src = path;

  }

  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof chicken) {
    ctx.beginPath()
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }}
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

