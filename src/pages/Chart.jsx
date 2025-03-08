import { LineChart } from "@mui/x-charts/LineChart";

const data = [
  { date: "2024-01-31", value: 3266.159245 },
  { date: "2024-02-29", value: 2799.264803 },
  { date: "2024-03-31", value: 2643.347696 },
  { date: "2024-04-30", value: 2711.185043 },
  { date: "2024-05-31", value: 2739.60112 },
  { date: "2024-06-30", value: 2785.49703 },
  { date: "2024-07-31", value: 2822.885408 },
  { date: "2024-08-31", value: 2903.873586 },
  { date: "2024-09-30", value: 2884.083853 },
  { date: "2024-10-31", value: 2772.076375 },
  { date: "2024-11-30", value: 2756.069526 },
  { date: "2024-12-31", value: 2779.556458 },
];

const xLabels = data.map((item) => item.date);
const yValues = data.map((item) => item.value);

export default function SimpleLineChart() {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="mr-4">
          <LineChart
            width={500}
            height={300}
            series={[{ data: yValues, label: "Sales of Fuji Apple" }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        </div>
        <div>
          <img src="/black.png" alt="Photo" className="h-full w-full" />
        </div>
        <div>
          <img src="/colorful.png" alt="" className="h-full " />
        </div>
      </div>
    </>
  );
}
