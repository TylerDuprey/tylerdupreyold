import { useState }  from 'react';

import Hero from './Hero';

const Header = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <>
      <header className="main-header card stick-to-top">
        <section className="header-container container">
        <div>
          <a className="fa-icon logo" href="#">
            <div>
              <span className="logo-text">TylerDuprey.com</span><br/>
              <span className="tagline">Free Web Development Tutorials</span>
            </div>
          </a>
        </div>
        <input id="trigger-1" className="menu-trigger" type="checkbox" />
        <label htmlFor="trigger-1" className="menu">
          <div></div>
          <div></div>
          <div></div>
        </label>
        <nav className="drawer card" role="navigation">
          <ul>
            <li>
              <a className="fa-icon about-link" href="about/">About</a>
            </li>
            <li>
              <a className="fa-icon tutorials-link" href="tutorials/">Tutorials</a>
            </li>
            <li>
              <a className="fa-icon contact-link" href="contact/">Contact</a>
            </li>
            <li className="search-two"><a className="fa-icon search-link" href="search/">Search</a>
            </li>
          </ul>
        </nav>
        </section>
      </header>
      <Hero />
    </>
  );
};

export default Header;
