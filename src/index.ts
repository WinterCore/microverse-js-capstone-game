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

const config: Phaser.Types.Core.GameConfig = {
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
    dom: {
        createContainer: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    parent: document.body,
};

new Phaser.Game(config);
