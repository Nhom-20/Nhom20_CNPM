class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, num, obj) {
        super(scene, 100, 170, obj);
        this.create();
        this.setNum(num);
        scene.add.existing(this).setOrigin(0, 0);
        scene.physics.add.existing(this);
        this.setInteractive();
        this.setDepth(1);
        scene.input.setDraggable(this);
    }

    create() {
        let num = 1;
        var speed = 5;
        var ballTouch;
    }

    offMove() {
        this.disableInteractive();
    }

    onMove() {
        this.setInteractive();
    }

    touchBall(scene) {
        if (this.ballTouch instanceof Object) {
            this.destroyBallTouch();
        }

        this.ballTouch = scene.add.image(this.x, this.y, 'ballObj2').setOrigin(0, 0);
    }

    destroyBallTouch() {
        this.ballTouch.destroy();
    }

    setNum(num) {
        this.num = num;
    }

    getNum() {
        return this.num;
    }

}