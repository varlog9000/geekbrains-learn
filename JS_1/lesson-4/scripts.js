function quest() {
    var event, //то, что выбрал пользователь
        ok, //Проверка ответа
        current, //Текущее состояние
        gaming = true, //Идет игра
        step = 0, // номер шага
        endLog=''; // Лог по окончанию игры


 // база данных с логом перемещений


    current = works[0];

    function writeLog(gameStep, userEvent) {
        var currentStep = works[gameStep];
        currentStep.log = current.answer[userEvent];
    }

    function readLog() {
        var logResult = '';
        for (var i=0; i<step; i++) {
            var st = i+1;
            var currentStep =  works[i];
            logResult += ('Шаг: ' + st + ', ваш выбор: ' + currentStep.log );
        }
        return logResult;
    }

//Процесс игры
    while (gaming) {
        var count = 0, answers = '';

        //Формируем строку ответа
        for (var key in current.answer) {
            answers += current.answer[key];
            count++;
        }
        if (count === 0) {
            alert(current.text+ '\n Статистика вашей игры: Вы сделали ' + step + ' шагов. \n' + readLog());
            gaming = false;
            break;
        }

        //Ввод события и проверка его на правильность
        do {
            ok = false;
            event = parseInt(prompt(current.text + answers + '-1 - Выход из игры и вывод лога игры \n' + 'В игре вы сделали ' + step + ' шагов'));

            if (event === -1) {

                alert('Спасибо за игру! \n Статистика вашей игры: Вы сделали ' + step + ' шагов. \n' + readLog());
                gaming = false;
                break;
            } else {
                ok = isAnswer(count, event);
            }
        } while (!ok);

        //Переход к след. вопросу
        writeLog(step, event);
        step += 1;
        current = works[current.jump[event]];
    }

//Функция проверки ответа
    function isAnswer(q, event) {
        if (isNaN(event) || !isFinite(event)) {
            alert('Введен недопустимый символ.');
            return false;
        } else if (event < 1 || event > q) {
            alert('Ваше число выходит из диапазона.');
            return false;
        }
        return true;
    }
}


function convertToObject(n) {
    var result;
    var decomposedNumber = {};
    var units;
    var dozens;
    var hundreds;
    var txt1 = '';
    var txt2 = '';
    if ((n >= 0) && (n <= 999)) {
        hundreds = Math.floor(n / 100);
        dozens = Math.floor((n - 100 * hundreds) / 10);
        units = (n - (100 * hundreds + 10 * dozens));
        decomposedNumber = {
            'Единицы': units,
            'Десятки': dozens,
            'Сотни': hundreds
        };
        txt1 = 'Объект полученный из числа ';
        txt2 = ':';
    } else {
        txt1 = 'Вы ввели число ';
        txt2 = ', оно не входит в ряд от 0 до 999, получите пустой объект. Распишитесь :)';
    }
    result = (txt1 + n + txt2 + '\n');
    for (var pr in decomposedNumber) {
        result += (pr + ': ' + decomposedNumber[pr] + '\n');
    }
    alert(result);
}