import axios from "axios";
import React, { useState, useContext } from "react";

//As per the opentdb.com API docs each category has a unique numeric value which represents a particular category. I have picked 3 random categories for this project stored in const "table" and later while fetching the quiz for a particular category "table" object will be used to set the user entered dynamic category.
const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

//const "sportsUrl" was only used for setting things up, might delete later
const sportsUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const data = await axios(url);
      if (data) {
        //prettier-ignore
        const {data:{results}} = data;
        if (results.length > 0) {
          setQuestions(results);
          setError(false);
          setLoading(false);
          setWaiting(false);
        } else {
          setError(true);
          setWaiting(true);
          setLoading(false);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex > questions.length - 1) {
        openModal();
        newIndex = 0;
      }
      return newIndex;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((currCorrect) => currCorrect + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWaiting(true);
    setCorrect(0);
  };

  const handleChange = (e) => {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "amount") {
      value = +value;
    }
    setQuiz({ ...quiz, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const quizUrl = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(quizUrl);
  };

  return (
    <AppContext.Provider
      value={{
        quiz,
        index,
        error,
        correct,
        loading,
        waiting,
        questions,
        closeModal,
        isModalOpen,
        checkAnswer,
        nextQuestion,
        handleSubmit,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
