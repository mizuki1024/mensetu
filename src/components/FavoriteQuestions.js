// src/components/FavoriteQuestions.js
import React, { useState } from 'react';

function FavoriteQuestions({ questions, onStartPractice }) {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const toggleQuestion = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleStartPractice = () => {
    onStartPractice(selectedQuestions);
  };

  return (
    <div>
      <h2>好きな質問を選んで練習を始めよう</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedQuestions.includes(question)}
                onChange={() => toggleQuestion(question)}
              />
              {question.question}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleStartPractice} disabled={selectedQuestions.length === 0}>
        練習開始
      </button>
    </div>
  );
}

export default FavoriteQuestions;
