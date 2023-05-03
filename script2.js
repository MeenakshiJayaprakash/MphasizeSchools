const questions = [
    {//1
        question: "What is the correct HTML tag for inserting a line break?",
        answers: [
            { text: "&lt;br&gt;", correct: true},
            { text: "&lt;lb&gt;", correct: false},
            { text: "&lt;break&gt;", correct: false},
            { text: "&lt;ln&gt;", correct: false},
        ]
    },
    {//2
        question: "Which attribute specifies an alternate text for an image, if the image cannot be displayed?",
        answers: [
            { text: "href", correct: false},
            { text: "src", correct: false},
            { text: "alt", correct: true},
            { text: "title", correct: false},
        ]
    },
    {//3
        question: "What is the correct HTML tag for the largest heading?",
        answers: [
            { text: "&lt;h6&gt;", correct: false},
            { text: "&lt;h1&gt;", correct: true},
            { text: "&lt;head&gt;", correct: false},
            { text: "&lt;header&gt;", correct: false},
        ]
    },
    {//4
        question: "Which attribute is used to specify the URL of the page that the link goes to?",
        answers: [
            { text: "href", correct: true},
            { text: "src", correct: false},
            { text: "alt", correct: false},
            { text: "title", correct: false},
        ]
    },
    {//5
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text:"&lt;img&gt;",correct: false},
            { text: "&lt;link&gt;", correct: false},
            { text: "&lt;a&gt;", correct: true},
            { text: "&lt;hyperlink&gt;", correct: false},
        ]
    },
    {//6
        question: "Which HTML tag is used to define a table row?",
        answers: [
            { text:"&lt;td&gt;",correct: false},
            { text: "&lt;tr&gt;", correct: true},
            { text: "&lt;table&gt;", correct: false},
            { text: "&lt;th&gt;", correct: false},
        ]
    },
    {//7
        question: "Which HTML tag is used to define a form?",
        answers: [
            { text:"&lt;form&gt;",correct: true},
            { text: "&lt;input&gt;", correct: false},
            { text: "&lt;button&gt;", correct: false},
            { text: "&lt;label&gt;", correct: false},
        ]
    },
    {//8
        question: "Which attribute is used to specify the background color of an HTML element?",
        answers: [
            { text:"background-color",correct: true},
            { text: "color", correct: false},
            { text: "bg", correct: false},
            { text: "background", correct: false},
        ]
    },
    {//9
        question: "Which HTML tag is used to define a list item?",
        answers: [
            { text:"&lt;list&gt;",correct: false},
            { text: "&lt;li&gt;", correct: true},
            { text: "&lt;ul&gt;", correct: false},
            { text: "&lt;ol&gt;", correct: false},
        ]
    },
    {//10
        question: "Which attribute is used to specify the width of an HTML element?",
        answers: [
            { text:"width",correct: true},
            { text: "size", correct: false},
            { text: "length", correct: false},
            { text: "height", correct: false},
        ]
    },
    {//11
        question: "Which HTML tag is used to insert an image?",
        answers: [
            { text:"&lt;image&gt;",correct: false},
            { text: "&lt;img&gt;", correct: true},
            { text: "&lt;picture&gt;", correct: false},
            { text: "&lt;photo&gt;", correct: false},
        ]
    },
    {//12
        question: "Which attribute is used to specify that an input field must be filled out in HTML?",
        answers: [
            { text:"*",correct: false},
            { text: "unique", correct: false},
            { text: "required", correct: true},
            { text: "must-fill", correct: false},
        ]
    },
    {//13
        question: "Which HTML tag is used to create a checkbox?",
        answers: [
            { text:'&ltinput type="checkbox"&gt;',correct: true},
            { text: '&lt;input type="text"&gt;', correct: false},
            { text: '&lt;input type="radio"&gt;', correct: false},
            { text: '&lt;input type="submit"&gt;', correct: false},
        ]
    },
    {//14
        question: "Which attribute is used to specify the type of an HTML input element?",
        answers: [
            { text:"id",correct: false},
            { text: "value", correct: false},
            { text: "name", correct: false},
            { text: "type", correct: true},
        ]
    },  
    {//15
        question: "What is the correct HTML tag for creating a numbered list?",
        answers: [
            { text:"&lt;number-list&gt;",correct: false},
            { text: "&lt;numbered-list&gt;", correct: false},
            { text: "&lt;ol&gt;", correct: true},
            { text: "&lt;ul&gt;", correct: false},
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