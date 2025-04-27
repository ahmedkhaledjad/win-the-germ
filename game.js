const questions = [
    {
        question: "كم مدة غسيل الأيدي البسيط؟",
        answers: ["5 ثوانٍ", "10 ثوانٍ", "20-30 ثانية", "دقيقة كاملة"],
        correct: 2
    },
    {
        question: "متى يُستخدم غسيل اليدين الجراحي؟",
        answers: ["بعد الأكل", "قبل إجراء عملية", "بعد استخدام المرحاض", "عند ملامسة مرضى COVID-19"],
        correct: 1
    },
    {
        question: "أي من التالي يُستخدم في الغسيل الجراحي؟",
        answers: ["الماء فقط", "الكحول", "محلول مطهر مثل الكلورهيكسيدين", "صابون أطفال"],
        correct: 2
    },
    // 🔥 كمّل باقي الـ 20 سؤال بنفس الشكل اللي كتبتهولي في البروموت
];

let currentQuestion = 0;
let score = 0;
let fiftyUsed = false;
let friendUsed = false;

const questionText = document.getElementById("questionText");
const answers = document.querySelectorAll(".answer-btn");
const questionNumber = document.getElementById("questionNumber");
const progress = document.getElementById("progress");

const tickSound = document.getElementById("tickSound");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const hintSound = document.getElementById("hintSound");

function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionNumber.textContent = `السؤال ${currentQuestion + 1} من ${questions.length}`;

    answers.forEach((btn, index) => {
        btn.disabled = false;
        btn.style.visibility = "visible";
        btn.className = "answer-btn"; // Reset
        btn.textContent = q.answers[index];
        btn.onclick = () => selectAnswer(index);
    });

    progress.style.width = `${(currentQuestion / questions.length) * 100}%`;
    tickSound.play();
}

function selectAnswer(index) {
    const q = questions[currentQuestion];

    if (index === q.correct) {
        score++;
        correctSound.play();
        answers[index].classList.add("correct");
    } else {
        wrongSound.play();
        answers[index].classList.add("wrong");
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function endGame() {
    localStorage.setItem("latestScore", score);
    window.location.href = "results.html";
}

document.getElementById("fiftyBtn").addEventListener("click", () => {
    if (fiftyUsed) return;
    fiftyUsed = true;
    hintSound.play();

    const q = questions[currentQuestion];
    let wrongIndexes = [];
    answers.forEach((btn, idx) => {
        if (idx !== q.correct) wrongIndexes.push(idx);
    });

    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * wrongIndexes.length);
        const btnIndex = wrongIndexes.splice(randomIndex, 1)[0];
        answers[btnIndex].disabled = true;
        answers[btnIndex].style.visibility = "hidden";
    }
});

document.getElementById("friendBtn").addEventListener("click", () => {
    if (friendUsed) return;
    friendUsed = true;
    hintSound.play();
    alert(`صديقك يقترح أن الإجابة الصحيحة هي: ${questions[currentQuestion].answers[questions[currentQuestion].correct]}`);
});

showQuestion();