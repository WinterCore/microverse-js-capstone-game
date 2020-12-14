import * as Phaser from 'phaser';

import Button from '../objects/button';
import Coin from '../objects/coin';

import CONFIG from '../config';

class Guide extends Phaser.Scene {
    constructor() {
        super('Guide');
    }

    create() {
        const { width, height } = this.cameras.main;
        const halfWidth = width / 2, halfHeight = height / 2;

        this.add
            .image(halfWidth, halfHeight, 'background')
            .setScale(1.5, 1.5)
            .setDepth(-4);

        this.add
            .text(halfWidth, halfHeight - 200, 'GUIDE', { ...CONFIG.defaultFontStyle, fontSize: '40px' })
            .setOrigin(0.5, 0.5);

        this.add
            .image(halfWidth - 250, halfHeight, 'arrow_keys')
            .setScale(0.3, 0.3);

        this.add.text(halfWidth - 150, halfHeight - 30,
                      'Use the arrow keys to move left & right and jump.',
                      { color: 'black', fontSize: '20px' });

        this.add.text(halfWidth - 150, halfHeight - 5,
                      'The scuffed cat is allowed to jump twice.',
                      { color: 'black', fontSize: '20px' });

        new Button(this, halfWidth, halfHeight + 230, {
            inactiveTexture: 'button_pink',
            activeTexture: 'button_green',
            content: 'Main Menu',
            onClick: () => {
                this.scene.start('Title');
            }
        });

        new Coin({ scene: this, x: halfWidth - 300, y: halfHeight + 120 }, CONFIG.coins[0]);
        new Coin({ scene: this, x: halfWidth - 250, y: halfHeight + 120 }, CONFIG.coins[1]);
        new Coin({ scene: this, x: halfWidth - 200, y: halfHeight + 120 }, CONFIG.coins[2]);

        this.add.text(halfWidth - 150, halfHeight + 110,
                      'Collect coins to gain points.',
                      { color: 'black', fontSize: '20px' });
    }
}

export default Guide;
