import * as Phaser from 'phaser';

const GAME_OPTIONS = {
    // platform speed range, in pixels per second
    platformSpeedRange: [300, 300],

    // mountain speed, in pixels per second
    mountainSpeed: 80,

    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],

    // platform width range, in pixels
    platformSizeRange: [90, 300],

    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],

    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,

    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],

    // player gravity
    playerGravity: 900,

    // player jump force
    jumpForce: 400,

    // player starting X position
    playerStartPosition: 200,

    // consecutive jumps allowed
    jumps: 2,

    // % of probability a coin appears on the platform
    coinPercent: 25,

    // % of probability a fire appears on the platform
    firePercent: 25
};



class Boot extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        this.load.image('platform', 'assets/platform.png');

        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 24,
            frameHeight: 48,
        });

        this.load.spritesheet('coin', 'assets/coin.png', {
            frameWidth: 20,
            frameHeight: 20,
        });

        this.load.spritesheet('fire', 'assets/fire.png', {
            frameWidth: 40,
            frameHeight: 70
        });

        this.load.spritesheet('mountain', 'assets/mountain.png', {
            frameWidth: 512,
            frameHeight: 512
        });
    }

    create() {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1,
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'burn',
            frames: this.anims.generateFrameNumbers('fire', {
                start: 0,
                end: 4,
            }),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 5
            }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });

        this.scene.start('Game');
    }
}

class Game extends Phaser.Scene {
    mountainGroup?: Phaser.GameObjects.Group;
    platformGroup?: Phaser.GameObjects.Group;
    platformPool?: Phaser.GameObjects.Group;
    coinGroup?: Phaser.GameObjects.Group;
    coinPool?: Phaser.GameObjects.Group;
    fireGroup?: Phaser.GameObjects.Group;
    firePool?: Phaser.GameObjects.Group;
    player?: Phaser.Physics.Arcade.Sprite;
    platformCollider?: Phaser.Physics.Arcade.Collider;

    addedPlatforms = 0;
    playerJumps = 0;
    dying = false;
    nextPlatformDistance = 0;

    constructor() {
        super("Game");
    }

    create() {
        this.mountainGroup = this.add.group();
        this.platformGroup = this.add.group({
            removeCallback: (platform: Phaser.GameObjects.GameObject) => {
                this.platformPool!.add(platform);
            }
        });

        this.platformPool = this.add.group({
            removeCallback: (platform: Phaser.GameObjects.GameObject) => {
                this.platformGroup!.add(platform);
            }
        });

        this.coinGroup = this.add.group({
            removeCallback: (coin: Phaser.GameObjects.GameObject) => {
                this.coinPool!.add(coin);
            }
        });

        this.coinPool = this.add.group({
            removeCallback: (coin: Phaser.GameObjects.GameObject) => {
                this.coinGroup!.add(coin);
            }
        });

        this.fireGroup = this.add.group({
            removeCallback: (fire: Phaser.GameObjects.GameObject) => {
                this.firePool!.add(fire);
            }
        });

        this.firePool = this.add.group({
            removeCallback: (fire: Phaser.GameObjects.GameObject) => {
                this.fireGroup!.add(fire);
            }
        });

        this.addMountains();

        this.addPlatform(+this.game.config.width, +this.game.config.width / 2, +this.game.config.height * GAME_OPTIONS.platformVerticalLimit[1]);

        this.player = this.physics.add.sprite(GAME_OPTIONS.playerStartPosition, +this.game.config.height * 0.7, 'player');
        this.player.setGravityY(GAME_OPTIONS.playerGravity);
        this.player.setDepth(2);

        this.dying = false;

        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, () => {
            if (!this.player!.anims.isPlaying) {
                this.player!.anims.play('run');
            }
        }, undefined, this);

        this.physics.add.overlap(this.player, this.fireGroup, () => {
            this.dying = true;
            this.player!.anims.stop();
            this.player!.setFrame(2);
            (this.player!.body as Phaser.Physics.Arcade.Body).setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider!);
        });

        this.physics.add.overlap(this.player, this.coinGroup, (_, c) => {

            const coin = c as Phaser.Physics.Arcade.Sprite;
            this.tweens.add({
                targets: coin,
                y: coin.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: () => {
                    this.coinGroup!.killAndHide(coin);
                    this.coinGroup!.remove(coin);
                }
            });

        }, undefined, this);


        this.input.on('pointerdown', this.jump, this);
    }

    addPlatform(width: number, x: number, y: number) {
        const platformPool = this.platformPool!;
        const coinPool = this.coinPool!;
        const firePool = this.firePool!;
        const { Between } = Phaser.Math;
        this.addedPlatforms += 1;
        let platform: Phaser.GameObjects.TileSprite;
        if (platformPool.getLength()) {
            platform = platformPool.getFirst();
            platform.x = x;
            platform.y = y;
            platform.active = true;
            platform.visible = true;
            platformPool.remove(platform);
            // let newRatio = width / platform.displayWidth;
            platform.displayWidth = width;
            platform.tileScaleX = 1 / platform.scaleX;
        } else {
            platform = this.add.tileSprite(x, y, width, 32, 'platform');

            this.physics.add.existing(platform);
            (platform.body as Phaser.Physics.Arcade.Body).setImmovable(true);
            (platform.body as Phaser.Physics.Arcade.Body).setVelocityX(Between(GAME_OPTIONS.platformSpeedRange[0], GAME_OPTIONS.platformSpeedRange[1]) * -1);
            platform.setDepth(2);
            this.platformGroup!.add(platform);
        }

        this.nextPlatformDistance = Between(GAME_OPTIONS.spawnRange[0], GAME_OPTIONS.spawnRange[1]);

        if (this.addedPlatforms > 1) {
            if (Between(1, 100) <= GAME_OPTIONS.coinPercent) {
                if (coinPool.getLength()) {
                    let coin: Phaser.GameObjects.TileSprite = coinPool.getFirst();
                    console.log(coin);
                    coin.x = x;
                    coin.y = y;
                    coin.alpha = 1;
                    coin.active = true;
                    coin.visible = true;
                    coinPool.remove(coin);
                } else {
                    let coin = this.physics.add.sprite(x, y - 96, 'coin');
                    coin.setImmovable(true);
                    coin.setVelocityX(platform.body.velocity.x);
                    coin.anims.play('rotate');
                    coin.setDepth(2);
                    this.coinGroup!.add(coin);
                }
            }
        }

        if (Between(1, 100) <= GAME_OPTIONS.firePercent) {
            if (firePool.getLength()) {
                let fire = firePool.getFirst();
                fire.x = x - width / 2
                fire.y = y - 46;
                fire.alpha = 1;
                fire.active = true;
                fire.visible = true;
                firePool.remove(fire);
            } else {
                let fire = this.physics.add.sprite(x - width / 2 + Between(1, width), y - 46, 'fire');
                fire.setImmovable(true);
                fire.setVelocityX(platform.body.velocity.x);
                fire.setSize(8, 2);
                fire.anims.play('burn');
                fire.setDepth(2);
                this.fireGroup!.add(fire);
            }
        }
    }

    jump() {
        if ((!this.dying) && (this.player!.body.touching.down || (this.playerJumps > 0 && this.playerJumps < GAME_OPTIONS.jumps))) {
            if (this.player!.body.touching.down) {
                this.playerJumps = 0;
            }

            this.player!.setVelocityY(GAME_OPTIONS.jumpForce * -1);
            this.playerJumps += 1;

            this.player!.anims.stop();
        }
    }

    update() {
        const player = this.player!;
        const platformGroup = this.platformGroup!;
        const coinGroup = this.coinGroup!;
        const fireGroup = this.fireGroup!;
        const mountainGroup = this.mountainGroup!;
        if (player.y > this.game.config.height) {
            this.scene.start('game');
        }

        player.x = GAME_OPTIONS.playerStartPosition;

        let minDistance = +this.game.config.width;

        let rightmostPlatformHeight = 0;

        console.log('iteration-------------------------------------------------------');
        platformGroup.getChildren().forEach(function(this: Game, p) {
            const platform = p as Phaser.Physics.Arcade.Sprite;
            let platformDistance = +this.game.config.width - platform.x - platform.displayWidth / 2;
            console.log(platform.x, platformDistance);
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < -platform.displayWidth / 2){
                platformGroup.killAndHide(platform);
                platformGroup.remove(platform);
            }
        }, this);

        coinGroup.getChildren().forEach((c) => {
            const coin = c as Phaser.Physics.Arcade.Sprite;
            if (coin.x < -coin.displayWidth / 2) {
                coinGroup.killAndHide(coin);
                coinGroup.remove
            }
        }, this);

        fireGroup.getChildren().forEach(function(f){
            const fire = f as Phaser.Physics.Arcade.Sprite;
            if(fire.x < - fire.displayWidth / 2){
                fireGroup.killAndHide(fire);
                fireGroup.remove(fire);
            }
        }, this);

        mountainGroup.getChildren().forEach(function(this: Game, m){
            const mountain = m as Phaser.Physics.Arcade.Sprite;
            if(mountain.x < - mountain.displayWidth){
                let rightmostMountain = this.getRightmostMountain();
                mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
                mountain.y = +this.game.config.height + Phaser.Math.Between(0, 100);
                mountain.setFrame(Phaser.Math.Between(0, 3))
                if(Phaser.Math.Between(0, 1)){
                    mountain.setDepth(1);
                }
            }
        }, this);

        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(GAME_OPTIONS.platformSizeRange[0], GAME_OPTIONS.platformSizeRange[1]);
            let platformRandomHeight = GAME_OPTIONS.platformHeighScale * Phaser.Math.Between(GAME_OPTIONS.platformHeightRange[0], GAME_OPTIONS.platformHeightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = +this.game.config.height * GAME_OPTIONS.platformVerticalLimit[0];
            let maxPlatformHeight = +this.game.config.height * GAME_OPTIONS.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(nextPlatformWidth, +this.game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }


    addMountains() {
        let rightmostMountain = this.getRightmostMountain();

        const { Between } = Phaser.Math;

        if (rightmostMountain < +this.game.config.width * 2) {
            let mountain = this.physics.add.sprite(rightmostMountain + Between(100, 350), +this.game.config.height + Between(0, 100), 'mountain');

            mountain.setOrigin(0.5, 1);
            (mountain.body as Phaser.Physics.Arcade.Body).setVelocityX(GAME_OPTIONS.mountainSpeed * -1);
            this.mountainGroup!.add(mountain);

            if (Between(0, 1)) {
                mountain.setDepth(1);
            }

            this.addMountains();
        }
    }

    getRightmostMountain(): number {
        let rightmostMountain = -200;
        this.mountainGroup!.getChildren().forEach((mountain) => {
            rightmostMountain = Math.max(rightmostMountain, mountain.body.position.x);
        });

        return rightmostMountain;
    }
}


new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Boot, Game],
    backgroundColor: 0x0c88c7,
    fps: {
        target: 5,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
    }
});
