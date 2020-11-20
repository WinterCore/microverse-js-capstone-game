import * as Phaser from 'phaser';

import Player from '../objects/player';

class Game extends Phaser.Scene {
    private player?: Player;

    constructor() {
        super('Game');
    }

    create(): void {
        this.player = new Player({ scene: this, x: 100, y: 50, texture: 'character0' });
        // this.physics.add.sprite(10, 100, 'character0');
        console.log(this.player);
    }
}

export default Game;
