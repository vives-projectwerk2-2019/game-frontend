var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight + 270,
    parent: 'play',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 100 }
        }
    },
    scene: [startScreen, Editor, loadScreen, Main]
};

var game = new Phaser.Game(config);