var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = FIELD_SIZE_X;
var SNAKE_SPEED = 300;
var snake = [];
var direction = 'y+';
var oldDirection = 'y+';
var gameRunning = false;
var snakeTimer;
var score = 0;



function prepGameField() {
    var gameTable = document.createElement('table');
    gameTable.classList.add('game-table');
    for (var Y = 0; Y < FIELD_SIZE_Y; Y++) {
        var row = document.createElement('tr');
        row.classList.add('game-table-row');
        for (var X = 0; X < FIELD_SIZE_X; X++) {
            var cell = document.createElement('td');
            cell.classList.add('game-table-cell');
            cell.classList.add('cell-' + Y + '-' + X);
            row.appendChild(cell)
        }
        gameTable.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(gameTable);
}



function respawn() {
    var startCoordX= Math.floor(FIELD_SIZE_X/2);
    var startCoordY= Math.floor(FIELD_SIZE_Y/2);

    var snakeHead= document.getElementsByClassName('cell-'+startCoordY+'-'+startCoordX)[0];
    snakeHead.classList.add('snake-unit');
    // snakeHead.setAttribute('data_y', startCoordY.toString());
    // snakeHead.setAttribute('data_x', startCoordX.toString());
    snakeBody = document.getElementsByClassName('cell-'+(startCoordY-1)+'-'+startCoordX)[0];
    snakeBody.classList.add('snake-unit');
}

prepGameField();
respawn();