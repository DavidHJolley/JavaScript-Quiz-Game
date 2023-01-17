var start = document.getElementById("start");
var timerEl = document.getElementById('time');
var questionTitle = document.getElementById('question-title');
var questionsDiv = document.getElementById('questions');
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var submitBtn = document.getElementById('submit');

var questionsAndAnswers = {
  "What is the capital of France?": ["Paris", "London", "Rome"],
  "What is the largest planet in our solar system?": ["Jupiter", "Saturn", "Mars"]
};

start.addEventListener("click", function(event) {
    var element = event.target;
  
    if(element.matches("button")){
      console.log("Quiz Started")//startquiz function
      startQuiz() // start the quiz
    }
  });

let timeLeft = 30;

function startQuiz(){
    quiz();
    countdown();
}

function countdown() {
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeLeft = 30;
  var timeInterval = setInterval(function () {
    
    // amount of time the player has
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
  return true;
}

function quiz(){
  var questions = Object.keys(questionsAndAnswers);
  var answers = Object.values(questionsAndAnswers);
  var currentQuestion = 0;
  var score = 0;
  questionsDiv.classList.remove('hide');
  
  displayQuestion();

  function displayQuestion(){
    questionTitle.textContent = questions[currentQuestion];
    choices.innerHTML = "";
    for (var i = 0; i < answers[currentQuestion].length; i++){
      var choiceBtn = document.createElement("button");
      choiceBtn.textContent = answers[currentQuestion][i];
      choiceBtn.addEventListener("click", checkAnswer);
      choices.appendChild(choiceBtn);
    }
  }

  function checkAnswer(event){
    var chosenAnswer = event.target.textContent;
    if(chosenAnswer === answers[currentQuestion][0]){
      currentQuestion++;
      score++;
      if(currentQuestion === questions.length){
        gameOver();
      } else {
        displayQuestion();
      }
    } else {
      timeLeft -= 10;
      if(timeLeft <= 0){
        gameOver();
     }
    }
  }

  function gameOver(){
    questionsDiv.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = score;
    submitBtn.addEventListener("click", saveScore);
  }

  function saveScore(){
    var initials = document.getElementById("initials").value;
    // code to save initials and score to local storage or database
  }
}