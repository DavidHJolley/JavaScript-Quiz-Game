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
  "What is the syntax for a for loop in JavaScript?": ["for(var i = 0; i < length; i++)", "while(true)", "if(condition) {"],
  "What is the syntax for an if statement in Python?": ["if condition:", "for i in range(n):", "function myFunction() {"],
  "What is the purpose of a variable in programming?": ["To store a value for later use", "To print text on the screen", "To define a function"],
  "What type of language is JavaScript?": ["Programming Language", "Markup Language", "Styling Language"],
  "What is the correct syntax for declaring a variable in Java?": ["int myVariable;", "var myVariable;", "let myVariable;"],
  "What is the purpose of a function in programming?": ["To organize and reuse code", "To print text on the screen", "To store a value for later use"],
  "What is the syntax for a while loop in C#?": ["while (condition) { }", "for(var i = 0; i < length; i++)", "if(condition) {"],
  "What is the syntax for a class in Python?": ["class MyClass:", "function MyFunction()", "var myVariable;"],
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

  var correctAnswer;

function displayQuestion(){
    questionTitle.textContent = questions[currentQuestion];
    choices.innerHTML = "";
    
    // Store the correct answer
    correctAnswer = answers[currentQuestion][0];
    
    // Shuffle the answers array
    answers[currentQuestion].sort(() => Math.random() - 0.5);
    
    for (var i = 0; i < answers[currentQuestion].length; i++){
      var choiceBtn = document.createElement("button");
      choiceBtn.textContent = answers[currentQuestion][i];
      choiceBtn.addEventListener("click", checkAnswer);
      choices.appendChild(choiceBtn);
    }
  }

  function checkAnswer(event){
    var chosenAnswer = event.target.textContent;
    if(chosenAnswer === correctAnswer){ 
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