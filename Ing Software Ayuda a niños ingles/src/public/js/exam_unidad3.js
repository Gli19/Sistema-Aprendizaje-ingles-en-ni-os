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
        question: "¿Cómo se dice mamá en ingles?",
        choice1: "Father",
        choice2: "Mother",
        choice3: "Uncle",
        choice4: "Son",
        answer: 2,
    },
    {
        question: "Traduce: He is my father",
        choice1: "Él es mi tío",
        choice2: "Él es mi hermano",
        choice3: "Él es mi papá",
        choice4: "Él es mi sobrino",
        answer: 3,
    },
    {
        question: "¿Cómo se dice papá en ingles?",
        choice1: "Father",
        choice2: "Mother",
        choice3: "Uncle",
        choice4: "Son",
        answer: 1,
    },
    {
        question: "Traduce: She is my sister",
        choice1: "Él es mi tío",
        choice2: "Él es mi hermano",
        choice3: "Ella es mi hermana",
        choice4: "Él es mi sobrino",
        answer: 3,
    },
    {
        question: "¿Cómo se dice tío en ingles?",
        choice1: "Father",
        choice2: "Mother",
        choice3: "Uncle",
        choice4: "Son",
        answer: 3,
    },
    {
        question: "Traduce: I am his niece",
        choice1: "Él es mi tío",
        choice2: "Él es mi hermano",
        choice3: "Ella es mi hermana",
        choice4: "Yo soy su sobrina",
        answer: 4 ,
    },
    {
        question: "¿Cómo se dice sobrina en ingles?",
        choice1: "Father",
        choice2: "Niece",
        choice3: "Uncle",
        choice4: "Son",
        answer: 2,
    },
    {
        question: "¿Cómo se dice hija en ingles?",
        choice1: "Daughter",
        choice2: "Mother",
        choice3: "Uncle",
        choice4: "Son",
        answer: 1,
    },
    {
        question: "Traduce: She is my daughter",
        choice1: "Él es mi tío",
        choice2: "Ella es mi hija",
        choice3: "Ella es mi hermana",
        choice4: "Yo soy su hijo",
        answer: 2 ,
    },
    {
        question: "Traduce: She is my mom",
        choice1: "Él es mi tío",
        choice2: "Ella es mi mamá",
        choice3: "Ella es mi hermana",
        choice4: "Yo soy su hijo",
        answer: 2 ,
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