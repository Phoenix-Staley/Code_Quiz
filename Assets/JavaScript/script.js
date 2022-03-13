// 1. Define variables for the elements to be used, the length of a game, and an object of the questions and answers
// 2. Define the function that will run upon starting the game
// 3. Create a timer interval that counts down
// 4. Make the description element empty
// 4. Define a variable for current question number
// 5. Change title to current question
// 6. Define functions for repeated code
// 6a. Define functions for getting the right and wrong answers
// 6b. Define function for going to the next question
//      Use a for loop to create buttons for possible answers, using an if statement to check if the current button will be the correct answer or not
// 6c. Define function for when time runs out, and another for when the user completes all questions
// 7. Replace the buttons with the score and an input box for the user's name
// 8. Record the user's name and score as a string in an array
// 9. Make highscores appear in order of time completed when pressing the highscores button

var timerLength = 60;
var secondsEl = document.querySelector(".seconds");
var startEl = document.getElementById("startButton");
secondsEl.textContent = timerLength;

var questionsAndAnswers = {
    questions: ["What variable does JavaScript use to hold numeric values?", "Commonly used data types DO NOT include..."],
    answers: [["int", "string", "number", "float", 2], ["alert", "boolean", "number", "object", 0]]
};

function startGame() {
    var secondsLeft = timerLength;

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

    console.log("Hi!");
}

startEl.addEventListener("click", startGame);