class Scene2 extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.image("ruler", "./img/ruler.png");
        this.load.image("progressbar", "./img/progressbar.png");
        this.load.image("ball", "./img/ball.png");
        this.load.image("ballObj", "./img/ballObj.png");
        this.load.image("ballObj2", "./img/ballObj2.png");
    }

    create() {
        this.add.image(20, 300, 'ruler').setOrigin(0, 0);
        this.add.image(400, 50, 'progressbar');
        this.balls = this.physics.add.group({
            key: 'ball',
            repeat: 4,
            setXY: {
                x: 132,
                y: 50,
                stepX: 30
            }
        });
        this.ballObj = new Ball(this, 5, 'ballObj');
        this.input.on("gameobjectdown", this.onStart, this);
        this.input.on("gameobjectup", this.onStop, this);
        this.input.on("drag", this.onDoDrag, this);

    }

    update() {
        var list = this.balls.getChildren();
    }

    onDoDrag(pointer, gameObject, dragX, dragY) {

        if (dragX < 19) {
            gameObject.x = 19;
        } else if (dragX > 681) {
            gameObject.x = 681;
        } else {
            gameObject.x = dragX;
        }

        if (gameObject.ballTouch instanceof Object) {
            gameObject.ballTouch.x = gameObject.x;
            gameObject.ballTouch.y = 170;
        }

        gameObject.y = 170;
    }

    onStart(pointer, gameObject) {
        gameObject.touchBall(this);
    }

    onStop(pointer, gameObject) {
        gameObject.destroyBallTouch();
        var num = Math.floor(gameObject.x / dis);
        console.log(num);
        if (num < 10) {
            this.add.text(45 + num * 33, 335, num, {
                font: "25px Arial",
                fill: "#000"
            });
        } else {
            this.add.text(40 + num * 33, 335, num, {
                font: "25px Arial",
                fill: "#000"
            });
        }
    }
}