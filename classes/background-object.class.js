class backgroundObject extends MovableObjekt{


    constructor(imagePath){
        super().loadImage(imagePath);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}