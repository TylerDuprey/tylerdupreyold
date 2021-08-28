import { useState }  from 'react';

const Slider = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <section className="slider-container">
      <div className="slider card">
        <input id="trigger-2" type="radio" name="slides" defaultChecked />
        <a href="tutorials/layout-a-webpage/" className="slide-one slide">
        <div className="container">
          <div className="slide-image">
            <i className="fas fa-parachute-box"></i>
          </div>
          <div className="slide-spacer"></div>
          <article>
            <h2>Layout a Webpage</h2>
            <p>In this tutorial we build a responsive and two-column HTML page layout with flexbox. This is a versatile way to setup a webpage that holds its shape regardless of content.</p>
          </article>
          <div className="slide-overlay"></div>
          </div>
        </a>
        <input id="trigger-3" type="radio" name="slides" />
        <a href="tutorials/design-an-html-logo/" className="slide-two slide">
          <div className="container">
            <div className="slide-image">
              <i className="fas fa-code"></i>
            </div>
            <div className="slide-spacer"></div>
            <article>
              <h2>Design an HTML logo</h2>
                              <p>In this free web development tutorial, we're making a logo with HTML, CSS and the text gradients CSS technique.</p>
            </article>
            <div className="slide-overlay"></div>
          </div>
        </a>
        <input id="trigger-4" type="radio" name="slides" />
        <a href="tutorials/build-interactive-buttons/" className="slide-three slide">
          <div className="container">
            <div className="slide-image">
              <i className="fas fa-mouse"></i>
            </div>
            <div className="slide-spacer"></div>
            <article>
              <h2>Build Interactive Buttons</h2>
              <p>In this free web development tutorial, we're making interactive buttons that look like they&rsquo;re being pressed down when the user clicks.</p>
            </article>
            <div className="slide-overlay"></div>
          </div>
        </a>
        <div className="slider_controls">
            <label htmlFor="trigger-2"></label>
            <label htmlFor="trigger-3"></label>
            <label htmlFor="trigger-4"></label>
        </div>
        <div className="fa-icon left-arrow arrow">

        </div>
        <div className="fa-icon right-arrow arrow">

        </div>
      </div>
    </section>
  );
};

export default Slider;
