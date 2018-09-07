var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 400; // 300мс
var snake = [];
var barier =[];
var direction = 'y+'; //Направление движения
var oldDirection = 'y+'; //Направление движения старое
var gameRunning = false;
var snakeTimer;
var barierTimer;
var foodTimer;
var score = 0;
var FOOD_SPEED = 10000;
var BARIER_SPEED = 5000;


prepareGameField();
document.getElementById('snake-new-game').addEventListener('click', startGame);
addEventListener('keydown', changeDirection);

function prepareGameField() {
    //Создаем таблицу
    var gameTable = document.createElement('table');
    gameTable.classList.add('game-table');
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        var row = document.createElement('tr');
        row.classList.add('game-table-row');

        for (var j = 0; j < FIELD_SIZE_X; j++) {
            var cell = document.createElement('td');
            cell.classList.add('game-table-cell');
            cell.classList.add('cell-' + i + '-' + j); //номер внутри
            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(gameTable);
}

//СОздание змейки
function respawn() {
    var startCoordsX = Math.floor(FIELD_SIZE_X / 2); // 10
    var startCoordsY = Math.floor(FIELD_SIZE_Y / 2); // 10
    //Голова
    var snakeHead = document.getElementsByClassName('cell-' + startCoordsY + '-' + startCoordsX)[0];
    snakeHead.classList.add('snake-unit');
    snakeHead.setAttribute('data_y', startCoordsY.toString());
    snakeHead.setAttribute('data_x', startCoordsX.toString());
    //Тело змейки
    var snakeBody = document.getElementsByClassName('cell-' + (startCoordsY - 1) + '-' + startCoordsX)[0];
    snakeBody.classList.add('snake-unit');
    snake.push(snakeBody);
    snake.push(snakeHead);
    console.log(snake);
}

//Создание еду
function createFood() {
    var foodCreated = false;
    while (!foodCreated) { //Бесконечный цикл создания еды
        var foodX = Math.floor(Math.random() * FIELD_SIZE_X); //Радом х
        var foodY = Math.floor(Math.random() * FIELD_SIZE_Y); //Радом y
        var foodCell = document.querySelector('.cell-' + foodY + '-' + foodX);
        if (!foodCell.classList.contains('snake-unit') && !foodCell.classList.contains('food-unit')) {
            foodCell.classList.add('food-unit');
            foodCreated = true;
        }
    }
}

//Проверка на еду
function haveFood(unit) {
    if (unit.classList.contains('food-unit')) {
        unit.classList.remove('food-unit');
        createFood();
        score++;
        document.getElementsByClassName('score')[0].innerText = score;
        return true;
    }
    return false;
}

function createBarrier() {
    var barierCreated = false;
    while (!barierCreated) { //Бесконечный цикл создания препятсвий
        var barierX = Math.floor(Math.random() * FIELD_SIZE_X); //Радом х
        var barierY = Math.floor(Math.random() * FIELD_SIZE_Y); //Радом y
        var barierCell = document.querySelector('.cell-' + barierY + '-' + barierX);
        if (!barierCell.classList.contains('snake-unit') && !barierCell.classList.contains('food-unit') && !barierCell.classList.contains('barier-unit')) {
            barierCell.classList.add('barier-unit');
            barier.push(barierCell);
            if (barier.length >9){
                barier.splice(0, 1)[0].classList.remove('barier-unit');
            }
            barierCreated = true;
        }
    }
}

function haveBarier(unit) {
    if (unit.classList.contains('barier-unit')) {
        return true;
    }
    return false;
}

function move() {
    var newUnit;
    var coordY = parseInt(snake[snake.length - 1].getAttribute('data_y'));
    var coordX = parseInt(snake[snake.length - 1].getAttribute('data_x'));

    //Определяем новую точку
    switch (direction) {
        case 'x-':
            newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX -= 1));
            if (newUnit == null) {
                newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX += FIELD_SIZE_X));
            }
            break;
        case 'x+':
            newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX += 1));
            if (newUnit == null) {
                newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX -= FIELD_SIZE_X));
            }
            break;
        case 'y-':
            newUnit = document.querySelector('.cell-' + (coordY -= 1) + '-' + (coordX));
            if (newUnit == null) {
                newUnit = document.querySelector('.cell-' + (coordY += FIELD_SIZE_Y) + '-' + (coordX));
            }
            break;
        case 'y+':
            newUnit = document.querySelector('.cell-' + (coordY += 1) + '-' + (coordX));
            if (newUnit == null) {
                // coordY -= (FIELD_SIZE_Y - 1);
                newUnit = document.querySelector('.cell-' + (coordY -= FIELD_SIZE_Y) + '-' + (coordX));
            }
            break;
    }
    if (snake.indexOf(newUnit) === -1 && !haveBarier(newUnit)) {
        snake[snake.length - 1].removeAttribute('data_y');
        snake[snake.length - 1].removeAttribute('data_x');

        newUnit.classList.add('snake-unit');
        snake.push(newUnit);
        snake[snake.length - 1].setAttribute('data_y', coordY.toString());
        snake[snake.length - 1].setAttribute('data_x', coordX.toString());
        // console.log(snake);
        //Проверка хвоста
        if (!haveFood(newUnit)) {
            //Уменьшение хвоста
            // snake.splice(0, 1)[0].classList.remove('snake-unit');
            snake.splice(0, 1)[0].classList.remove('snake-unit');
            // var bar = snake.splice(0, 1);
            // console.log(bar);
            // bar[0].classList.remove('snake-unit');
        }
    } else {
        //Заканчиваем игру
        finishGame();
    }
    oldDirection = direction;
}

//=====================================
// function move() {
//     var newUnit;
//     var coordY = parseInt(snake[snake.length - 1].getAttribute('data_y'));
//     var coordX = parseInt(snake[snake.length - 1].getAttribute('data_x'));
//
//     //Определяем новую точку
//     switch (direction) {
//         case 'x-':
//             newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX -= 1));
//             break;
//         case 'x+':
//             newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX += 1));
//             break;
//         case 'y-':
//             newUnit = document.querySelector('.cell-' + (coordY -= 1) + '-' + (coordX));
//             break;
//         case 'y+':
//             newUnit = document.querySelector('.cell-' + (coordY += 1) + '-' + (coordX));
//             break;
//     }
//     if (snake.indexOf(newUnit) === -1 && newUnit !== null) {
//         snake[snake.length - 1].removeAttribute('data_y');
//         snake[snake.length - 1].removeAttribute('data_x');
//
//         newUnit.classList.add('snake-unit');
//         snake.push(newUnit);
//         snake[snake.length - 1].setAttribute('data_y', coordY.toString());
//         snake[snake.length - 1].setAttribute('data_x', coordX.toString());
//         // console.log(snake);
//         //Проверка хвоста
//         if (!haveFood(newUnit)) {
//             //Уменьшение хвоста
//             // snake.splice(0, 1)[0].classList.remove('snake-unit');
//             snake.splice(0, 1)[0].classList.remove('snake-unit');
//             // var bar = snake.splice(0, 1);
//             // console.log(bar);
//             // bar[0].classList.remove('snake-unit');
//         }
//     } else {
//         //Заканчиваем игру
//         finishGame();
//     }
//     oldDirection = direction;
// }
//=====================================


//Старт игры
function startGame() {
    gameRunning = true;
    document.getElementsByClassName('score')[0].innerText = score;
    //Сброс прошлой игры
    direction = 'y+';
    oldDirection = 'y+';
    score = 0;
    for (var i = 0; i < snake.length; i++) {
        snake[i].classList.remove('snake-unit');
    }
    snake = [];
    var units = document.getElementsByClassName('food-unit');
    for (i = 0; i < units.length; i++) {
        units[i].classList.remove('food-unit');
    }

    var unitsBarier = document.getElementsByClassName('barier-unit');
    for (i = 0; i < units.length; i++) {
        unitsBarier[i].classList.remove('barier-unit');
    }

    // snake[snake.length - 1].removeAttribute('data_y');
    // snake[snake.length - 1].removeAttribute('data_x');

    //Старт новой игры
    clearInterval(snakeTimer);
    clearInterval(barierTimer);
    clearInterval(foodTimer);
    respawn(); //Создание змейки
    createFood();
    snakeTimer = setInterval(move, SNAKE_SPEED); // Запуск move каждые 300ms
    barierTimer = setInterval(createBarrier, BARIER_SPEED);
    foodTimer = setInterval(createFood, FOOD_SPEED);
    // setTimeout(createFood, 5000); //Еду создавать каждые 5000ms
    // setTimeout(createBarrier, 5000);
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: //Клавиша влево
            if (oldDirection !== 'x+') {
                direction = 'x-'
            }
            break;
        case 38: //Клавиша вверх
            if (oldDirection !== 'y+') {
                direction = 'y-'
            }
            break;
        case 39: //Клавиша вправо
            if (oldDirection !== 'x-') {
                direction = 'x+'
            }
            break;
        case 40: //Клавиша вниз
            if (oldDirection !== 'y-') {
                direction = 'y+'
            }
            break;
    }
}

function finishGame() {
    gameRunning = false;
    clearInterval(snakeTimer);
    //Условие победы в игре
    if (score < FIELD_SIZE_X * FIELD_SIZE_Y - Math.floor(FIELD_SIZE_X * FIELD_SIZE_Y)) {
        alert("Проиграл\nВаш результат " + score.toString());
    } else {
        alert("Победил\nВаш результат " + score.toString());
    }
}



