import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendReqJson, saveDataAndTriggerStorage } from '../utils/helpers';

import '../styles/SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }

      const res = await sendReqJson('POST', 'register',
      {
        email,
        username,
        password,
        confirmPassword,
      });

      const json = await res.json();

      if (res.status === 200) {
        const loginRes = await sendReqJson('POST', 'login', { email, password });

        const loginJson = await loginRes.json();
        saveDataAndTriggerStorage(loginJson);

        navigate('/');
      } else {
        const message = json.error
          ? json.error.message
          : json.errors.map(err => err.msg).join(' ');
        setErrorMsg(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="signup-page">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="form-error">{errorMsg}</p>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text" name="username" id="username" required
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email" name="email" id="email" required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="password-field">
          <label htmlFor="password">Password</label>
          <input
            type="password" name="password" id="password" required
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password" name="confirm_password" id="confirm_password" required
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default SignupPage;