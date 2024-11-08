import React, { useState } from "react";
import "./QuestionList.css";

function QuestionList({ questions, onDeleteQuestion, onMoveUp, onMoveDown, onStartPractice }) {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswerVisibility = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h2>質問リスト</h2>
      <ul className="question-list">
        {questions.map((question) => (
          <li key={question.id} className="question-item">
            <div className="question-text">
              <strong>Q:</strong> {question.question}
              {visibleAnswers[question.id] && (
                <div className="answer-text">
                  <strong>A:</strong> {question.answer}
                </div>
              )}
            </div>
            <div className="button-group">
              <button onClick={() => toggleAnswerVisibility(question.id)} className="toggle-answer-button">
                {visibleAnswers[question.id] ? "答えを隠す" : "答えを表示"}
              </button>
              <button onClick={() => onDeleteQuestion(question.id)} className="delete-button">削除</button>
              <button onClick={() => onMoveUp(question.id)} className="move-button">↑</button>
              <button onClick={() => onMoveDown(question.id)} className="move-button">↓</button>
              <button onClick={() => onStartPractice(question)} className="start-button">始める</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
