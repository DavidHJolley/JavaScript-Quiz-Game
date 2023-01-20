var score = localStorage.getItem("newScore");
let obj = JSON.parse(score);
var highScores = document.getElementById('highscores');
var button = document.getElementById('clear');

add();

function add(){
    if(Array.isArray(obj)){
        obj.forEach(function(item) {
          var node = document.createElement("li");
          var textnode = document.createTextNode(" INITIALS = " + item.initials + " SCORE = " + item.score);
          node.appendChild(textnode);
          highScores.appendChild(node);
        });
      }

}

button.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear the high scores?")) {
        localStorage.removeItem("scores");
        highScores.innerHTML = "";
    }
});
//highScores.append("INITIALS - ",obj.initials, " SCORE - ", obj.score);
