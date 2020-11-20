import * as Phaser from 'phaser';

import {
    Preload,
    Boot,
    Title,
    Leaderboard,
    Options,
    Game
} from './scenes/index';

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
        Boot,
        Preload,
        Title,
        Leaderboard,
        Options,
        Game,
    ],
    physics: { default: 'arcade' },
};

new Phaser.Game(config);
