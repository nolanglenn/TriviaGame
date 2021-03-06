// Declare and store possible trivia questions and their respective answers
const quizContainer = document.getElementById('trivia');
const submitButton = $("#submit");
const resultsContainer = document.getElementById('results');

const questions = [
  {
    question: "What company did George claim to interview for as a latex salesman?",
    answers: {
      a: "Costanza and Sons",
      b: "Vandelay Industries",
      c: "Latex Industries"
    },
    correctAnswer: "b"
  },
  {
    question: "Which Seinfeld writer voiced George Steinbrenner on and off from seasons five through nine?",
    answers: {
      a: "Larry David",
      b: "Peter Mehlman",
      c: "Spike Feresten"
    },
    correctAnswer: "a"
  },
  {
    question: "Kramer's apartment is flooded with red light from this restaurant's neon sign:",
    answers: {
      a: "KFC",
      b: "Kenny Roger's Roasters",
      c: "The Diner"
    },
    correctAnswer: "b"
  },
  {
    question: "What does Elaine ask George to order for her from Monk's?",
    answers: {
      a: "Egg Whites and Toast",
      b: "Tuna on Toast",
      c: "Big Salad"
    },
    correctAnswer: "c"
}];

function beginTrivia(){

    $("#trivia").css('display', 'block');
    $("#submit").css('display', 'block');
    $(".begin").css('display', 'none');
    $(".description").css('display', 'none');

    const output = [];


    questions.forEach(
        (currentQuestion, questionNumber) => {

        const answers = [];

        for(letter in currentQuestion.answers){

            answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
        }
    );

    
    quizContainer.innerHTML = output.join('');
};

function showResults(){

    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    questions.forEach( (currentQuestion, questionNumber) => {

    const answerContainer = answerContainers[questionNumber];
    const selector = 'input[name=question'+questionNumber+']:checked';
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if(userAnswer===currentQuestion.correctAnswer){
    numCorrect++;

    answerContainers[questionNumber].style.color = 'lightgreen';
    }
    else{
    answerContainers[questionNumber].style.color = 'red';
    }
    });

    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    // Create a Rety button next to Submit
    $('<button>', {
        text: 'Retry',
        id: 'retry',
        click: beginTrivia })
};

// Timer
var number = 30;

var intervalId;

$("#submit").on("click", stop);
$(".begin").on("click", run);

function run() {
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;
    $("#show-number").html("<h2>" + number + "</h2>");
    if (number === 0) {
    stop();
    if(!alert("Time Up! Click ok to try again.")){window.location.reload();}
    }
    
}

function stop() {
    clearInterval(intervalId);
}

$(".begin").on("click", beginTrivia);

$("#submit").on("click", showResults);
