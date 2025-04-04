import React, { useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./firebaseConfig"; // Import Firebase auth
import "./quiz.css";

const Quiz = ({ selectedCountry, quizQuestions, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const db = getFirestore();

  const handleAnswerSelect = (question, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const user = auth.currentUser;
    if (!user) {
      alert("You need to log in to save quiz results.");
      return;
    }
  
    const correctAnswers = quizQuestions.filter(
      (q) => selectedAnswers[q.question] === q.answer
    ).length;
    const totalQuestions = quizQuestions.length;
    const score = `${correctAnswers} / ${totalQuestions}`;
  
    const userQuizRef = doc(db, "quizresults", user.uid);
    const userData = await getDoc(userQuizRef);
  
    let userResults = userData.exists() ? userData.data() : {
      username: user.displayName || "Anonymous",
      quizScores: {},
      totalCorrectAnswers: 0,
      totalQuestions: 0,
      totalScore: 0,
    };
  
    // Save individual result
    userResults.quizScores[selectedCountry] = score;
  
    // Recalculate total correct answers and total questions from all scores
    const newTotalCorrectAnswers = Object.values(userResults.quizScores).reduce((sum, s) => {
      const correct = parseInt(s.split(" / ")[0], 10);
      return sum + correct;
    }, 0);
  
    const newTotalQuestions = Object.values(userResults.quizScores).reduce((sum, s) => {
      const total = parseInt(s.split(" / ")[1], 10);
      return sum + total;
    }, 0);
  
    userResults.totalCorrectAnswers = newTotalCorrectAnswers;
    userResults.totalQuestions = newTotalQuestions;
  
    // Calculate percentage
    const percentage = newTotalQuestions > 0
      ? ((newTotalCorrectAnswers / newTotalQuestions) * 100).toFixed(2)
      : 0;
  
    userResults.totalScore = Number(percentage); // store as number, not string
  
    await setDoc(userQuizRef, userResults);
  };
  

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-content" onClick={(e) => e.stopPropagation()}>
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
