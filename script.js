const TypingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = 0,
isTyping = 0,
mistakes = 0;

function randomParagraph(){
    //getting random number and its always less than the paragraph length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    TypingText.innerHTML = "";
    //getting random integer from paragraph array, splitting all characters
    //of it and adding each character inside span and adding span inside p tag.
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        TypingText.innerHTML += spanTag;
    });
    TypingText.querySelectorAll("span")[0].classList.add("active");
    //focusing input field on keydown or click event.
    document.addEventListener("keydown", () => inpField.focus());
    TypingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const characters = TypingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){ //once timer starts, it wont start again on every key click.
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        //if we have not typed any character or backspace the index will be decremented.
        if(typedChar == null){
            charIndex--; //decrement charIndex
            //decrement mistakes only if the charIndex span contains incorrect class.
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else{
            if(characters[charIndex].innerText === typedChar){
                //if the user's typed character and the shown character is matched,
                //then add the correct class otherwise increment the mistake and add the incorrect class.
                characters[charIndex].classList.add("correct");
            } 
            else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++; //incrementing the character index after every value typed out to find if user typed the correct or incorrect value.
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        //if wpm value is 0, empty or Infinity then setting its value as 0.
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText =  charIndex - mistakes; //cpm wont count mistakes.
    } else{
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    //if time left is greater than 0 then decrement the timeLeft else clear the timer.
    if(timeLeft > 0 ){
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else{
        clearInterval(timer);
    }
}

function resetGame(){
    //calling paragraph function and
    //resetting all of the variables and elements to default.
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = 0,
    isTyping = 0,
    mistakes = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}


randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);