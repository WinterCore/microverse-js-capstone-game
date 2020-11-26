import * as Phaser from 'phaser';

import Player from '../objects/player';
import Platform from '../objects/platform';

class Game extends Phaser.Scene {
    private player?: Player;

    constructor() {
        super('Game');
    }

    create(): void {
        this.player = new Player({ scene: this, x: 100, y: 50, texture: 'character' });

        const platform = new Platform({ scene: this, x: 100, y: 300, texture: 'grass' }, 3);

        // @ts-ignore

        this.physics.add.collider(this.player, platform, () => {
            console.log('here');
        }, undefined, this);
        // this.add.existing(container1);
        // this.physics.add.sprite(10, 100, 'character0');
        // console.log(this.player);
    }

    update(): void {
        const player = this.player!;
        player.x = 100;
    }
}

export default Game;
