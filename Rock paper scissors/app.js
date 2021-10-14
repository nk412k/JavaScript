const startGameBtn = document.getElementById('start-game-btn');
//let gamestarted=false;

const getUserchoice=function(){
  let choice=prompt("Rock Paper Scissors",'').toUpperCase();
  if(choice!= 'ROCK'&& choice!='PAPER'&& choice!='SCISSORS'){
    alert("invalid input! Rock is taken by default")
    choice='ROCK';
  }
  return choice;
}

function getComputerChoice() {
  const choice=Math.random();
  if(choice<=0.34){
    return 'ROCK';
  }
  else if(choice>0.34 &&choice<=0.67){
    return "PAPER";
  }
  else{
    return 'SCISSORS';
  }
}
const getWinner=function(pchoice,cchoice){
  if(pchoice==cchoice){
    return "DRAW";
  }
  else if(pchoice=="ROCK"&& cchoice=="SCISSORS" || pchoice=="PAPER"&&cchoice=="ROCK" || pchoice=="SCISSORS"&& cchoice=="PAPER")
    return "PLAYER WON";
  else
    return "COMPUTER WON";
}

startGameBtn.addEventListener('click',() =>{  
 /* if(gamestarted)
    return;
  gamestarted=true;*/
  console.log('Game is starting...');
  const playerSelection=getUserchoice();
  console.log("PLayer choice= ",playerSelection);
  const computerChoice=getComputerChoice();
  console.log("computer Choice = ",computerChoice);
  const winner=getWinner(playerSelection,computerChoice);
  console.log(winner);
  alert(winner);
});
