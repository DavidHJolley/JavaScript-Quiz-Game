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