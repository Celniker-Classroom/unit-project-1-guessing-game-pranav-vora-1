// add javascript here
let userName = prompt("Please enter your name.");
userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(); //capitalizes the first letter and makes the rest lowercase
let difficultyLevel = document.getElementsByName("level");
let play = document.getElementById("playBtn");
let range = difficultyLevel.value();
play.addEventListener("click", beginGame);
function beginGame(){
  let randNum = Math.floor(Math.random() * range) + 1;  
}