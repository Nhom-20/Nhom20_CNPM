class Scene3 extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload() {

        this.load.image("road", "./img/TrainRoad.png");
        this.load.image("list", "./img/TrainList.png");
        this.load.image("car2", "./img/Train2.png");
        this.load.image("car4", "./img/Train4.png");
        this.load.image("car6", "./img/Train6.png");
        this.load.image("car7", "./img/Train7.png");
        this.load.image("car8", "./img/Train8.png");
        this.load.image("car12", "./img/Train12.png");
        this.load.image("car14", "./img/Train14.png");
        this.load.image("car16", "./img/Train16.png");
        this.load.image("car17", "./img/Train17.png");
        this.load.image("car18", "./img/Train18.png");
        this.load.image("car19", "./img/Train19.png");
        this.load.image("car20", "./img/Head20.png");
        this.load.image("zone", "./img/zone.png");
        this.load.image("zone1", "./img/zone1.png");
        this.load.image("cir1", "./img/circle_head.png");
        this.load.image("cir2", "./img/circle_car.png");
        this.load.image("ball", "./img/ball.png");
        this.load.text("level", "./JS/level3.json");
        this.load.image("progressbar", "./img/progressbar.png");
        this.load.audio("click", "./audio/click.mp3");
        this.load.audio("wrong", "./audio/wrong.mp3");
    }

    create() {
        this.add.image(400, 50, 'progressbar');
        this.trainRoad3 = new trainRoad3(this, 0, 350, "road");
        this.groupTrain3 = new listTrain3(this, 0, 170, "list");

        this.level = 1;
        this.data = JSON.parse(this.cache.text.get("level")).level;
        this.text = new Text(this, 100, 100, "Put the train cars from the greatest to the smallest");
        this.setData(this.data[this.level - 1]);
        this.input.on("gameobjectup", this.onStop, this);
        this.input.on("drag", this.onDoDrag, this);

        this.zones = this.physics.add.group({
            key: 'zone',
            repeat: 4,
            setXY: {
                x: 210,
                y: 375,
                stepX: 107
            }
        });

        this.zoneList = this.zones.getChildren();
        this.zoneSetAlpha();

        this.zoneDrag = this.add.image(205, 372, "zone1");
        this.zoneDrag.setVisible(false);

        this.balls = this.physics.add.group({
            key: 'ball',
            repeat: 3,
            setXY: {
                x: 132,
                y: 50,
                stepX: 30
            }
        });

    }


    update() {

        var list = this.balls.getChildren();
        if (this.trainRoad3.check()) {
            if (this.level == 4) {
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        window.location = "finish.html";
                    },
                    loop: false,
                });
            } else {
                list[list.length - this.level].x += 450;
                this.level++;
                this.reset();
                this.setData(this.data[this.level - 1]);
            }

        }
    }

    onDoDrag(pointer, gameObject, dragX, dragY) {
        console.log(pointer.x + " " + pointer.y);
        if (dragX + gameObject.width > config.width) {
            gameObject.y = dragY;
        } else if (dragX < 0) {
            gameObject.x = 0;
        } else {
            gameObject.x = dragX;
        }

        if (dragY < 0) {
            gameObject.y = 0;
        } else if (dragY + gameObject.height > config.height) {
            gameObject.y = config.height - gameObject.height;
        } else {
            gameObject.y = dragY;
        }

        if (gameObject.x > this.trainRoad3.widthRoad() && gameObject.x < (this.trainRoad3.widthRoad() + 107) &&
            gameObject.y > 210 && gameObject.y < 320
        ) {
            this.zoneDrag.setVisible(true);
        } else {
            this.zoneDrag.setVisible(false);
        }

    }

    onStop(pointer, gameObject) {
        this.sound.play('click');
        if (gameObject.x > this.trainRoad3.widthRoad() && gameObject.x < (this.trainRoad3.widthRoad() + 107) &&
            gameObject.y > 210 && gameObject.y < 320
        ) {
            this.zoneDrag.setVisible(false);
            this.groupTrain3.removeTrain(gameObject);
            this.trainRoad3.addTrain(gameObject);
            if (this.trainRoad3.minTrain() < this.groupTrain3.maxTrain()) {
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.trainRoad3.removeTrain(gameObject);
                        this.groupTrain3.addTrain(gameObject);
                    },
                    loop: false,
                });
            } else {
                this.zoneDrag.x += 107;
                for (var i = 0; i < this.zoneList.length; i++) {
                    if (this.zoneList[i].alpha === 0.5) {
                        this.zoneList[i].alpha = 1;
                        break;
                    }
                }
                this.sound.play('wrong');
            }
        }

    }

    reset() {
        this.groupTrain3.reset();
        this.trainRoad3.reset();
        this.zoneSetAlpha();
        this.zoneDrag.x = 205;
    }

    setData(data) {
        this.setTrainRoad3(data.headTrain);
        this.setGroupTrain3(data.train);
    }
    setTrainRoad3(data) {
        this.trainRoad3.addTrain(this.setTrain(data[0]));
    }
    setGroupTrain3(data) {
        for (var i = 0; i < data.length; i++) {
            this.groupTrain3.addTrain(this.setTrain(data[i]));
        }
    }
    setTrain(num) {
        switch (num) {
            case 2:
                return new Train(this, 0, 0, 2, "car2");
            case 4:
                return new Train(this, 0, 0, 4, "car4");
            case 6:
                return new Train(this, 0, 0, 6, "car6");
            case 7:
                return new Train(this, 0, 0, 7, "car7");
            case 8:
                return new Train(this, 0, 0, 8, "car8");
            case 12:
                return new Train(this, 0, 0, 12, "car12");
            case 14:
                return new Train(this, 0, 0, 14, "car14");
            case 16:
                return new Train(this, 0, 0, 16, "car16");
            case 17:
                return new Train(this, 0, 0, 17, "car17");
            case 18:
                return new Train(this, 0, 0, 18, "car18");
            case 19:
                return new Train(this, 0, 0, 19, "car19");
            case 20:
                return new Train(this, 0, 0, 20, "car20");
        }
    }
    zoneSetAlpha() {
        for (var i = 0; i < this.zoneList.length; i++) {
            this.zoneList[i].alpha = 0.5;
        }
        this.zoneList[0].alpha = 1;
    }
}