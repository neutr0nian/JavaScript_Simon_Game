let buttonColors = ["red","blue","green","yellow"];
let gameGeneratedPattern=[];
let randomColor;
let playerClickedPattern=[]
let started = false;
let level=0;

$(document).keypress(function (){
  if(!started){
    $("#level-title").text("Level " + level);
    gamePattern();
    started = true;
  }
})

function gamePattern(){
  playerClickedPattern=[];
  level++
  $("#level-title").text("level "+level);
  let randomNumber= Math.floor(Math.random()*4);

  randomColor = buttonColors[randomNumber];
  gameGeneratedPattern.push(randomColor);

  $("#"+randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


$(".btn").click(function (){
  let playerChosenColor = $(this).attr("id");
  playerClickedPattern.push(playerChosenColor);

  playSound(playerChosenColor);
  animatePress(playerChosenColor);

  checkPattern(playerClickedPattern.length-1);
});

function checkPattern(playerPattern){
  if(gameGeneratedPattern[playerPattern] === playerClickedPattern[playerPattern]){
    console.log("success");
    if(playerClickedPattern.length === gameGeneratedPattern.length){
      setTimeout(function(){
        gamePattern();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game over, Press Any Key to Restart")
    restart();
  }

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function restart(){
  level=0;
  gameGeneratedPattern=[];
  started=false;
}
