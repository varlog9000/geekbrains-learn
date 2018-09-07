function simpleNumbersFunc(range) {
    var x = 0;
    var simpleNumbers = '';
    var simple = false;
    while (x <= (range - 1)) {
        ++x;
        var div = 1;
        while (div <= (x - 1)) {
            simple = true;
            ++div;
            var divRes = x / div;
            if (divRes == Math.floor(divRes)) {
                if ((div == 1) || div == x) {
                    simple = true;
                } else {
                    simple = false;
                    break;
                }
            }
        }
        if (simple) {
            simpleNumbers = simpleNumbers + x + " ";
        }
    }
    alert('Ряд простых чисел от 1 до ' + range + ':\n' + simpleNumbers);
}

function evenOddNumber(range) {
    var startNumber = 0;
    var currentNumber = startNumber;
    var endNumber = range;
    var numberType = '';
    var result = '';
    do {
        if (currentNumber == 0) {
            numberType = 'nullNumber'
        }
        else if ((currentNumber / 2) == Math.floor(currentNumber / 2)) {
            numberType = 'evenNumber'
        } else {
            numberType = 'oddNumber'
        }
        switch (numberType) {
            case 'nullNumber':
                result = result + '\n' + currentNumber + ' - это ноль';
                break;
            case 'evenNumber':
                result = result + '\n' + currentNumber + ' - четное число';
                break;
            case 'oddNumber':
                result = result + '\n' + currentNumber + ' - нечетное число';
                break;
        }
        currentNumber++;
    } while (currentNumber <= endNumber);
    alert('Четные и нечетные числа от 0 до ' + endNumber + ':' + result);
}

function notSycleBody() {
    for (var number = 0; number <= 9; console.log(number++ + " ")) {
    }
}

function pyramida() {
    var outputString;
    for (i = 1; i <= 20; i++) {
        outputString = outputString + 'x';
        console.log(outputString, '\n');
    }
}