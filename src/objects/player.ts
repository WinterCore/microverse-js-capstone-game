import * as Phaser from 'phaser';

import { GameObjectArgs } from 'src/typings/index';

class Player extends Phaser.GameObjects.Sprite {
    constructor({ scene, x, y, texture, frame }: GameObjectArgs) {
        super(scene, x, y, texture, frame);
        this.setScale(0.5, 0.5);
        this.setOrigin(0, 0);
        this.scene.add.existing(this);
        this.anims.play('PLAYER_RUN', true);
    }
}

export default Player;
