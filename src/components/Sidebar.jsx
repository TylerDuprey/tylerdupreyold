import { useState }  from 'react';

import profile from '../images/profile-photo.jpg';

const Sidebar = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <aside className="main-aside">
      <section>
        <article>
            <header>
              <h3>Keep Your Skills Sharp</h3>
            </header>
            <p className="container">Join the email list and get notified when a new tutorial is posted!</p>
            <form className="container"  action="https://formspree.io/tyler@tylerduprey.com" method="POST">
                <input type="email" placeholder="email@example.com" name="email" required />
                <button type="submit" className="fa-icon">Sign Up</button>
            </form>
        </article>
      </section>
      <section>
          <article>
              <div className="profile-photo" >
                <img src={profile} alt="Photo of Tyler Duprey" />
              </div>
              <h3 className="container">About Tyler Duprey</h3>
              <p className="container">Welcome to my personal website! I&rsquo;m passionate about web design and sharing my knowledge with other designers and developers.</p>
              <footer className="container">
                <a className="fa-icon btn" href="about/">More About Me</a>
              </footer>
          </article>
      </section>
    </aside>
  );
};

export default Sidebar;
