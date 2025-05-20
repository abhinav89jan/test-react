import { useContext, useEffect } from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const apiUrl =
    "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple&encode=url3986";

  useEffect(() => {
    const fetchApiData = () => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          if (!data.results || data.results.length === 0) {
            throw new Error("No quiz data received from API.");
          }
          dispatch({ type: "LOADED_QUESTIONS", payload: data.results });
        });
    };
    fetchApiData();
  }, [quizState.showResults]);

  const restart = () => {
    dispatch({ type: "RESTART" });
  };

  return (
    <div className="quiz">
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz.</div>
            <div>
              You've got {quizState.correctAnswersCount} of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <div className="next-button" onClick={() => restart()}>
            Restart
          </div>
        </div>
      )}
      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next question
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
