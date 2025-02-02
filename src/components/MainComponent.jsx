import React from 'react'
import { TimeAndUser } from './TimeAndUser';
import { Card } from './Cards';
import Chart from '../pages/Chart';



function MainComponent() {
  return (
    <div className="md:ml-[20%] md:w-[80%]">
      <TimeAndUser />
      <Card />
      <Chart/>
    </div>
  );
}

export default MainComponent
