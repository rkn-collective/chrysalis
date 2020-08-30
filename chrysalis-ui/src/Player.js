import React, { Fragment, useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration';
import khalid_better from './assets/khalid_better.mp3';
import { makeStyles } from '@material-ui/core/styles';
import {Button, FormControlLabel, Box, Paper, LinearProgress, Typography, Slider, Checkbox} from '@material-ui/core';
import './index.css';

function Player() {

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

  return (
    <Box>
        <Typography>Volume</Typography>
        <Slider min={0} max={1} step={0.0001} value={volume} onChange={handleVolumeChange} />
        <Typography>Loaded</Typography>
        <LinearProgress value={loaded * 100} style={{height: 20}} variant='determinate' />
        <Typography>duration</Typography>
        <Duration seconds={duration} />
        <Typography>elapsed</Typography>
        <Duration seconds={duration * played} />
        <Typography>remaining</Typography>
        <Duration seconds={duration * (1 - played)} />
        <FormControlLabel 
          control={<Checkbox checked={muted} onChange={handleToggleMuted}/>} 
          label='muted'
          />
        <FormControlLabel 
          control={<Checkbox checked={loop} onChange={handleToggleLoop}/>} 
          label='loop'
          />
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
        <Typography>Controls</Typography>
        <Button onClick={handleStop}>Stop</Button>
        <Button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</Button>
        <Typography>Seek</Typography>
        <Slider
          min={0} 
          max={1}
          step={0.0001}
          value={played}
          onChange={handleSeekChange}
          onChangeCommitted={handleSeekCommit}
        />
        <Typography>Played</Typography>
        <LinearProgress style={{height: 20}} variant='determinate' value={played * 100} />
    </Box>
  );
}

export default Player;
