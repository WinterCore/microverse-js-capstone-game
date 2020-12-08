import * as Phaser from 'phaser';

import CONFIG from '../config';

const PROGRESS_BAR_WIDTH = 320,
      PROGRESS_BAR_HEIGHT = 50,
      PROGRESS_BAR_PADDING = 5;

class Preload extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        const { width, height } = this.cameras.main;

        const progressBar = this.add.graphics(),
              progressBox = this.add.graphics();

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                fill: '#fff',
            },
        });

        progressBar.setDepth(2);
        loadingText.setOrigin(0.5, 0.5);

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - PROGRESS_BAR_WIDTH / 2,
                             height / 2 - PROGRESS_BAR_HEIGHT / 2,
                             PROGRESS_BAR_WIDTH, PROGRESS_BAR_HEIGHT);

        this.load.on('progress', (val: number) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((width / 2 - PROGRESS_BAR_WIDTH / 2 + PROGRESS_BAR_PADDING),
                                 height / 2 - PROGRESS_BAR_HEIGHT / 2 + PROGRESS_BAR_PADDING,
                                 (PROGRESS_BAR_WIDTH - PROGRESS_BAR_PADDING * 2) * val,
                                 PROGRESS_BAR_HEIGHT - PROGRESS_BAR_PADDING * 2);
        });

        this.load.on('fileprogress', (file: Phaser.Loader.File) => {
            loadingText.setText(`Loading asset: ${file.key}`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.createAnims();
            this.scene.start('Title');
        });

        this.loadAssets();
    }

    loadAssets() {
        this.load.audio('coin_collect', ['assets/coin.wav']);
        this.load.audio('bgmusic', ['assets/bgmusic.ogg']);

        this.load.image('button_pink', 'assets/buttons/button_pink.png');
        this.load.image('button_green', 'assets/buttons/button_green.png');
        this.load.image('button_orange', 'assets/buttons/button_orange.png');
        this.load.image('button_grey', 'assets/buttons/button_grey.png');

        this.load.image('cross_button_orange', 'assets/buttons/cross_orange.png');
        this.load.image('cross_button_green', 'assets/buttons/cross_green.png');
        this.load.image('check_button_orange', 'assets/buttons/check_orange.png');
        this.load.image('check_button_green', 'assets/buttons/check_green.png');

        this.load.image('github', 'assets/github.png');

        this.load.image('arrow_keys', 'assets/arrow_keys.png');

        this.load.spritesheet('character', 'assets/character.png', {
            frameWidth: 118,
            frameHeight: 150,
        });

        this.load.image('background', 'assets/background.png');
        this.load.image('clouds', 'assets/clouds.png');

        // Load coins
        for (let coin of CONFIG.coins) {
            this.load.spritesheet(`${coin.key}_coin`, `assets/${coin.key}_coin.png`, {
                frameWidth: 50,
                frameHeight: 50,
            });
        }

        this.load.atlas('platforms', 'assets/platforms.png', 'assets/platforms.json');

    }

    createAnims() {
        this.anims.create({
            key: 'PLAYER_RUN',
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 4,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Create coin animations
        for (let coin of CONFIG.coins) {
            this.anims.create({
                key: `${coin.key.toUpperCase()}_COIN_ROTATE`,
                frames: this.anims.generateFrameNumbers(`${coin.key}_coin`, {
                    start: 0,
                    end: 10,
                }),
                frameRate: 10,
                repeat: -1,
            });
        }
    }

    create() {
        this.scene.start('Title');
    }
}

export default Preload;
