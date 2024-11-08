import React, { useState, useEffect } from "react";
import "./styles.css";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import PracticeMode from "./components/PracticeMode";
import { loadQuestions, saveQuestions } from "./utils/storage";
import FileUpload from './components/FileUpload';

function App() {
  const [questions, setQuestions] = useState(loadQuestions);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    saveQuestions(questions);
  }, [questions]);

  const addQuestion = (question, answer) => {
    setQuestions([...questions, { id: Date.now(), question, answer }]);
  };

  const loadQuestionsFromFile = (qaList) => {
    const newQuestions = qaList.map((item) => ({
      id: Date.now(),
      question: item.question,
      answer: item.answer,
    }));
    setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const startPractice = () => {
    setIsPracticeMode(true);
    setCurrentQuestionIndex(0);
  };

  const endPractice = () => {
    setIsPracticeMode(false);
    setCurrentQuestionIndex(0);
    setSelectedQuestions([]);
  };

  const handlePracticeNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endPractice(); // 最後の質問で練習モードを終了
    }
  };

  const handleStartPractice = (startingQuestion) => {
    const startIndex = questions.findIndex(q => q.id === startingQuestion.id);
    if (startIndex !== -1) {
      setSelectedQuestions(questions.slice(startIndex));
      setIsPracticeMode(true);
      setCurrentQuestionIndex(0);
    }
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
    <div className="App">
      <h1>質問と回答管理アプリ</h1>
      {!isPracticeMode && <FileUpload onLoadQuestions={loadQuestionsFromFile} />} {/* 練習モードでないときのみ表示 */}
      {isPracticeMode ? (
        <PracticeMode
          questions={selectedQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onNext={handlePracticeNext}
          onEnd={endPractice} // 終了ボタン用の関数を渡す
        />
      ) : (
        <>
          <QuestionForm onAddQuestion={addQuestion} />
          <QuestionList 
            questions={questions} 
            onDeleteQuestion={deleteQuestion} 
            onMoveUp={onMoveUp} 
            onMoveDown={onMoveDown} 
            onStartPractice={handleStartPractice}
          />
          <button onClick={startPractice} disabled={questions.length === 0}>
            練習モード開始
          </button>
        </>
      )}
    </div>
  );
}

export default App;
