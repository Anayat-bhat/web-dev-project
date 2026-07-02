// --- DOM Selectors ---

const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const themeCheckbox = document.getElementById('theme-checkbox');

// --- Calculator State Variables ---

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// --- Core Core Logic Functions ---

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteLastDigit() {
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function appendNumber(number) {
    // Prevent multiple decimals

    if (number === '.' && currentOperand.includes('.')) return;
    
    // Replace initial 0 with the number, unless starting with a decimal point

    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperator(selectedOperation) {
    if (currentOperand === '') return;
    
    // If there is already a pending operation, compute it first

    if (previousOperand !== '') {
        calculate();
    }
    
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
        case '*':
            computation = prev * current;
            break;
        case '÷':
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Helper to format large or decimal numbers for display cleanly

function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

function updateDisplay() {
    currentOperandElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandElement.innerText = '';
    }
}

// --- Theme Toggle Logic ---

function toggleTheme() {
    if (themeCheckbox.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// --- Event Listeners ---

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperator(button.innerText);
    });
});

equalsButton.addEventListener('click', () => {
    calculate();
});

clearButton.addEventListener('click', () => {
    clearDisplay();
});

deleteButton.addEventListener('click', () => {
    deleteLastDigit();
});

themeCheckbox.addEventListener('change', toggleTheme);

// --- Optional Keyboard Support ---

window.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
        let mappedOp = e.key;
        if (e.key === '*') mappedOp = '×';
        if (e.key === '/') mappedOp = '÷';
        chooseOperator(mappedOp);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); // Stop Enter from triggering selected buttons
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLastDigit();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});