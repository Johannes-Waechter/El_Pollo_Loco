class backgroundObject extends MovableObjekt{


    constructor(imagePath, x = 0) {
        super().loadImage(imagePath);
        this.x = x;     // <- hier den Wert setzen
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}
