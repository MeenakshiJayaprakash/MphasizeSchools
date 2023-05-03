const questions = [
    {//1
        question: "What is the correct syntax to declare a variable in JavaScript?",
        answers: [
            { text: "variableName = value;", correct: false},
            { text: "var variableName = value;", correct: true},
            { text: "variableName:value;", correct: false},
            { text: "value = variableName;", correct: false},
        ]
    },
    {//2
        question: 'What is the result of the following expression: 5 + 3 + "8"?',
        answers: [
            { text: "16", correct: false},
            { text: "58", correct: false},
            { text: "13", correct: false},
            { text: '"58"', correct: true},
        ]
    },
    {//3
        question: "Which of the following is NOT a comparison operator in JavaScript?",
        answers: [
            { text: "==", correct: false},
            { text: "<=", correct: false},
            { text: "&&", correct: true},
            { text: "!==", correct: false},
        ]
    },
    {//4
        question: "Which control structure repeats a block of code as long as a specified condition is true?",
        answers: [
            { text: "for loop", correct: false},
            { text: "do-while loop", correct: false},
            { text: "if-else statement", correct: false},
            { text: "while loop", correct: true},
        ]
    },
    {//5
        question: "What is a function in JavaScript?",
        answers: [
            { text:"A keyword used to define a variable",correct: false},
            { text: "A loop used to repeat a block of code", correct: false},
            { text: "A block of code designed to perform a specific task", correct: true},
            { text: "A method used to modify the value of a variable", correct: false},
        ]
    },
    {//6
        question: "Which operator is used to add new elements to an array in JavaScript?",
        answers: [
            { text:"+",correct: false},
            { text: "%", correct: false},
            { text: "*", correct: false},
            { text: "push()", correct: true},
        ]
    },
    {//7
        question: "Which built-in JavaScript function is used to get the current date and time?",
        answers: [
            { text:"Date()",correct: true},
            { text: "getMonth()", correct: false},
            { text: "getFullYear()", correct: false},
            { text: "getDate()", correct: false},
        ]
    },
    {//8
        question: "What does the acronym DOM stand for in JavaScript?",
        answers: [
            { text:"Dynamic Output Model",correct: false},
            { text: "Data Object Module", correct: false},
            { text: "Digital Object Manager", correct: false},
            { text: "Document Object Machine", correct: true},
        ]
    },
    {//9
        question: "Which built-in JavaScript function is used to select an HTML element by its ID?",
        answers: [
            { text:"getElementById()",correct: true},
            { text: "getElementsByClass()", correct: false},
            { text: "getElementsByTagName()", correct: false},
            { text: "querySelector()", correct: false},
        ]
    },
    {//10
        question: 'What is the purpose of the "this" keyword in JavaScript?',
        answers: [
            { text:" It refers to the current HTML document",correct: false},
            { text: "It refers to the previous JavaScript function", correct: false},
            { text: "It refers to the current HTML element", correct: false},
            { text: "It refers to the current JavaScript function", correct: true},
        ]
    },
    {//11
        question: "Which data type in JavaScript can hold multiple values?",
        answers: [
            { text:"String",correct: false},
            { text: "Numbers", correct: false},
            { text: "Array", correct: true},
            { text: "Boolean", correct: false},
        ]
    },
    {//12
        question: "Which operator is used to concatenate strings in JavaScript?",
        answers: [
            { text:"&",correct: false},
            { text: "+", correct: true},
            { text: "=", correct: false},
            { text: "/", correct: false},
        ]
    },
    {//13
        question: 'What is the result of the following expression: "6" + 2 - 1?',
        answers: [
            { text:'7',correct: false,},
            { text: '61', correct: false},
            { text: '"61"', correct: true},
            { text: '5', correct: false},
        ]
    },
    {//14
        question: "Which operator is used to access a property of an object in JavaScript?",
        answers: [
            { text:".",correct: true},
            { text: ":", correct: false},
            { text: "+", correct: false},
            { text: "&", correct: false},
        ]
    },  
    {//15
        question: "Which built-in JavaScript function is used to convert a string to a number?",
        answers: [
            { text:"toNumber()",correct: false},
            { text: "parseNumber()", correct: false},
            { text: "parseFloat()", correct: false},
            { text: "parseInt()", correct: true},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+'. '+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block"
}

function quitQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    resetState();
    // replace this line:
    // questionElement.innerHTML = "Quiz has been quit.";
    // with this line:
    questionElement.innerHTML = "Redirecting...";
    // add this line:
    window.location.href = "quizzes.html";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Quit";
    nextButton.style.display="block";  
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        nextButton.innerHTML = "Quit";
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", quitQuiz);
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();