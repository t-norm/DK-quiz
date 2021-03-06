// persistence
let playerData = JSON.parse(localStorage.getItem("playerData") || "[]");

// variables
let questionNumber;
let timer = 180;
let timerInterval;
let quizScore = 0;
let timeScore = 0;
let sessionScore = 0;
let finalScore;
let username = "";
const maxHighScores = 5;

// html object references
const countdownClock = document.getElementById("timer");
const questionContainer = document.getElementById("questionSection");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const startButton = document.getElementById("startButton");
const highScoreContainer = document.getElementById("scoreSection");
const playerScoreElement = document.getElementById("player-score");

const playerNameLabel = document.getElementById("playerNameLabel");
const playerName = document.getElementById("playerName");
const saveScoreButton = document.getElementById("submit-score");
const showScoresButton = document.getElementById("showScoresButton");
const highScoresOl = document.getElementById("highScoresOl");

// event listeners
startButton.addEventListener("click", startGame);
saveScoreButton.addEventListener("click", setPlayerNameAndScore);
showScoresButton.addEventListener("click", showHighScores);
playerName.addEventListener("keyup", stateHandle);

// functions
function showHighScores() {
  showScoresButton.classList.add("hide");
  highScoresOl.classList.remove("hide");
  highScoresOl.innerHTML = playerData
  .map(sessionScore => {
    return `<li class="highScores">${sessionScore.name} - ${sessionScore.score}</li>`;
  })
  .join("");
}

function stateHandle() {
  if (playerName.value === "" || playerName.value === null) {
    saveScoreButton.disabled = true;
    saveScoreButton.classList.add("hide");
  } else {
    saveScoreButton.disabled = false;
    saveScoreButton.classList.remove("hide");
  }
}

function setPlayerNameAndScore() {
  username = playerName.value
  playerNameLabel.classList.add("hide");
  playerName.classList.add("hide");
  saveScoreButton.classList.add("hide");

  const sessionScore = {name: username, score: finalScore};
  playerData.push(sessionScore);
  playerData.sort((a,b) => b.score - a.score);
  playerData.splice(maxHighScores);
  localStorage.setItem("playerData", JSON.stringify(playerData));

  showHighScores();
}

function setTimeScore() {
  timeScore = timer * 50
}

function setFinalScore() {
  finalScore = timeScore + quizScore
  if (finalScore < 0) {
    finalScore = 0
  }
}

function startClock() {
  countdownClock.innerHTML = timer;
  if (timer <= 0) {
    endGame();
  } else {
    timer -= 1;
    timerInterval = setTimeout(startClock, 1000);
  }
}

function resetGameState() {
  saveScoreButton.disabled = true;
  highScoresOl.classList.add("hide");
  showScoresButton.classList.remove("hide");
  countdownClock.classList.remove("hide");
  clearInterval(timerInterval);
  username = "";
  playerName.value = ""
  timer = 180;
  quizScore = 0;
  timeScore = 0;
  sessionScore = 0;
  finalScore = 0;
}

function startGame() {
  resetGameState();
  startButton.classList.add("hide");
  answerButton.classList.remove("hide");
  questionNumber = 0;
  questionContainer.classList.remove("hide");
  highScoreContainer.classList.add("hide");
  startClock();
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
  showQuestion(questions[questionNumber]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      quizScore += 250
    }
    button.addEventListener("click", selectAnswer);
    answerButton.appendChild(button);
  });
}

function selectAnswer(e) {
  if (questionNumber == questions.length - 1) {
    endGame();
  } else {
    clearQuestion();
    questionNumber++;
    showQuestion(questions[questionNumber]);
  }
  const selectedAnswer = e.target;
  if (!selectedAnswer.dataset.correct) {
    timer -= 30;
  }
}

function clearQuestion() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function endGame() {
  playerNameLabel.classList.remove("hide");
  playerName.classList.remove("hide");
  clearTimeout(timerInterval);
  questionElement.innerHTML = "Time is up!"
  answerButton.classList.add("hide")
  countdownClock.innerHTML = "";
	clearQuestion();
  setTimeScore();
  setFinalScore();
	startButton.innerText = "Play again";
	startButton.classList.remove("hide");
  playerScoreElement.innerText = "Score: " + finalScore;
  highScoreContainer.classList.remove("hide")
  sessionScore = finalScore
}

// question array
const questions = [
  {
    question: "What year did 'Donkey Kong' hit arcade cabinets?",
    answers: [
      { text: "1981", correct: true },
      { text: "1991", correct: false },
      { text: "1983", correct: false },
      { text: "1987", correct: false }
    ]
  },
  {
    question: "What company developed Donkey Kong Country on the SNES?",
    answers: [
      { text: "Nordic HQ", correct: false },
      { text: "RareWare", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Sega", correct: false }
    ]
  },
  {
    question: "Who is Donkey Kong's arch nemesis?",
    answers: [
      { text: "Gnawty The Beaver", correct: false },
      { text: "Dread Kong", correct: false },
      { text: "King K. Rool", correct: true },
      { text: "Kaptain Scurvy", correct: false }
    ]
  },
  {
    question: "What event set Diddy's Kong Quest (DKC2) into motion?",
    answers: [
      { text: "The banana hoard was stolen", correct: false },
      { text: "It was Donkey Kong's birthday", correct: false },
      { text: "There was an orangutang invasion", correct: false },
      { text: "Donkey Kong was Kidnapped", correct: true }
    ]
  },
  {
    question: "In the Donkey Kong Country TV show, what was Donkey Kong's catchphrase?",
    answers: [
      { text: "Banana Slamma!", correct: true },
      { text: "Donkey Kong!", correct: false },
      { text: "Excuse me, princess!", correct: false },
      { text: "I'd shower you with coconut cream pies!", correct: false }
    ]
  },
  {
    question: "Which character is unique to the DKC TV show?",
    answers: [
      { text: "Candy Kong", correct: false },
      { text: "Bluster Kong", correct: true },
      { text: "Krusha", correct: false },
      { text: "Swanky Kong", correct: false }
    ]
  },
  {
    question: "What type of monkey is Diddy Kong?",
    answers: [
      { text: "Gorilla", correct: false },
      { text: "Orangutan", correct: false },
      { text: "Chimpanzee", correct: true },
      { text: "Capuchin", correct: false }
    ]
  },
  {
    question: "What message did Shigeru Miyamoto intend for DK's name to convey?",
    answers: [
      { text: "Stupid Monkey", correct: false },
      { text: "Great Gorilla", correct: false },
      { text: "Banana Glutton", correct: false },
      { text: "Stubborn Ape", correct: true }
    ]
  },
  {
    question: "What fruit did DK shoot out of his blaster in DK64?",
    answers: [
      { text: "Coconuts", correct: true },
      { text: "Grapes", correct: false },
      { text: "Pineapples", correct: false },
      { text: "Bananas", correct: false }
    ]
  },
  {
    question: "In DKC: Tropical Freeze, what group did The Kong Family face off against?",
    answers: [
      { text: "The Kremling Krew", correct: false },
      { text: "The Snowmads", correct: true },
      { text: "The Tiki Tak Tribe", correct: false },
      { text: "The Orang-utang", correct: false }
    ]
  }
]