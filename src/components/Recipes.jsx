import { useState }  from 'react';

import profile from '../images/profile-photo.jpg';

const test = {
  testing: 'test',
  testTwo: 'test-one',
  testThree: 'test-thre'
}

const test2 = {
  ...test,
  test: 'test',
  testTwoo: 'test-twoo',
  testThre: 'test-thre'
}

const Recipes = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <div className="recipe-box">
      <div className="hero" style={{width: '300px',height: '300px'}}>
        <img src={profile} alt="" />
      </div>
      <h3>Current Recipe</h3>
      <button onClick={() => setRecipe(test)}>Elven Shield Recipe</button>
      <button onClick={() => setRecipe(test2)}>Elven Shield Recipes</button>

      <ul>
        {Object.keys(recipe).map((material, index) => <li key={index}>{material}</li>)}
      </ul>
    </div>
  );
};

export default Recipes;
