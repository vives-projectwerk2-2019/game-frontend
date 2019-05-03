import Phaser from "phaser";

class loadScreen extends Phaser.Scene{
    constructor(){
        super({key:"loadScreen"});
    }

    preload() {

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        var x = this.cameras.main.centerX;
        var y = this.cameras.main.centerY;
        
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(570, 270, 320, 50);
        
        var loadingText = this.make.text({
            x: x,
            y: y,
            text: 'Loading game',
            style: {
                font: '72px monospace',
                fill: '#ffffff',
                padding: 10
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        loadingText.setShadow(10, 10, 'black', 10);
        
        var percentText = this.make.text({
            x: x,
            y: y - 140,
            text: '0%',
            style: {
                font: '72px monospace',
                fill: '#ffffff',
                padding: 10
            }
        });
        percentText.setOrigin(0.5, 0.5);
        percentText.setShadow(10, 10, 'black', 10);
        
        var assetText = this.make.text({
            x: x,
            y: y + 100,
            text: '',
            style: {
                font: '72px monospace',
                fill: '#ffffff',
                padding: 10
            }
        });
        assetText.setOrigin(0.5, 0.5);
        assetText.setShadow(10, 10, 'black', 10);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(580, 280, 300 * value, 30);
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        this.load.image('logo', 'assets/icon.png');
        for (var i = 0; i < 100; i++) {
            this.load.image('logo'+i, 'assets/icon.png');
        }
    }

    create() {
        this.scene.start("mainScreen");
    }
}

export default loadScreen;