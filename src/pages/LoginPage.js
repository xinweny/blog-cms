import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendReqJson } from '../utils/helpers';

import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await sendReqJson('POST', 'login', { email, password });

      const json = await res.json();

      if (res.status === 200) {
        localStorage.setItem('token', json.data.token);
        localStorage.setItem('user', JSON.stringify(json.data.user));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setErrorMsg(json.error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="login-page">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="form-error">{errorMsg}</p>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email" name="email" id="email" required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password" name="password" id="password" required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default LoginPage;