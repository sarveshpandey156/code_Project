const loginPage = document.getElementById("login-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const timeLeftDisplay = document.getElementById("time-left");
const resultText = document.getElementById("result-text");

const correctUsername = "sarveshpandey156";
const correctPassword = "Pandey@123";

let timer;
let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "who is the Founder of Oracla",
    options: ["Christ Lamb", "Larry Ellison", "James Carter", "Henry Smith"],
    answer: "Larry Ellison",
  },
  {
    question: "who is the founder of microsoft?",
    options: ["C B Raman", "Steve Henry", "Bill Gates", "Milan"],
    answer: "Bill Gates",
  },
  {
    question: "Who is the founder of Apple?",
    options: ["Steve Job", "Jackson Henry", "Henry Smith", "Phil Hughes"],
    answer: "Steve Job",
  },
  {
    question: "Which of the following is NOT a type of software testing",
    options: ["Unit testing", "Integration testing", "System testing", "Production testing"],
    answer: "Production testing",
  },
  {
    question: "Which of the following is a benefit of Agile software development over Waterfall",
    options: ["More comprehensive documentation", "Faster delivery and customer feedback", "Clearer project scope and timeline", "Lower cost of development"],
    answer: " Faster delivery and customer feedback",
  },
];

function startTimer() {
  let timeLeft = 10;
  timeLeftDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      goToNextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsList.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => {
      if (option === currentQuestion.answer) {
        score++;
      }
      goToNextQuestion();
    });
    optionsList.appendChild(li);
  });
  startTimer();
}

function goToNextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  loadQuestion();
}

function showResults() {
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  resultText.textContent = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  resultPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (username === correctUsername && password === correctPassword) {
    loginPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    loadQuestion();
  } else {
    loginError.textContent = "Invalid username or password.";
  }
});
