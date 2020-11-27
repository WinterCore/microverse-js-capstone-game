import * as Phaser from 'phaser';

import { GameObjectArgs } from 'src/typings/index';

const MAX_JUMPS = 2;
const JUMP_FORCE = 300;
const MOVE_SPEED = 200;
const GRAVITY = 300;

class Player extends Phaser.Physics.Arcade.Sprite {
    jumps: number         = 2;
    jumpKeyDown: boolean  = false;
    rightKeyDown: boolean = false;
    leftKeyDown: boolean  = false;

    constructor({ scene, x, y, texture, frame }: GameObjectArgs) {
        super(scene, x, y, texture, frame);
        this.setScale(0.4, 0.4);
        this.setOrigin(0, 0);

        scene.physics.world.enable(this);

        this.setDepth(3);
        this.setGravityY(GRAVITY);

        this.scene.add.existing(this);
        this.setCollideWorldBounds(true, 0, 0);

        scene.input.keyboard.on('keydown_UP', this.jump, this);
        scene.input.keyboard.on('keydown_SPACE', this.jump, this);

        scene.input.keyboard.on('keyup_UP', this.clearKey, this);
        scene.input.keyboard.on('keyup_SPACE', this.clearKey, this);

        scene.input.keyboard.on('keydown_RIGHT', this.moveRight, this);
        scene.input.keyboard.on('keyup_RIGHT', this.moveRightStop, this);

        scene.input.keyboard.on('keydown_LEFT', this.moveLeft, this);
        scene.input.keyboard.on('keyup_LEFT', this.moveLeftStop, this);

        scene.input.on('pointerdown', this.jump, this);
    }

    private jump(): void {
        if (this.jumpKeyDown) return;
        this.jumpKeyDown = true;
        if (this.body.touching.down) {
            this.jumps = 0;
        }

        if (this.jumps < MAX_JUMPS) {
            this.setVelocityY(JUMP_FORCE * -1);
            this.jumps += 1;
        }
    }

    private moveLeft(): void {
        this.setVelocityX(-MOVE_SPEED);
        this.anims.play('PLAYER_RUN', true);
        this.flipX = true;
        this.leftKeyDown = true;
    }


    private moveRight(): void {
        this.setVelocityX(MOVE_SPEED);
        this.anims.play('PLAYER_RUN', true);
        this.flipX = false;
        this.rightKeyDown = true;
    }

    private moveLeftStop(): void {
        this.leftKeyDown = false;
        this.moveStop();
    }

    private moveRightStop(): void {
        this.rightKeyDown = false;
        this.moveStop();
    }

    private moveStop(): void {
        if (this.rightKeyDown || this.leftKeyDown) return;
        this.setVelocityX(0);
        this.anims.stop();
        this.setFrame(0);
    }

    private clearKey(): void {
        this.jumpKeyDown = false;
    }
}

export default Player;
