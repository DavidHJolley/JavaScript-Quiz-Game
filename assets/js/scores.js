var startButton = document.querySelector("#start");

container.addEventListener("click", function(event) {
    var element = event.target;
  
    // TODO: Complete function
  
    if(element.matches(startButton)){
      var state = element.getAttribute("data-state");
    
      if (state === "hidden"){
        element.dataset.state = "show";
        element.textContent = element.dataset.text;
      }
      else{
        element.dataset.state = "hidden";
        element.textContent = null;
      }
    }
  
  });
  