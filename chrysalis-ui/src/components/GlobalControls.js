import React, { Component, createRef, Fragment } from 'react';
import ReactPlayer from 'react-player';
import {GlobalSlider, BlockSlider} from './Sliders';
import { Card, Paper, Button, FormControlLabel, LinearProgress, Typography, Slider, Checkbox, Grid} from '@material-ui/core';
import '../index.css';
import '../style.css';

// import amilli from '../assets/audio/amilli.wav';
import better from '../assets/khalid_better.mp3';
import part1 from '../assets/audio/part1.wav';
import part2 from '../assets/audio/part2.wav';
import part3 from '../assets/audio/part3.wav';
import part4 from '../assets/audio/part4.wav';

import {generateBlocks, Duration} from '../utility';
import {StyledThumbComponent} from './StyledThumbComponent';
import Player from "./Player";

const Modules = {
     PlayerModule: function PlayerModule(props) {
        return <Player audioSegment={props.audioFile}/>;
    }
}

class GlobalControls extends Component {

    state = {
        globalPlaying: false,
        globalPlayed: 0,
        globalLoaded: 0,
        globalDuration: 0,
        globalMuted: false,
        globalVolume: 0.1,
        globalLoop: false,
        globalSeeking: false,
        globalPlayer: false,
    }

    handleGlobalPlay = () => { this.setState({globalPlaying: true}) }
    handleGlobalPause = () => { this.setState({globalPlaying: false}) }
    handleGlobalStop = () => { this.setState({globalPlaying: false}) }
    handleGlobalPlayPause = () => { this.setState({globalPlaying: !this.state.globalPlaying}) }
    handleGlobalToggleLoop = () => { this.setState({globalLoop: !this.state.globalLoop}) }
    handleGlobalToggleMuted = () => { this.setState({globalMuted: !this.state.globalMuted}) }
    handleGlobalDuration = (duration) => { this.setState({globalDuration: duration}) }
    handleGlobalVolumeChange = (event, value) => { this.setState({ globalVolume: value })}

    handleGlobalProgress = (progress) => {
        if (!this.state.globalSeeking) {
            this.setState({globalPlayed: progress.played})
            this.setState({globalLoaded: progress.loaded})
        }
        console.log(this.state)
    }

    handleGlobalSeekInit = () => {
        this.setState({globalSeeking: true})
        this.setState({globalPlaying: false})
    }

    handleGlobalSeekChange = (event, value) => {
        this.setState({globalPlayed: value})
        this.ref.seekTo(value)
    }

    handleGlobalSeekCommit = () => {
        this.setState({globalSeeking: false})
        this.setState({globalPlaying: true})
    }

    handleGlobalEnded = () => {
        this.setState({globalPlayed: 0}, () => {
            this.setState({globalPlaying: this.state.globalLoop})
        })
    }

    render() {
        const { globalPlaying, globalVolume, globalMuted, globalLoop, globalPlayed, globalLoaded, globalDuration } = this.state;

        return (
            <Fragment>
                <Paper style={{padding: 20}}>
                    <Typography>Volume</Typography>
                    <Slider min={0} max={1} step={0.0001} value={globalVolume} onChange={this.handleGlobalVolumeChange} />
                    <button onClick={() => console.log(this.state)}> hi </button>
                    <Typography>Loaded</Typography>
                    <LinearProgress value={globalLoaded * 100} style={{height: 20}} variant='determinate' />
                    <Typography>duration | {<Duration seconds={globalDuration} />}</Typography>
                    <Typography>elapsed | {<Duration seconds={globalDuration * globalPlayed} />}</Typography>
                    <Typography>remaining | {<Duration seconds={globalDuration * (1 - globalPlayed)} />}</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={globalMuted} onChange={this.handleGlobalToggleMuted}/>}
                        label='muted'
                    />
                    <FormControlLabel
                        control={<Checkbox checked={globalLoop} onChange={this.handleGlobalToggleLoop}/>}
                        label='loop'
                    />
                    <Button onClick={this.handleGlobalStop}>Stop</Button>
                    <Button onClick={this.handleGlobalPlayPause}>{globalPlaying ? 'Pause' : 'Play'}</Button>
                </Paper>
                <GlobalSlider
                    min={0}
                    max={1}
                    step={0.0001}
                    value={globalPlayed}
                    onMouseDown={this.handleGlobalSeekInit}
                    onChange={this.handleGlobalSeekChange}
                    onMouseUp={this.handleGlobalSeekCommit}
                    ThumbComponent={StyledThumbComponent}
                />
                <ReactPlayer
                    ref={playersRef => {this.ref = playersRef}}
                    className='react-player'
                    width='100%' height='100%'
                    url={better}
                    playing={globalPlaying}
                    loop={globalLoop}
                    volume={globalVolume}
                    muted={globalMuted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.handleGlobalPlay}
                    onPause={this.handleGlobalPause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.handleGlobalEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleGlobalProgress}
                    onDuration={this.handleGlobalDuration}
                />
                {/*<Modules.PlayerModule audioFile={amilli} />*/}
            </Fragment>
        )
    }
}

export default GlobalControls;
