const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const finalPage = document.querySelector("#finalPage");
const finalScore = document.querySelector("#finalScore");
const reset = document.querySelector("#reset");
const register = document.querySelector("#register");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/* PREGUNTAS */
let questions = [
    {
        question: "¿Cómo se dice NOSOTROS en ingles?",
        choice1: "I",
        choice2: "You",
        choice3: "We",
        choice4: "Are",
        answer: 3,
    },
    {
        question: "¿Cómo se dice Tú en ingles",
        choice1: "You",
        choice2: "is",
        choice3: "Ball",
        choice4: "We",
        answer: 1,
    },
    {
        question:"¿Qué significa My School?",
        choice1: "Mi escuela",
        choice2: "Mi balon",
        choice3: "Tu escuela",
        choice4: "Nuestro balon",
        answer: 1,
    },
    {
        question: "Cuando se quiere decir: Ustedes son. ¿Cómo se deberia de escribir?",
        choice1: "He is",
        choice2: "You are",
        choice3: "Your are",
        choice4: "They are",
        answer: 2,
    },
    {
        question: "El verbo to be para el pronombre She es:",
        choice1: "is",
        choice2: "are",
        choice3: "am",
        choice4: "Ninguna de las anteriores",
        answer: 1,
    },
    {
        question: "¿Cómo se dice YO en ingles?",
        choice1: "I",
        choice2: "You",
        choice3: "We",
        choice4: "Are",
        answer: 1,
    },
    {
        question: "La traduccion de It is my ball: ",
        choice1: "Ese es mi balon",
        choice2: "Esa es mi escuela",
        choice3: "Esa es nuestra escuela",
        choice4: "Yo soy un balon",
        answer: 1,
    },
    {
        question: "El verbo to be para el pronombre He es:",
        choice1: "is",
        choice2: "are",
        choice3: "am",
        choice4: "Ninguna de las anteriores",
        answer: 1,
    },
    {
        question: "¿Cuál es el pronombre para She?",
        choice1: "are",
        choice2: "is",
        choice3: "si",
        choice4: "Ninguna de las anteriores",
        answer: 2,
    },
    {
        question: "Cuando se quiere decir: Nostros somos. ¿Cómo se deberia de escribir?",
        choice1: "He is",
        choice2: "You are",
        choice3: "We are",
        choice4: "They are",
        answer: 3,
    }
];


const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        finalScore.innerText = score;
        return finalPage.classList.add("active");
    }

    questionCounter++;
    progressText.innerText = 'Pregunta '+ questionCounter + ' de '+ MAX_QUESTIONS;
    progressBarFull.style.width = (questionCounter*10)+'%';

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

reset.addEventListener('click', () => {
    window.location.reload();
})

register.addEventListener('click', () => {
    document.getElementById('input-score').value = score;
    document.getElementById('form-score').submit();
});

startGame();