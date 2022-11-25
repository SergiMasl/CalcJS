//Obj Values
const calc = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperator: false,
    operator: null,
}

//uptade Display
const updateDisplay = () => {
    const display = document.querySelector('.screen');
    display.value = calc.displayValue;
}
updateDisplay();

//Handle Key Press
const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
    const {target} = event;
   
    if(!target.matches('button')) {
        return;
    }

    if(target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('clear')) {
        resetCalc(target.value);
        updateDisplay();
        return;
    }

    inputDigital(target.value);
    updateDisplay();
})

const inputDecimal = (e) => {
    if (calc.waitingForSecondOperator === true) {
        calc.displayValue = '0.';
        calc.waitingForSecondOperator = false;
        return;
    }
}

const resetCalc = (e) => {
    calc.displayValue = '0';
    calc.firstOperand = null;
    calc.waitingForSecondOperator = false;
    calc.operator = null;
}

const inputDigital = (e) => {
    const {displayValue, waitingForSecondOperator} = calc;

    if (waitingForSecondOperator === true){
        calc.displayValue = e;
        calc.waitingForSecondOperator = false;
    } else {
        calc.displayValue = displayValue === '0' ? e : displayValue + e;
    }
}

const handleOperator = (e) => {
   const {firstOperand, displayValue, operator} = calc;
   const inputValue = parseFloat(displayValue);
 
   if(operator && calc.waitingForSecondOperator) {
        calc.operator = e;
        return;
   }
   if (firstOperand === null && !isNaN(inputValue)){
        calc.firstOperand = inputValue
   } else if (operator){
    const result = calculate(firstOperand, inputValue, operator);

    calc.displayValue = `${parseFloat(result.toFixed(7))}`;
    calc.firstOperand = result;
   }

   calc.waitingForSecondOperator = true;
   calc.operator = e;
}



//calculate
const calculate = (firstOperand, secondOperand, operator) => {
    if(operator === '+') {
        return firstOperand + secondOperand;
    } else if(operator === '-') {
        return firstOperand - secondOperand;
    } else if(operator === '*') {
        return firstOperand * secondOperand;
    } else if(operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand
}


