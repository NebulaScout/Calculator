const calculator = document.querySelector(".calc");
const display = document.getElementById("calc-operation");
const displayTop = document.getElementById("calc-output");

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
        let key = e.target;
        // console.log(key);
        const action = key.dataset.action;  // determine which type of key was clicked
        // console.log(action);
        const keyContent = key.textContent;
        // console.log(keyContent);
        const displayedNum = display.textContent;

        // Check which type of button was clicked
        if(!action) {
            console.log("number key");
            if (displayedNum === '0') {
                display.textContent = keyContent;   // if clac displays 0 replce with the clicked number
            } else {
                display.textContent = displayedNum + keyContent;    // if calc displays a non-zero number append the clicked number
            }
        } 
        if(
            action === 'add' ||
            action === 'square' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' ||
            action === 'cube' ||
            action === 'sq-root' ||
            action === 'cb-root'
        ) {
            console.log("operator key");
            display.textContent = displayedNum + action.textContent;
        } 
        if (action === 'decimal') {
            console.log("decimal key");
            display.textContent = displayedNum + '.';
        }
        if (action === 'modulo') {
            console.log("modulo key");
        }
        if (action === "open-par" || action === "close-par") {
            console.log("parentheses");
        }
        if (action === "clear-all" || action === "clear-once") {
            console.log("clear");
            display.textContent = '0';
        }
        if (action === "calculate") {
            console.log("calculate");
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


