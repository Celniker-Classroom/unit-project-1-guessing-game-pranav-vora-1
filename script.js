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
let timeElapsedPerWin = [];
let guessButton = document.getElementById("guessBtn");
let giveUpButton = document.getElementById("giveUpBtn");
let range = 3;
let startTime = new Date().getTime();
playBtn.addEventListener("click", play);
let intervalId = setInterval(time, 1000);
let initialTime = new Date().getTime();
function play(){
  initialTime = new Date().getTime();
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
    updateTimers(new Date().getTime());

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

function time(){
  //Returns a formatted date/time string with month name, day suffix, and live time with seconds
  const now = new Date();
  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let suffix = "th";
  if (currentDate == 1 || currentDate == 21 || currentDate == 31){
    suffix = "st";
  }else if (currentDate == 2 || currentDate == 22){
    suffix = "nd";
  }else if (currentDate == 3 || currentDate == 23){
    suffix = "rd";
  }
  let currentYear = now.getFullYear();
  let timeElapsed = (((new Date().getTime() - startTime) / 1000)).toFixed();
  document.getElementById("date").textContent = (currentMonth + " " + currentDate + suffix + ", " + currentYear + ". Time elapsed: " + timeElapsed + " seconds.");
}

function updateTimers(endMs){
  //Calculates round time, updates fastest game and average time
  let elapsedTime = (endMs - initialTime)/1000;
  timeElapsedPerWin.push(elapsedTime);
  let fastestTime = Math.min(...timeElapsedPerWin).toFixed(2);
  let sum = 0;
  for (let num of timeElapsedPerWin) {
      sum += num;
  }
  const avgTime = (sum / timeElapsedPerWin.length).toFixed(2);
  document.getElementById("fastest").textContent = ("Fastest Game: " + fastestTime + " seconds.");
  document.getElementById("avgTime").textContent = ("Average Time: " + avgTime + " seconds.");
}

function reset(){
  guessButton.disabled = true;
  giveUpButton.disabled = true;
  playBtn.disabled = false;
}