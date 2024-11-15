// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import PracticeMode from "./components/PracticeMode";
import FileUpload from "./components/FileUpload";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // LocalStorageから質問を読み込む
  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // 質問が変更されたときにLocalStorageに保存
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (newQuestion) => {
    const questionWithId = {
      ...newQuestion,
      id: Date.now().toString()
    };
    setQuestions([...questions, questionWithId]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const onMoveUp = (index) => {
    if (index > 0) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
      setQuestions(newQuestions);
    }
  };

  const onMoveDown = (index) => {
    if (index < questions.length - 1) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
      setQuestions(newQuestions);
    }
  };

  const startPractice = (index) => {
    setCurrentQuestionIndex(index);
    setIsPracticeMode(true);
  };

  const handlePracticeNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endPractice();
    }
  };

  const endPractice = () => {
    setIsPracticeMode(false);
    setCurrentQuestionIndex(0);
  };

  const handleLoadQuestions = (newQuestions) => {
    const questionsWithIds = newQuestions.map(q => ({
      ...q,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    setQuestions([...questions, ...questionsWithIds]);
  };

  return (
    <div className="App">
      <h1>面接質問管理アプリ</h1>
      {isPracticeMode ? (
        <PracticeMode
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onNext={handlePracticeNext}
          onEndPractice={endPractice}
        />
      ) : (
        <div className="main-content">
          <QuestionForm onAddQuestion={addQuestion} />
          <FileUpload onLoadQuestions={handleLoadQuestions} />
          <QuestionList 
            questions={questions} 
            onDeleteQuestion={deleteQuestion} 
            onMoveUp={onMoveUp} 
            onMoveDown={onMoveDown} 
            onStartPractice={(index) => startPractice(index)}
          />
          <button 
            className="practice-button"
            onClick={() => startPractice(0)} 
            disabled={questions.length === 0}
          >
            練習モード開始
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
