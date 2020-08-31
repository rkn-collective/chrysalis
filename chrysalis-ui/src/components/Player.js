import React, { useState, useRef, Fragment } from 'react';
import ReactPlayer from 'react-player';
import {GlobalSlider, BlockSlider} from './Sliders';
import {MuuriComponent, useDrag} from "muuri-react";
import { Card, Paper, Button, FormControlLabel, LinearProgress, Typography, Slider, Checkbox, Grid} from '@material-ui/core';
import '../index.css';
import '../style.css';

import amilli from '../assets/audio/amilli.wav';
import part1 from '../assets/audio/part1.wav';
import part2 from '../assets/audio/part2.wav';
import part3 from '../assets/audio/part3.wav';
import part4 from '../assets/audio/part4.wav';

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
  const [audioBlockArray, setAudioBlockArray] = useState(generateBlocks());

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

  const GlobalControls = () => {
    return (
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
  )}

  // const Playerrrr = React.forwardRef((props, ref) => (
  //     <ReactPlayer
  //         ref={ref}
  //         className='react-player'
  //         width='100%'
  //         height='100%'
  //         url={props.url}
  //         playing={playing}
  //         loop={loop}
  //         volume={volume}
  //         muted={muted}
  //         onReady={() => console.log('onReady')}
  //         onStart={() => console.log('onStart')}
  //         onPlay={handlePlay}
  //         onPause={handlePause}
  //         onBuffer={() => console.log('onBuffer')}
  //         onSeek={e => console.log('onSeek', e)}
  //         onEnded={handleEnded}
  //         onError={e => console.log('onError', e)}
  //         onProgress={handleProgress}
  //         onDuration={handleDuration}
  //     />
  //   )
  // )

    const Playerrrr = (props) => {
        return (
        <ReactPlayer
            ref={props.ref}
            className='react-player'
            width='100%'
            height='100%'
            url={props.url}
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
    )}

    const ref2 = React.createRef();

  return (
    <Fragment>
        <GlobalControls />
        <GlobalSlider
            min={0}
            max={1}
            step={0.0001}
            value={played}
            onChange={handleSeekChange}
            onChangeCommitted={handleSeekCommit}
            ThumbComponent={StyledThumbComponent}
        />
        <Playerrrr props={{url: amilli, ref: playerRef}} />
        {/*  <ReactPlayer*/}
        {/*      ref={playerRef}*/}
        {/*      className='react-player'*/}
        {/*      width='100%'*/}
        {/*      height='100%'*/}
        {/*      url={amilli}*/}
        {/*      playing={playing}*/}
        {/*      loop={loop}*/}
        {/*      volume={volume}*/}
        {/*      muted={muted}*/}
        {/*      onReady={() => console.log('onReady')}*/}
        {/*      onStart={() => console.log('onStart')}*/}
        {/*      onPlay={handlePlay}*/}
        {/*      onPause={handlePause}*/}
        {/*      onBuffer={() => console.log('onBuffer')}*/}
        {/*      onSeek={e => console.log('onSeek', e)}*/}
        {/*      onEnded={handleEnded}*/}
        {/*      onError={e => console.log('onError', e)}*/}
        {/*      onProgress={handleProgress}*/}
        {/*      onDuration={handleDuration}*/}
        {/*  />*/}
        {/*<ReactPlayer*/}
        {/*    ref={playerRef2}*/}
        {/*    className='react-player'*/}
        {/*    width='100%'*/}
        {/*    height='100%'*/}
        {/*    url={part1}*/}
        {/*    playing={playing}*/}
        {/*    loop={loop}*/}
        {/*    volume={volume}*/}
        {/*    muted={muted}*/}
        {/*    onReady={() => console.log('onReady')}*/}
        {/*    onStart={() => console.log('onStart')}*/}
        {/*    onPlay={handlePlay}*/}
        {/*    onPause={handlePause}*/}
        {/*    onBuffer={() => console.log('onBuffer')}*/}
        {/*    onSeek={e => console.log('onSeek', e)}*/}
        {/*    onEnded={handleEnded}*/}
        {/*    onError={e => console.log('onError', e)}*/}
        {/*    onProgress={handleProgress}*/}
        {/*    onDuration={handleDuration}*/}
        {/*/>*/}
        {/*<Grid*/}
        {/*    container*/}
        {/*    direction="column"*/}
        {/*    justify="center"*/}
        {/*    alignItems="center"*/}
        {/*>*/}
            <Paper style={{padding: 20}}>
                <Typography>Part 1</Typography>
                <LinearProgress value={played * 100} style={{height: 20}} variant='determinate' />
            </Paper>
        {/*</Grid>*/}
          {/*<Grid>*/}
          {/*  <MuuriComponent*/}
          {/*      ref={muuriRef}*/}
          {/*      dragEnabled={true}*/}
          {/*  >*/}
          {/*    {children}*/}
          {/*  </MuuriComponent>*/}
          {/*</Grid>*/}
    </Fragment>
  );
}