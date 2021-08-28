import "../styles/index.css";
import "../styles/scss/index.scss";
import profile from '../images/profile-photo.jpeg'

import React from 'react';
import Recipes from './Recipes';

const App  = () => {
  return (
    <>
    <h1>
      Hello!
    </h1>
    <div className="hero" style={{width: '300px',height: '300px'}}>
      <img src={profile} alt="" />
    </div>
    <Recipes />
    </>
  );
};

export default App;
