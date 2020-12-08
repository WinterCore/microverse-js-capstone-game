import * as Phaser from 'phaser';

import {
    Preload,
    Boot,
    Title,
    Leaderboard,
    Options,
    Game,
    Gameover,
    Credits,
    Guide,
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
        Gameover,
        Credits,
        Guide,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
};

new Phaser.Game(config);
