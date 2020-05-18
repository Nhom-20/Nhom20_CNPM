class Scene1 extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload() {
        this.load.image("road", "./img/TrainRoad.png");
        this.load.image("list", "./img/TrainList.png");
        this.load.image("train1", "./img/Train1.png");
        this.load.image("car2", "./img/Train2.png");
        this.load.image("car11", "./img/Train11.png");
        this.load.image("car12", "./img/Train12.png");
        this.load.image("car14", "./img/Train14.png");
        this.load.image("car16", "./img/Train16.png");
        this.load.image("car17", "./img/Train17.png");
        this.load.image("car18", "./img/Train18.png");
        this.load.image("car19", "./img/Train19.png");
        this.load.image("car7", "./img/Train7.png");
        this.load.image("car20", "./img/Train20.png");
        this.load.image("zone", "./img/zone.png");
        this.load.image("zone1", "./img/zone1.png");
        this.load.image("cir1", "./img/circle_head.png");
        this.load.image("cir2", "./img/circle_car.png");
        this.load.image("ball", "./img/ball.png");
        this.load.text("level", "./JS/level.json");
        this.load.image("progressbar", "./img/progressbar.png");
        this.load.audio("click", "./audio/click.mp3");
        this.load.audio("wrong", "./audio/wrong.mp3");
    }

    create() {
        this.add.image(400, 50, "progressbar");
        this.trainRoad1 = new trainRoad(this, 0, 350, "road");
        this.groupTrain = new listTrain(this, 0, 170, "list");

        this.level = 1;
        this.data = JSON.parse(this.cache.text.get("level")).level;
        this.text = new Text(this, 100, 100, "Order the train cars from the smaller to the greater");
        this.setData(this.data[this.level - 1]);
        this.input.on("gameobjectup", this.onStop, this);
        this.input.on("drag", this.onDoDrag, this);

        this.zones = this.physics.add.group({
            key: "zone",
            repeat: 4,
            alpha: 0,
            setXY: {
                x: 210,
                y: 375,
                stepX: 107,
            },
        });

        this.zoneList = this.zones.getChildren();
        this.zoneSetAlpha();

        this.zoneDrag = this.add.image(205, 372, "zone1");
        this.zoneDrag.setVisible(false);

        this.balls = this.physics.add.group({
            key: "ball",
            repeat: 3,
            setXY: {
                x: 140,
                y: 50,
                stepX: 30,
            },
        });
    }

    update() {
        var list = this.balls.getChildren();
        if (this.trainRoad1.check()) {
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

        if (
            gameObject.x > this.trainRoad1.widthRoad() &&
            gameObject.x < this.trainRoad1.widthRoad() + 107 &&
            gameObject.y > 210 &&
            gameObject.y < 320
        ) {
            this.zoneDrag.setVisible(true);
        } else {
            this.zoneDrag.setVisible(false);
        }
    }

    onStop(pointer, gameObject) {
        this.sound.play("click");
        if (
            gameObject.x > this.trainRoad1.widthRoad() &&
            gameObject.x < this.trainRoad1.widthRoad() + 107 &&
            gameObject.y > 210 &&
            gameObject.y < 320
        ) {
            this.zoneDrag.setVisible(false);
            this.groupTrain.removeTrain(gameObject);
            this.trainRoad1.addTrain(gameObject);
            if (this.trainRoad1.maxTrain() > this.groupTrain.minTrain()) {
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.trainRoad1.removeTrain(gameObject);
                        this.groupTrain.addTrain(gameObject);
                    },
                    loop: false,
                });
                //this.trainRoad1.removeTrain(gameObject);
                //this.groupTrain.addTrain(gameObject);
                this.sound.play("wrong");
            } else {
                this.zoneDrag.x += 107;
                for (var i = 0; i < this.zoneList.length; i++) {
                    if (this.zoneList[i].alpha === 0.5) {
                        this.zoneList[i].alpha = 1;
                        break;
                    }
                }
            }
        }
    }

    reset() {
        this.groupTrain.reset();
        this.trainRoad1.reset();
        this.zoneSetAlpha();
        this.zoneDrag.x = 205;
    }

    setData(data) {
        this.setTrainRoad1(data.headTrain);
        this.setGroupTrain(data.train);
    }
    setTrainRoad1(data) {
        this.trainRoad1.addTrain(this.setTrain(data[0]));
    }
    setGroupTrain(data) {
        for (var i = 0; i < data.length; i++) {
            this.groupTrain.addTrain(this.setTrain(data[i]));
        }
    }
    setTrain(num) {
        switch (num) {
            case 0:
                return new Train(this, 0, 0, 0, "train1");
            case 2:
                return new Train(this, 0, 0, 2, "car2");
            case 7:
                return new Train(this, 0, 0, 7, "car7");
            case 11:
                return new Train(this, 0, 0, 11, "car11");
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