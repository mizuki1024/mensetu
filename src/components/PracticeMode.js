// PracticeMode.js
import React, { useEffect, useState, useRef } from "react";
import "./PracticeMode.css";

function PracticeMode({ questions, currentQuestionIndex, onNext, onEndPractice }) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [isAnswerDisplayed, setIsAnswerDisplayed] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const practiceContainerRef = useRef(null);

  useEffect(() => {
    setDisplayText("");
    setCharIndex(0);
    setIsAnswerDisplayed(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const text = isAnswerDisplayed
      ? questions[currentQuestionIndex].answer
      : questions[currentQuestionIndex].question;

    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isAnswerDisplayed, questions, currentQuestionIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isAnswerDisplayed) {
        setDisplayedItems((prev) => [
          ...prev,
          { type: "A", text: questions[currentQuestionIndex].answer }
        ]);
        onNext();
      } else {
        setDisplayedItems((prev) => [
          ...prev,
          { type: "Q", text: questions[currentQuestionIndex].question }
        ]);
        setIsAnswerDisplayed(true);
        setDisplayText("");
        setCharIndex(0);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswerDisplayed, onNext]);

  useEffect(() => {
    if (practiceContainerRef.current) {
      practiceContainerRef.current.scrollTop = practiceContainerRef.current.scrollHeight;
    }
  }, [displayedItems]);

  return (
    <div className="practice-mode-container" ref={practiceContainerRef}>
      {displayedItems.map((item, index) => (
        <div key={index} className="practice-item">
          <p><strong>{item.type}:</strong> {item.text}</p>
        </div>
      ))}
      <div className="practice-item">
        <p><strong>{isAnswerDisplayed ? "A" : "Q"}:</strong> {displayText}</p>
      </div>
      <button onClick={onEndPractice} className="end-button">終了</button>
      <p className="instruction">Enterキーを押して{isAnswerDisplayed ? "次の質問へ" : "回答を表示"}</p>
    </div>
  );
}

export default PracticeMode;
