import React, { Fragment } from 'react';
import Player from './components/Player';
import { Grid } from '@material-ui/core';
import './App.css';

function App() {

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{paddingTop: 200}}
      >
        <Grid item xs={6}>
          <Player/>
        </Grid>
      </Grid>
    </Fragment>
    
  );
}

export default App;
