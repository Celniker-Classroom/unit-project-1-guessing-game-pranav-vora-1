// add javascript here
let userName = prompt("Please enter your name.");
if (userName === null) {
  console.log("User cancelled the prompt.");
  userName = "";
}else{
  userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(); //capitalizes the first letter and makes the rest lowercase
}

let playBtn = document.getElementById("playBtn");

let randNum;
let message = document.getElementById("msg");
let winsText = document.getElementById("wins");
let wins = 0;
let numberOfGuesses = 0;
let guessesPerWin = [];
let guessButton = document.getElementById("guessBtn");
let giveUpButton = document.getElementById("giveUpBtn");
let range = 3;
playBtn.addEventListener("click", play);
function play(){
  let difficultyLevel = document.getElementsByName("level");
  for (let i = 0; i<difficultyLevel.length; i++){
    if (difficultyLevel[i].checked){
        range = parseInt(difficultyLevel[i].value);
    }
  }
  randNum = Math.floor(Math.random() * range) + 1;  

  guessButton.disabled = false;
  giveUpButton.disabled = false;
  playBtn.disabled = true;
  message.innerText = (userName + ", type your first guess!");
  // alert("Range:" + range);
  // alert("RandNum:" + randNum);
  guessButton.addEventListener("click", makeGuess);
  document.getElementById("giveUpBtn").addEventListener("click", giveUp);
}


function makeGuess(){
  let guess = document.getElementById("guess");
  let proximity = Math.abs(Number(guess.value)-randNum);
  numberOfGuesses++;
  if (Number(guess.value)>randNum){

    if(proximity<=2){
      message.innerText = ("Too high, but you are hot!");
    }else if (proximity<=5){
      message.innerText = ("Too high, but you are warm!");
    }else{
      message.innerText = ("Too high, and you are cold!");
    }

  }else if (Number(guess.value)<randNum){

    if(proximity<=2){
      message.innerText = ("Too low, but you are hot!");
    }else if (proximity<=5){
      message.innerText = ("Too low, but you are warm!");
    }else{
      message.innerText = ("Too low, and you are cold!");
    }

  }else if (Number(guess.value) == randNum){
    message.innerText = ("Correct! Good Job, " + userName + "!");
    updateScore(numberOfGuesses);

  }else{
    message.innerText = ("Please type a Number!");
  }
}


function giveUp(){
  updateScore(range);
}


function updateScore(score){
  guessesPerWin.push(score); //adds the current number of guesses to the array
  guessesPerWin.sort((a, b) => a - b); //sorts numbers in ascending order
  numberOfGuesses = 0; //resets it to 0 if you win

  reset() //enables play button and disables guess and giveup buttons

  let sum = 0;
  for (let num of guessesPerWin) {
      sum += num;
  }
  const average = sum / guessesPerWin.length;
  wins ++;
  winsText.innerText = ("Total wins: "+ wins);
  document.getElementById("avgScore").innerText = ("Average Score: " + average);
  let leaderboardElements=document.getElementsByName("leaderboard");

  for(let i = 0; i<3; i++){
    leaderboardElements[i].textContent= guessesPerWin[i];
  }
}

function displayDate(){
  let dateText = document.getElementById("date");
  
}

function reset(){
  guessButton.disabled = true;
  giveUpButton.disabled = true;
  playBtn.disabled = false;
}