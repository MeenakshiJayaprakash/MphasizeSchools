const questions = [
    {//1
        question: "Which CSS selector selects all elements on a web page?",
        answers: [
            { text: "*", correct: true},
            { text: "body", correct: false},
            { text: "#id", correct: false},
            { text: ".class", correct: false},
        ]
    },
    {//2
        question: "Which CSS property sets the height and width of an element?",
        answers: [
            { text: "padding", correct: false},
            { text: "margin", correct: false},
            { text: "border", correct: false},
            { text: "height and width", correct: true},
        ]
    },
    {//3
        question: "Which CSS property sets the spacing between lines of text?",
        answers: [
            { text: "line-height", correct: true},
            { text: "letter-spacing", correct: false},
            { text: "word-spacing", correct: false},
            { text: "font-size", correct: false},
        ]
    },
    {//4
        question: "Which CSS property sets the background color of an element?",
        answers: [
            { text: "color", correct: false},
            { text: "font-size", correct: false},
            { text: "background-color", correct: true},
            { text: "text-align", correct: false},
        ]
    },
    {//5
        question: "Which CSS property sets the color of text?",
        answers: [
            { text:"color",correct: true},
            { text: "font-weight", correct: false},
            { text: "text-transform", correct: false},
            { text: "font-size", correct: false},
        ]
    },
    {//6
        question: "Which CSS property specifies the font family to be used on a web page?",
        answers: [
            { text:"font-weight",correct: false},
            { text: "font-size", correct: false},
            { text: "font-style", correct: false},
            { text: "font-family", correct: true},
        ]
    },
    {//7
        question: "Which CSS property specifies the thickness of an element's border?",
        answers: [
            { text:"border-color",correct: false},
            { text: "border-width", correct: true},
            { text: "border-style", correct: false},
            { text: "border-radius", correct: false},
        ]
    },
    {//8
        question: "Which CSS selector selects elements with a specific class?",
        answers: [
            { text:"#",correct: false},
            { text: "/", correct: false},
            { text: ".", correct: true},
            { text: ">", correct: false},
        ]
    },
    {//9
        question: "Which CSS property sets the amount of space between an element's content and its border?",
        answers: [
            { text:"padding",correct: true},
            { text: "margin", correct: false},
            { text: "border", correct: false},
            { text: "box-sizing", correct: false},
        ]
    },
    {//10
        question: "Which CSS unit of measurement is relative to the font-size of the element?",
        answers: [
            { text:"pixels (px)",correct: false},
            { text: "points (pt)", correct: false},
            { text: "ems (em)", correct: true},
            { text: "centimeters (cm)", correct: false},
        ]
    },
    {//11
        question: "Which CSS property is used to control the flow of content within an element?",
        answers: [
            { text:"overflow",correct: true},
            { text: "text-overflow", correct: false},
            { text: "white-space", correct: false},
            { text: "display", correct: false},
        ]
    },
    {//12
        question: "Which CSS property sets the distance between the text of an element and its border?",
        answers: [
            { text:"border",correct: false},
            { text: "margin", correct: true},
            { text: "padding", correct: false},
            { text: "box-sizing", correct: false},
        ]
    },
    {//13
        question: "Which CSS selector selects the first child element of another element?",
        answers: [
            { text:'>',correct: false,},
            { text: '~', correct: false},
            { text: ':', correct: false},
            { text: '+', correct: true},
        ]
    },
    {//14
        question: "Which CSS property specifies the color of an element's border?",
        answers: [
            { text:"border-color",correct: true},
            { text: "border-width", correct: false},
            { text: "border-style", correct: false},
            { text: "border-radius", correct: false},
        ]
    },  
    {//15
        question: "Which CSS property sets the maximum width of an element?",
        answers: [
            { text:"height",correct: false},
            { text: "min-width", correct: false},
            { text: "width", correct: false},
            { text: "max-width", correct: true},
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