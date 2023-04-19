import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendReq, saveDataAndTriggerStorage } from '../utils/helpers';

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

      const res = await sendReq('POST', 'register',
      {
        email,
        username,
        password,
        confirmPassword,
      });

      const json = await res.json();

      if (res.status === 200) {
        const loginRes = await sendReq('POST', 'login', { email, password });

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
    <main>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <p className="form-error">{errorMsg}</p>
        <label htmlFor="username">Username</label>
        <input
          type="text" name="username" id="username" required
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email" name="email" id="email" required
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password" name="password" id="password" required
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="confirm_password">Password</label>
        <input
          type="password" name="confirm_password" id="confirm_password" required
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default SignupPage;