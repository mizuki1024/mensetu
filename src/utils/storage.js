// src/utils/storage.js
export const loadQuestions = () => {
    const data = localStorage.getItem("questions");
    return data ? JSON.parse(data) : [];
  };
  
  export const saveQuestions = (questions) => {
    localStorage.setItem("questions", JSON.stringify(questions));
  };
  