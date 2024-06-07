const quizData = [
  {
    question: 'Barita acara Pemusnahan berkas RM seharusnya memuat hal-hal berikut, kecuali:',
    options: ['Metode pemusnahan', 'Tempat pemusnahan', 'Jumlah dokumen yang di musnahkan', 'Biaya pemusnahan berkas'],
    answer: 'Biaya pemusnahan berkas',
  },
  {
    question: 'Kode diagnosa yang tepat untuk gagal ginjal kronik?',
    options: ['N18.0', 'N18.9', 'N17.9', 'N18.5'],
    answer: 'N18.9',
  },
  {
    question: 'Angka yang menunjukan persentase penggunaan tempat tidur yang di gunakan dalam satu periode waktu?',
    options: ['BTO', 'TOI', 'LOS', 'BOR'],
    answer: 'BOR',
  },
  {
    question: 'Analisis kuantitatif berkas rekam medis meliputi komponen berikut ini , kecuali?',
    options: ['Review identifikasi', 'Review ketepatan', 'Review pencatatan', 'Review pelaporan'],
    answer: 'Review ketepatan',
  },
  {
    question: 'kode diagnosa untuk abortus iminent adalah?',
    options: [
      'O20.0',
      'O20.9',
      'O02.0',
      'O06.4',
    ],
    answer: 'O20.0',
  },
  {
    question: 'Suatu review pengisian RM yang berkaitan dengan kekonsistenan isi dan penegasannya merupakan bukti bahwa RM tersebut akurat dan lengkap adalah?',
    options: ['Analisis retrospektif', 'Analisis statistik', 'Analisis kualitatif', 'Analisis kuantitatif'],
    answer: 'Analisis kualitatif',
  },
  {
    question: 'untuk kepentingan hukum maka isi rekam medis dapt di buka di?',
    options: [
      'Kantor polisi',
      'Kantor jaksa',
      'Hadapan notaris',
      'Hadapan hakim dalam sidang pengadilan',
    ],
    answer: 'Hadapan hakim dalam sidang pengadilan',
  },
  {
    question: 'Bayi lahir dengan diagnosa icteric neonatum BBLC KB SMK Spontan, kode diagnosa utama yang tepat adalah?',
    options: ['P59.9', 'P21.9', 'P59.8', 'P59.0'],
    answer: 'P59.0',
  },
  {
    question: 'Berkas rekam medis adalah milik?',
    options: [
      'Pasien',
      'Faskes',
      'Dokter',
      'Allah SWT',
    ],
    answer: 'Faskes',
  },
  {
    question: 'Kode ICD untuk pasien Thalasemia berada pada Bab?',
    options: ['BAB I', 'BAB II', 'BAB III', 'BAB IV'],
    answer: 'BAB III',
  },
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