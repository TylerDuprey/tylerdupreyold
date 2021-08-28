import { useState }  from 'react';

const FeaturedRecommended = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <aside className="article-list recommended">
      <h2>Recommended Tutorials</h2>
      <ul>
        <li className="article-card card">
          <article className="container">
            <header>
              <i className="fas fa-border-style"></i>
            </header>
            <h3>Add a CSS Border Gradient to Images</h3>
            <p>In this video, we're going to create a profile photo with a cool gradient border around it. There are a few different ways to create a border gradient but for this video, I will demonstrate my favorite technique.</p>
            <footer>
                <a className="fa-icon btn" href="tutorials/border-gradient/">Start Tutorial</a>
            </footer>
          </article>
        </li>
        <li className="article-card card">
            <article className="container">

              <header>
                <i className="fas fa-code"></i>
              </header>
                <h3>Design an HTML and Font Awesome Logo</h3>
                <p>In this free web development tutorial, we're making a logo with HTML, CSS and the text gradients CSS technique.</p>
                <footer>
                    <a className="fa-icon btn" href="tutorials/design-an-html-logo">Start Tutorial</a>
                </footer>
            </article>
        </li>
        <li className="article-card card">
            <article className="container">
                <header>
                  <i className="fas fa-mouse"></i>
                </header>
                <h3>Build Interactive Buttons</h3>
                <p>In this free web development tutorial, we're making interactive buttons that look like they&rsquo;re being pressed down when the user clicks.</p>
                <footer>
                    <a className="fa-icon btn" href="tutorials/build-interactive-buttons/">Start Tutorial</a>
                </footer>
            </article>
        </li>
      </ul>
    </aside>
  );
};

export default FeaturedRecommended;
