import React from 'react';
import { Link } from 'react-router-dom';

import useStorageListener from '../../hooks/useStorageListener';

import NavBar from './NavBar';

import siteLogo from '../../assets/logo.png';

import '../../styles/Header.css';

function Header() {
  const user = useStorageListener('user');

  return (
    <header>
      <Link to="/">
        <div className="site-branding">
          <img src={siteLogo} alt="Blog Tree CMS" />
          <h1>BlogTree CMS</h1>
        </div>
      </Link>
      <div className="header-links">
        {user ? <p>{user.username}</p> : null}
        <NavBar user={user} />
      </div>
    </header>
  );
}

export default Header;