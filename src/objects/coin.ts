import * as Phaser from 'phaser';

import { GameObjectArgs } from '../typings/index';
import { CoinType } from '../config';

class Coin extends Phaser.Physics.Arcade.Sprite {
    key        : string;
    points     : number;
    spawn_rate : number;


    constructor({ scene, x, y, frame }: Omit<GameObjectArgs, 'texture'>, coin: CoinType) {
        super(scene, x, y, `${coin.key}_coin`, frame);

        this.points     = coin.points;
        this.spawn_rate = coin.spawn_rate;
        this.key        = coin.key;

        scene.physics.world.enable(this);

        this.setScale(0.7, 0.7);
        this.setDepth(2);

        this.anims.play(`${coin.key.toUpperCase()}_COIN_ROTATE`);

        scene.add.existing(this);
    }
}

export default Coin;
