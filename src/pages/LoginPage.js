import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendReq } from '../utils/helpers';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await sendReq('POST', 'login', { email, password });

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
    <main>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <p className="form-error">{errorMsg}</p>
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
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default LoginPage;