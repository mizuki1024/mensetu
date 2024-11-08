import React, { useState } from "react";
import "../styles.css"; // styles.cssがsrc直下にあるため


function QuestionForm({ onAddQuestion }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && answer) {
      onAddQuestion(question, answer);
      setQuestion("");
      setAnswer("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <textarea
        placeholder="質問を入力"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        rows="4"
        className="input-field" // スタイルを適用
      />
      <textarea
        placeholder="回答を入力"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
        rows="4"
        className="input-field" // スタイルを適用
      />
      <button type="submit">追加</button>
    </form>
  );
}

export default QuestionForm;
