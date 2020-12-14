import * as Phaser from 'phaser';

class InfoText extends Phaser.GameObjects.DOMElement {
    constructor(scene: Phaser.Scene, x: number, y: number, type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5') {
        super(scene, x, y, document.createElement(type));
        this.x = x;
        this.y = y;

        scene.events.on('destroy', () => {
            console.log('wtf');
            this.destroy();
        });

        scene.add.existing(this);
    }

    setContent(text: string, color: string = 'black'): void {
        const node = this.node as HTMLHeadingElement;
        node.style.color = color;
        node.innerHTML = text;
        this.updateSize();
    }
}

export default InfoText;
