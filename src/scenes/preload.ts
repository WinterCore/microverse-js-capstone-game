import * as Phaser from 'phaser';

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
                             PROGRESS_BAR_WIDTH,
                             PROGRESS_BAR_HEIGHT);

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
        });

        this.loadAssets();
    }

    loadAssets() {
        this.load.image('character0', 'assets/character/1.png');
        this.load.image('character1', 'assets/character/2.png');
        this.load.image('character2', 'assets/character/3.png');
        this.load.image('character3', 'assets/character/4.png');
        this.load.image('character4', 'assets/character/5.png');
        this.load.image('character5', 'assets/character/6.png');
        this.load.image('character6', 'assets/character/7.png');
        this.load.image('character7', 'assets/character/8.png');
    }
}

export default Preload;
