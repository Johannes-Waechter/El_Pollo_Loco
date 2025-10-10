class clouds extends MovableObjekt {
    y = 20;
    width = 500;
    height = 250

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.3; // 0.2–0.5 px pro Frame
        this.animate();
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