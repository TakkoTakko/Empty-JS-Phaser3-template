import './style.css'
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {


    constructor() {
        super("scene-game");

    }

    preload() {
        console.log('preload')
    }



    create() {
        console.log('create')
        this.add.text(800, 700, 'Hello World', { fill: '#0f0' })
    }

    update() {
        console.log('update');
    }
}






const config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    backgroundColor: '#333333',
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 5 },
            debug: true,
        },
    },
    plugins: {},
    scene: [GameScene],
};

new Phaser.Game(config);