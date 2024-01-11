let selectedLevel = 0;

let mainInstance = null;

class LevelManager {

    constructor(mainInstanceArg) {
        mainInstance = mainInstanceArg;
    }

    loadObjects() {
        if (mainInstance === null) {
            console.log('mainInstance is null')
            return;
        }

        mainInstance.load.image('level-easy-light', 'assets/level-easy-light-TB.png');
        mainInstance.load.image('level-easy-light', 'assets/level-easy-full-TB.png');
        mainInstance.load.image('level-easy-light', 'assets/level-medium-light-TB.png');
        mainInstance.load.image('level-easy-light', 'assets/level-medium-full-TB.png');
        mainInstance.load.image('level-easy-light', 'assets/level-hard-light-TB.png');
        mainInstance.load.image('level-easy-light', 'assets/level-hard-full-TB.png');
    }

    function
    renderLevelSelection() {
        if (mainInstance === null) {
            console.log('mainInstance is null')
            return;
        }

        mainInstance.a

    }



}