var timeSeconds = 60;
var secondsEl = document.querySelector(".seconds");
var startEl = document.getElementById("startButton");
secondsEl.textContent = timeSeconds;

function startTimer(event) {
    var secondsLeft = timeSeconds;

    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      secondsEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage();
      }
  
    }, 1000);
  }

startEl.addEventListener("click", startTimer);