import { Doughnut } from "react-chartjs-2";
import useStyles from "./DetailDonutChart.style.js"

const DetailDonutChart = ({ chartData }) => {
  const styles = useStyles();
	let labels = [];
	let annuallies = [];
	let percentages = [];
	let colors = [];
  let grossPayData = {};
  let takeHomePayData = {};
  let taxData = {};
  let deductable = 0;
  
  // Loop through and assign into variables
	chartData.forEach((row) => {
		if (row.variable === "Gross Pay") {
      grossPayData = row;
      return;
    }
		labels.push(row.variable);
		annuallies.push(row.annually);
		percentages.push(row.percentage);
		colors.push(
			row.variable === "Take Home Pay" ? "lightskyblue" : "lightpink"
		);

    if (row.variable === "Take Home Pay") {
      takeHomePayData = row;
      return;
    }

    if (row.variable === "Tax") {
      taxData = row;
    }

    deductable += Number(row.annually);
	});

	const processedData = {
		labels: labels,
		datasets: [
			{
				data: annuallies,
				backgroundColor: colors,
				hoverOffset: 5,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} (${percentages[tooltipItem.dataIndex]})`,
        },
      },
		},
		layout: {
			padding: {
				left: 20,
				right: 20,
				top: 20,
				bottom: 20,
			},
		},
	};

	return (
    <div className={styles.detailBlock}>
      <div className={styles.donutChart}>
        <Doughnut data={processedData} options={options} />
        <div className={styles.chartInner}>
          <div className={styles.chartStatus}>{grossPayData.variable}</div>
          <div className={styles.chartValue}>{grossPayData.annually}</div>
        </div>
      </div>
      <div>
        <div className={styles.explanationPanel}>
          <div className={styles.explanationBlock}>
            <span>Your take home pay is </span>
            <span className={styles.highlightText}>{takeHomePayData.annually}</span>
            <span>in period of a year.</span>
          </div>
          <div className={styles.explanationBlock}>
            <span>Which make up </span>
            <span className={styles.highlightText}>{takeHomePayData.percentage}</span>
            <span>of your gross pay.</span>
          </div>
        </div>
        <div className={styles.explanationPanel}>
          <div className={styles.explanationBlock}>
            <span>Deductables amount to</span>
            <span className={styles.highlightText}>{deductable.toFixed(2)}</span>
          </div>
          <div className={styles.explanationBlock}>
            <span>Taking portion of</span>
            <span className={styles.highlightText}>{(deductable / grossPayData.annually * 100).toFixed(2) + "%"}</span>
          </div>
          <div className={styles.explanationBlock}>
            <span>Among the deductables, tax amount is</span>
            <span className={styles.highlightText}>{taxData.annually}</span>
          </div>
          <div className={styles.explanationBlock}>
            <span>Making effective tax rate to be</span>
            <span className={styles.highlightText}>{taxData.percentage}</span>
          </div>
        </div>
      </div>
    </div>
	);
};

export default DetailDonutChart;
