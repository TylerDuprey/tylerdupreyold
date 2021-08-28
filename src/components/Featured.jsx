import { useState }  from 'react';

const Featured = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <section className="recent-articles article-list">
        <h2>Recent Tutorials</h2>
        <ul>
          <li className="article-card card">
            <article className="container">
                <header>
                  <i className="fas fa-code"></i>
                  </header>
                  <h3>Design an HTML and Font Awesome Logo</h3>
                  <p>In this free web development tutorial, we're making a logo with HTML, CSS and the text gradients CSS technique.</p>
                  <footer>
                      <a className="fa-icon btn" href="tutorials/design-an-html-logo/">Start Tutorial</a>
                  </footer>
              </article>
          </li>
          <li className="article-card card">
            <article className="container">
              <header>
                <i className="fas fa-directions"></i>
              </header>
              <h3>Follow Me on a Short Tour of My Website</h3>
              <p>This is a different video than usual. It was requested that I do a walkthrough of my website and the choices I made. We're going to go over the technology I used, the overall look and feel, as well as the content I create.</p>
              <footer>
                  <a className="fa-icon btn" href="tutorials/website-walkthrough/">Start Tutorial</a>
              </footer>
            </article>
          </li>
          <li className="article-card card">
            <article className="container">
                <header>
                    <i className="fas fa-compass"></i>
                </header>
                <h3>Layout a Responsive Navigation</h3>
                <p>In this tutorial we&rsquo;re creating a responsive navigation with a slide out menu on narrow screens. We&rsquo;ll use the "checkbox hack" to keep the project pure HTML and CSS.</p>
                <footer>
                    <a className="fa-icon btn" href="tutorials/responsive-navigation/">Start Tutorial</a>
                </footer>
            </article>
          </li>
          <li className="article-card card">
            <article className="container">
              <header>
                  <i className="fab fa-youtube"></i>
              </header>
              <h3>Embed a Responsive and Fluid Width YouTube Video</h3>
              <p>In this video, we'll embed a youtube video into our web page and set it's width and height to maintain a 16:9 ratio at viewport sizes.</p>
              <footer>
                  <a className="fa-icon btn" href="tutorials/fluid-youtube-video/">Start Tutorial</a>
              </footer>
            </article>
          </li>
          <li className="article-card card">
            <article className="container">
                <header>
                    <i className="fas fa-images"></i>
                </header>
                <h3>Design a Featured Blog Article Card</h3>
                <p>In this tutorial we'll use HTML and CSS to layout a "card" that could be used in a blog site to display a featured articles headline and lede. We' get into the details of CSS layout.</p>
                <footer>
                    <a className="fa-icon btn" href="tutorials/featured-article/">Start Tutorial</a>
                </footer>
            </article>
          </li>
          <li className="article-card card">
            <article className="container">
                <header>
                    <i className="fas fa-parachute-box"></i>
                </header>
                <h3>Layout a Responsive Page with Flexbox</h3>
                <p>In this tutorial we build a responsive and two-column HTML page layout with flexbox. This is a versatile way to setup a webpage that holds its shape regardless of content.</p>
                <footer>
                    <a className="fa-icon btn" href="tutorials/layout-a-webpage/">Start Tutorial</a>
                </footer>
            </article>
          </li>
        </ul>
        <a className="section-btn btn" href="tutorials/">Browse All Tutorials</a>
    </section>
  );
};

export default Featured;
