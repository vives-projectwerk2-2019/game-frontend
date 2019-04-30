import Phaser from "phaser";
import startScreen from "../Scenes/startScreen";
import editorScreen from "../Scenes/editorScreen";
import loadScreen from "../Scenes/loadScreen";
import mainScreen from "../Scenes/mainScreen";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight + 270,
    parent: 'play',
    debug: true,
    scene: [startScreen, editorScreen, loadScreen, mainScreen]
};

const game = new Phaser.Game(config);

export default game;