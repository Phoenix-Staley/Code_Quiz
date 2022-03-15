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
// 7c1. Render a "play again" button ✅
// 8. Replace the buttons with the score and an input box for the user's name ✅
// 9. Record the user's name and score as an array of objects that hold the user's name and their score ✅
// 10. Store scores in local storage ✅
// 11. Sort scores using .sort ✅
// 12. Make high scores appear in order of time completed when pressing the high scores button ✅

var timerLength = 60;
var secondsEl = document.querySelector(".seconds");
var highScoresEl = document.querySelector(".highScoresButton");
var contentEl = document.querySelector(".content");
var headerEl = document.querySelector(".title");
var descriptionEl = document.querySelector(".description");
var holderEl = document.getElementById("holder");
var isRunning = false;
secondsEl.textContent = timerLength;

var questionsAndAnswers = {
  questions: ["Strings must be enclosed within...", "What variable does JavaScript use to hold numeric values?", "Commonly used data types DO NOT include...", "The condition for an if / else statement is written between...", "TRUE OR FALSE: \"10\" !== 10"],
  options: [["Pipes | |", "Curly braces { }", "Quotation Marks \" \"", "Square brackets [ ]"], ["int", "string", "number", "float"], ["alert", "boolean", "number", "object"], ["Curly braces { }", "Square brackets [ ]", "Quotation marks \" \"", "Parantheses ( )"], ["True", "False"]],
  correctAnswers: [2, 2, 0, 3, 0]
};

function clearScreen() {
  descriptionEl.textContent = "";
  headerEl.textContent = "";
  if (document.getElementById("startButton")) {
    document.getElementById("startButton").remove();
  }
  if (document.querySelector("#againButton")) {
    document.querySelector("#againButton").remove();
  }
  if (document.querySelector("#goBackButton")) {
    document.querySelector("#goBackButton").remove();
  }

  while (holderEl.firstChild) {
    holderEl.removeChild(holderEl.firstChild);
  }
}

function displayScores() {
  if (isRunning) {
    alert("You can't view scores during the quiz.");
  } else {
    var scores = JSON.parse(localStorage.getItem("highScores"));

    clearScreen();
    headerEl.textContent = "High Scores";

    // Displays top 5 or fewer scores
    if (scores.length >= 5) {
      for (let i = 0; i < 5; i++) {
        var text = i+1 + ". " + scores[i].name + " - " + scores[i].storedScore;
        var scoreEl = document.createElement("h3");
        scoreEl.innerHTML = text;
        scoreEl.classList.add("highScore");
        holderEl.appendChild(scoreEl);
      }
    } else {
      for (let i = 0; i < scores.length; i++) {
        var text = i+1 + ". " + scores[i].name + " - " + scores[i].storedScore;
        var scoreEl = document.createElement("h3");
        scoreEl.innerHTML = text;
        scoreEl.classList.add("highScore");
        holderEl.appendChild(scoreEl);
      }
    }

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Go Back";
    buttonEl.classList.add("button");
    buttonEl.id = "goBackButton";
    buttonEl.onclick = function() {
      clearScreen();
      headerEl.textContent = "JavaScript Code Quiz";
      descriptionEl.textContent = "This timed quiz will ask you various questions about JavaScript. \
        The faster you complete the quiz, and the more answers you get right, the higher your score will be. Good luck!";
      var startButtonEl = document.createElement("button");
      startButtonEl.textContent = "Start";
      startButtonEl.classList.add("button");
      startButtonEl.id = "startButton";
      startButtonEl.onclick = startGame;
      contentEl.appendChild(startButtonEl);
    };
    contentEl.appendChild(buttonEl);
  }
}

function startGame() {
  var secondsLeft = timerLength;
  var currentQuestion = 0;
  var score = 0;
  isRunning = true;

  function rightAnswer() {
    var correctEl = onAnswer();
    correctEl.innerHTML = "Correct!";
    currentQuestion += 1;
    score += 1;
  }

  function wrongAnswer() {
    var incorrectEl = onAnswer();
    var timeLost = 10;
    incorrectEl.innerHTML = "Incorrect! You lose <strong>" + timeLost + " seconds</strong>";
    currentQuestion += 1;
    if (secondsLeft <= timeLost) {
      secondsLeft = 1;
    } else {
      secondsLeft -= timeLost;
    }
  }

  function loadQuestion() {
    if (isRunning) {
      clearScreen();

      // Checks if there are questions left
      if (currentQuestion < questionsAndAnswers.questions.length) {
        headerEl.textContent = questionsAndAnswers.questions[currentQuestion];
        
        // Creates a button for each answer option
        for (let i = 0; i < questionsAndAnswers.options[currentQuestion].length; i++) {
          var text = i+1 + ". " + questionsAndAnswers.options[currentQuestion][i];
          var buttonEl = document.createElement("button");
          buttonEl.innerHTML = text;
          buttonEl.classList.add("button");
          holderEl.appendChild(buttonEl);
          
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
    // Creates a header to display whether the user's answer was correct
    var correctnessEl = document.createElement("h3");
    holderEl.appendChild(correctnessEl);

    var nodes = holderEl.childNodes;

    // Removes functionality of the buttons after the first answer
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].onclick = function() {};
    }

    // Loads the next question after 1 second
    var loadDelay = setInterval(function() {
      loadQuestion();
      clearInterval(loadDelay);
    }, 1500);

    return correctnessEl;
  }

  function endGame(headerMessage) {
    var endMessage = "";
    var secondsUsed = timerLength-secondsLeft;
    var buttonEl = document.createElement("button");
    var inputEl = document.createElement("input");
    var submitEl = document.createElement("button");
    
    isRunning = false;
    clearScreen();
    clearInterval(timerInterval);
    headerEl.textContent = headerMessage;    

    function storeScore() {
      var scoresArray = JSON.parse(localStorage.getItem("highScores"));

      if (scoresArray === null) {
        scoresArray = [];
      }

      var currentScore = {
        name: inputEl.value,
        storedScore: score
      };

      scoresArray.push(currentScore);
      scoresArray.sort((a, b) => {return b.storedScore - a.storedScore;});
      localStorage.setItem("highScores", JSON.stringify(scoresArray));

      inputEl.disabled = true;
    }

    // Dynamically changes the end game message based on score and whether time ran out
    if (score === 1 && secondsLeft > 0) {
      endMessage = "You answered " + score + " question correctly with " + secondsLeft + " seconds left.";
    } else if (score === 1) {
      endMessage = "You answered " + score + " question correctly."
    } else if (secondsLeft > 0) {
      endMessage = "You answered " + score + " questions correctly with " + secondsLeft + " seconds left.";
    } else {
      endMessage = "You answered " + score + " questions correctly."
    }

    // Renders a button to play again and an input for the user's name
    buttonEl.textContent = "Play again";
    buttonEl.classList.add("button");
    buttonEl.id = "againButton";
    buttonEl.onclick = startGame;

    inputEl.placeholder = "Jane Doe";
    inputEl.classList.add("inputBox");

    submitEl.textContent = "Record score";
    submitEl.classList.add("submit");
    submitEl.classList.add("button");
    submitEl.onclick = storeScore;

    contentEl.appendChild(buttonEl);
    holderEl.appendChild(inputEl);
    holderEl.appendChild(submitEl);
    holderEl.style.textAlign = "center";

    descriptionEl.textContent = endMessage;
  }

  // Starts the time and loads the first question
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

highScoresEl.addEventListener("click", displayScores);
document.getElementById("startButton").addEventListener("click", startGame);