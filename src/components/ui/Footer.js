import React from 'react';

import githubLogo from '../../assets/github-logo.svg';

import '../../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <p>
        Made by 
        <strong> <a href="https://github.com/xinweny">xinweny</a> </strong>
        in 2023
      </p>
      <a href="https://github.com/xinweny/blog-cms">
        <img src={githubLogo} alt="Github" />
      </a>
    </footer>
  );
}

export default Footer;