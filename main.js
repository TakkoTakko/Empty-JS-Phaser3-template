import './style.css'
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {

    constructor() {
        // returns Phaser.Scene name
        super("scene-game");
    }

    preload() {
        console.log('{Phaser3} {GameScene} preload');

        // Here you load all your assets
        // This is called once, at startup
    }

    create() {
        console.log('{Phaser3} {GameScene} create');

        // Here you create all your objects
        // This is called once

        /**
         * Hello world text
         * @type {Phaser.GameObjects.Text}
         */
        this.add.text(600, 15, 'Hello World', { fill: '#0f0', fontSize: '120px' })
    }

    update() {
        console.log('{Phaser3} {GameScene} update');

        // Here you update all your objects
        // This is called every frame
    }
}

/**
 * default game config
 * @type {{backgroundColor: string, canvas: *, plugins: {}, physics: {default: string, arcade: {debug: boolean, gravity: {y: number}}}, width: number, type: number, height: number, scene: GameScene[]}}
 */

const config = {
    type: Phaser.WEBGL, // select the WebGL or Canvas renderer, otherwise AUTO
    width: 1920, // width of the game area
    height: 1080, // height of the game area
    backgroundColor: '#333333',
    canvas: gameCanvas, // This is the id of the canvas tag in your index.html file
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 5 },
            debug: true,
        },
    },
    plugins: {}, // load phaser plugins here
    scene: [GameScene],
};

new Phaser.Game(config);