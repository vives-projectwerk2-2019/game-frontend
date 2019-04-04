//Timer
var text;
var finalCountDown;
var timedEvent;
var timeRemaining;
var rect;
var graphics;

class progessBar extends Phaser.Scene {
    constructor() {
        super({ key: "progressBar" });
    }

    create() {
        //Timer
        console.log(this);
        text = this.add.text(600, 32, "", { fontSize: 24, font: "Arial", fill: "#FFFFFF" }).setOrigin(0.5, 0.5);
        finalCountDown = this.add.text(600, 350, "", { fontSize: 72, font: "Arial", fill: "#D10000" }).setOrigin(0.5, 0.5);
        timedEvent = this.time.delayedCall(15000, scene.onEvent, [], this);

        text.setStroke('#000000', 8)
        finalCountDown.setStroke('#000000', 8)

        //Progress bar for timer
        rect = new Phaser.Geom.Rectangle(375, 40, 500, 20);
        graphics = this.add.graphics();
        graphics.fillRectShape(rect);
        graphics.fillStyle(0x000000)
    }

    update(delta) {
        //Timer update
        timeRemaining = 15 - timedEvent.getElapsedSeconds().toString().substr(0, 2);
        text.setText("Round ends in " + timeRemaining);
        if (timeRemaining <= 5) {
            finalCountDown.setText(timeRemaining)
            if (timeRemaining == 0) {
                finalCountDown.setText(" ")
            }
        }

        //Progress bar for timer
        graphics.clear()
        graphics.fillStyle(0xFFFFFF, 0.7)
        graphics.fillRect(375, 40, 30 * timeRemaining, 18);
    }
    //Empty onEvent for Length
    onEvent() {
        console.log("Timer has ended");
    }
}
