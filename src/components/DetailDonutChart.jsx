import { Doughnut } from 'react-chartjs-2';

const styles = {
  donutChart: {
    width: 250,
    height: 250,
    padding: 25,
  },
}

const DetailDonutChart = () => {
  const data = {
    labels: [
      'Negative',
      'Neutral',
      'Positive'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'lightpink',
        'lightskyblue',
        'palegreen'
      ],
      hoverOffset: 5
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      }
    }
  }

  return (
    <div style={styles.donutChart}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DetailDonutChart