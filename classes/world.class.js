class World {

    character = new Character();
    level = level1;
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
        this.checkCollisions();


    }


    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                   this.character.hit();
                   console.log(this.character.energy);
                }
            });
        }, 1000);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx); 
        mo.drawFrame(this.ctx); 
        if (mo.otherDirection) {
            this.flipImageback(mo);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
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
