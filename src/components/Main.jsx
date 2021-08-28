import { useState }  from 'react';

import TwoColumn from './TwoColumn';

import Slider from './Slider';
import Featured from './Featured';
import FeaturedRecommended from './FeaturedRecommended';

const Main = () => {

  return (
      <main>
        <Slider />
        <Featured />
        <FeaturedRecommended />
      </main>
  );
};

export default Main;
