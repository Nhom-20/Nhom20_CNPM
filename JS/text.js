class Text {
    constructor(scene, x, y, text) {
        this.clickButton = scene.add.text(x + 40, y - 15, text, {
            font: "25px Arial",
            fill: "#000"
        });
    }
}