const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const finalPage = document.querySelector("#finalPage");
const finalScore = document.querySelector("#finalScore");
const reset = document.querySelector("#reset");
const register = document.querySelector("#register");
const imagen = document.querySelector("#imagen");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/* PREGUNTAS */
let questions = [
    {
        question: "¿Qué hora es?",
        choice1: "It is five past eleven",
        choice2: "It is nine past two",
        choice3: "It is half past seven",
        choice4: "It is ten to five",
        answer: 1,
        image: {
            fuente: "../img/unidades/reloj1.jpg",
            width: "130px",
            height: "130px",
        },
    },
    {
        question: "¿Qué hora es?",
        choice1: "It is five past eleven",
        choice2: "It is nine past two",
        choice3: "It is half past seven",
        choice4: "It is ten to five",
        answer: 2,
        image: {
            fuente: "../img/unidades/reloj2.jpg",
            width: "130px",
            height: "130px",
        },
    },
    {
        question: "¿Qué hora es?",
        choice1: "It is five past eleven",
        choice2: "It is nine past two",
        choice3: "It is half past seven",
        choice4: "It is ten to five",
        answer: 3,
        image: {
            fuente: "../img/unidades/reloj3.jpg",
            width: "130px",
            height: "130px",
        },
    },
    {
        question: "¿Qué hora es?",
        choice1: "It is five past eleven",
        choice2: "It is nine past two",
        choice3: "It is half past seven",
        choice4: "It is ten to five",
        answer: 4,
        image: {
            fuente: "../img/unidades/reloj4.jpg",
            width: "130px",
            height: "130px",
        },
    },
    {
        question: "¿Qué hora es?",
        choice1: "It is ten to five",
        choice2: "It is nine past two",
        choice3: "It is quarter to eleven",
        choice4: "It is twenty-five to nine",
        answer: 3,
        image: {
            fuente: "../img/unidades/reloj5.jpg",
            width: "130px",
            height: "130px",
        },
    },
    {
        question: "¿Qué hora es?",
        choice1: "It is ten to five",
        choice2: "It is nine past two",
        choice3: "It is quarter to eleven",
        choice4: "It is twenty-five to nine",
        answer: 4,
        image: {
            fuente: "../img/unidades/reloj6.jpg",
            width: "130px",
            height: "130px",
        },
    },
    {
        question:"¿Como se dice primavera en ingles?",
        choice1: "Spring",
        choice2: "Winter",
        choice3: "Summer",
        choice4: "Autumn",
        answer: 1,
        image: {
            fuente: "../img/unidades/primavera.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question:"¿Como se dice invierno en ingles?",
        choice1: "Spring",
        choice2: "Winter",
        choice3: "Summer",
        choice4: "Autumn",
        answer: 2,
        image: {
            fuente: "../img/unidades/invierno.jpg",
            width: "500px",
            height: "300px",
        },
    },
    {
        question:"¿Como se dice verano en ingles?",
        choice1: "Spring",
        choice2: "Winter",
        choice3: "Summer",
        choice4: "Autumn",
        answer: 3,
        image: {
            fuente: "../img/unidades/verano.jpg",
            width: "400px",
            height: "200px",
        },
    },
    {
        question:"¿Como se dice otoño en ingles?",
        choice1: "Spring",
        choice2: "Winter",
        choice3: "Summer",
        choice4: "Autumn",
        answer: 4,
        image: {
            fuente: "../img/unidades/otoño.jpg",
            width: "300px",
            height: "200px",
        },
    },
        
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
        imagen.innerHTML = "";
        return finalPage.classList.add("active");
    }

    questionCounter++;
    progressText.innerText = 'Pregunta '+ questionCounter + ' de '+ MAX_QUESTIONS;
    progressBarFull.style.width = (questionCounter*10)+'%';

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    if(currentQuestion.image.fuente != ""){
        imagen.innerHTML = "<img class=\"img-quiz\"  id = \"img\" src=\""+currentQuestion.image.fuente+"\" width=\""+currentQuestion.image.width+"\" height=\""+currentQuestion.image.height+"\"/>"
    }else{
        imagen.innerHTML = ""
    }
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