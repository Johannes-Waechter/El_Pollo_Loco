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
        new backgroundObject('img/5_background/layers/air.png',0),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png',0),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png',0),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png',0),
         new backgroundObject('img/5_background/layers/air.png',720),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png',720),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png',720),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png',720),
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();


    }


    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

          this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    addToMap(mo) {
    if (mo.otherDirection) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}
