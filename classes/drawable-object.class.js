class drawableObject {
  loadImage(path) {
    this.img = new Image()
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }




}