import * as Phaser from 'phaser';

import { GameObjectArgs } from '../typings/index';
import CONFIG from '../config';

class Player extends Phaser.Physics.Arcade.Sprite {
    jumps: number = 2;

    constructor({ scene, x, y, texture, frame }: GameObjectArgs) {
        super(scene, x, y, texture, frame);
        this.setScale(0.4, 0.4);
        this.setOrigin(0, 0);

        scene.physics.world.enable(this);

        this.setDepth(3);
        this.setGravityY(CONFIG.player.gravity);

        scene.add.existing(this);
        this.setCollideWorldBounds(true, 0, 0);
    }

    jump(): void {
        if (this.body.touching.down) {
            this.jumps = 0;
        }

        if (this.jumps < CONFIG.player.max_jump) {
            this.setVelocityY(CONFIG.player.jump_force * -1);
            this.jumps += 1;
        }
    }

    moveLeft(): void {
        this.setVelocityX(-CONFIG.player.move_speed);
        this.anims.play('PLAYER_RUN', true);
        this.flipX = true;
    }


    moveRight(): void {
        this.setVelocityX(CONFIG.player.move_speed);
        this.anims.play('PLAYER_RUN', true);
        this.flipX = false;
    }

    moveStop(): void {
        this.setVelocityX(0);
        this.anims.stop();
        this.setFrame(0);
    }
}

export default Player;
