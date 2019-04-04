var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight + 270,
    parent: 'play',
    debug: true,
    scene: [startScreen, Editor, loadScreen, Main]
};

var game = new Phaser.Game(config);
