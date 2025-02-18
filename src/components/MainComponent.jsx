
import { TimeAndUser } from './TimeAndUser';
import Chart from '../pages/Chart';
import { CountPoints } from './CountPoints';



function MainComponent() {
  return (
    <div className="md:ml-[20%] md:w-[80%]">
      <TimeAndUser />
     <CountPoints/>
      <Chart/>
    </div>
  );
}

export default MainComponent
