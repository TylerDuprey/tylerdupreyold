import { useState }  from 'react';

const Footer = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <footer className="main-footer">
        <div className="footer-container container">
            <p>&copy; <span className="jsDate">2019</span> tylerduprey.com</p>
        </div>
    </footer>
  );
};

export default Footer;
