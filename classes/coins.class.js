class Coin extends MovableObjekt {
    width = 50;
    height = 50;
    isCollected = false;

    coinImage = 'img/7_statusbars/3_icons/icon_coin.png';

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.coinImage);
    }
}
