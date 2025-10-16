class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    coins = [];
    isMuted = false
    audio_background = new Audio('audio/95. Mexican.mp3');
    audio_coin = new Audio('audio/coin.mp3');
    isGameOver = false;

    lastThrowPressed = false;   
    collectedBottles = 0;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        window.world = this; // global für onclick

        this.initThrowableObjects();
        this.initCoins();

        this.setWorld();
        this.draw();
        this.run();
        this.initMuteButton();

        this.audio_background.loop = true;
        this.audio_background.volume = 0.1;

        if (!this.isMuted) {
            this.audio_background.play();
        }
    }

    initMuteButton() {
        const muteButton = document.getElementById('muteButton');
        muteButton.addEventListener('click', () => {
            this.toggleMute(muteButton);
        });
    }

    toggleMute(button) {
        this.isMuted = !this.isMuted;

        // Alle Audio-Objekte stummschalten
        this.audio_background.muted = this.isMuted;
        if (this.character && this.character.audio_jump) {
            this.character.audio_jump.muted = this.isMuted;
        }

        if (this.isMuted) {
            this.audio_background.pause();
        } else {
            this.audio_background.play();
        }

        button.textContent = this.isMuted ? '🔇' : '🔊';
    }



    
    setWorld() {
        this.character.world = this;
    }

    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    // Flaschen zufällig erstellen
    initThrowableObjects() {
        for (let i = 0; i < 10; i++) {
            let x = 150 + Math.random() * 2350;
            let y = 330 + Math.random() * 30;
            this.throwableObjects.push(new ThrowableObject(x, y));
        }
    }

    // Coins an festen Positionen platzieren
    initCoins() {
        const positions = [
            { x: 200, y: 300 }, { x: 400, y: 300 }, { x: 600, y: 300 }, { x: 800, y: 300 }, { x: 1000, y: 300 },
            { x: 1200, y: 300 }, { x: 1400, y: 300 }, { x: 1600, y: 300 }, { x: 1800, y: 300 }, { x: 2000, y: 300 },
            { x: 2200, y: 300 }, { x: 2400, y: 300 }, { x: 2600, y: 300 }, { x: 2800, y: 300 }, { x: 3000, y: 300 },
            { x: 3200, y: 300 }, { x: 3400, y: 300 }, { x: 3600, y: 300 }, { x: 3800, y: 300 }, { x: 4000, y: 300 },
        ];
        positions.forEach(pos => {
            this.coins.push(new Coin(pos.x, pos.y));
        });
    }

    run() {
        setInterval(() => {
            this.checkCoinCollection();
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkCollectibleObjects(); // Flaschen einsammeln
        }, 200);
    }

    // Coins einsammeln und StatusBar aktualisieren
   checkCoinCollection() {
    this.coins.forEach(coin => {
        if (!coin.isCollected && this.character.isColliding(coin)) {
            coin.isCollected = true;
            this.statusBar.setCoinStatus(this.getCollectedCoinsCount() * 10); // z.B. 10% pro Coin
            this.audio_coin.play();
        }
    });
}

    getCollectedCoinsCount() {
        return this.coins.filter(c => c.isCollected).length;
    }

    // Flaschen werfen mit Taste "D"
lastThrowPressed = false;

checkThrowableObjects() {
    if (this.keyboard.d && !this.lastThrowPressed && this.collectedBottles > 0) {
        const bottle = this.throwableObjects.find(b => b.isCollected && !b.isThrown && !b.isUsed);
        if (bottle) {
            bottle.throw(this.character.x, this.character.y, this.character.otherDirection ? -1 : 1);
            bottle.isCollected = false;
            bottle.isUsed = true;
            this.collectedBottles--;
            this.statusBar.setBottleStatus(this.collectedBottles * 10); // StatusBar MINUS rechnen!
        }
        this.lastThrowPressed = true;
    }
    if (!this.keyboard.d) {
        this.lastThrowPressed = false;
    }
}

    getCollectedBottleCount() {
        return this.throwableObjects.filter(b => b.isCollected).length;
    }

  checkCollectibleObjects() {
    this.throwableObjects.forEach(bottle => {
        if (!bottle.isCollected && !bottle.isUsed && this.character.isColliding(bottle)) {
            bottle.isCollected = true;
            this.collectedBottles++;
            this.statusBar.setBottleStatus(this.collectedBottles * 10);
        }
    });
}

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // Hintergrund
        this.addObjectsToMap(this.level.backgroundObjects);

        // Coins
        this.addObjectsToMap(this.coins.filter(c => !c.isCollected));

        // Fixed HUD
        this.ctx.translate(-this.camera_x, 0);
        this.statusBar.draw(this.ctx);
        this.ctx.translate(this.camera_x, 0);

        // Flaschen
        this.addObjectsToMap(this.throwableObjects.filter(b => !b.isCollected || b.isThrown));

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // Game Over Bild nur zeichnen, Button wird in Character.gameOver() angezeigt
        if (this.character.isGameOver) {
            this.ctx.drawImage(
                this.character.gameOverImg,
                this.canvas.width / 2 - 300,
                100,
                600,
                200
            );
        }

        requestAnimationFrame(() => this.draw());
    }


    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageback(mo);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageback(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}
