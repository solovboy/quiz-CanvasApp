const system = {
    title: document.getElementById("title"),
    progress: {
      progressFill: document.getElementById("progress-fill"),
      questionNumber: document.getElementById("question-number"),
      totalQuestions: document.getElementById("total-questions"),
    },
    step: {
      question: document.getElementById("question"),
    },
    answers: document.getElementById("answers"),
    next: document.getElementById("next"),
  };
  
  let questionCount = data.questions.length;
  let step = 0;
  let result = 0;
  
  // Клик по кнопке "Следующий вопрос"
  system.next.onclick = () => {
    step = step < questionCount ? step + 1 : step;
    renderQuiz(questionCount, step);
  };
  
  // Отрисовка викторины
  function renderQuiz(total, step) {
    renderProgress(total, step);
    if (step < total) {
      const answers = data.questions[step].answers;
      const answersHtml = buildAnswers(answers);
      renderQuestion(step);
      renderAnswers(answersHtml);
    }
    if (total == step + 1) {
      changeButtonText();
    }
    isDisableButton(true);
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
    system.step.question.innerHTML = data.questions[step].question;
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
  const answersHTML = buildAnswers(data.questions[0].answers);
  
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
      isDisableButton(false);
    }
  };
  
  // Проверка верности ответа
  function checkAnswer(step, answer) {
    const validAnswer = data.questions[step].validAnswer;
    return validAnswer == answer;
  }
  
  // Блокировка кнопки
  function isDisableButton(isDisable) {
    if (isDisable) {
      system.answers.classList.remove("quiz__answer_button_disable")
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
  