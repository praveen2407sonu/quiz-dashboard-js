let startquiz = document.querySelector("#startquiz");
let main = document.querySelector(".main");
let head = document.querySelector(".head");
let head1 = document.querySelector(".head1");
let notification = document.querySelector(".notifictaionmain");
let main2 = document.querySelector(".main2");
let main3 = document.querySelector(".main3");
let form = document.querySelector(".form");
let UserName = document.querySelector("#id");
let input = document.querySelector(".form input");
let formbutton1 = document.querySelector(".button1");
let formbutton2 = document.querySelector(".button2");
let nextbtn = document.querySelector(".nextbtn");
let quitbtn = document.querySelector(".quitbtn");
let resultScore = document.querySelector(".resultscore");
let quizEnd = document.querySelector(".quizend");
let getResultBtn = document.querySelector(".endbtn1");
let playAgainBtn = document.querySelector(".endbtn2");
let quitGameBtn = document.querySelector(".endbtn3");

let music = document.querySelector(".music");
let modern = document.querySelector(".modern");
let coding = document.querySelector(".coding");

let maindiv = document.querySelector(".flex2");
let time = document.querySelector(".timer");


let username = "";

UserName.addEventListener("click", () => {
  form.classList.remove("hidden");
});

formbutton1.addEventListener("click", () => {
  username = input.value.trim();
  if (username !== "") {
    UserName.innerHTML = username;
    form.classList.add("hidden");
    notification.classList.remove("hidden");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 2000);
  }
});

formbutton2.addEventListener("click", () => {
  form.classList.add("hidden");
});

startquiz.addEventListener("click", () => {
  if (username) {
    main.classList.add("hidden");
    head.classList.add("hidden");
    main2.classList.remove("hidden");
    head1.classList.remove("hidden");
  } else {
    alert("Please enter a user name");
  }
});



music.addEventListener("click", () => {
  disableCategories();
  fetchAPI("https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple");
});

modern.addEventListener("click", () => {
  disableCategories();
  fetchAPI("https://opentdb.com/api.php?amount=5&category=25&difficulty=easy&type=multiple");
});

coding.addEventListener("click", () => {
  disableCategories();
  fetchAPI("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple");
});




let i = 0;
let timer = 5;
let score = 0;
let interval;
let arrayquestions = [];



function disableCategories() {
  music.disabled = true;
  modern.disabled = true;
  coding.disabled = true;
}

document.querySelector(".main2start").addEventListener("click", () => {
  main2.classList.add("hidden");
  main3.classList.remove("hidden");
  startTimer();
  getQuestion();
});

function startTimer() {
  timer = 5;
  time.innerHTML = timer;
  interval = setInterval(() => {
    timer--;
    time.innerHTML = timer;
    if (timer === 0) {
      nextQuestion();
    }
  }, 2000);
}

async function fetchAPI(API) {
  const response = await fetch(API);
  const data = await response.json();
  arrayquestions = data.results;
}

function getQuestion() {
  if (i >= arrayquestions.length) {
    endQuiz();
    return;
  }

  let question = arrayquestions[i];
  let answers = [...question.incorrect_answers, question.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5);

  maindiv.innerHTML = `
    <h1>${question.question}</h1>
    ${answers.map(ans => `<button class="answer">${ans}</button>`).join("")}
  `;
  


  main2.addEventListener("click", ()=>{
    score = 0;
   scoreDisplay.innerHTML = `Score: ${score}`;
  })

  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === question.correct_answer) {
         score++;
         scoreDisplay.innerHTML = `Score: ${score}`; 
        btn.style.backgroundColor = "yellow";
      } else {
        btn.style.backgroundColor = "red";
      }
      document.querySelectorAll(".answer").forEach(b => b.disabled = true);
    });
  });
}


// main2.addEventListener("click", ()=>{
//   score = 0;
//  scoreDisplay.innerHTML = `Score: ${score}`;
// })


// let scoreDisplay = document.querySelector(".scoreDisplay");

// if (btn.textContent === question.correct_answer) {
//   score++;
//   scoreDisplay.innerHTML = `Score: ${score}`;  // Update score display
//   btn.style.backgroundColor = "green";
// } else {
//   btn.style.backgroundColor = "red";
// }



function nextQuestion() {
  i++;
  timer = 5;
  if (i < arrayquestions.length) {
    getQuestion();
  } else {
    endQuiz();
  }
}

nextbtn.addEventListener("click", () => {
  nextQuestion();
});


// quizEnd.document.querySelector(".quizend")

function endQuiz() {
  clearInterval(interval);
  maindiv.innerHTML = "";
  quizEnd.classList.remove("hidden");
  resultScore.innerHTML = `Score: ${score}/${arrayquestions.length}`;
}

 quitbtn.addEventListener("click", () => {

   location.reload();

  // quitbtn.addEventListener("click", () => {
  //   clearInterval(interval); // Stop the timer if it's running
  //   main3.classList.add("hidden"); // Hide the quiz interface if necessary
  //   quizEnd.classList.remove("hidden"); // Show the general quiz end section
  //   quizEnd1.classList.remove("hidden"); // Show specific end section 1
  //   quizEnd2.classList.remove("hidden"); // Show specific end section 2
  //   resultScore.innerHTML = `Score: ${score}/${arrayquestions.length}`; // Display the final score
  // });
  
  
});

getResultBtn.addEventListener("click", () => {
  alert(`Final Score: ${score}/${arrayquestions.length}`);
});

playAgainBtn.addEventListener("click", () => {
  location.reload();
});

quitGameBtn.addEventListener("click", () => {
  location.reload();
});


let quizEnd1 = document.querySelector(".quizend1");
let quizEnd2 = document.querySelector(".quizend2");

function endQuiz() {
  clearInterval(interval);
  maindiv.innerHTML = "";
  quizEnd.classList.remove("hidden");

  
  quizEnd1.classList.remove("hidden");
  quizEnd2.classList.remove("hidden");

  resultScore.innerHTML = `Score: ${score}/${arrayquestions.length}`;
}
