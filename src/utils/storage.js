// src/utils/storage.js
export const loadQuestions = (userId) => {
  const data = localStorage.getItem(`questions_${userId}`);
  return data ? JSON.parse(data) : [];
};

export const saveQuestions = (userId, questions) => {
  localStorage.setItem(`questions_${userId}`, JSON.stringify(questions));
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser');
};

export const setCurrentUser = (userId) => {
  localStorage.setItem('currentUser', userId);
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};