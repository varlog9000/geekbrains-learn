var steps = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
var step, question, money, current;


function startGame() { // Функция инициализирует начало игры. Устанавливает счетчик шагов на 0 и ключает все подсказки
    step = 0;
    outputQuestion(step);
    statusLine.value = 'Игра началась';
    enableAllKey();
}

function outputQuestion(number) { // функция для вывода вопроса и вариантов ответа в форму на экране в зависимости от номера шага
    current = billionQ[number];
    qs.value = current.question;  // Выводим вопрос в его поле
    for (var key in current.answer) {
        switch (key) {  // Просматриваем и выводим ответы в соответствующие поля
            case '1':
                ans1.value = current.answer[key];
                break;
            case '2':
                ans2.value = current.answer[key];
                break;
            case '3':
                ans3.value = current.answer[key];
                break;
            case '4':
                ans4.value = current.answer[key];
                break;
        }
    }
}

function enableAllKey() {   // Функция включает все кнопки кроме Начать игру
    keyTakeMoney.disabled = false;
    keyCallFriend.disabled = false;
    keyFiftyFifty.disabled = false;
    keyassistanceOfTheHall.disabled = false;
    keyTakeMoney.disabled = false;
    keyAns1.disabled = false;
    keyAns2.disabled = false;
    keyAns3.disabled = false;
    keyAns4.disabled = false;
    keyStartGame.disabled = true;  // кнопку Начать игру - отключаем
}

function disableAllKey() {  // функция отключает все кнопки кроме Начать игру после окончания игры
    keyTakeMoney.disabled = true;
    keyCallFriend.disabled = true;
    keyFiftyFifty.disabled = true;
    keyassistanceOfTheHall.disabled = true;
    keyTakeMoney.disabled = true;
    keyAns1.disabled = true;
    keyAns2.disabled = true;
    keyAns3.disabled = true;
    keyAns4.disabled = true;
    keyStartGame.disabled = false;  // кнопку Начать игру включаем
}

function enableAnswerKey() {  // Функция включает кнопки ответов на следующий ход после 50/50
    keyAns1.disabled = false;
    keyAns2.disabled = false;
    keyAns3.disabled = false;
    keyAns4.disabled = false;
}

function checkAnswer(answ) { //Проверка ответа и вывод сообщения в статусную строку
    current = billionQ[step];  // для простоты работы с объектом получаем доступ к нему на текщем шаге
    if (current.result[answ]) {  // если ответ верный
        statusLine.value = 'Правильно, ваш выигрыш: ' + steps[step] + ' руб.';
        if (step < 14) {  // если мы не прошли все 15 вопросов, ...
            step ++;
            outputQuestion(step); // ... то выводим следующий вопрос
            enableAnswerKey();   // ... и разблокируем кнопки ответов, если они были заблокированы подсказкой 50/50
        } else { // если успешно прошли 15 вопросов - поздравляем с выигрышем
            statusLine.value = 'Вы Выиграли! Ваш выигрыш составил: ' + steps[step] + ' руб.';
            disableAllKey();
        }
    } else {
        if (step < 14 && step >= 9) { // если будет ошибка на вопросе с 10 по 14, то...
            step = 9; // ... закончить игру и вывести несгораемую сумму на шаге 10
            statusLine.value = 'Вы проиграли, но ваш выигрыш составил: ' + steps[step] + ' руб.';
        } else if (step < 9 && step >= 4) { // если будет ошибка на вопросе с 5 по 10, то...
            step = 4;  // ... закончить игру и вывести несгораемую сумму на шаге 5
            statusLine.value = 'Вы проиграли, но ваш выигрыш составил: ' + steps[step] + ' руб.';
        } else {  // ну а если ошибка будет до 5 вопроса, то...
            statusLine.value = 'Вы проиграли. Начинайте игру снова!'; // ... заканчиваем игру без выигрыша
        }
        disableAllKey()
    }
}

function takeMyMoney() {  // Функция Забрать деньги
    if (step - 1 < 0) {  // если вдруг игрок захочет выйти из игры на 1 ходе
        moneyEnd = 0;     // чтобы у него не выводилось "выигрыш undefined руб" прописываем в переменную "0"
    } else {
        var moneyEnd = steps[step - 1];
    }
    statusLine.value = 'Вы закончили игру, ваш выигрыш составил: ' + moneyEnd + ' руб.';
    disableAllKey();
}

function oneHalf() { // Реализация функции подсказки 50/50
    current = billionQ[step];
    var r1 = true;
    var r2 = true;
    var r3 = true;
    var r4 = true;
    var disabledAns = 0;
    while ((disabledAns < 2)) { // перебираем пока не выключим 2 неправильных ответа
        for (var key in current.answer) {  // шарим по ответам номерам ответов в объекте

            if (current.result[key] == false) {   // просматриваем только не правильные ответы

                if (Math.random() * 10 > 4) {  // если случайное число > 4, то выключаем ответ и его кнопку

                    switch (key) {
                        case '1':
                            if (r1 && (disabledAns < 2)) {  // тут опять приходится проверять, чтобы только 2 ответа отключились, а не 3
                                ans1.value = '';  // убираем ответ
                                keyAns1.disabled = true;  // блокируем кноку
                                disabledAns += 1;  // увеличиваем счетчик убранных ответов на 1
                                r1 = false;  // говорим, что этот ответ выключен, чтобы на следующем шаге, если таковой будет (рандом ведь) пропустить этот пункт
                            }
                            break;
                        case '2':
                            if (r2 && (disabledAns < 2)) {
                                ans2.value = '';
                                keyAns2.disabled = true;
                                disabledAns += 1;
                                r2 = false;
                            }
                            break;
                        case '3':
                            if (r3 && (disabledAns < 2)) {
                                ans3.value = '';
                                keyAns3.disabled = true;
                                disabledAns += 1;
                                r3 = false;
                            }
                            break;
                        case '4':
                            if (r4 && (disabledAns < 2)) {
                                ans4.value = '';
                                keyAns4.disabled = true;
                                disabledAns += 1;
                                r4 = false;
                            }
                            break;
                    }
                }
            }
        }
    }
    keyFiftyFifty.disabled = true; // отключаем кнопку с подсказской
}

function assistanceOfTheHall() {  // помощь зала
    var ah = {
        r: {
            1: Math.random(),  // для каждого ответа генерируем случайное число
            2: Math.random(),   // эти числа останутся в этом объекте только в 30% случаеи
            3: Math.random(),   // см следующий IF
            4: Math.random()
        }
    };
    if ((Math.random()) > 0.34) { // в более чем 65% случаев подсказка срабатывает точно,
        for (var i = 1; i <= 4; i++) { // Копаемся в ответах
            var rnd;
            if (current.result[i] == false) {  // если ответ не верный
                do {
                    rnd = Math.random();  // то генерим ему рандом меньше 0,3
                    ah.r[i] = rnd;
                } while (rnd > 0.3)
            } else {  // А если верный ответ...
                do {
                    rnd = Math.random();
                    ah.r[i] = rnd;
                } while (rnd < 0.6)  // генерим ему рандом больше 0,6
            }
        }
    }
    ah = {
        res: {  // для каждого ответа считаем его долю от 100%
            1: (Math.floor(ah.r[1] * 1000 / (ah.r[1] + ah.r[2] + ah.r[3] + ah.r[4]))) / 10,
            2: (Math.floor(ah.r[2] * 1000 / (ah.r[1] + ah.r[2] + ah.r[3] + ah.r[4]))) / 10,
            3: (Math.floor(ah.r[3] * 1000 / (ah.r[1] + ah.r[2] + ah.r[3] + ah.r[4]))) / 10,
            4: (Math.floor(ah.r[4] * 1000 / (ah.r[1] + ah.r[2] + ah.r[3] + ah.r[4]))) / 10
        }
    };

    ans1.value += ' (' + ah.res[1] + '%)';  // выводим в поля ответов посчитанные доли
    ans2.value += ' (' + ah.res[2] + '%)';
    ans3.value += ' (' + ah.res[3] + '%)';
    ans4.value += ' (' + ah.res[4] + '%)';

    keyassistanceOfTheHall.disabled = true; // Отключаем кнопку с подсказкой

}

function callFriend() {   // Алгоритм подсказки Звонок другу
    var ah = {
        r: {
            1: Math.random(),
            2: Math.random(),
            3: Math.random(),
            4: Math.random()
        }
    };

    if ((Math.random()) > 0.34) { // в более чем 65% случаев подсказка срабатывает точно,
        for (var i = 1; i <= 4; i++) { // Копаемся в ответах
            var rnd;
            if (current.result[i] == false) {  // если ответ не верный
                do {
                    rnd = Math.random();  // то генерим ему рандом меньше 0,3
                    ah.r[i] = rnd;
                } while (rnd > 0.3)
            } else {  // А если верный ответ...
                do {
                    rnd = Math.random();
                    ah.r[i] = rnd;
                } while (rnd < 0.6)  // генерим ему рандом больше 0,6
            }
        }
    }


    var max = 0;
    var num = 0;
    for (var key in ah.r) {
        if (ah.r[key] > max) { // находим ответ с наибольшим для которого мы сгенерировали больший рандом...
            max = ah.r[key];
            num = key;
        }
    }
    switch (num) { // ... для него выводим, ответ друга
        case '1':
            statusLine.value += '   Друг: "Я думаю, что A - это правильный ответ!"';
            break;
        case '2':
            statusLine.value += '   Друг: "Я думаю, что B - это правильный ответ!"';
            break;
        case '3':
            statusLine.value += '   Друг: "Я думаю, что C - это правильный ответ!"';
            break;
        case '4':
            statusLine.value += '   Друг: "Я думаю, что D - это правильный ответ!"';
            break;
    }
    keyCallFriend.disabled = true;   // Отключаем кнопку с подсказкой
}