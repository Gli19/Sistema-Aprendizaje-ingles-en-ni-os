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
        question: "¿Cómo se escribe el número 1 en ingles?",
        choice1:"uno",
        choice2:"three",
        choice3:"One",
        choice4:"Uán",
        answer:3,
    },
    {
        question: "El día Friday en español es el día:",
        choice1:"Viernes",
        choice2:"Lunes",
        choice3:"Sabado",
        choice4:"Domingo",
        answer:1,
    },
    {
        question: "¿Cúal es la unica letra que no esta en el abecedario ingles pero si en el español?",
        choice1:"w",
        choice2:"j",
        choice3:"k",
        choice4:"ñ",
        answer:4,
    },
    {
        question: "¿Cómo se pronuncia la letra A en ingles?",
        choice1:"ei",
        choice2:"bi",
        choice3:"ci",
        choice4:"i",
        answer:1,
    },
    {
        question: "¿Cómo se pronuncia el número 2 en ingles?",
        choice1:"Tú",
        choice2:"Fóo",
        choice3:"Trí",
        choice4:"Uán",
        answer:1,
    },
    {
        question: "¿Cómo se pronuncia la letra Z en ingles?",
        choice1:"ei",
        choice2:"bi",
        choice3:"ci",
        choice4:"set",
        answer:3,
    },
    {
        question: "El día Sabado en ingles es el día:",
        choice1:"Monday",
        choice2:"Tuesday",
        choice3:"Wednesday",
        choice4:"Saturday",
        answer:4,
    },
    {
        question: "¿Cómo se escribe el número 5 en ingles?",
        choice1:"five",
        choice2:"six",
        choice3:"One",
        choice4:"Two",
        answer:1,
    },
    {
        question: "¿Cómo se escribe el número 6 en ingles?",
        choice1:"five",
        choice2:"six",
        choice3:"One",
        choice4:"Two",
        answer:2,
    },
    {
        question: "¿Cómo se escribe el número 2 en ingles?",
        choice1:"five",
        choice2:"six",
        choice3:"One",
        choice4:"Two",
        answer:4,
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
});

register.addEventListener('click', () => {
    document.getElementById('input-score').value = score;
    document.getElementById('form-score').submit();
});

startGame();