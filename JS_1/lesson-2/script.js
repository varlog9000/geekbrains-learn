function comparison() {
    var a = +number1.value;
    var b = +number2.value;
    var result = 0;
    if (a >= 0 && b >= 0) {
        result = a - b;
        alert('Оба числа положительные, A-B=' + result);
    }
    else if (a < 0 && b < 0) {
        result = a * b;
        alert('Оба числа отрицательные, A*B=' + result);
    }
    else {
        result = a + b;
        alert('Знаки чисел различны, A+B=' + result);
    }
}


function sequence() {
    var a = +startSeq.value;
    var result = "";
    if (a >= 0 && a <= 15) {
        switch (a) {
            case 0:
                result = " 0";
            // break;
            case 1:
                result = result + " 1";
            case 2:
                result = result + ' 2';
            case 3:
                result = result + ' 3';
            case 4:
                result = result + ' 4';
            case 5:
                result = result + ' 5';
            case 6:
                result = result + ' 6';
            case 7:
                result = result + ' 7';
            case 8:
                result = result + ' 8';
            case 9:
                result = result + ' 9';
            case 10:
                result = result + ' 10';
            case 11:
                result = result + ' 11';
            case 12:
                result = result + ' 12';
            case 13:
                result = result + ' 13';
            case 14:
                result = result + ' 14';
            case 15: {
                result = result + ' 15';
                alert('Ряд чисел:' + result);
                break;
            }
        }
    } else alert('Введите цифру от 0 до 15')
}

function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

function power(val, pow) {
    var result = val * val;
    if (pow > 2) {
        result = val * power(val, pow - 1);
    }
    return result;
}

function mathOperation(arg1, arg2, oper) {
    switch (oper) {
        case 'addt' :
            alert('Результат сложения = ' + addition(arg1, arg2));
            break;
        case 'subt':
            alert('Результат вычитания = ' + subtraction(arg1, arg2));
            break;
        case 'mult':
            alert('Результат умножения = ' + multiplication(arg1, arg2));
            break;
        case 'divs':
            alert('Результат деления = ' + division(arg1, arg2));
            break;
        case 'pw':
            alert('Результат возведения в степень = ' + power(arg1, arg2));
            break;
    }
}

function mathOperationWreturn(arg1, arg2, oper) {
    switch (oper) {
        case 'addt' :
            return addition(arg1, arg2);
            break;
        case 'subt':
            return subtraction(arg1, arg2);
            break;
        case 'mult':
            return multiplication(arg1, arg2);
            break;
        case 'divs':
            return division(arg1, arg2);
            break;
        case 'pw':
            return power(arg1, arg2);
            break;
    }
}

function comparisonV2(a, b) {
    if (a >= 0 && b >= 0) {
        var mOperation = 'subt';
        var annotation = 'Оба числа положительные, A-B=';
    }
    else if (a < 0 && b < 0) {
        var annotation = 'Оба числа отрицательные, A*B=';
        var mOperation = 'mult';
    }
    else {
        var mOperation = 'addt';
        var annotation = 'Знаки чисел различны, A+B=';
    }
    alert(annotation + mathOperationWreturn(a, b, mOperation));
}
