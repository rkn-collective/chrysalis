import React, { Fragment, useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration';
import khalid_better from './assets/khalid_better.mp3';

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
  const handleVolumeChange = e => { setVolume(parseFloat(e.target.value)) }
  const handleToggleMuted = () => { setMuted(!muted) }
  const handleDuration = duration => { setDuration(duration) }
  const handleSeekMouseDown = e => { setSeeking(true) }
  const handleSeekChange = e => { setPlayed(parseFloat(e.target.value)) }

  const handleSeekMouseUp = e => {
    setSeeking(false)
    inputEl.current.seekTo(parseFloat(e.target.value))
  }

  const handleProgress = e => {
    if (!seeking) {
      setPlayed(e.played)
      setLoaded(e.loaded)
    }
  }

  const handleEnded = () => {
    setPlayed(0)
    setPlaying(loop)
  }

  const inputEl = useRef(null);

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

      <table>
        <tbody>
          <tr>
            <th>Controls</th>
            <td>
              <button onClick={handleStop}>Stop</button>
              <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
            </td>
          </tr>
          <tr>
            <th>Seek</th>
            <td>
              <input
                type='range' min={0} max={0.999999} step='any'
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
              />
            </td>
          </tr>
          <tr>
            <th>Volume</th>
            <td>
              <input type='range' min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor='muted'>Muted</label>
            </th>
            <td>
              <input id='muted' type='checkbox' checked={muted} onChange={handleToggleMuted} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor='loop'>Loop</label>
            </th>
            <td>
              <input id='loop' type='checkbox' checked={loop} onChange={handleToggleLoop} />
            </td>
          </tr>
          <tr>
            <th>Played</th>
            <td><progress max={1} value={played} /></td>
          </tr>
          <tr>
            <th>Loaded</th>
            <td><progress max={1} value={loaded} /></td>
          </tr>
          <tr>
            <th>duration</th>
            <td><Duration seconds={duration} /></td>
          </tr>
          <tr>
            <th>elapsed</th>
            <td><Duration seconds={duration * played} /></td>
          </tr>
          <tr>
            <th>remaining</th>
            <td><Duration seconds={duration * (1 - played)} /></td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}

export default Player;
