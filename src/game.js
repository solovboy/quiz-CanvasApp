const system = {
  body: document.getElementById("body"),
  title: document.getElementById("title"),
  progress: {
    progressFill: document.getElementById("progress-fill"),
    questionNumber: document.getElementById("question-number"),
    totalQuestions: document.getElementById("total-questions"),
  },
  questionWrap: document.getElementById("question-wrap"),
  step: {
    question: document.getElementById("question"),
  },
  answers: document.getElementById("answers"),
  next: document.getElementById("next"),
  result: {
    resultBlock: document.getElementById("result"),
    validAnswers: document.getElementById("valid-answers"),
    questionsCount: document.getElementById("result-total-questions"),
  },
};

let questionCount = 0;
let step = 0;
let result = 0;
let questionsTopic = null;
var urlParams = new URLSearchParams(window.location.search);
var selectedTheme = urlParams.get("theme");



// Клик по кнопке "Следующий вопрос"
system.next.onclick = () => {
  step = step < questionCount ? step + 1 : step;
  renderQuiz(questionCount, step);
};

//Смена тематики
function renderTopic(topic){
  if(topic == "scn"){
    system.body.classList.add("body__scn");
    system.title.innerHTML = "Мифология Скандинавии";
    questionCount = data.scn.questions.length;
    questionsTopic = data.scn;
  }
  else if(topic == "gre"){
    system.body.classList.add("body__gre");
    system.title.innerHTML = "Мифология Греции";
    questionCount = data.gre.questions.length;
    questionsTopic = data.gre;
  }
  else{
    system.body.classList.add("body__egpt");
    system.title.innerHTML = "Мифология Египта";
    questionCount = data.egpt.questions.length;
    questionsTopic = data.egpt;
  }
}
renderTopic(selectedTheme)

// Отрисовка викторины
function renderQuiz(total, step) {
  renderProgress(total, step);
  if (total == step + 1) {
    changeButtonText();
  }
  if (step < total) {
    const answers = questionsTopic.questions[step].answers;
    const answersHtml = buildAnswers(answers);
    renderQuestion(step);
    renderAnswers(answersHtml);
    isDisableButton(true);
  } else if (step == total) {
    renderResults();
  }
}
renderQuiz(questionCount, step);

// Отрисовка прогресса
function renderProgress(total, step) {
  const progressPervent = (100 / total) * step;
  system.progress.questionNumber.innerHTML = step;
  system.progress.totalQuestions.innerHTML = total;
  system.progress.progressFill.style.width = `${progressPervent}%`;
}

// Отрисовка вопроса
function renderQuestion(step) {
  system.step.question.innerHTML = questionsTopic.questions[step].question;
}

//Создание HTML кода ответов
function buildAnswers(answers) {
  const answersHTML = [];
  answers.forEach((answer, idx) => {
    const html = `<div class="quiz__answer" data-id="${
      idx + 1
    }">${answer}</div>`;
    answersHTML.push(html);
  });
  return answersHTML.join("");
}
const answersHTML = buildAnswers(questionsTopic.questions[0].answers);

// Отрисовка ответов
function renderAnswers(htmlstring) {
  system.answers.innerHTML = htmlstring;
}

// Отслеживание клика на ответе
system.answers.onclick = (event) => {
  const target = event.target;
  if (target.classList.contains("quiz__answer")) {
    const answerNumber = target.dataset.id;
    const isValid = checkAnswer(step, answerNumber);
    const answerClass = isValid ? "quiz__answer_valid" : "quiz__answer_invalid";
    target.classList.add(answerClass);
    if(!isValid){
      document.querySelector(`div[data-id="${questionsTopic.questions[step].validAnswer}"]`).classList.add("quiz__answer_valid")
    }
    isDisableButton(false);
    result = isValid ? result + 1 : result;
  }
};

// Проверка верности ответа
function checkAnswer(step, answer) {
  const validAnswer = questionsTopic.questions[step].validAnswer;
  return validAnswer == answer;
}

// Блокировка кнопки
function isDisableButton(isDisable) {
  if (isDisable) {
    system.answers.classList.remove("quiz__answer_button_disable");
    system.next.classList.add("quiz__button_disable");
  } else {
    system.answers.classList.add("quiz__answer_button_disable");
    system.next.classList.remove("quiz__button_disable");
  }
}

//Смена надписи на кнопке
function changeButtonText() {
  system.next.innerText = "Посмотреть результат";
  system.next.dataset.result = "result";
}

//Показать результаты
function renderResults() {
  system.answers.style.display = "none";
  system.next.style.display = "none";
  system.questionWrap.style.display = "none";

  system.result.resultBlock.style.display = "block";
  system.result.validAnswers.innerHTML = result;
  system.result.questionsCount.innerHTML = questionCount;
}
