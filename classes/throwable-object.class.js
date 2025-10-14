class ThrowableObject extends MovableObjekt {

    image_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    
    constructor() {
        super();
        this.width = 50;
        this.height = 50;
        this.x = 100;
        this.y = 100;
        this.img = this.imageCache['img/throwable-object.png'];
    }

    throw() {
        this.speedX = 10;
    }
}
