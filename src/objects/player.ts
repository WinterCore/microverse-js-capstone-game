import * as Phaser from 'phaser';

import { GameObjectArgs } from 'src/typings/index';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor({ scene, x, y, texture, frame }: GameObjectArgs) {
        super(scene, x, y, texture, frame);
        this.setScale(0.4, 0.4);
        this.setOrigin(0, 0);
        this.anims.play('PLAYER_RUN', true);

        scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setDepth(3);
        this.setGravityY(200);
    }

}

export default Player;
