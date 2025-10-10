class World {

    character = new Character();
    clouds = [
        new clouds('img/5_background/layers/4_clouds/1.png'),
        new clouds('img/5_background/layers/4_clouds/2.png'),
    
    ];
    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ];
    backgroundObjects = [
        new backgroundObject('img/5_background/layers/air.png'),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png'),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png'),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png'),
    ];
    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.draw();

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects); // zuerst Hintergrund
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);               // Charakter ganz oben

        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}
