// add javascript here
let userName = prompt("Please enter your name.");
userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(); //capitalizes the first letter and makes the rest lowercase
let play = document.getElementById("playBtn");
play.addEventListener("click", beginGame);
function beginGame(){
  let difficultyLevel = document.getElementsByName("level");
  let range = 3;
  for (let i = 0; i<difficultyLevel.length; i++){
    if (difficultyLevel[i].checked){
        range = parseint(difficultyLevel[i].value);
    }
  }
  console.log("Range:" + range);
  let randNum = Math.floor(Math.random() * range) + 1;  
}