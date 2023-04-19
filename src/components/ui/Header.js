import React from 'react';
import { Link } from 'react-router-dom';

import useStorageListener from '../../hooks/useStorageListener';

import NavBar from './NavBar';

function Header() {
  const user = useStorageListener('user');

  return (
    <header>
      <Link to="/">
        <div className="site-branding">
          <img src="" alt="Blog Tree CMS" />
          <h1>BlogTree CMS</h1>
        </div>
      </Link>
      {user ? <Link to={`/users/${user.id}`}>{user.username}</Link> : null}
      <NavBar user={user} />
    </header>
  );
}

export default Header;