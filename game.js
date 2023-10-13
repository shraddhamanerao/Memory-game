var level=0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");

  },100)
}


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++;
    $("h1").text("level " + level);


}

$(document).keydown(function (e) { 
    // nextSequence();
    if(level==0){
        nextSequence();
        $("h1").text("Level 1");

    }
});

function startOver() {
  level = 0;
  gamePattern = [];
  $("h1").text("Press a key to start again");
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      
      if (userClickedPattern.length === gamePattern.length) {
        
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }

    else {
      playSound("wrong");
      $(".body").addClass("game-over");
      $("h1").text("Game Over !!")
      setTimeout(function() {
        $(".body").removeClass("game-over");
      }, 100);
      startOver();
    }
}

