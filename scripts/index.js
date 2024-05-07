const outputKeys = document.getElementById("calc-keys");
const outputAnswer = document.getElementById("calc-output");

const buttons = document.querySelectorAll("td, button");
buttons.forEach(button => {
    button.addEventListener("click", () => { // add a click eventListener
        // blur the clicked button for 150ms
        button.classList.add("blur");   
        setTimeout(() => {
            button.classList.remove("blur"); //remove blur
        }, 150); // end of timeout
    }); //end of eventListener
}); // end of forEach

// keypress
// const keyPress = document.
document.addEventListener("keypress", (e) => {
    outputKeys.innerHTML = e.key;
})


