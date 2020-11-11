import * as Phaser from 'phaser';

import {
    Preload,
    Boot,
    Leaderboard,
    Options,
    Game
} from './scenes/index';

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
        Preload,
        Boot,
        Leaderboard,
        Options,
        Game,
    ],
    physics: { default: 'arcade' },
};

new Phaser.Game(config);
