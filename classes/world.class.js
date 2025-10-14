class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
this.initThrowableObjects();

        this.setWorld();
        this.draw();
        this.run();


    }


    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    initThrowableObjects() {
    for (let i = 0; i < 10; i++) {
        let x = 150 + Math.random() * 2350;
        let y = 330 + Math.random() * 30;
        this.throwableObjects.push(new ThrowableObject(x, y));
    }
}
    run() {
        setInterval(() => {
          this.checkCollisions()
          this.checkThrowableObjects()   
        }, 200);
    }

    checkThrowableObjects() {
        if( this.keyboard.d) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bottle.speedX = 20;
             this.throwableObjects.push(bottle);
        }
    }

    checkCollisions(){
          this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                   this.character.hit();
                   console.log(this.character.energy);
                     this.statusBar.setPercentage(this.character.energy);   
                }
            });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
this.addObjectsToMap(this.level.backgroundObjects);

         this.ctx.translate(-this.camera_x, 0);
        //  space for fixed objects 
        this.addToMap(this.statusBar)
         this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap  (this.throwableObjects);
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
