class ThrowableObject extends MovableObjekt {
    width = 75;
    height = 75;
    isCollected = false;
    isThrown = false;
    speedX = 0;
    speedY = 0;
    gravity = 0.5;
    rotationIndex = 0;

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

        // zufälliges Bodenbild
        const randomIndex = Math.floor(Math.random() * this.image_bottle.length);
        this.img = this.imageCache[this.image_bottle[randomIndex]];
    }

    throw(startX, startY, direction = 1) {
        if (this.isCollected && !this.isThrown) {
            this.isThrown = true;
            this.isCollected = false;
            this.x = startX;
            this.y = startY;
            this.speedX = 10 * direction;
            this.speedY = 10; 
            this.animateThrow();
        }
    }

    animateThrow() {
        const interval = setInterval(() => {
            this.x += this.speedX;
            this.y -= this.speedY;
            this.speedY -= this.gravity;

            // Rotation
            this.rotationIndex = (this.rotationIndex + 1) % this.image_rotation.length;
            this.img = this.imageCache[this.image_rotation[this.rotationIndex]];

            // Bodencheck
             if (this.y >= 350 ) {
                this.y = 350;
                this.speedX = 0;
                this.speedY = 0;
                this.isThrown = false;

                // Bodenbild wiederherstellen
                const randomIndex = Math.floor(Math.random() * this.image_bottle.length);
                this.img = this.imageCache[this.image_bottle[randomIndex]];

                clearInterval(interval);
            }
        }, 1000 / 60);
    }
}
