import "./Quiz.css";
import logo from "../../assets/images/monisa.png";
import { useState } from "react";

const questions = [
  {
    title: "Como você prefere aprender?",
    options: [
      "📖 Lendo textos",
      "🎥 Assistindo vídeos",
      "🎧 Ouvindo explicações",
      "🖼️ Com imagens e exemplos",
    ],
  },
  {
    title: "Qual tema você prefere?",
    options: [
      "🌙 Escuro",
      "☀️ Claro",
      "💙 Azul Monisa",
      "🎨 Personalizado",
    ],
  },
  {
    title: "Qual tamanho de fonte é mais confortável?",
    options: [
      "Pequena",
      "Média",
      "Grande",
    ],
  },
  {
    title: "Qual ritmo de estudo você prefere?",
    options: [
      "⚡ Rápido",
      "🙂 Moderado",
      "🌱 Tranquilo",
    ],
  },
  {
    title: "Qual matéria deseja aprender primeiro?",
    options: [
      "Matemática",
      "Português",
      "Inglês",
      "Programação",
      "Outra",
    ],
  },
];

function Quiz() {

  const [step, setStep] = useState(0);

  const [selected, setSelected] = useState("");

  const progress = ((step + 1) / questions.length) * 100;

  function nextQuestion() {

    if (!selected) {

      alert("Escolha uma opção.");

      return;

    }

    if (step < questions.length - 1) {

      setStep(step + 1);

      setSelected("");

    } else {

      window.location.href = "/loading";

    }

  }

  return (

    <div className="quizPage">

      <div className="quizCard">

        <img
          src={logo}
          className="quizLogo"
          alt="Logo"
        />

        <h1>
          Vamos conhecer você 💙
        </h1>

        <p className="quizSubtitle">
          Suas respostas vão personalizar toda sua experiência.
        </p>

        <div className="progressBar">

          <div
            className="progress"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <span className="progressText">

          {step + 1} / {questions.length}

        </span>

        <h2>

          {questions[step].title}

        </h2>

        <div className="options">

          {questions[step].options.map((option) => (

            <button

              key={option}

              className={
                selected === option
                  ? "option active"
                  : "option"
              }

              onClick={() => setSelected(option)}

            >

              {option}

            </button>

          ))}

        </div>

        <button
          className="continueButton"
          onClick={nextQuestion}
        >

          Continuar →

        </button>

      </div>

    </div>

  );

}

export default Quiz;