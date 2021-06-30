import { makeStyles } from '@material-ui/styles';

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
    width: '100%',
    padding: 20,
  },
  explanationRow: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    '&:first-child > div': {
      paddingTop: 0,
    },
  },
  explanationBlock: {
    display: 'flex',
    flex: '1 0 45%', // Limit 2 blocks per row
    padding: 10,
    '& > span': {
      alignSelf: 'center',
    },
  },
  arrowIcon: {
    marginTop: 5,
    marginRight: 5,
    color: 'darkslategrey',
  },
  highlightText: {
    fontWeight: 'bold',
    color: 'darkgoldenrod',
    fontSize: 'x-large',
    marginLeft: 50,
    cursor: 'default',
  },
  toggleButtonGroup: {
    height: 35
  },
  toggleButton: {
    width: 70,
  },
  chartNotAvailableLabel: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 300,
  },
  viewable: {
    '& :not($highlightText)': {
      textDecoration: 'underline dotted darkslategrey 2px',
      textUnderlineOffset: '3px',
    },
    '&:hover': {
      color: 'lightskyblue',
      cursor: 'pointer',
      '& $highlightText': {
        color: 'lightskyblue',
        cursor: 'pointer',
      },
    },
  },
});

export default DetailDonutChartStyles