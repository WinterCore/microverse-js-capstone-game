import * as Phaser from 'phaser';

class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        const { width, height } = this.cameras.main;
        const titleText = this.add.text(width / 2, height / 2 - 100, 'Potato', {
            fill: '#FFF',
        });

        titleText.setOrigin(0.5, 0.5);

        this.scene.start('Game');
    }
}

export default Title;
