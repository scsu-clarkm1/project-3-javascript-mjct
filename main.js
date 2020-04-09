// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const has_lower = lowercaseEl.checked;
    const has_upper = uppercaseEl.checked;
    const has_number = numbersEl.checked;
    const has_symbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        has_lower, 
        has_upper, 
        has_number, 
        has_symbol, 
        length);
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const text_area = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    text_area.value = password;
    document.body.appendChild(text_area);
    text_area.select();
    document.execCommand('copy');
    text_area.remove();
    alert('Password copied to clipboard.');
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // Initialize a password variable
    // Filter out unchecked types
    // Loop over length, call generator function for each type
    // Add final pw to the pw var and return

    let generated_password = '';

    const types_count = lower + upper + number + symbol;

    const types_arr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if (types_count === 0) {
        return '';
    }

    for (let i = 0; i < length; i += types_count) {
        types_arr.forEach(type => {
            const func_name = Object.keys(type)[0];

            generated_password += randomFunc[func_name]();
        });
    }

    const final_password = generated_password.slice(0, length);

    return final_password;
}

// Generator Functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//console.log(getRandomSymbol());