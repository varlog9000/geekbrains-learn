var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // массив сдля преобразования цифр в буквы
var chessFigureName = ['1', '2', '3', '4', '5', '6'];  // массив для определения номера объекта с соответсвующей фигурой...
// ... при начальной отладке кода у меня в этом массиве вместо цифр были названия фигур
var chessFigureUnicode = {  // объект с кодами изображений фигур из Юникода
    white: {1: '&#9817', 2: '&#9814', 3: '&#9816', 4: '&#9815', 5: '&#9813', 6: '&#9812'},  // белые
    black: {1: '&#9823', 2: '&#9820', 3: '&#9822', 4: '&#9821', 5: '&#9819', 6: '&#9818'}   // черные
    //           пешки,      ладьи,        кони,        слоны,       ферзи        короли
};
var chessBuffer = '';
var chessMoveTag = false;


function evenOdd(num) {  // определяем четные и нечетные числа
    if (num % 2 == 0) {
        return true;   // если чет - то функция вернет true
    } else {
        return false;
    }
}

function blackSquare(row, col) {   // Определяем клетки, которые будут темными
    if (row > 0 && row < 9 && col > 0 && col < 9) {
        var evenOddRow = evenOdd(row);
        var evenOddCol = evenOdd(col);
        if (evenOddCol == evenOddRow) { // если обе координаты клетки одновременно четные или нечетные, то клетка темная
            // return true;
            return 'chess__square_black'; // имя класса для раскраски темной клетки
        } else {
            // return false;
            return 'chess__square_white'; // имя класса для раскраски светлой клетки
        }
    } else {
        return 'none'
    }
}


function chessFigure(row, col) { // определяем какую фигуру поставить в клетку в зависимости от ее координат
    if ((row == 2 || row == 7) && (col > 0 && col < 9)) { // пешки стоят во 2 и 7 рядах
        return chessFigureName[0]; // указываем на массив с подстновочными кодами для объекта с изображениями из Юникода
    } else if ((row == 1 || row == 8) && (col == 1 || col == 8)) { // Ладьи по углам доски
        return chessFigureName[1];
    } else if ((row == 1 || row == 8) && (col == 2 || col == 7)) { // кони в 1 и 8 ряду во 2 и 7 столбце
        return chessFigureName[2];
    } else if ((row == 1 || row == 8) && (col == 3 || col == 6)) { // слоны...
        return chessFigureName[3];
    } else if ((row == 1 || row == 8) && (col == 4)) { // ферзи...
        return chessFigureName[4];
    } else if ((row == 1 || row == 8) && (col == 5)) { // короли...
        return chessFigureName[5];
    } else {
        return 'none'; // клетки в которых нет фигур
    }
}

function colorChessFigure(row) {  // Определяем цвет фигуры в зависимости от строки на которой она расположена
    if (row < 3 && row > 0 && col > 0 && col < 9) { // вверху доски будут черные
        return 'black';
    } else if (row > 6 && row < 9 && col > 0 && col < 9) { // внизу доски будут белые
        return 'white';
    } else {
        return 'none' // в других местах - никакие :)))
    }
}

function classSquare(row, col) {  // определяем какой класс присвоем ячейке на шахматной доске, чтобы раскрасить
    if (row == 9) {
        return 'chess__coordinates_horizontal'; // ряд букв внизу
    } else if (row == 0) {
        return 'chess__coordinates_horizontal-invert'; // ряд букв вверху
    }
    else if (col == 0) {
        return 'chess__coordinates_vertical'; // ряд цифр слева
    } else if (col == 9) {
        return 'chess__coordinates_vertical-invert'; // ряд букв справа
    }
    else {
        return 'chess__square'; // остальные клетки
    }
}

function nameSquare(row, col) {  // Здесь выводим имя ячейки в зависимости от координат
    if (row == 9 || row == 0) {  // для отладки использовался код, который для каждой ячейки выводил ее адрес
        if (col == 0 || col == 9) { // потом он был переписан для вывода цифр и букв по краю игрового поля
            return '';
        } else {
            return letters[col - 1]; // в масиве нумерация от 0, а клетки с буквами идут в столбцах начиная с 1
        }
    } else if (col == 0 || col == 9) {
        return row;
    } else {
        return '';
    }
}

function nameIdSquare(row, col) {  // !!!!!!!!!! Хочу сделать перемещение фигур. Это одна из функций для этого.
    // Она не принимает участие в генерации первоначальной доски
    if (row == 9 || row == 0 || col == 0 || col == 9) {
        return '';
    } else {
        return letters[col - 1] + row; // в масиве нумерация от 0, а клетки с буквами идут в столбцах начиная с 1
    }
}

function chessFigureUnicodeAndColog(row, col) {  // вывод изображений фигур как символов unicode
    if (((col > 0 && col < 9)) && ((row > 0 && row < 3) || (row > 6 && row < 9))) { // фируры выводим только в первых и последних двух рядах
        // функция некоторое время не работала и была разбита на части для пошаговой отладки
        // var currentColor = colorChessFigure(row);
        // var currentChessColor = chessFigureUnicode[currentColor];
        // var currentChessFigure = chessFigure(row, col);
        // return currentChessColor[currentChessFigure];
        return chessFigureUnicode[colorChessFigure(row)][chessFigure(row, col)]; // функция в одной строке
        // в результате функция возвращает из объекта chessFigureUnicode код фигуры в зависимости от координаты клетки и цвета фигуры
    } else {
        return '';
    }
}

function moveChess(idName) {
    //console.log(event.type);
    if (chessMoveTag === false) {
        chessBuffer = document.getElementById(idName).innerText;
        console.log(chessBuffer);
        chessMoveTag = true;
    } else {
        document.getElementById(idName).innerText = chessBuffer;
        chessBuffer = '';
        console.log(chessBuffer);
        chessMoveTag = false;
    }


}

for (var row = 0; row <= 9; row++) { // Перебираем в цикле все координаты
    for (var col = 0; col <= 9; col++) {  // и генерируем код в DOM
        //document.getElementById('chess').innerHTML += "<div id='" + nameIdSquare(row, col) + "' class='" + classSquare(row, col) + " " + blackSquare(row, col) + "'>" + nameSquare(row, col) + chessFigureUnicodeAndColog(row, col) + "</div>";
        var currentSquare = document.getElementById('chess');
        // console.log(classSquare(row, col).toString());
        currentSquare.classList.add = classSquare(row, col).toString();
        currentSquare.classList.add = blackSquare(row, col).toString();
        currentSquare.id = nameIdSquare(row, col).toString();
        currentSquare.innerText = chessFigureUnicodeAndColog(row, col);


        var idName = nameIdSquare(row, col);
        if (idName != '') {
            var chessBlock = document.getElementById(idName);
            chessBlock.onclick = moveChess(idName);
            console.log(chessBlock.id, ' ', chessBlock.onclick);
            // console.log(chessBlock.onclick);
        }

        // находим ID Chess и в мне генерируем HTML    <div class="       имя класса клетки,  пробел, имя класса цвета клетки, ">     Координаты клетки            код фигуры в Юникоде            </div>
        //
        // console.log('Черное: ' + blackSquare(row, col) + ' ' + nameSquare(row, col) + ' ' + chessFigure(row, col) + ' ' + colorChessFigure(row));
        // console.log(nameIdSquare(row, col));
    }
}
// На часах четвертый час ночи, вроде все закончил. Пойду спать :))