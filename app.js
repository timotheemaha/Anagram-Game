import arrayOfTotalWords from "/words.js";

// Defining variables
 
let twl;
let highScores;
let arrayOfFilteredWords;
let chosenWord;
let chosenWordShuffled;
let arrayOfPossibleCorrectAnswers;
let arrayOfAnagrams;
let optionButtons;
let time;
let timeDisplay;
let score;

function startGame() {

// For the first round the twl=6
twl = 6;
// I am intialising the highscores for each twl
highScores = {
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};

// I am filtering the words from the toal list of words depending on the twl
arrayOfFilteredWords = arrayOfTotalWords.filter(function (word) {
  return word.length === twl;
});

// I am now calling my function to get the random word from the aray of filtered words
chosenWord = getRandomWord(arrayOfFilteredWords);

// Now I am calling my function to shuffle the chosen word and replace the Placeholder
chosenWordShuffled = shuffle(chosenWord);

// Now I am going to find all the anagrams of the chosen anagram displayed to the user
arrayOfPossibleCorrectAnswers = [];

// Now I am creating an array that will store all posible correct answers of the anagram
arrayOfAnagrams = findAllAnagrams(chosenWordShuffled);

// I am now assigning the varaible optionButtons to the different buttons: submit, pass and quit
optionButtons = document.querySelector("#options").children;

// Here I am defining time variables
time = 120;
timeDisplay = document.getElementById("timer");

// I am initialising the score at the start of the game
score = 0;

document.getElementById("anagram").textContent = chosenWordShuffled;

document.getElementById("score-display").textContent = "Score: " + score;

startTimer();

displayHighScore();

// When the user clicks the submit button and the answer is correct the score is added by one and new answer is dispalyed
// If the answer is incorrect the user gets another opportunity to answer but nothing happens to the score
optionButtons[0].addEventListener("click", () => {
    let userAnswer = document.getElementById("user-input").value;
  
    if (arrayOfPossibleCorrectAnswers.includes(userAnswer)) {
      score += 1;
      document.getElementById("score-display").textContent = "Score: " + score;
  
      chosenWord = getRandomWord(arrayOfFilteredWords);
      chosenWordShuffled = shuffle(chosenWord);
      document.getElementById("anagram").textContent = chosenWordShuffled;
      document.getElementById("message").textContent = "Correct!";
    } else {
      document.getElementById("message").textContent = "Incorrect!";
    }
  });
  
  // When the user clicks the pass button a new word is displayed
  optionButtons[1].addEventListener("click", () => {
    chosenWord = getRandomWord(arrayOfFilteredWords);
    chosenWordShuffled = shuffle(chosenWord);
    document.getElementById("anagram").textContent = chosenWordShuffled;
  });
  
  // When the user clicks the on quit then are redirecred to a blank oage
  optionButtons[2].addEventListener("click", () => {
    window.location.href = "about:blank";
  });

  for (let i = 0; i < arrayOfAnagrams.length; i++) {
    if (arrayOfFilteredWords.includes(arrayOfAnagrams[i])) {
      arrayOfPossibleCorrectAnswers.push(arrayOfAnagrams[i]);
    }
  }

}  

startGame();

// I am creating a function that will get a random element from an array
function getRandomWord(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// This is an algorithm to shuffle characters in the chosen word to create the anagram
function shuffle(str) {
    var a = str.split(""),
      n = a.length;
  
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    
    return a.join("");
  }
  
// Here I am creating a function to calculate factorial of a number
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Here I am creating a function to find all the potential anagrams of a word and store it in an array
// I'm doing this to find all potential words that can be made from an anagram and compare it to the arrayOfFilteredWords

function findAllAnagrams(anagram) {
  let allAnagrams = [];
  let anagramLength = anagram.length;
  let totalAnagrams = factorial(anagramLength);

  while (allAnagrams.length < totalAnagrams) {
    let shuffledAnagram = shuffle(anagram);
    if (!allAnagrams.includes(shuffledAnagram)) {
      allAnagrams.push(shuffledAnagram);
    }
  }

  return allAnagrams;
}

// I am creating the function endGame which includes changing the twl depending on the score, updating the highscore for the twl and restart the timer
function endGame() {
  // Check the user's score and adjust the TWL accordingly
  if (
    Number(document.getElementById("score-display").textContent[7]) >= 15 &&
    twl < 9
  ) {
    twl += 1;
  } else if (
    Number(document.getElementById("score-display").textContent[7]) <= 8 &&
    twl > 4
  ) {
    twl -= 1;
  }
  arrayOfFilteredWords = arrayOfTotalWords.filter(function (word) {
    return word.length === twl;
  });

  chosenWord = getRandomWord(arrayOfFilteredWords);
  chosenWordShuffled = shuffle(chosenWord);
  document.getElementById("anagram").textContent = chosenWordShuffled;

  if (score > highScores[twl]) {
    highScores[twl] = score;
  }

  time = 120;
  startTimer();

  score = 0;
  document.getElementById("score-display").textContent = "Score: " + score;
  displayHighScore();
}

// I am creating function updateTimeDisplay to replace the current time with the new time
function updateTimeDisplay(time) {
  timeDisplay.textContent = time;
}

// Here I am creating  the function startTimer to start the time at 120s and decreases every second
function startTimer() {
  updateTimeDisplay(time);

  let timer = setInterval(() => {
    time--;
    updateTimeDisplay(time);

    if (time <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// I am changing the high score displayed on screen
function displayHighScore() {
  const highScoreDisplay = document.getElementById("high-score-display");
  highScoreDisplay.textContent = "High Score: " + highScores[twl];
}


