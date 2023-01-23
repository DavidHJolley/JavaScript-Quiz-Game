var start = document.getElementById("start");
var startScreen = document.getElementById("start-screen");
var timerEl = document.getElementById('time');
var questionTitle = document.getElementById('question-title');
var questionsDiv = document.getElementById('questions');
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var submitBtn = document.getElementById('submit');
var currentQuestion = 0;
var timeLeft = 60;

var questionsAndAnswers = {
  "What is the capital of France?": ["Paris", "London", "Rome"],
  "What is the largest planet in our solar system?": ["Jupiter", "Saturn", "Mars"],
  "What is the smallest country in the world?": ["Vatican City", "Maldives", "Monaco"],
  "What is the capital of China?": ["Beijing", "Shanghai", "Hong Kong"],
  "What is the capital of Australia?": ["Canberra", "Sydney", "Melbourne"],
  "What is the currency of Japan?": ["Yen", "Dollar", "Euro"],
  "Which of the following is not an ocean?": ["Antarctic Ocean", "Arctic Ocean", "Sahara Desert"],
  "Which is the tallest mammal?": ["Giraffe", "Elephant", "Hippopotamus"]
};

start.addEventListener("click", function(event) {
    var element = event.target;
    if(element.matches("button")){
      console.log("Quiz Started")//startquiz function
      startQuiz() // start the quiz
    }
    if(startScreen.classList.contains('hide')){
      startScreen.classList.remove('hide')
    }
    else
    {
      startScreen.classList.add('hide')
    }
  });

function startQuiz(){
    quiz();
    countdown();
}

function countdown() {
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    
    // amount of time the player has
    timerEl.textContent = timeLeft;
    timeLeft--;

    if(timeLeft <= 0){
      gameOver();
      clearInterval(timeInterval);
      timeLeft = 0;
      console.log("OOGA")
    }

  },1000);

}

var score = 0;

function gameOver(){
  questionsDiv.classList.add('hide');
  endScreen.classList.remove('hide');
  finalScore.textContent = score;
  submitBtn.addEventListener("click", saveScore());
  timeleft = 0;
}

function quiz(){
  var questions = Object.keys(questionsAndAnswers);
  var answers = Object.values(questionsAndAnswers);
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
    }
    else {
      currentQuestion++;
      timeLeft -= 10;
      if(currentQuestion === questions.length){
        gameOver();
      } else {
        displayQuestion();
      }
      if(timeLeft <= 0){
        timeLeft = 0;
      }
    }
  }

}

function saveScore(){
  submitBtn.onclick = function(){
    var initials = document.getElementById('initials').value;
    var newScore = {
        "score" : score,
        "initials" : initials
    }
    // get existing data from local storage
    var existingScores = JSON.parse(localStorage.getItem("newScore")) || [];
    // add new score to existing data
    existingScores.push(newScore);
    // save updated data to local storage
    localStorage.setItem("newScore", JSON.stringify(existingScores));
  }
  
}