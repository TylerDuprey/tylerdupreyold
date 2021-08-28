import { useState }  from 'react';

const Hero = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <section className="hero">
      <div className="hero-container">
        <h1><i className="fas fa-snowboarding"></i><br />Your "Bunny Hill" for Learning Web Development</h1>
        <p>Hello, and welcome to my personal website. I create <strong>free web development and web design tutorials</strong> for beginners. I focus on HTML, CSS, JavaScript, static development, and JAM stack Development.</p>
        <div className="btn-container">
          <a className="fa-icon btn tutorials" href="tutorials/">Start Learning for Free</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
