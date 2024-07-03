// * Check range for footstep play sound. Map01 EV232
(function () {
    var playerX = $gameVariables.value(15);
    var playerY = $gameVariables.value(16);
    var monsterX = $gameVariables.value(19);
    var monsterY = $gameVariables.value(20);
    var distX = Math.abs(playerX - monsterX);
    var distY = Math.abs(playerY - monsterY);
    $gameTemp.dist = Math.min(distX, distY);

    return distX <= 3 && distY <= 3;
})();
// * Play SE based on Monster's position. Map01 EV232
(function () {
    var dist = $gameTemp.dist;
    var volume = 30 + (4 - dist) * 10;
    var pitch = $gameVariables.value(6) == 0 ? 50 : 70;
    var distX = $gameVariables.value(15) - $gameVariables.value(19);
    var pan = 20 * distX;
    var se = {
        name: 'sandals-on-wood',
        volume: volume,
        pitch: pitch,
        pan: pan,
    };
    AudioManager.playSe(se);
})();
//* Check if the monster is detected by player's lights. Map01 EV233
(function () {
    var playerX = $gameVariables.value(15);
    var playerY = $gameVariables.value(16);
    var playerDir = $gamePlayer._direction;

    var monsterX = $gameVariables.value(19);
    var monsterY = $gameVariables.value(20);

    var distX = playerX - monsterX;
    var distY = playerY - monsterY;
    var absDistX = Math.abs(distX);
    var absDistY = Math.abs(distY);
    
    $gameSwitches.setValue(2, false);
    // Inside player's basic vision (not flashlight)
    if (Math.abs(distX) <= 2 && Math.abs(distY) <= 2) {
        $gameSwitches.setValue(2, true);
    }

    // Detected by flashlight
    switch (playerDir) {
        // Facing down
        case 2:
            if (distY >= -4 && distY < 0 && absDistX <= 1) {
                $gameSwitches.setValue(2, true);
            }
            break;
        // Facing left
        case 4:
            if (distX <= 4 && distX > 0 && absDistY <= 1) {
                $gameSwitches.setValue(2, true);
            }
            break;
        // Facing right
        case 6:
            if (distX >= -4 && distX < 0 && absDistY <= 1) {
                $gameSwitches.setValue(2, true);
            }
            break;
        // Facing up
        case 8:
            if (distY <= 4 && distY > 0 && absDistX <= 1) {
                $gameSwitches.setValue(2, true);
            }
            break;
        default:
            break;
    }
})();