import * as Phaser from 'phaser';

import { GameObjectArgs } from 'src/typings/index';

const MAX_JUMPS = 2;
const JUMP_FORCE = 200;

class Player extends Phaser.Physics.Arcade.Sprite {
    jumps: number = 2;

    constructor({ scene, x, y, texture, frame }: GameObjectArgs) {
        super(scene, x, y, texture, frame);
        this.setScale(0.4, 0.4);
        this.setOrigin(0, 0);
        this.anims.play('PLAYER_RUN', true);

        scene.physics.world.enable(this);

        this.setDepth(3);
        this.setGravityY(200);

        this.scene.add.existing(this);

        scene.input.keyboard.on('keydown_UP', this.jump, this);
        scene.input.keyboard.on('keydown_SPACE', this.jump, this);
        scene.input.on('pointerdown', this.jump, this);
    }

    jump(): void {
        if (this.body.touching.down) {
            this.jumps = 0;
        }

        if (this.jumps < MAX_JUMPS) {
            this.setVelocityY(JUMP_FORCE * -1);
            this.jumps += 1;
        }
    }
}

export default Player;
