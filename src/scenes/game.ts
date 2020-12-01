import * as Phaser from 'phaser';

import Player from '../objects/player';
import Platform from '../objects/platform';

type Texture = 'grass' | 'snow' | 'sand';

class Game extends Phaser.Scene {
    private currentTexture: Texture = 'snow';
    private player?: Player;
    private platformGroup?: Phaser.GameObjects.Group;

    constructor() {
        super('Game');
    }

    create(): void {
        const gameWidth = +this.game.config.width;
        this.player = new Player({ scene: this, x: +gameWidth / 2, y: 50, texture: 'character' });

        this.platformGroup = this.add.group();

        this.addPlatform(gameWidth / 2, +this.game.config.height / 2, 5, this.currentTexture);

        this.physics.add.collider(this.platformGroup, this.player);

        this.cameras.main.roundPixels = true;

        // this.add.existing(container1);
        // this.physics.add.sprite(10, 100, 'character0');
        // console.log(this.player);
    }

    update(): void {
        const gameWidth = +this.game.config.width;
        const gameHeight = +this.game.config.height;

        const player = this.player!;
        const platformGroup = this.platformGroup!;

        let rightmostPlatform = platformGroup.getChildren()[0];

        platformGroup.getChildren().forEach((platform) => {
            // @ts-ignore
            if (platform.x + platform.width < 0) {
                platformGroup.killAndHide(platform);
                platformGroup.remove(platform);
            }

            // @ts-ignore
            if (platform.x > rightmostPlatform.x) {
                rightmostPlatform = platform;
            }
        });


        // @ts-ignore
        if (gameWidth - (rightmostPlatform.x + rightmostPlatform.width) > 0) {
            // @ts-ignore
            const y = Phaser.Math.Between(gameHeight / 4, gameHeight - 30);
            // @ts-ignore
            const random = Phaser.Math.Between(0, y - rightmostPlatform.y);
            const width = Phaser.Math.Between(0, 7);
            if (random > 0) {
                const x = gameWidth + 200 + random;
                this.addPlatform(x, y, width, this.currentTexture);
            } else {
                const x = gameWidth + 200;
                this.addPlatform(x, y + random * -1, width, this.currentTexture);
            }
        }

        if (
            player.y + player.displayHeight >= gameHeight
            || (player.x < 0 && player.body.touching.right)
        ) {
            this.scene.start('Gameover');
        }
    }


    addPlatform(x: number, y: number, width: number, texture: Texture) {
        const platformGroup = this.platformGroup!;
        const platform = new Platform({ scene: this, x, y, texture }, width);
        platformGroup.add(platform);
    }
}

export default Game;
