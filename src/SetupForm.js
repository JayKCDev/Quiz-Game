import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, error, handleChange, handleSubmit } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form" onSubmit={handleSubmit}>
          <h2>Setup Quiz</h2>
          {/* No. of Questions */}
          <div className="form-control">
            <label htmlFor="amount">No. of Questions</label>
            <input
              min={1}
              max={50}
              id="amount"
              type="number"
              name="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          {/* No. of Questions ends*/}
          {/* Category */}
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={quiz.category}
              onChange={handleChange}
              className="form-input"
            >
              <option value="history">History</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          {/* Category ends*/}
          {/* Difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {/* Difficulty ends*/}
          {error && (
            <p className="error">
              No questions available for the given input. Please try different
              options.
            </p>
          )}
          <button type="submit" className="submit-btn">
            Start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
