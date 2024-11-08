import React, { useState } from "react";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([
    { id: 1, question: "質問1", answer: "答え1" },
    { id: 2, question: "質問2", answer: "答え2" },
    { id: 3, question: "質問3", answer: "答え3" },
  ]);

  const onDeleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const onMoveUp = (id) => {
    const index = questions.findIndex((question) => question.id === id);
    if (index > 0) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
      setQuestions(newQuestions);
    }
  };

  const onMoveDown = (id) => {
    const index = questions.findIndex((question) => question.id === id);
    if (index < questions.length - 1) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
      setQuestions(newQuestions);
    }
  };

  return (
    <div>
      <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />
    </div>
  );
}

export default App;