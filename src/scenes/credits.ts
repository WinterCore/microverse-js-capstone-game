import * as Phaser from 'phaser';

import Button from '../objects/button';

import CONFIG from '../config';

class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        const { width, height } = this.cameras.main;
        const halfWidth = width / 2, halfHeight = height / 2;

        this.add
            .image(halfWidth, halfHeight, 'background')
            .setScale(1.5, 1.5)
            .setDepth(-4);

        this.add
            .text(halfWidth, halfHeight - 200, 'CREDITS', { ...CONFIG.defaultFontStyle, fontSize: '40px' })
            .setOrigin(0.5, 0.5);


        this.add
            .text(halfWidth, halfHeight - 50, 'Created by WinterCore', { ...CONFIG.defaultFontStyle, fontSize: '32px' })
            .setOrigin(0.5, 0.5);

        const github = this.add
           .image(halfWidth, halfHeight + 50, 'github')
           .setInteractive();
        github.setScale(0.15, 0.15);

        github.on('pointerdown', () => {
            window.open('https://github.com/WinterCore/microverse-js-capstone-game');
        });

        new Button(this, halfWidth, halfHeight + 200, {
            inactiveTexture: 'button_pink',
            activeTexture: 'button_green',
            content: 'Main Menu',
            onClick: () => {
                this.scene.start('Title');
            }
        });
    }
}

export default Credits;
