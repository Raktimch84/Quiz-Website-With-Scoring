const questions = [
    {
        questions: "Which is the largest animal in the World?",
        answers: [
            {text: "Shark",correct: false},
            {text: "Blue Whale",correct: true},
            {text: "Elephant",correct: false},
            {text: "Giraffe",correct: false},
        ]
    },
    {
        questions: "Which animal is known as the 'Ship of the Desert'?",
        answers: [
            {text: "Horse",correct: false},
            {text: "Camel",correct: true},
            {text: "Wolf",correct: false},
            {text: "Bear",correct: false},
        ]
    },
    {
        questions: "How many days are there in a week?",
        answers: [
            {text: "5",correct: false},
            {text: "7",correct: true},
            {text: "14",correct: false},
            {text: "21",correct: false},
        ]
    },
    {
        questions: "How many consonants are there in the English alphabet?",
        answers: [
            {text: "26",correct: false},
            {text: "21",correct: true},
            {text: "19",correct: false},
            {text: "17",correct: false},
        ]
    }
]


const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex=0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML="Next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex +1;
    questionElement.innerHTML= questionNo+ ". "+currentQuestion.questions;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectanswer);
    })
}
function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectanswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore(){
    resetstate();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length} !`;
    nextButton.innerHTML= `Play Again`;
    nextButton.style.display="block";
}
function handlebutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showquestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handlebutton();
    }
    else{
        startQuiz();
    }
})
startQuiz();