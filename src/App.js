import React from "react";
import { useEffect, useState, useCallback } from "react";
import Question from "./components/Question";
import CategorySelector from "./components/CategorySelector";
import ResultModal from "./components/ResultModal";
import Scoreboard from "./components/Scoreboard";
import "./App.css";
import useTrivia from "./useTrivia";

export default function App() {
  const { question, getQuestion, category, setCategory } = useTrivia();
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);

  function handleQuestionAnswered(answer) {
    const isAnswerCorrect = answer === question.correct_answer;
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) setCorrectScore((score) => score + 1);
    else setWrongScore((score) => score + 1);
  }

  function handleNextQuestion() {
    setIsCorrect(null);
    getQuestion();
  }
  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {isCorrect != null && (
        <ResultModal
          isCorrect={isCorrect}
          question={question}
          getQuestion={handleNextQuestion}
        />
      )}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector category={category} chooseCategory={setCategory} />
        <Scoreboard correct={correctScore} wrong={wrongScore} />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && (
          <Question
            question={question}
            answerQuestion={handleQuestionAnswered}
          />
        )}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={handleNextQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}
