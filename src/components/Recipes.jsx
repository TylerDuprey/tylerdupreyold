import { useState }  from 'react';

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

console.log(test);
console.log('change to save!');

const Recipes = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <div className="recipe-box">
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
