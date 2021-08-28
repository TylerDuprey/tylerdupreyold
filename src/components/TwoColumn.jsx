import { useState }  from 'react';

import Main from './Main';
import Sidebar from './Sidebar';

const TwoColumn = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <div className="main-container container">
      <Main />
      <Sidebar />
    </div>
  );
};

export default TwoColumn;
