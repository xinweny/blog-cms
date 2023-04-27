import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes as PT } from 'prop-types';

import LogoutButton from './LogoutButton';

function NavBar({ user }) {
  return (
    <nav>
      <a href="">Browse Stories</a>
      {user
      ? <LogoutButton />
      : <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>}
    </nav>
  );
}

NavBar.propTypes = {
  user: PT.shape({
    id: PT.string.isRequired,
    username: PT.string.isRequired,
  }),
  setUser: PT.func,
}

export default NavBar;