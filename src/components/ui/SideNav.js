import React from 'react';
import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/posts/new">Create Post</Link></li>
      </ul>
    </nav>
  );
}

export default SideNav;