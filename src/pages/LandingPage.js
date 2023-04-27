import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-banner">
        <h2>BlogTree</h2>
        <div>
          <p>Introducing BlogTree CMS, the easiest way to create and manage your stories.</p>
          <br />
          <p>With BlogTree, you can write and manage your articles in a few clicks. Our easy-to-use platform allows you to create and customize posts, and engage with your audience. Start writing and inspire your audience today.</p>
        </div>
        <Link to="/signup">Unleash Your Creativity</Link>
      </div>
    </main>
  );
}

export default LandingPage;