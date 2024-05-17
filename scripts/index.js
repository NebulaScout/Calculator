const calculator = document.querySelector(".calc");
const display = document.getElementById("calc-operation");
const displayTop = document.getElementById("calc-output");
const product = document.querySelector(".product");
const division = document.querySelector(".divide");

const buttons = document.querySelectorAll("td, button");
// buttons.forEach(button => {
//     button.addEventListener("click", () => { // add a click eventListener
//         // blur the clicked button for 150ms
//         button.classList.add("blur");   
//         setTimeout(() => {
//             button.classList.remove("blur"); //remove blur
//         }, 150); // end of timeout
//         // outputKeys.innerHTML = ;   
//     }); //end of eventListener

// }); // end of forEach

calculator.addEventListener("click", (e) => {
    if(e.target.matches('button')) {
        let key = e.target; // returns the element on which the event occurred
        // console.log(key);
        const action = key.dataset.action;  // determine which type of key was clicked
        // console.log(action);
        const keyContent = key.textContent; // content of the pressed key
        // console.log(keyContent);
        const displayedNum = display.textContent;   // content that is being displayed

        // Check number has been clicked an append it to the output
        if(!action) {
            console.log("number key");
            if (displayedNum === '0') {
                display.textContent = keyContent;   // if clac displays 0 replce with the clicked number
            } else {
                display.textContent = displayedNum + keyContent;    // if calc displays a non-zero number append the clicked number
            }
        }
        // check which sign has been clicked an append to output 
        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'product' ||
            action === 'divide' ||
            action === 'square' ||
            action === 'cube' ||
            action === 'sq-root' ||
            action === 'cb-root'
        ) {
            console.log("operator key");
            let firstValue = displayedNum;
            let typeOfOperator = action;

            switch(typeOfOperator) {    //TODO: Display the other symbols
               
                default: 
                    display.textContent = displayedNum + keyContent;
                    break;
            }
            
        }

        if (action === 'decimal') {
            console.log("decimal key");
            display.textContent = displayedNum + keyContent;
        }

        if (action === 'modulo') {
            console.log("modulo key");
            display.textContent = displayedNum + "%";
        }

        if (action === "open-par" || action === "close-par") {
            console.log("parentheses");
            let typeOfPar = action;
            
            switch(typeOfPar) {
                case "open-par":
                    display.textContent = displayedNum + keyContent;
                    break;
                case "close-par":
                    display.textContent = displayedNum + keyContent;
                    break;
                default:
                    break;
            }
        }

        if (action === "clear-all" || action === "clear-once") {    //TODO: Modify the clear once button to remove just one character
            console.log("clear");
            let typeOfClear = action;

            switch(typeOfClear) {
                case "clear-all":
                    display.textContent = '0';
                    break;
                case "clear-once":
                    // remove one character
                    break;
                default:
                    break;
            }
        }

        if (action === "calculate") {
            console.log("calculate");
            // displayArray = displayedNum.split()
            displayTop.textContent = displayedNum;
            let answer = evaluateExpression(displayedNum);
            display.textContent = String(answer);

        }

        if (action === "currentAnswer") {
            console.log("currentAnswer");
        }


    }
})

// keypress
// const keyPress = document.



document.addEventListener("keypress", (e) => {
    // if (e.target.matches('button')) {
    //     const key = e.target
        
    // }
    // outputKeys.innerHTML = e.key;
})

function evaluateExpression(expression) {
    // perform basic arithmetic operations
    function operate(a, b, op) {
        switch(op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
        }
    }
    // product.textContent = '*';
    // division.textContent = '/';

   // split the exression into numbers and operators
    let tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);
    console.log(tokens);

    if(!tokens) return NaN;

    let numStack = [];
    let operatorStack = [];

    const precedence = {'+': 1, '-': 1, '*': 2, '/': 2};    // operator precedence
    console.log(precedence);

    tokens.forEach(token => {
        if(!isNaN(token)) {
            numStack.push(Number(token));   // if token is a number push it to numStack[]
            console.log(numStack[numStack.length]);
        } else {
            // if token is an operator, process the operator stack
            while(operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                let b = numStack.pop();
                let a = numStack.pop();
                let op = operatorStack.pop();
                numStack.push(operate(a, b, op));   // calculate the expression and store in the answer in numStack
            }
            operatorStack.push(token);  // store current token in operator stack
        }
    });
    // process the remaining operators
    while(operatorStack.length) {
        let b = numStack.pop();
        let a = numStack.pop();
        let op = operatorStack.pop();
        numStack.push(operate(a, b, op));
    }
    return numStack[0];

}


