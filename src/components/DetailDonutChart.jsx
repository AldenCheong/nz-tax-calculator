import { useEffect, useRef } from "react";
import * as ChartJs from "chart.js";

ChartJs.Chart.register.apply(
  null,
  Object.values(ChartJs).filter((chartClass) => chartClass.id),
)

const DetailDonutChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    new ChartJs.Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
    });
  }, [])

  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default DetailDonutChart