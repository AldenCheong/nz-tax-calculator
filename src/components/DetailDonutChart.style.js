import { makeStyles } from '@material-ui/core/styles';

const DetailDonutChartStyles = makeStyles({
  detailBlock: {
    display: 'flex',
  },
	donutChart: {
		width: 300,
		height: 300,
    position: 'relative',
    zIndex: 0,
	},
  chartInner: {
    position: 'absolute',
    top: '25%',
    left: '12.5%',
    right: '12.5%',
    textAlign: 'center',
    backgroundColor: '#fffbed',
    lineHeight: '170%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: -1,
  },
  chartStatus: {
    fontWeight: 'bold',
    fontSize: 'larger',
  },
  chartValue: {
    fontWeight: 'bold',
    fontSize: 'large',
    color: 'darkgoldenrod',
  },
  explanationPanel: {
    display: 'flex',
  },
  explanationBlock: {
    display: 'flex',
    flexDirection: 'column',
    padding: 25,
  },
  highlightText: {
    fontWeight: 'bold',
    color: 'darkgoldenrod',
    fontSize: 'xx-large',
  }
});

export default DetailDonutChartStyles