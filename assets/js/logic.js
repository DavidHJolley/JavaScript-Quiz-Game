var start = document.getElementById("start");
var timerEl = document.getElementById('time');
var endScreen = document.getElementById('end-screen');

start.addEventListener("click", function(event) {
    var element = event.target;
  
    if(element.matches("button")){
      console.log("Quiz Started")//startquiz function
      startQuiz()
    }
  });


function startQuiz(){
    countdown()
}

function countdown() {
  var timeLeft = 5;

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if(timeLeft === 0){
      clearInterval(timeInterval)
      gameOver();
    }

  },1000);
}


function gameOver(){
  if(endScreen.classList.contains('hide')){
    endScreen.classList.remove('hide')
  }
  else
  {
    endScreen.classList.add('hide')
  }
}