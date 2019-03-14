class Scoreboard {

    constructor () 
    {
        this.nameText
        this.scoreText;
        this.hitpointsText;
    }

    create ()
    {
        this.nameText = this.add.text(10, 10, 'Name: Chickmagnet73', { font: '32px Arial', fill: '#000000' });
        this.scoreText = this.add.text(10, 48, 'Score: 0', { font: '32px Arial', fill: '#000000' });
        this.hitpointsText = this.add.text(10, 86, 'Hitpoints: 100', { font: '32px Arial', fill: '#000000' });
    }
}