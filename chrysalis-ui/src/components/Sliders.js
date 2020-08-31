import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
  
export const GlobalSlider = withStyles({
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

export const BlockSlider = withStyles({
    root: {
        color: '#3a8589'
    },
    thumb: {
        height: 0,
        width: 0,
        backgroundColor: '#fff'
    },
    active: {},
    track: {
        height: '100%',
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: '100%',
    }
})(Slider);