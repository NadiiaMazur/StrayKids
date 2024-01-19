const quizData = [
  {
    question: '1. Kedy debutovali Stray Kids?',
    options: ['25. marca 2018', '30. augusta 2016', '6. mája 2019', '14. septembra 2018'],
    answer: '25. marca 2018',
  },
  {
    question: '2. Koľko účastníkov sa zúčastnilo debutu?',
    options: ['6', '7', '8', '9'],
    answer: '9',
  },
  {
    question: '3. Kto je dwakki? ',
    options: ['Changbin', 'Minho',  'Bang Chan',  'Seungmin'],
    answer: 'Changbin',
  },
  {
    question: '4. Kto je lídrom skupiny?',
    options: ['Bang Chan', 'Lee Felix', 'Seo Changbin', 'Lee Minho',],
    answer: 'Bang Chan',
  },
  {
    question: '5. Kto je maknae skupiny?',
    options: ['Kim Seungmin', 'Yang Jeongin', 'Bang Chan', 'Lee Felix'],
    answer: 'Yang Jeongin',
  },
  {
    question: '6. Kto opustil skupinu?',
    options: ['Changbin', 'Bang Chan', 'Jeongin', 'Woogin'],
    answer: 'Woogin',
  },
  {
    question: '7. Ako sa volá fandom Stray Kids?',
    options: ['Stay', 'Army', 'Engene', 'Moa'],
    answer: 'Stay',
  },
  {
    question: '8. Kedy sa narodil Bang Chan?',
    options: ['5. októbra', '14. septembra', '3. októbra', '11. augusta'],
    answer: '3. októbra',
  },
  {
    question: '9. Kto bol počas šou o prežitie vylúčený a sa vrátil späť?',
    options: ['Minho a Felix', 'Felix a Hyunjin', 'Seungmin a Han', 'Jeongin a Minho'],
    answer: 'Minho a Felix',
  },
  {
    question: '10. Kto z účastníkov má "šteňa SKZOO"?',
    options: ['Minho', 'Seungmin', 'Felix', 'Bang Chan'],
    answer: 'Seungmin',
  },
  {
    question: '11. Ktorý súťažiaci má anglické meno Sam?',
    options: ['Bang Chan', 'Hyunjin', 'Han', 'Jeongin'],
    answer: 'Hyunjin',
  },
  {
    question: '12. Ktorý z účastníkov študoval v Malajzii?',
    options: ['Minho', 'Felix', 'Han', 'Bang Chan'],
    answer: 'Han',
  },
  {
    question: '13. Kto sa narodil v Austrálii?',
    options: ['Seungmin', 'Felix', 'Jeongin', 'Bang Chan'],
    answer: 'Felix',
  },
  {
    question: '14. Ktorý z účastníkov sa zaujíma o baseball?',
    options: ['Seungmin', 'Minho', 'Jeongin', 'Felix'],
    answer: 'Seungmin',
  },
  {
    question: '15. Na akom albume sa nachádza pieseň Maniak?',
    options: ['IN LIFE', 'NOEASY', 'ODDINARY', 'ALL IN'],
    answer: 'ODDINARY',
  }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();