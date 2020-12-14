import * as Phaser from 'phaser';

type ButtonConfig = {
    activeTexture    : string;
    inactiveTexture  : string;
    onClick          : () => void;
    content         ?: string;
};

class Button extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, config: ButtonConfig) {
        super(scene, x, y);

        const { activeTexture, inactiveTexture, onClick, content } = config;

        const button = new Phaser.GameObjects.Image(scene, 0, 0, inactiveTexture).setInteractive();
        button.setScale(0.5, 0.5);

        this.x = x;
        this.y = y;
        this.setSize(button.width, button.height);

        this.add(button);

        if (content) {
            const text = new Phaser.GameObjects.Text(scene, 0, 0, content.toUpperCase(), {
                color: 'white', fontSize: '22px', fontFamily: 'junegull', strokeThickness: 4, stroke: 'black'
            });
            this.add(text);
            Phaser.Display.Align.In.Center(text, button);
            text.y = text.y - 5;
        }

        button.on('pointerdown', onClick);

        button.on('pointerover', () => {
            button.setTexture(activeTexture);
        });

        button.on('pointerout', () => {
            button.setTexture(inactiveTexture);
        });

        scene.add.existing(this);
    }
}


export default Button;
