import React, { useState, useRef, Fragment } from 'react';
import ReactPlayer from 'react-player';
import {GlobalSlider, BlockSlider} from './Sliders';
import {MuuriComponent, useDrag} from "muuri-react";
import { Card, Paper, Button, FormControlLabel, LinearProgress, Typography, Slider, Checkbox, Grid} from '@material-ui/core';
import '../index.css';
import '../style.css';

import {generateBlocks, Duration} from '../utility';
import {StyledThumbComponent} from './StyledThumbComponent';
import {AudioBlock} from './AudioBlock';

export default function Player(props) {

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [audioBlockArray, setBlockArray] = useState(generateBlocks());

  const handlePlay = () => { setPlaying(true) }
  const handlePause = () => { setPlaying(false) }
  const handlePlayPause = () => { setPlaying(!playing) }
  const handleStop = () => { setPlaying(false) }
  const handleToggleLoop = () => { setLoop(!loop) }

  const handleToggleMuted = () => { setMuted(!muted) }
  const handleDuration = duration => { setDuration(duration) }

  const handleVolumeChange = (event, value) => {
    setVolume(value)
  }

  const handleSeekChange = (event, value) => {
    setSeeking(true)
    setPlayed(value)
  }

  const handleSeekCommit = (event, value) => {
    setSeeking(false)
    // playerRef.current.seekTo(value)
    // playerRef2.current.seekTo(value)
  }

  const handleProgress = event => {
    if (!seeking) {
      setPlayed(event.played)
      setLoaded(event.loaded)
    }
  }

  const handleEnded = () => {
    setPlayed(0)
    setPlaying(loop)
  }

  const playerRef = useRef(null);
  const playerRef2 = useRef(null);
  const muuriRef = useRef(null);

  const children = audioBlockArray.map(props => {
    return (
      <Fragment key={`${props.index}`}>
        <AudioBlock key={`block ${props.index}`} {...props} />
        <Paper>
          <LinearProgress key={`progress ${props.index}`} value={played * 100} style={{height: 10}} variant='determinate' />
        </Paper>
      </Fragment>
  )})

  return (
    <Fragment>
    <GlobalSlider
        min={0}
        max={1}
        step={0.0001}
        value={played}
        onChange={handleSeekChange}
        onChangeCommitted={handleSeekCommit}
        ThumbComponent={StyledThumbComponent}
    />
      <ReactPlayer
          ref={playerRef}
          className='react-player'
          width='100%'
          height='100%'
          url={props.audioSegment}
          playing={playing}
          loop={loop}
          volume={volume}
          muted={muted}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={handlePlay}
          onPause={handlePause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={e => console.log('onSeek', e)}
          onEnded={handleEnded}
          onError={e => console.log('onError', e)}
          onProgress={handleProgress}
          onDuration={handleDuration}
      />
        <Paper style={{padding: 20}}>
            <Typography>Part 1</Typography>
            <LinearProgress value={played * 100} style={{height: 20}} variant='determinate' />
        </Paper>
    </Fragment>
  );
}