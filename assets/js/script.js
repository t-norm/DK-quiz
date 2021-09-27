// variables
let questionNumber;
let timer = 180;
let timerInterval;

// html object references
const questionContainer = document.getElementById("questionSection");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const startButton = document.getElementById("startButton");
const countdownClock = document.getElementById("timer");

// event listeners
startButton.addEventListener("click", startGame);

// functions
function startClock() {
  countdownClock.innerHTML = timer;
  if (timer <= 0) {
    endGame();
  } else {
    timer -= 1;
    timerInterval = setTimeout(startClock, 1000);
  }
}

function startGame() {
  startClock();
  startButton.classList.add("hide");
  answerButton.classList.remove("hide");
  questionNumber = 0;
  questionContainer.classList.remove("hide");
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
}

function clearQuestion() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function endGame() {
  clearInterval(timerInterval);
  countdownClock.innerHTML = "";
  timer = 180
	clearQuestion();
	startButton.innerText = "Play again";
	startButton.classList.remove("hide");
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