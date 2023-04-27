import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/SideNav.css';

import navIcon from '../../assets/nav.svg';

function SideNav() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="side-nav">
      <button onClick={() => setShowNav(prev => !prev)}>
        <img src={navIcon} alt="Toggle side nav bar" />
      </button>
      <nav hidden={showNav}>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/posts/new">Create Post</Link></li>
          <li><Link to="/comments">Manage Comments</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;