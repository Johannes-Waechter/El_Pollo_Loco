class StatusBar extends drawableObject {
    percentage = 100;
    bottleStatus = 100;

    coinStatus = 100;

    life_images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    bottle_images = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

      coins_images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    constructor() {
        super();
        // Lade alle Bilder
        this.loadImages(this.life_images);
        this.loadImages(this.bottle_images);
        this.loadImages(this.coins_images);

        // Initialwerte
        this.setPercentage(100);
        this.setBottleStatus(100);
        this.setCoinStatus(100)

        // Position und Größe
        this.x = 10;
        this.y = 0;
        this.width = 180;
        this.height = 50;
    }

    // Leben aktualisieren
    setPercentage(percentage) {
        this.percentage = percentage;
        const path = this.life_images[this.resolveImageIndex()];
        this.lifeImg = this.imageCache[path]; // eigenes Bild für Leben
    }

    // Flaschenstatus aktualisieren
    setBottleStatus(status) {
        this.bottleStatus = status;
        const path = this.bottle_images[this.resolveImageIndexBottles()];
        this.bottleImg = this.imageCache[path]; // eigenes Bild für Flaschen
    }

     setCoinStatus(status) {
        this.coinStatus = status;
        const path = this.coins_images[this.resolveImageIndexCoins()];
        this.coinsImg = this.imageCache[path]; // eigenes Bild für Flaschen
    }

    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }

    resolveImageIndexBottles() {
        if (this.bottleStatus >= 100) return 5;
        if (this.bottleStatus >= 80) return 4;
        if (this.bottleStatus >= 60) return 3;
        if (this.bottleStatus >= 40) return 2;
        if (this.bottleStatus >= 20) return 1;
        return 0;
    }

     resolveImageIndexCoins() {
        if (this.coinStatus >= 100) return 5;
        if (this.coinStatus >= 80) return 4;
        if (this.coinStatus >= 60) return 3;
        if (this.coinStatus >= 40) return 2;
        if (this.coinStatus >= 20) return 1;
        return 0;
    }

    // Beide Balken zeichnen
    draw(ctx) {
        if (this.lifeImg) ctx.drawImage(this.lifeImg, this.x, this.y, this.width, this.height);
        if (this.bottleImg) ctx.drawImage(this.bottleImg, this.x, this.y + 40, this.width, this.height); // Flaschenbalken darunter
        if (this.coinsImg) ctx.drawImage(this.coinsImg, this.x, this.y + 75, this.width, this.height); // coins darunter
    }
}
