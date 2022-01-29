import React from "react";
import Modal from "./Modal";
import Loading from "./Loading";
import SetupForm from "./SetupForm";
import { useGlobalContext } from "./context";

function App() {
  //prettier-ignore
  const { index, correct, loading, waiting, questions, checkAnswer, nextQuestion } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (waiting) {
    return <SetupForm />;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];

  //Randomizing options displayed for each question
  const options = [...incorrect_answers]; // index: 0, 1, 2
  const randomIndex = Math.floor(Math.random() * 4);
  if (randomIndex === 3) {
    options.push(correct_answer);
  } else {
    options.push(options[randomIndex]);
    options[randomIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct} / {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {options.map((option, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(option === correct_answer)}
                  dangerouslySetInnerHTML={{ __html: option }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          Next Question
        </button>
      </section>
    </main>
  );
}

export default App;
