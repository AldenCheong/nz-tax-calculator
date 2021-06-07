import { Doughnut } from 'react-chartjs-2';

const DetailDonutChart = () => {
  const data = {
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
  }

  return (
    <Doughnut data={data} />
  )
}

export default DetailDonutChart