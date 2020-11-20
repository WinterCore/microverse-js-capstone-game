import * as Phaser from 'phaser';

class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    create() {
        this.scene.start('Preload');
    }
}

export default Boot;
