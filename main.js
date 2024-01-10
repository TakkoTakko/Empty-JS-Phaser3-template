import './style.css'
import Phaser from 'phaser'

const sizes = {
    width: 1000,
    height: 563
}

let speedDown = 30;

let isGameStarted = false;




const timerDefault = 20;
let timer = timerDefault;

let timerText = null;

const coinsInGameArea = [];

let startButton = null;
let stopButton = null;


let basket = null;
const basketSpeed = 100;

let coinsCollected = 0;
let highScore = 0;



// this function adds a start button (picture) or a text in the top middle of the screen. When clicking it changes to a stop button
function addStartButton(thisObj, usePicture = true) {
    if (typeof usePicture === 'boolean' && usePicture) {
        startButton = thisObj.add.image(480, 35, 'start-button').setScale(0.1);
    } else {
        startButton = thisObj.add.text(480, 35, 'Start', { fill: '#0f0' });
    }
    startButton.setInteractive().on('pointerdown', () => {
        isGameStarted = true;
        thisObj.physics.resume();
        renderBasket(thisObj);
        startButton.destroy();
        addStopButton(thisObj, usePicture);
    });
    return startButton;
}

// this function adds a stop button (picture) or a text in the top middle of the screen. When clicking it changes to a start button
function addStopButton(thisObj, usePicture = true) {
    if (typeof usePicture === 'boolean' && usePicture) {
        stopButton = thisObj.add.image(480, 35, 'stop-button').setScale(0.1);
    } else {
        stopButton = thisObj.add.text(480, 35, 'Stop', {fill: '#0f0'});
    }
    stopButton.setInteractive().on('pointerdown', () => {
        isGameStarted = false;
        coinsInGameArea.forEach(coin => {
            coin.destroy();
        });

        timer = timerDefault;
        renderTimer(thisObj);

        coinsCollected = 0;
        renderCoins(thisObj);

        hitNewHighscore = false;

        stopButton.destroy();
        if (basket !== null) {
            basket.destroy();
        }
        addStartButton(thisObj, usePicture);
    });
    return stopButton;
}

function renderTimer(thisObject, time = timer) {
    if (timerText !== null) timerText.destroy();
    timerText = thisObject.add.text(900, 10, 'Timer: ' + time, {fill: '#0f0'});

}

let coinsText = null;
let highScoreText = null;

let hitNewHighscore = false;


function renderCoins(thisObject, coinsToRender = coinsCollected) {
    if (coinsToRender > highScore) {
        if (!hitNewHighscore) {
            const newHighscoreText = thisObject.add.text(270, 200, 'New Highscore!', {fill: '#0f0', fontSize: '60px'});
            setTimeout(() => {
                newHighscoreText.destroy();
            }, 1500);
            }
        hitNewHighscore = true;
        highScore = coinsToRender;
        console.log('New highscore: ' + highScore);
    }

    if (coinsText !== null) coinsText.destroy();
    coinsText = thisObject.add.text(10, 30, 'Coins: ' + coinsToRender, {fill: '#0f0'});
    if (highScoreText !== null) highScoreText.destroy();
    highScoreText = thisObject.add.text(10, 10, 'Highscore: ' + highScore, {fill: '#0f0'});
}

function spawnCoin(thisObject) {
    let xCord = Math.floor(Math.random() * sizes.width);

    const spawnedCoin = thisObject.physics.add.image(xCord, 85, 'coin').setScale(0.05).setMaxVelocity(100);
    coinsInGameArea.push(spawnedCoin);
}

function renderBasket(thisObject) {
    basket = thisObject.physics.add.image(480, 563, 'basket').setScale(0.8);
    basket.setCollideWorldBounds(true);
    basket.setImmovable(true);
    basket.body.allowGravity = false;
}

let testInput = null;
class GameScene extends Phaser.Scene {


    constructor() {
        super("scene-game");
    }

    preload() {
        console.log('preload')
        this.load.image('bg', 'assets/background.png');
        this.load.image('coin',  "assets/coin.png");
        this.load.image('stop-button',  "assets/stop-button.png");
        this.load.image('start-button',  "assets/start-button.png")
        this.load.image('basket', 'assets/basket.png');
    }



    create() {
        console.log('create')
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        addStartButton(this, true);

        renderTimer(this);
        renderCoins(this);


        window.setInterval(() => {

            if (isGameStarted) {
                spawnCoin(this);
            }

        }, 2000);


        testInput = this.input.keyboard.createCursorKeys();


        // 1s runnable

        window.setInterval(() => {
            if (isGameStarted) {
                timer--;
                if (timer === 0) {
                    isGameStarted = false;
                    timer = timerDefault;
                    this.physics.pause();

                    timerText.destroy();
                    stopButton.destroy();

                    const endTitle = this.add.text(180, 200, 'Game Over', {fill: '#0f0', fontSize: '120px'}).setInteractive().on('pointerdown', () => {
                        endTitle.destroy();
                        if (basket !== null) basket.destroy();
                        renderTimer(this);

                        coinsCollected = 0;
                        renderCoins(this, coinsCollected);
                        hitNewHighscore = false;

                        coinsInGameArea.forEach(coin => {
                            coin.destroy();
                        });
                        addStartButton(this, true);
                    });
                }
            }
        }, 1000);

        window.setInterval(() => {
            if (isGameStarted) {
                if (coinsInGameArea.length > 0) {
                    coinsInGameArea.forEach(coin => {
                        if (coin.y <= 0) {
                            const index = coinsInGameArea.indexOf(coin);
                            coin.destroy();
                            coinsInGameArea.splice(index, 1);
                        }
                    });
                }
            }
        }, 500);
    }

    update() {
        console.log('update')

        if (isGameStarted) {
            timerText.destroy();
            renderTimer(this);
            renderCoins(this);

            if (testInput === null) {
                testInput = this.input.keyboard.createCursorKeys();
            }

            const {left, right} = testInput;

            if (left.isDown) {
                basket.setVelocityX(-basketSpeed);
            } else if (right.isDown) {
                basket.setVelocityX(basketSpeed);
            } else {
                basket.setVelocityX(0);
            }


            this.physics.add.overlap(coinsInGameArea, basket, (coin, basket) => {
                const index = coinsInGameArea.indexOf(coin);
                coin.destroy();
                coinsInGameArea.splice(index, 1);

                coinsCollected += 1;
                renderCoins(this, coinsCollected);

                console.log('You got a coin! And now you have ' + coinsCollected + ' coins!')
            });
        }
    }
}






const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    backgroundColor: '#333333',
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: speedDown },
            debug: true,
        },
    },
    plugins: {},
    scene: [GameScene],
};

const game = new Phaser.Game(config);