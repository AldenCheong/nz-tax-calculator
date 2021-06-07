import { useEffect, useRef } from "react";
import * as ChartJs from "chart.js";

ChartJs.Chart.register.apply(
  null,
  Object.values(ChartJs).filter(chartClass => chartClass.id),
)

const DetailDonutChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    new ChartJs.Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: [
          'Negative',
          'Neutral',
          'Positive'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'lightpink',
            'lightskyblue',
            'palegreen'
          ],
          hoverOffset: 15
        }]
      },
    });
  }, [])

  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default DetailDonutChart