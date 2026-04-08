// add javascript here





// let userName = prompt("Please enter your name.");
// if (userName === null) {
//   console.log("User cancelled the prompt.");
//   userName = "";
// }else{
//   userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(); //capitalizes the first letter and makes the rest lowercase
// }

let play = document.getElementById("playBtn");

let randNum;
let message = document.getElementById("msg");

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
  message.innerText = ("Type your first guess!");
  // alert("Range:" + range);
  // alert("RandNum:" + randNum);
  guessButton.addEventListener("click", checkGuess);
}


function checkGuess(){
  let guess = document.getElementById("guess");
  if (Number(guess.value)>randNum){
    message.innerText = ("Too high!");
  }else if (Number(guess.value)<randNum){
    message.innerText = ("Too low!");
  }else if (Number(guess.value) == randNum){
    message.innerText = ("Correct!");
  }else{
    message.innerText = ("Please type a Number!");
  }
}