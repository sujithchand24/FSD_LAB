
let questions = [
    { q: "JavaScript is a ____ language?",
      o: ["Programming", "Markup", "Styling", "Database"],
      a: "Programming" },

    { q: "Which keyword declares a variable?",
      o: ["int", "let", "float", "char"],
      a: "let" },

    { q: "Which method selects an element by ID?",
      o: ["getElementById", "print", "write", "input"],
      a: "getElementById" }
];

let i = 0, score = 0, time = 30;
let timer, locked = false;

function show() {
    clearInterval(timer);
    time = 30;
    locked = false;

    document.getElementById("timer").innerText = "Time: 30s";
    document.getElementById("question").innerText = questions[i].q;

    let div = document.getElementById("options");
    div.innerHTML = "";

    questions[i].o.forEach(opt => {
        let b = document.createElement("button");
        b.innerText = opt;

        b.onclick = () => {
            if (locked) return;
            locked = true;

            if (opt === questions[i].a) score++;

            b.classList.add("selected");

            setTimeout(() => {
                i++;
                if (i < questions.length) show();
                else endQuiz();
            }, 500);
        };

        div.appendChild(b);
    });

    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText =
            "Time: " + time + "s";

        if (time <= 0) {
            clearInterval(timer);
            i++;
            if (i < questions.length) show();
            else endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);

    document.getElementById("question").innerText =
        "Quiz Completed!";

    document.getElementById("options").innerHTML = "";
    document.getElementById("timer").innerText = "Time Over!";

    document.getElementById("restart").hidden = false;

    document.getElementById("result").innerText =
        "Your Score: " + score + "/" + questions.length;
}

function restart() {
    i = 0;
    score = 0;

    document.getElementById("result").innerText = "";
    document.getElementById("restart").hidden = true;

    show();
}

show();
