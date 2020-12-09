import * as Phaser from 'phaser';

import Player   from '../objects/player';
import Platform from '../objects/platform';
import Coin     from '../objects/coin';

import State    from '../state';

import CONFIG, { CoinType, Texture } from '../config';

class Game extends Phaser.Scene {
    private player        ?: Player;
    private platformGroup ?: Phaser.GameObjects.Group;
    private coinGroup     ?: Phaser.GameObjects.Group;
    private scoreText     ?: Phaser.GameObjects.Text;
    private stageText     ?: Phaser.GameObjects.Text;
    private nextStageText ?: Phaser.GameObjects.Text;
    private keys          ?: Record<'up' | 'right' | 'left', Phaser.Input.Keyboard.Key>;
    private clouds        ?: Phaser.GameObjects.TileSprite;

    private currentTexture: Texture = CONFIG.textures[0];
    private upkeyDown: boolean      = false;
    private score: number           = 0;
    private stage: number           = 0;
    private nextStagePoints: number = CONFIG.scroll_speed_increase_per_points;
    private platformsPassed: number = 0;

    constructor() {
        super('Game');
    }

    create(): void {
        this.score           = 0;
        this.currentTexture  = CONFIG.textures[0];
        this.stage           = 0;
        this.nextStagePoints = CONFIG.scroll_speed_increase_per_points;
        this.platformsPassed = 0;
        this.upkeyDown       = false;

        const gameWidth  = +this.game.config.width;
        const gameHeight = +this.game.config.height;

        this.player = new Player({ scene: this, x: +gameWidth / 2, y: 50, texture: 'character' });

        this.registry.set('score', this.score);

        this.platformGroup = this.add.group();
        this.coinGroup     = this.add.group();

        this.addPlatform(gameWidth / 2, +this.game.config.height / 2, 15, this.currentTexture);
        this.scoreText     = this.add.text(10, 10, `Score: 0`, { fill: 'black' });
        this.stageText     = this.add.text(10, 30, `Current Game Stage: 1`, { fill: 'black' });
        this.nextStageText = this.add.text(10, 50, `Next Game Stage: 0`, { fill: 'black' });

        this.add
            .image(gameWidth / 2, gameHeight / 2, 'background')
            .setScale(1.5, 1.5)
            .setDepth(-4);

        this.clouds = this.add.tileSprite(gameWidth / 2, gameHeight / 2, 6000, 1024, 'clouds');
        this.clouds.setDepth(-3);
        this.clouds.setScale(0.7);

        this.keys = {
            left  : this.input.keyboard.addKey('LEFT'),
            right : this.input.keyboard.addKey('RIGHT'),
            up    : this.input.keyboard.addKey('UP')
        };

        this.physics.add.collider(this.platformGroup, this.player, () => {
            this.player!.setVelocityX(this.currentScrollSpeed);
        });

        this.physics.add.overlap(this.coinGroup, this.player, (c) => {
            const coin  = c as Coin;
            this.score += coin.points;
            this.calculateGameStage();

            if (State.soundOn) {
                this.sound.play('coin_collect', { volume: 3 });
            }
            this.physics.world.disable(coin);
            this.tweens.add({
                targets: coin,
                y: coin.y - 100,
                alpha: 0,
                duration: 600,
                ease: 'Cubic.easeOut',
                callbackScope: this,
                onComplete(this: Game) {
                    this.coinGroup!.killAndHide(coin);
                    this.coinGroup!.remove(coin);
                }
            });
        });

        this.cameras.main.roundPixels = true;
    }

    update(): void {

        this.updateText();
        this.handleInput();
        this.handleGameObjects();
        this.handleGameOver();

        this.clouds!.tilePositionX += this.stage + 1;
    }


    private addPlatform(x: number, y: number, width: number, texture: Texture): void {
        const platformGroup = this.platformGroup!;
        const platform = new Platform({ scene: this, x, y, texture }, width);
        platformGroup.add(platform);
        const platformBody = platform.body as Phaser.Physics.Arcade.Body;
        platformBody.setVelocityX(this.currentScrollSpeed);

        // Generate coin on the platform
        if (Phaser.Math.FloatBetween(0, 1) < CONFIG.coin_spawn_rate && width > 0) {
            const coinRandom = Phaser.Math.FloatBetween(0, 1);
            let total = 0;
            for (let coinType of CONFIG.coins) {
                total += coinType.spawn_rate;
                if (total > coinRandom) {
                    const coinX = Phaser.Math.Between(x + 20, x + platform.width - 20);
                    const coinY = y - 50;
                    this.addCoin(coinX, coinY, coinType);
                    break;
                }
            }
        }
    }

    private addCoin(x: number, y:number, coinType: CoinType): void {
        const coinGroup = this.coinGroup!;
        const coin = new Coin({ scene: this, x, y }, coinType);
        const coinBody = coin.body as Phaser.Physics.Arcade.Body;
        coinBody.setVelocityX(this.currentScrollSpeed);
        coinGroup.add(coin);
    }

    private calculateGameStage(): void {
        if (this.score >= this.nextStagePoints) {
            this.stage += 1;
            this.currentTexture = CONFIG.textures[Phaser.Math.Between(0, CONFIG.textures.length - 1)];
            this.nextStagePoints += this.nextStagePoints * 0.8;
        }

        this.platformGroup!.getChildren().forEach((p) => {
            const body = p.body as Phaser.Physics.Arcade.Body;
            body.setVelocityX(this.currentScrollSpeed);
        });

        this.coinGroup!.getChildren().forEach((c) => {
            const body = c.body as Phaser.Physics.Arcade.Body;
            body.setVelocityX(this.currentScrollSpeed);
        });
    }

    private handleGameObjects(): void {
        const gameWidth = +this.game.config.width;
        const gameHeight = +this.game.config.height;

        const platformGroup = this.platformGroup!;
        const coinGroup = this.coinGroup!;
        let rightmostPlatform = platformGroup.getChildren()[0] as Phaser.GameObjects.Container;

        platformGroup.getChildren().forEach((p) => {
            const platform = p as Platform;

            if (platform.x + platform.width < 0) {
                platformGroup.killAndHide(platform);
                platformGroup.remove(platform);
                this.platformsPassed += 1;
                this.score += CONFIG.passed_platform_points + this.stage;
                this.calculateGameStage();
            }

            if (platform.x > rightmostPlatform.x) {
                rightmostPlatform = platform;
            }
        });

        coinGroup.getChildren().forEach((c) => {
            const coin = c as Coin;

            if (coin.x + 50 < 0) {
                coinGroup.killAndHide(coin);
                coinGroup.remove(coin);
            }
        });


        if (gameWidth - (rightmostPlatform.x + rightmostPlatform.width) > 0) {
            const y = Phaser.Math.Between(
                Math.max(gameHeight / 4, rightmostPlatform.y - 400),
                Math.min(gameHeight - 50, rightmostPlatform.y + 400)
            );
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
    }

    private handleInput(): void {
        const keys = this.keys!;
        const player = this.player!;

        if (keys.right.isDown) {
            player.moveRight();
        } else if (keys.left.isDown) {
            player.moveLeft();
            player.setVelocityX(player.body.velocity.x + this.currentScrollSpeed);
        }

        if (keys.right.isUp && keys.left.isUp) {
            player.moveStop();
        }

        if (keys.up.isDown) {
            if (this.upkeyDown) return;
            this.upkeyDown = true;
            player.jump();
        }

        if (keys.up.isUp) {
            this.upkeyDown = false;
        }

        if (player.body.touching.down && keys.right.isUp && keys.left.isUp) {
            player.setVelocityX(this.currentScrollSpeed);
        }


    }

    private handleGameOver(): void {
        const gameHeight = +this.game.config.height;
        const player = this.player!;

        if (
            player.y + player.displayHeight >= gameHeight
            || (player.x < 0 && player.body.touching.right)
        ) {
            this.registry.set('score', this.score);
            this.registry.set('platforms_passed', this.platformsPassed);
            this.scene.start('Gameover');
        }
    }

    private updateText(): void {
        this.scoreText!.setText(`Score: ${this.score}`);
        this.stageText!.setText(`Game Stage: ${this.stage + 1}`);
        this.nextStageText!.setText(`Next Game Stage: ${Math.round(this.nextStagePoints)}`);
    }

    get currentScrollSpeed(): number {
        return (CONFIG.initial_scroll_speed + this.stage * CONFIG.scroll_speed_increase_per_points) * -1;
    }
}

export default Game;
