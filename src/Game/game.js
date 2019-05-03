import Phaser from "phaser";
import startScreen from "../Scenes/startScreen";
import editorScreen from "../Scenes/editorScreen";
import loadScreen from "../Scenes/loadScreen";
import mainScreen from "../Scenes/mainScreen";

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'play',
    debug: true,
    transparent: true,
    scene: [startScreen, editorScreen, loadScreen, mainScreen]
};

const game = new Phaser.Game(config);

export default game;