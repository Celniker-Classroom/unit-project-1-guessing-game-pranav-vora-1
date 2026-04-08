// add javascript here
let userName = prompt("Please enter your name.");
if (userName === null) {
  console.log("User cancelled the prompt.");
  userName = "";
}else{
  userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(); //capitalizes the first letter and makes the rest lowercase
}

let play = document.getElementById("playBtn");

let randNum;
let message = document.getElementById("msg");
let winsText = document.getElementById("wins");
let wins = 0;
let numberOfGuesses = 0;
let guessesPerWin = [];
play.addEventListener("click", beginGame);
function beginGame(){
  let difficultyLevel = document.getElementsByName("level");
  let range = 3;
  for (let i = 0; i<difficultyLevel.length; i++){
    if (difficultyLevel[i].checked){
        range = parseInt(difficultyLevel[i].value);
    }
  }
  randNum = Math.floor(Math.random() * range) + 1;  
  let guessButton = document.getElementById("guessBtn");
  let giveUpButton = document.getElementById("giveUpBtn");
  guessButton.disabled = false;
  giveUpButton.disabled = false;
  play.disabled = true;
  message.innerText = (userName + ", type your first guess!");
  // alert("Range:" + range);
  // alert("RandNum:" + randNum);
  guessButton.addEventListener("click", checkGuess);
}


function checkGuess(){
  let guess = document.getElementById("guess");
  let proximity = Math.abs(Number(guess.value)-randNum);
  numberOfGuesses++;
  if (Number(guess.value)>randNum){

    if(proximity<=2){
      message.innerText = ("Too high, but hot!");
    }else if (proximity<=5){
      message.innerText = ("Too high, but warm!");
    }else{
      message.innerText = ("Too high, and cold!");
    }

  }else if (Number(guess.value)<randNum){

    if(proximity<=2){
      message.innerText = ("Too low, but hot!");
    }else if (proximity<=5){
      message.innerText = ("Too low, but warm!");
    }else{
      message.innerText = ("Too low, and cold!");
    }

  }else if (Number(guess.value) == randNum){
    message.innerText = ("Correct! Good Job, " + userName + "!");
    guessesPerWin.push(numberOfGuesses);

    let sum = 0;
    for (let num of guessesPerWin) {
        sum += num;
    }
    const average = sum / guessesPerWin.length;
    wins ++;
    winsText.innerText = ("Total wins: "+ wins);
    document.getElementById("avgScore").innerText = ("Average Score: " + average);
  }else{
    message.innerText = ("Please type a Number!");
  }
}