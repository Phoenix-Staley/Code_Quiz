var timeSeconds = 60;
var secondsEl = document.querySelector(".seconds");
var startEl = document.getElementById("#startButton");
secondsEl.textContent = timeSeconds;

var timerInterval = function() { setInterval(function(event) {
    secondsEl.textContent = i;

    if (i === 0) {
        secondsEl.textContent = "Times up!";
    }
}, 1000)};

console.log(secondsEl);

secondsEl.addEventListener("click", timerInterval);