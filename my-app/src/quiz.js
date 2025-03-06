import React, { useState } from "react";
import "./quiz.css";

const Quiz = ({ selectedCountry, quizQuestions, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (question, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedCountry} - Quiz</h2>
        {quizQuestions.length > 0 ? (
          quizQuestions.map((q, index) => (
            <div key={index} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerSelect(q.question, option)}
                    disabled={submitted}
                  />
                  {option}
                </label>
              ))}
              {submitted && (
                <p className={selectedAnswers[q.question] === q.answer ? "correct" : "incorrect"}>
                  {selectedAnswers[q.question] === q.answer ? "✅ Correct" : `❌ Incorrect - Correct answer: ${q.answer}`}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No quiz available for this country.</p>
        )}

        {!submitted && quizQuestions.length > 0 && (
          <button className="submit-button" onClick={handleSubmit}>
            Submit Answers
          </button>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Quiz;
