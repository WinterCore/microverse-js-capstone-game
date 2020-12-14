import * as Phaser from 'phaser';

type GameObjectArgs = {
    scene    : Phaser.Scene;
    x        : number;
    y        : number;
    texture  : string | Phaser.Textures.Texture;
    frame   ?: string | number
};
