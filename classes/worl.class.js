class World {

    character = new Character();
    clouds = new clouds();
    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ];
    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.draw();

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.widht, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.widht);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.height, enemy.widht);

        });
        this.ctx.drawImage(this.clouds.img, this.clouds.x, this.clouds.y, this.clouds.height, this.clouds.widht)

        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }
}