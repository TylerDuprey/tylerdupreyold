import "../styles/normalize.css";
import "../styles/style.css";
import "../styles/index.css";

import "../styles/scss/index.scss";

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import TwoColumn from './TwoColumn';

const App  = () => {
  return (
    <>
      <Header />
      <TwoColumn />
      <Footer />
    </>
  );
};

export default App;
