import React, { useState, useRef, Fragment } from 'react';
import ReactPlayer from 'react-player';
import khalid_better from '../assets/khalid_better.mp3';
import ChrysalisSlider from './ChrysalisSlider';
import { MuuriComponent } from "muuri-react";
import { Card, Paper, Button, FormControlLabel, LinearProgress, Typography, Slider, Checkbox, Grid} from '@material-ui/core';
import '../index.css';
import '../style.css';

import {generateItems, Duration} from '../utility';
import {StyledThumbComponent} from './StyledThumbComponent';
import {AudioBlock} from './AudioBlock';

export default function Player() {

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false);

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
    inputEl.current.seekTo(value) 
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

  const inputEl = useRef(null);

  const items = generateItems();

  const children = items.map(props => <AudioBlock key={props.index} {...props} />);

  return (
    <Fragment>
      <ReactPlayer
          ref={inputEl}
          className='react-player'
          width='100%'
          height='100%'
          url={khalid_better}
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
      <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
      >
        <Paper style={{padding: 20}}>
          <Typography>Volume</Typography>
          <Slider min={0} max={1} step={0.0001} value={volume} onChange={handleVolumeChange} />
          <Typography>Loaded</Typography>
          <LinearProgress value={loaded * 100} style={{height: 20}} variant='determinate' />
          <Typography>duration | {<Duration seconds={duration} />}</Typography>
          <Typography>elapsed | {<Duration seconds={duration * played} />}</Typography>
          <Typography>remaining | {<Duration seconds={duration * (1 - played)} />}</Typography>
          <FormControlLabel
              control={<Checkbox checked={muted} onChange={handleToggleMuted}/>}
              label='muted'
          />
          <FormControlLabel
              control={<Checkbox checked={loop} onChange={handleToggleLoop}/>}
              label='loop'
          />
          <Button onClick={handleStop}>Stop</Button>
          <Button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</Button>
        </Paper>
        <ChrysalisSlider
            min={0}
            max={1}
            step={0.0001}
            value={played}
            onChange={handleSeekChange}
            onChangeCommitted={handleSeekCommit}
            ThumbComponent={StyledThumbComponent}
        />
      </Grid>
      <Grid>
        <MuuriComponent dragEnabled>
          {children}
        </MuuriComponent>
      </Grid>
    </Fragment>
  );
}