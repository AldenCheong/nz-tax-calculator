import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import useStyles from "./DetailDonutChart.style.js";

const DetailDonutChart = ({ chartData }) => {
	const styles = useStyles();
	let labels = [];
	let annuallies = [];
	let percentages = [];
	let colors = [];
	let data = {};
	const [displayFormat, setDisplayFormat] = useState("%");
  const [showDeductableDetail, setShowDeductableDetail] = useState(false);

	// Loop through and assign into an object variable
	chartData.forEach((row) => {
		if (row.variable === "Gross Pay") {
			data = { ...data, [row.variable]: row };
			return;
		}
		labels.push(row.variable);
		annuallies.push(row.annually);
		percentages.push(row.percentage);
		colors.push(
			row.variable === "Take Home Pay" ? "lightskyblue" : "lightpink"
		);

		if (row.variable === "Take Home Pay") {
			data = { ...data, [row.variable]: row };
			return;
		}
		const totalAmount = Number(row.annually) + (data.TotalDeductable || 0);
    let deductableArray = data["Deductable"] || [];
    deductableArray.push(row);
		data = {
			...data,
			Deductable: deductableArray,
      TotalDeductable: totalAmount,
		};
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
					label: (tooltipItem) =>
						`${tooltipItem.label}: ${tooltipItem.raw} (${
							percentages[tooltipItem.dataIndex]
						})`,
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

	const handleDisplayFormat = (_value, newDisplayFormat) => {
    if (newDisplayFormat === null) return;
    setDisplayFormat(newDisplayFormat);
  }

	return (
		<div className={styles.detailBlock}>
			{data["Take Home Pay"].annually > 0 ? 
      (<div className={styles.donutChart}>
				<Doughnut data={processedData} options={options} />
				<div className={styles.chartInner}>
					<div className={styles.chartStatus}>{data["Gross Pay"].variable}</div>
					<div className={styles.chartValue}>{data["Gross Pay"].annually}</div>
				</div>
			</div>):
      (<span className={styles.chartNotAvailableLabel}>Chart<br/>Not Available</span>)}
			<div className={styles.explanationPanel}>
				<div className={styles.explanationRow}>
					<div className={styles.explanationBlock}>
						<ToggleButtonGroup
							color="primary"
							className={styles.toggleButtonGroup}
							value={displayFormat}
							exclusive
							onChange={handleDisplayFormat}
						>
							<ToggleButton className={styles.toggleButton} value="%">
								%
							</ToggleButton>
							<ToggleButton className={styles.toggleButton} value="#">
								#
							</ToggleButton>
						</ToggleButtonGroup>
					</div>
				</div>
        {showDeductableDetail ? 
        (<>
          <div className={styles.explanationRow}>
            <div className={styles.explanationBlock}>
              <span>Total Deductables</span>
              <span className={styles.highlightText} onClick={()=>setShowDeductableDetail(!showDeductableDetail)}>
                {displayFormat === "#"
                  ? data["TotalDeductable"].toFixed(2)
                  : (
                      (data["TotalDeductable"] / data["Gross Pay"].annually) *
                      100
                    ).toFixed(2) + "%"}
              </span>
            </div>
          </div>
          <div className={styles.explanationRow}>
          {data["Deductable"].map(deductable => {return (
            <div key={deductable.id} className={styles.explanationBlock}>
              <span>{deductable.variable}</span>
              <span className={styles.highlightText}>
                {displayFormat === "#"
                  ? deductable.annually
                  : deductable.percentage}
              </span>
            </div>
          );})}
          </div>
        </>) :
        (<>
          <div className={styles.explanationRow}>
            <div className={styles.explanationBlock}>
              <span>Based on your gross pay...</span>
            </div>
          </div>
          <div className={styles.explanationRow}>
            <div className={styles.explanationBlock}>
              <span>Your take home pay is </span>
              <span className={styles.highlightText}>
                {displayFormat === "#"
                  ? data["Take Home Pay"].annually
                  : data["Take Home Pay"].percentage}
              </span>
            </div>
          </div>
          <div className={styles.explanationRow}>
            <div className={styles.explanationBlock}>
              <span>Deductables</span>
              <span className={styles.highlightText} onClick={()=>setShowDeductableDetail(!showDeductableDetail)}>
                {displayFormat === "#"
                  ? data["TotalDeductable"].toFixed(2)
                  : (
                      (data["TotalDeductable"] / data["Gross Pay"].annually) *
                      100
                    ).toFixed(2) + "%"}
              </span>
            </div>
            <div className={styles.explanationBlock}>
              <span>Effective Tax</span>
              <span className={styles.highlightText}>
                {displayFormat === "#"
                  ? data["Deductable"].find(x => x.variable === "Tax").annually
                  : data["Deductable"].find(x => x.variable === "Tax").percentage}
              </span>
            </div>
          </div>
        </>)}
			</div>
		</div>
	);
};

export default DetailDonutChart;
