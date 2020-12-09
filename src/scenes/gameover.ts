import * as Phaser from 'phaser';

import Button   from '../objects/button';
import InfoText from '../objects/info-text';

import CONFIG from '../config';

import { saveScore } from '../api';

class Gameover extends Phaser.Scene {
    private nameInput ?: Phaser.GameObjects.DOMElement;
    private infoH3    ?: InfoText;

    private submitting: boolean = false;

    constructor() {
        super('Gameover');
    }

    create() {
        this.submitting = false;

        const { width, height } = this.cameras.main;
        const halfWidth = width / 2, halfHeight = height / 2;

        const score = this.registry.get('score');

        this.add
            .image(halfWidth, halfHeight, 'background')
            .setScale(1.5, 1.5)
            .setDepth(-4);

        this.add
            .text(halfWidth, halfHeight - 200, 'Gameover', { ...CONFIG.defaultFontStyle, fontSize: '40px' })
            .setOrigin(0.5, 0.5);

        this.add
            .text(halfWidth, halfHeight - 150, `Score: ${score}`, { ...CONFIG.defaultFontStyle })
            .setOrigin(0.5, 0.5);

        new Button(this, halfWidth, halfHeight + 250, {
            inactiveTexture: 'button_grey',
            activeTexture: 'button_green',
            content: 'Main Menu',
            onClick: () => {
                this.scene.start('Title');
            }
        });


        if (score > 0) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'name';
            this.nameInput = this.add.dom(halfWidth, halfHeight, input);
            this.infoH3 = new InfoText(this, halfWidth, halfHeight + 40, 'h3');

            new Button(this, halfWidth, halfHeight + 150, {
                inactiveTexture: 'button_grey',
                activeTexture: 'button_green',
                content: 'Submit',
                onClick: () => {
                    this.submitScore();
                }
            });
        }
    }

    private async submitScore() {
        const nameInputNode = this.nameInput!.node as HTMLInputElement;

        if (this.submitting) return;
        this.submitting = true;
        nameInputNode.disabled = true;
        this.infoH3!.setContent('Submitting score...', 'black');

        try {
            await saveScore({
                score: this.registry.get('score'),
                user: nameInputNode.value,
            });

            this.infoH3!.setContent('Score saved successfully', 'black');
            setTimeout(() => this.scene.start('Title'), 2000);
        } catch (e) {
            this.infoH3!.setContent('Something happened!', 'red');
            nameInputNode.disabled = false;
            this.submitting = false;
        }
    }
}

export default Gameover;
