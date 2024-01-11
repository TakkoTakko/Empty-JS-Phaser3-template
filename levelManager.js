let selectedLevel = 0;

// cord-x, cord-y, size,  endLevel-x, endLevel-y, endLevel-size
const buttonRenderArgs = [850, 0, 0.5, 415, 335, 0.75]

let mainInstance = null;

let levelButton = null;

let endLevelText = null;
let endLevelIcon = null;

export default class LevelManager {

    constructor(mainInstanceArg) {
        mainInstance = mainInstanceArg;
    }

    loadObjects() {
        if (mainInstance === null) {
            console.log('mainInstance is null')
            return;
        }

        mainInstance.load.image('level-easy-light', 'assets/level-easy-light-TB.png');
        mainInstance.load.image('level-easy-full', 'assets/level-easy-full-TB.png');
        mainInstance.load.image('level-medium-light', 'assets/level-medium-light-TB.png');
        mainInstance.load.image('level-medium-full', 'assets/level-medium-full-TB.png');
        mainInstance.load.image('level-hard-light', 'assets/level-hard-light-TB.png');
        mainInstance.load.image('level-hard-full', 'assets/level-hard-full-TB.png');
    }

    function
    renderLevelSelection(levelId, useFull = true) {
        if (mainInstance === null) {
            console.log('mainInstance is null')
            return;
        }

        if (levelId == null) {
            levelId = selectedLevel;
        }

        const fileExtension = useFull ? '-full' : '-light';

        switch (levelId) {
            case 0:
            default:
                if (levelButton != null) levelButton.destroy();
                levelButton = null;
                levelButton = mainInstance.add.image(buttonRenderArgs[0], buttonRenderArgs[1], this.getFileNameFromSelectedLevel() + fileExtension).setScale(buttonRenderArgs[2]).setOrigin(0, 0);
                break;
            case 1:
                if (levelButton != null) levelButton.destroy();
                levelButton = null;
                levelButton = mainInstance.add.image(buttonRenderArgs[0], buttonRenderArgs[1], this.getFileNameFromSelectedLevel() + fileExtension).setScale(buttonRenderArgs[2]).setOrigin(0, 0);
                break;
            case 2:
                if (levelButton != null) levelButton.destroy();
                levelButton = null;
                levelButton = mainInstance.add.image(buttonRenderArgs[0], buttonRenderArgs[1], this.getFileNameFromSelectedLevel() + fileExtension).setScale(buttonRenderArgs[2]).setOrigin(0, 0);
                break;
        }

        levelButton.setInteractive().on('pointerdown', () => {
            if (useFull) {
                selectedLevel++;
                if (selectedLevel > 2) {
                    selectedLevel = 0;
                }
                this.updateButton();
            }
        });
    }

    updateButton(useFull = true) {
        if (mainInstance === null) {
            console.log('mainInstance is null')
            return;
        }

        console.log("updated the level button");

        switch (selectedLevel) {
            case 0:
            default:
                levelButton.destroy();
                this.renderLevelSelection(0, useFull);
                break;
            case 1:
                levelButton.destroy();
                this.renderLevelSelection(1, useFull);
                break;
            case 2:
                levelButton.destroy();
                this.renderLevelSelection(2, useFull);
                break;
        }
    }

    getLevel() {
        if (selectedLevel == null) return 0;
        return selectedLevel;
    }

    deleteLevelButton() {
        if (levelButton != null) levelButton.destroy();
    }

    renderEndScreen() {
        endLevelText = mainInstance.add.text(buttonRenderArgs[3]-100, buttonRenderArgs[4] + 75, 'Level: ', { fill: '#0f0'}).setScale(3).setOrigin(0, 0);
        endLevelIcon = mainInstance.add.image(buttonRenderArgs[3], buttonRenderArgs[4], this.getFileNameFromSelectedLevel() + '-full').setScale(buttonRenderArgs[5]).setOrigin(0, 0);
    }

    getFileNameFromSelectedLevel() {
        switch (selectedLevel) {
            case 0:
            default:
                return 'level-easy';
            case 1:
                return 'level-medium';
            case 2:
                return 'level-hard';
        }
    }

    deleteEndScreen() {
        if (endLevelIcon != null) {
            endLevelIcon.destroy();
            endLevelIcon = null;
        }
        if (endLevelText != null) {
            endLevelText.destroy();
            endLevelText = null;
        }
    }


    getCoinSpawnRate() {
        switch (selectedLevel) {
            case 0:
            default:
                return 500;
            case 1:
                return 750;
            case 2:
                return 1000;
        }
    }

    getBasketSpeed() {
        switch (selectedLevel) {
            case 0:
            default:
                return 150;
            case 1:
                return 125;
            case 2:
                return 100;
        }
    }
}