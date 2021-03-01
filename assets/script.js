var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startBtn");
var questionsCard = document.querySelector("#questionsCard");
var wrapper = document.querySelector("#wrapper");
var initials = null;
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 10;

var ulCreated = document.createElement("ul");

// Triggers timer on button click and begins the game
timer.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time Left: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                complete();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Displays questions and choices to the users tab/window
function render(questionIndex) { 
    questionsCard.innerHTML = "";
    ulCreated.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        // Changes the questionsCard text to be current question
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsCard.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsCard.appendChild(ulCreated);
        ulCreated.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Compares user choice to the answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createdDiv = document.createElement("div");
        createdDiv.setAttribute("id", "createdDiv"); 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createdDiv.textContent = "Correct!";
        } else {
            // Sets the seconds left to 10 less than when the question was answered
            secondsLeft = secondsLeft - penalty;
            createdDiv.textContent = "Incorrect!";
        }

    }

    questionIndex++;

    if (questionIndex >= questions.length) {
        // Complete will append the win screen with the users score and number of correct answers out of total questions
        complete();
        createdDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " questions correct!";
    } else {
        render(questionIndex);
    }
    questionsCard.appendChild(createdDiv);

}
// Appends to the win screen
function complete() {
    questionsCard.innerHTML = "";
    currentTime.innerHTML = "";

    var createdH1 = document.createElement("h1");
    createdH1.setAttribute("id", "createdH1");
    createdH1.textContent = "You Did It!"
    questionsCard.appendChild(createdH1);

    var createdP = document.createElement("p");
    createdP.setAttribute("id", "createdP");
    questionsCard.appendChild(createdP);

    // Checks time remaining concats it to a string that is displayed as the user's score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        clearInterval(holdInterval);
        createdP.textContent = "Your final score is: " + timeRemaining;
    }

    // prompts the user to input the initials and appends that to the questionsCard
    var createdLabel = document.createElement("label");
    createdLabel.setAttribute("id", "createdLabel");
    createdLabel.textContent = "Enter your initials: ";
    questionsCard.appendChild(createdLabel);

    var createdInput = document.createElement("input");
    createdInput.setAttribute("type", "text");
    createdInput.setAttribute("id", "initialsBox");
    createdInput.textContent = "";
    questionsCard.appendChild(createdInput);

    // Creates submit button and appends it to the questionsCard
    var createdSubmit = document.createElement("button");
    createdSubmit.setAttribute("id", "Submit");
    createdSubmit.textContent = "Submit";
    questionsCard.appendChild(createdSubmit);

    // Stores users input and scores and stores that info to the local storage
    createdSubmit.addEventListener("click", function () {
        var initials = createdInput.value;
        if (!isNaN(initials))  {
            alert("You must input your initials as a text value!")
            document.getElementById("initialsBox").value = "";
            return;
        } 
        else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } 
            else {
                allScores = JSON.parse(allScores);
            }

            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Changes the user's window/tab to the high-scores.html
            window.location.replace("high-Scores.html");
        }
    });

}