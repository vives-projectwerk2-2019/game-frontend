var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight + 270,
    parent: 'play',
    debug: true,
    scene: [startScreen, editorScreen, loadScreen, mainScreen]
};

var game = new Phaser.Game(config);
