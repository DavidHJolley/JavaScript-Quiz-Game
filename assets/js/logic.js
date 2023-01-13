var start = document.getElementById("start");
var timerEl = document.getElementById('time');
var questionTitle = document.getElementById('question-title');
var endScreen = document.getElementById('end-screen');

var questionsAndAnswers = {
  "What is the capital of France?": "Paris",
  "What is the largest planet in our solar system?": "Jupiter"
};

start.addEventListener("click", function(event) {
    var element = event.target;
  
    if(element.matches("button")){
      console.log("Quiz Started")//startquiz function
      startQuiz() // start the quiz
    }
  });


function startQuiz(){
    quiz();
    countdown();
}

function countdown() {
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    var timeLeft = 5; // amount of time the player has
    console.log("2");
    timeLeft--;
    timerEl.textContent = timeLeft;

    if(timeLeft === 0){
      clearInterval(timeInterval)
      gameOver();
    }

    quiz();

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
  return true;
}

function quiz(){
  console.log("test");
  var questions = Object.keys(questionsAndAnswers);
  var answers = Object.values(questionsAndAnswers);
  var currentQuestion = 0;
  questionTitle.removeAttribute("data-state");
  questionTitle.setAttribute("data-text", questions[currentQuestion]);

  while (!gameOver()){
    for (i = 0; i < questions.length; i++){
      questionTitle.setAttribute("data-text", questions[currentQuestion]);
      // if currentQuestion == the text inputted, go to next question (i++).
    }
  }
  
  // if currentQuestion == the text inputted, go to next question.
}