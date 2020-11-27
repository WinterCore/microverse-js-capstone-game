import * as Phaser from 'phaser';

import Player from '../objects/player';
import Platform from '../objects/platform';

type texture = 'grass';

class Game extends Phaser.Scene {
    private player?: Player;
    private platformGroup?: Phaser.GameObjects.Group;

    constructor() {
        super('Game');
    }

    create(): void {
        const gameWidth = +this.game.config.width;
        this.player = new Player({ scene: this, x: +gameWidth / 2, y: 50, texture: 'character' });

        this.platformGroup = this.add.group();

        this.addPlatform(gameWidth / 2, +this.game.config.height / 2, 5, 'grass');

        this.physics.add.collider(this.platformGroup, this.player);
        // this.add.existing(container1);
        // this.physics.add.sprite(10, 100, 'character0');
        // console.log(this.player);
    }

    update(): void {
        const gameWidth = +this.game.config.width;
        const gameHeight = +this.game.config.height;

        const player = this.player!;
        const platformGroup = this.platformGroup!;

        let rightmostPlatformX = -Infinity, rightmostPlatformWidth = 0;

        platformGroup.getChildren().forEach((platform) => {
            // @ts-ignore
            if (platform.x + platform.width < 0) {
                platformGroup.killAndHide(platform);
                platformGroup.remove(platform);
            }

            // @ts-ignore
            rightmostPlatformX = Math.max(rightmostPlatformX, platform.x)
            // @ts-ignore
            rightmostPlatformWidth = Math.max(rightmostPlatformWidth, platform.width)
        });

        // console.log(+this.game.config.width - rightmostPlatformX);
        if (gameWidth - (rightmostPlatformX + rightmostPlatformWidth) > 100) {
            const y = Phaser.Math.Between(gameHeight / 2, gameHeight - 30);
            const width = Phaser.Math.Between(0, 7);
            this.addPlatform(gameWidth, y, width, 'grass');
        }

        if (player.y + player.displayHeight >= gameHeight || player.x < 0) {
            this.scene.start('Gameover');
        }
    }


    addPlatform(x: number, y: number, width: number, texture: texture) {
        const platformGroup = this.platformGroup!;
        const platform = new Platform({ scene: this, x, y, texture }, width);
        platformGroup.add(platform);
    }
}

export default Game;
