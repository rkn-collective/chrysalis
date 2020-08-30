import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
  
const ChrysalisSlider = withStyles({
    root: {
        paddingTop: 60,
        paddingBottom: 60,
        color: '#3a8589'
    },
    thumb: {
        height: 20,
        width: 20,
        marginTop: 0,
        backgroundColor: '#fff',
        '& .bar': {
        height: 40,
        width: 2,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 20,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 20,
    }
})(Slider);

export default ChrysalisSlider;