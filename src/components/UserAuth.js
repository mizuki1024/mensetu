import React, { useState } from 'react';
import './UserAuth.css';

function UserAuth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setError('ユーザーIDとパスワードを入力してください');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (isLogin) {
      // ログイン処理
      if (users[userId] && users[userId].password === password) {
        onLogin(userId);
      } else {
        setError('ユーザーIDまたはパスワードが正しくありません');
      }
    } else {
      // アカウント作成処理
      if (users[userId]) {
        setError('このユーザーIDは既に使用されています');
      } else {
        users[userId] = { password };
        localStorage.setItem('users', JSON.stringify(users));
        onLogin(userId);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'ログイン' : 'アカウント作成'}</h2>
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            ログイン
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            アカウント作成
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">ユーザーID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="ユーザーIDを入力"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-button">
            {isLogin ? 'ログイン' : 'アカウント作成'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserAuth;
