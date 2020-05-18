class listTrain extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, obj) {
        super(scene, x, y, obj);
        scene.add.existing(this).setOrigin(0, 0);
        scene.physics.add.existing(this);
        this.createList(scene);
        this.setScene(scene);
    }

    create() {
        var train;
    }
    createList(scene) {
        this.train = scene.add.group();
    }

    setScene(scene) {
        this.scene = scene;
    }

    sort() {
        var list = this.train.getChildren();

        for (var i = 0; i < list.length; i++) {
            list[i].x = i * 123 + 30 * (i + 1);
            list[i].y = this.y - 59;
            list[i].onMove();
        }
    }


    minTrain() {
        var listTrains = this.train.getChildren();
        if (listTrains.length != 0) {
            var min = listTrains[0].getNum();
            for (var i = 1; i < listTrains.length; i++) {
                if (listTrains[i].getNum() < min) min = listTrains[i].getNum();
            }
            return min;
        }
    }

    addTrain(obj) {
        this.train.add(obj);
        this.sort();
    }

    removeTrain(obj) {
        this.train.remove(obj);


    }

    reset() {
        this.train.clear(true, true);
    }

}