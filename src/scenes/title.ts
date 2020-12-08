import * as Phaser from 'phaser';

import Button from '../objects/button';

import State from '../state';

import CONFIG from '../config';

class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        const { width, height } = this.cameras.main;
        const halfWidth = width / 2, halfHeight = height / 2;

        if (!State.data.bgmusic) {
            const bgmusic = this.sound.add('bgmusic', { volume: 0.2, loop: true });
            if (State.musicOn) {
                bgmusic.play();
            }
            State.data.bgmusic = bgmusic;
        }

        const character = this.add.sprite(halfWidth - 200, halfHeight - 200, 'character');
        character.setScale(0.85, 0.85);
        character.anims.play('PLAYER_RUN');

        this.add.text(halfWidth - 100, halfHeight - 210, 'Scuffed Cat', { ...CONFIG.defaultFontStyle, fontSize: '50px', strokeThickness: 9 });

        this.add
            .image(halfWidth, halfHeight, 'background')
            .setScale(1.5, 1.5)
            .setDepth(-4);

        new Button(this, halfWidth, halfHeight - 50, {
            inactiveTexture: 'button_orange',
            activeTexture: 'button_green',
            content: 'Play',
            onClick: () => {
                this.scene.start('Game');
            }
        });

        new Button(this, halfWidth, halfHeight + 50, {
            inactiveTexture: 'button_grey',
            activeTexture: 'button_green',
            content: 'Guide',
            onClick: () => {
                this.scene.start('Guide');
            }
        });

        new Button(this, halfWidth, halfHeight + 150, {
            inactiveTexture: 'button_pink',
            activeTexture: 'button_green',
            content: 'Options',
            onClick: () => {
                this.scene.start('Options');
            }
        });

        new Button(this, halfWidth, halfHeight + 250, {
            inactiveTexture: 'button_grey',
            activeTexture: 'button_green',
            content: 'Credits',
            onClick: () => {
                this.scene.start('Credits');
            }
        });

    }
}

export default Title;
