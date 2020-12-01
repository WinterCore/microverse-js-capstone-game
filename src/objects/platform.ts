import * as Phaser from 'phaser';

import { GameObjectArgs } from 'src/typings/index';

const PLATFORM_WIDTH            = 66;
const CONNECTED_PLATFORM_WIDTH  = 64;
const PLATFORM_HEIGHT           = 66;
const CONNECTED_PLATFORM_HEIGHT = 64;

class Platform extends Phaser.GameObjects.Container {
    texture : string | Phaser.Textures.Texture;
    scene   : Phaser.Scene;
    n       : number;

    constructor({ scene, x, y, texture }: GameObjectArgs, n: number) {
        super(scene, x, y);

        this.scene   = scene;
        this.texture = texture;
        this.n       = n;

        this.constructBody();
        this.constructSurface();


        this.iterate((child: Phaser.Physics.Arcade.Image) => {
            child.setOrigin(0, 0);
        });

        const width = (n + 1) * CONNECTED_PLATFORM_WIDTH + PLATFORM_WIDTH;
        const height = window.innerHeight - y;
        this.setSize(width, height);

        scene.physics.world.enable(this);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setImmovable(true);
        body.setOffset(width / 2, height / 2);
        body.setVelocityX(-100);
        scene.add.existing(this);

        body.setFriction(0, 0);
    }

    constructSurface(): void {
        this.add(new Phaser.GameObjects.Image(this.scene, 0, 0, 'platforms', `${this.texture}_left`));
        for (let i = 0; i < this.n; i += 1) {
            this.add(
                new Phaser.GameObjects.Image(
                    this.scene,
                    (i + 1) * CONNECTED_PLATFORM_WIDTH,
                    0,
                    'platforms',
                    `${this.texture}`
                )
            );
        }
        this.add(
            new Phaser.GameObjects.Image(
                this.scene,
                (this.n + 1) * CONNECTED_PLATFORM_WIDTH,
                0,
                'platforms',
                `${this.texture}_right`
            )
        );
    }

    constructBody(): void {
        const { height } = this.scene.cameras.main;
        const ySpritesN = Math.ceil(((height - this.y) - PLATFORM_HEIGHT) / CONNECTED_PLATFORM_HEIGHT);

        for (let i = ySpritesN - 1; i >= 0; i -= 1) {
            for (let j = 0; j < this.n + 2; j += 1) {
                this.add(
                    new Phaser.GameObjects.Image(
                        this.scene,
                        j * CONNECTED_PLATFORM_WIDTH,
                        CONNECTED_PLATFORM_HEIGHT + (i * CONNECTED_PLATFORM_HEIGHT),
                        'platforms',
                        `${this.texture}_body`
                    )
                );
            }
        }
    }
}

export default Platform;
