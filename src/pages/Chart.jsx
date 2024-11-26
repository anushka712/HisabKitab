import React from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Chart = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div style={{ width: "80%", height: "70vh" }}>
    <Bar
    data={{
      labels:["Pen","Copy", "Book"],
      datasets:[
        {
          label: "Revenue",
          data:[200, 300, 400],
        },
        {
          label:"Loss",
          data:[80, 70, 20],
        }
      ]
    }}
    />
  </div></div>
    
  )
}

export default Chart
