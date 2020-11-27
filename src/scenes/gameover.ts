import * as Phaser from 'phaser';

class Title extends Phaser.Scene {
    constructor() {
        super('Gameover');
    }

    create() {
        const { width, height } = this.cameras.main;
        const titleText = this.add.text(width / 2, height / 2 - 100, 'Game Over', {
            fill: '#FFF',
        });

        titleText.setOrigin(0.5, 0.5);
    }
}

export default Title;
