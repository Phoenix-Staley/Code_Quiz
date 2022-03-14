// 1. Define variables for the elements to be used, the length of a game, and an object of the questions and answers ✅
// 2. Create a timer interval that counts down ✅
// 3. Make the description element empty ✅
// 4. Define the function that will run upon starting the game ✅
// 5. Define a variable for current question number ✅
// 6. Change title to current question ✅
// 7. Define functions for repeated code ✅
// 7a. Define functions for getting the right and wrong answers ✅
// 7b. Define function for going to the next question ✅
//      Use a for loop to create buttons for possible answers, using an if statement to check if the current button will be the correct answer or not ✅
// 7c. Define function for when the game ends that reacts based on how the game ended ✅
// 8. Replace the buttons with the score and an input box for the user's name
// 9. Record the user's name and score as a string in an array
// 10. Make highscores appear in order of time completed when pressing the highscores button

var timerLength = 60;
var secondsEl = document.querySelector(".seconds");
var startEl = document.getElementById("startButton");
var headerEl = document.querySelector(".title");
var descriptionEl = document.querySelector(".description");
var buttonHolderEl = document.getElementById("buttonHolder");
secondsEl.textContent = timerLength;

var questionsAndAnswers = {
  questions: ["Strings must be enclosed within...", "What variable does JavaScript use to hold numeric values?", "Commonly used data types DO NOT include...", "The condition for an if / else statement is written between..."],
  options: [["Pipes | |", "Curly braces { }", "Quotation Marks \" \"", "Square brackets [ ]"], ["int", "string", "number", "float"], ["alert", "boolean", "number", "object"], ["Curly braces { }", "Square brackets [ ]", "Quotation marks \" \"", "Parantheses ( )"]],
  correctAnswers: [2, 2, 0, 3]
};

function clearScreen() {
  descriptionEl.textContent = "";
  headerEl.textContent = "";
  if (startEl) {
    startEl.remove();
  }

  while (buttonHolderEl.firstChild) {
    buttonHolderEl.removeChild(buttonHolderEl.firstChild);
  }
}

function startGame() {
  var secondsLeft = timerLength;
  var currentQuestion = 0;
  var isRunning = true;
  var score = 0;

  function endGame(headerMessage) {
    isRunning = false;
    clearScreen();
    clearInterval(timerInterval);
    headerEl.textContent = headerMessage;

    var endMessage = "";
    if (score === 1 && secondsLeft > 0) {
      endMessage = "You answered " + score + " question correctly in " + (60-secondsLeft) + " seconds.";
    } else if (score === 1) {
      endMessage = "You answered " + score + " question correctly."
    } else if (secondsLeft > 0) {
      endMessage = "You answered " + score + " questions correctly in " + (60-secondsLeft) + " seconds.";
    } else {
      endMessage = "You answered " + score + " questions correctly."
    }

    descriptionEl.textContent = endMessage;
  }

  function loadQuestion() {
    if (isRunning) {
      clearScreen();
      if (currentQuestion < questionsAndAnswers.questions.length) {
        headerEl.textContent = questionsAndAnswers.questions[currentQuestion];
  
        for (let i = 0; i < questionsAndAnswers.options[currentQuestion].length; i++) {
          var text = i+1 + ". " + questionsAndAnswers.options[currentQuestion][i];
          var buttonEl = document.createElement("button");
          buttonEl.innerHTML = text;
          buttonEl.classList.add("button");
          buttonHolderEl.appendChild(buttonEl);
    
          if (i === questionsAndAnswers.correctAnswers[currentQuestion])  {
            buttonEl.onclick = rightAnswer;
          } else {
            buttonEl.onclick = wrongAnswer;
          }
        }
      } else {
        endGame("Congrats!")
      }
    }
  }

  function onAnswer() {
    var correctnessEl = document.createElement("h3");
    buttonHolderEl.appendChild(correctnessEl);

    var nodes = buttonHolderEl.childNodes;

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].onclick = function() {};
    }

    var loadDelay = setInterval(function() {
      loadQuestion();
      clearInterval(loadDelay);
    }, 2000);

    return correctnessEl;
  }

  function rightAnswer() {
    var correctEl = onAnswer();
    correctEl.innerHTML = "Correct!";
    currentQuestion += 1;
    score += 1;
  }

  function wrongAnswer() {
    var incorrectEl = onAnswer();
    incorrectEl.innerHTML = "Incorrect!";
    currentQuestion += 1;
  }

  var timerInterval = setInterval(function() {
    secondsLeft--;
    secondsEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops timer when it reaches 0
      clearInterval(timerInterval);

      clearScreen();
      endGame("Times up!");

      isRunning = false;
    }
  }, 1000);

  loadQuestion();
}

startEl.addEventListener("click", startGame);