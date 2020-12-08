import * as Phaser from 'phaser';

import Button from '../objects/button';

import CONFIG from '../config';
import State from '../state';

class Options extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    create() {
        const { width, height } = this.cameras.main;
        const halfWidth = width / 2, halfHeight = height / 2;

        this.add
            .image(halfWidth, halfHeight, 'background')
            .setScale(1.5, 1.5)
            .setDepth(-4);

        this.add
            .text(halfWidth, halfHeight - 200, 'OPTIONS', { ...CONFIG.defaultFontStyle, fontSize: '40px' })
            .setOrigin(0.5, 0.5);

        this.add
            .text(halfWidth - 100, halfHeight - 50, 'Music Enabled', { ...CONFIG.defaultFontStyle, fontSize: '28px' })
            .setOrigin(0, 0.5);

        this.createCheckBox(
            halfWidth - 150, halfHeight - 50,
            () => {
                State.data.bgmusic.play();
                State.musicOn = true;
            },
            () => {
                State.data.bgmusic.stop();
                State.musicOn = false;
            },
            State.musicOn,
        );

        this.add
            .text(halfWidth - 100, halfHeight + 50, 'Sound Effects Enabled', { ...CONFIG.defaultFontStyle, fontSize: '28px' })
            .setOrigin(0, 0.5);
        this.createCheckBox(
            halfWidth - 150, halfHeight + 50,
            () => {
                State.soundOn = true;
            },
            () => {
                State.soundOn = false;
            },
            State.soundOn,
        );

        new Button(this, halfWidth, halfHeight + 200, {
            inactiveTexture: 'button_pink',
            activeTexture: 'button_green',
            content: 'Main Menu',
            onClick: () => {
                this.scene.start('Title');
            }
        });
    }

    private createCheckBox(x: number, y: number, onChecked: () => void, onUnchecked: () => void, val: boolean) {
        let button: Button | null = null;

        if (val) {
            button = this.createCheckButton(x, y, () => {
                onUnchecked();
                this.createCheckBox(x, y, onChecked, onUnchecked, false);
                button!.destroy();
            });
        } else {
            button = this.createCrossButton(x, y, () => {
                onChecked();
                this.createCheckBox(x, y, onChecked, onUnchecked, true);
                button!.destroy();
            });
        }
    }

    private createCheckButton(x: number, y: number, cb: () => void) {
        return new Button(this, x, y, {
            inactiveTexture: 'check_button_orange',
            activeTexture: 'check_button_green',
            onClick: () => {
                cb();
            }
        });
    }

    private createCrossButton(x: number, y: number, cb: () => void) {
        return new Button(this, x, y, {
            inactiveTexture: 'cross_button_orange',
            activeTexture: 'cross_button_green',
            onClick: () => {
                cb();
            }
        });
    }
}

export default Options;
