const questions = [
  { question: "What is the capital of the Philippines?", choices: ["Manila", "Cebu", "Davao", "Quezon City"], answer: "Manila" },
  { question: "Which language runs in a web browser?", choices: ["Python", "Java", "C", "JavaScript"], answer: "JavaScript" },
  { question: "What does CSS stand for?", choices: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
  { question: "What is the largest planet in our solar system?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "What is the chemical symbol for gold?", choices: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
  { question: "BUGTONG: Hinihintay ko, hinihintay mo, hinihintay ng lahat?", choices: ["Sabon", "Bigas", "Joy", "Pera"], answer: "Pera" },
  { question: "Who write 'Romeo and Juliet'?", choices: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" },
  { question: "Sino hari ng mga saiyan?", choices: ["Vegeta", "Goku", "Trunks", "Piccolo"], answer: "Vegeta" },
  { question: "Sino pinakamalakas na kalaban ni Goku?", choices: ["Frieza", "Cell", "Majin Buu", "Beerus"], answer: "Beerus" },
  { question: "What is the hardest natural substance on Earth?", choices: ["Gold", "Iron", "Diamond", "Ruby"], answer: "Diamond" },
  { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { question: "Sino ang anak ni gohan?", choices: ["Goten", "Goku", "Pan", "Trunks"], answer: "Pan" },
  { question: "Ilan ang dragon balls?", choices: ["7", "5", "10", "12"], answer: "7" },
  { question: "Sino ang pinakamalakas na saiyan?", choices: ["Goku", "Vegeta", "Broly", "Gohan"], answer: "Broly" },
  { question: "What is the main ingredient in guacamole?", choices: ["Tomato", "Avocado", "Onion", "Pepper"], answer: "Avocado" },
  { question: "What is the freezing point of water?", choices: ["0°C", "100°C", "-32°F", "32°F"], answer: "0°C" },
  { question: "What is the largest mammal in the world?", choices: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"], answer: "Blue Whale" },
  { question: "What is the smallest prime number?", choices: ["0", "1", "2", "3"], answer: "2" },
  { question: "What is the hardest rock?", choices: ["Diamond", "Ruby", "Sapphire", "Emerald"], answer: "Diamond" },
  { question: "What is the main ingredient in bread?", choices: ["Flour", "Sugar", "Salt", "Water"], answer: "Flour" },
  { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "What is the largest ocean on Earth?", choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
  { question: "What is the chemical symbol for water?", choices: ["H2O", "O2", "CO2", "NaCl"], answer: "H2O" },
  { question: "What is the main gas found in the air we breathe?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
  { question: "What is the largest continent on Earth?", choices: ["Africa", "Asia", "Europe", "North America"], answer: "Asia" },
  { question: "What is the capital of Japan?", choices: ["Tokyo", "Seoul", "Beijing", "Bangkok"], answer: "Tokyo" },
  { question: "What is the hardest natural substance on Earth?", choices: ["Gold", "Iron", "Diamond", "Ruby"], answer: "Diamond" },
  { question: "What is the main ingredient in sushi?", choices: ["Rice", "Fish", "Seaweed", "Vegetables"], answer: "Rice" },
  { question: "What is the largest desert in the world?", choices: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Kalahari Desert"], answer: "Sahara Desert" },
  { question: "What is the capital of Italy?", choices: ["Rome", "Venice", "Florence", "Milan"], answer: "Rome" },
  { question: "What is the main ingredient in chocolate?", choices: ["Cocoa", "Sugar", "Milk", "Vanilla"], answer: "Cocoa" },
  { question: "What is the largest land animal?", choices: ["Elephant", "Giraffe", "Hippopotamus", "Rhino"], answer: "Elephant" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
  { question: "What is the main ingredient in pizza?", choices: ["Bread", "Cheese", "Tomato Sauce", "Pepperoni"], answer: "Bread" },
  { question: "What is the largest country in the world?", choices: ["USA", "China", "Russia", "Canada"], answer: "Russia" },
  { question: "What is the capital of Australia?", choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
  { question: "What is the main ingredient in hummus?", choices: ["Chickpeas", "Lentils", "Beans", "Peas"], answer: "Chickpeas" },
  { question: "What is the largest city in the world?", choices: ["Tokyo", "New York", "Shanghai", "Mumbai"], answer: "Tokyo" }
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let highScore = localStorage.getItem("highScore") || 0;
const userAnswers = Array(questions.length).fill(null);
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const questionBox = document.getElementById('question-box');
const questionText = document.getElementById('question');
const choicesBox = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const scoreBox = document.getElementById('score-box');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time-left');
const restartBtn = document.getElementById('restart-btn');
const themeSwitch = document.getElementById('theme-switch');
const timerAudio = new Audio("sound/tricking_timer.wav");
timerAudio.loop = true;
const reviewBox = document.getElementById("review-box");
const reviewList = document.getElementById("review-list");
const backToStartBtn = document.getElementById("back-to-start-btn");


function showQuestion(direction = "next") {
  const q = questions[currentQuestion];
  const questionBox = document.getElementById("question-box");
  const questionText = document.getElementById("question");
  const choicesBox = document.getElementById("choices");

  // Clear old choices
  choicesBox.innerHTML = "";

  // Remove previous animation classes
  questionBox.classList.remove("slide-in-left", "slide-in-right");

  // Force reflow to reset animation (important trick!)
  void questionBox.offsetWidth;

  // Add the appropriate animation class
  if (direction === "next") {
    questionBox.classList.add("slide-in-left");
  } else if (direction === "prev") {
    questionBox.classList.add("slide-in-right");
  }

  // Show question and choices
  questionText.textContent = q.question;
  const shuffledChoices = [...q.choices];
  shuffleArray(shuffledChoices);

  shuffledChoices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(choice));

    if (userAnswers[currentQuestion] === choice) {
      btn.style.backgroundColor = "#87CEFA"; // highlight previous answer
    }

    choicesBox.appendChild(btn);
  });

  // Update navigation buttons
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
  prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";
}


function selectAnswer(choice) {
  timerAudio.pause();
  if (userAnswers[currentQuestion]) return; // Already answered

  clearInterval(timer); // Stop the countdown
  userAnswers[currentQuestion] = choice;

  const correctSound = document.getElementById('correct-sound');
  const wrongSound = document.getElementById('wrong-sound');

  const isCorrect = choice === questions[currentQuestion].answer;

  Array.from(choicesBox.children).forEach(btn => {
    btn.style.backgroundColor = "#eee";
    if (btn.textContent === choice) {
      btn.style.backgroundColor = "#87CEFA";
    }
    btn.disabled = true;
  });

  if (isCorrect) {
    correctSound.play();
  } else {
    wrongSound.play();
  }
}


function startTimer() {
  clearInterval(timer);
  timerAudio.currentTime = 0;
  timerAudio.play();

  timeLeft = 10;
  timeDisplay.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerAudio.pause();
      autoNext();
    }
  }, 1000);
}



function autoNext() {
  if (userAnswers[currentQuestion]) return; // Do nothing if already answered

  if (currentQuestion === questions.length - 1) {
    calculateScore();
    questionBox.classList.add('hide');
    scoreBox.classList.remove('hide');
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
    return;
  }

  currentQuestion++;
  showQuestion();
  startTimer();
}

function calculateScore() {
  score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  saveHighScore();
  document.getElementById("score").textContent = `${score} / ${questions.length}`;
  document.getElementById("high-score").textContent = highScore;
  showReview();
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("high-score").textContent = highScore;
});

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  userAnswers.fill(null);
  shuffleArray(questions);

  // Hide score and review sections
  scoreBox.classList.add('show');
  reviewBox.classList.add('hide');
  reviewList.innerHTML = ''; // Clear the review content

  // Show quiz again from start
  startScreen.classList.remove('hide');
  questionBox.classList.add('hide');
});



startBtn.addEventListener('click', () => {
  startScreen.classList.add('hide');
  questionBox.classList.remove('hide');
  currentQuestion = 0;
  score = 0;
  userAnswers.fill(null);
  shuffleArray(questions);
  showQuestion();
  startTimer();
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion === questions.length - 1) {
    calculateScore();
    questionBox.classList.add('hide');
    scoreBox.classList.remove('hide');
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  } else {
    currentQuestion++;
    showQuestion("next");
    startTimer();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion("prev");
    startTimer();
  }
});


restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  userAnswers.fill(null);
  shuffleArray(questions);
  scoreBox.classList.add('hide');
  startScreen.classList.remove('hide');
  questionBox.classList.add('hide');
});

themeSwitch.addEventListener('change', () => {
  const isDark = themeSwitch.checked;
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeSwitch.checked = true;
}

function showReview() {
  reviewList.innerHTML = "";

  questions.forEach((q, index) => {
    const userAnswer = userAnswers[index] || "No answer";
    const isCorrect = userAnswer === q.answer;

    const div = document.createElement("div");
    div.classList.add("review-item");
    div.classList.add(isCorrect ? "correct" : "wrong");

    div.innerHTML = `
      <p><strong>Q${index + 1}: ${q.question}</strong></p>
      <p>Your answer: ${userAnswer}</p>
      <p>Correct answer: ${q.answer}</p>
    `;

    reviewList.appendChild(div);
  });

  scoreBox.classList.add("hide");
  reviewBox.classList.remove("hide");
}
backToStartBtn.addEventListener("click", () => {
  reviewBox.classList.add("hide");
  startScreen.classList.remove("hide");
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
});

function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}

document.getElementById("themeToggleBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
