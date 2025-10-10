class MovableObjekt {
  x = 120;
  y = 250;
  img;
  height = 200;
  width = 100;
  imageCache = {};
   currentImage = 0;


  loadImage(path) {
    this.img = new Image()
    this.img.src = path;

  }

loadImages(arr) {
  arr.forEach((path) => {
    const img = new Image();
    img.src = path;
    this.imageCache[path] = img; // <== Kleines i!
  });
}


  moveRight() {
    console.log('moving right');
  }

  moveLeft(speed) {
    this.x -= speed;
  }
}