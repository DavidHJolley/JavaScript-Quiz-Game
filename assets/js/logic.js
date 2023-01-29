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
  if(element.matches("button")){ // check if the clicked element is a button
  console.log("Quiz Started")// startquiz function
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
  
  // This function starts the quiz and calls the countdown function
  function startQuiz(){
  quiz();
  countdown();
  }

var score = 0;

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

function gameOver(){
  // Hide the questions div
  questionsDiv.classList.add('hide');
  // Unhide the end screen
  endScreen.classList.remove('hide');
  // Set the final score text to the current score
  finalScore.textContent = score;
  // Add event listener to submit button that calls the saveScore function
  submitBtn.addEventListener("click", saveScore());
  // Set timeleft variable to 0
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
    //Grab the chosen answer from the event target's text content
    var chosenAnswer = event.target.textContent;
    if(chosenAnswer === correctAnswer){ 
      // If the chosen answer is correct
      currentQuestion++;
      score++;
      if(currentQuestion === questions.length){
        // If all questions have been answered, call the gameOver function
        gameOver();
      } else {
        // Else, call the displayQuestion function
        displayQuestion();
      }
    }
    else {
      //If the chosen answer is not the correct answer
      currentQuestion++;
      timeLeft -= 10;
      if(currentQuestion === questions.length){
        // If all questions have been answered, call the gameOver function
        gameOver();
      } else {
        // Else, call the displayQuestion function
        displayQuestion();
      }
      if(timeLeft <= 0){
        // If timeLeft is less than or equal to 0, set timeLeft to 0
        timeLeft = 0;
      }
    }
  }

}

function saveScore(){
  submitBtn.onclick = function(){
    // Grab the value of the 'initials' element
    var initials = document.getElementById('initials').value;
    // Create a new object with the current score and the initials
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