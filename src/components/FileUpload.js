import React, { useState } from 'react';

function FileUpload({ onLoadQuestions }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target.result;
        parseQA(text);
      };

      reader.readAsText(file);
    }
  };

  const parseQA = (text) => {
    const tempQaList = [];
    const regex = /Q[:：]\s*(.*?)\s*A[:：]\s*(.*?)(?=\nQ[:：]|$)/gs; // Q: と A: の間の内容をマッチさせる正規表現
    let match;

    while ((match = regex.exec(text)) !== null) {
      const question = match[1].trim(); // 質問の内容
      const answer = match[2].trim(); // 回答の内容
      tempQaList.push({ question, answer });
    }

    console.log(tempQaList); // Q&Aリストをコンソールに出力して確認
    onLoadQuestions(tempQaList); // 親コンポーネントにQ&Aリストを渡す
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>アップロード</button>
    </div>
  );
}

export default FileUpload;
