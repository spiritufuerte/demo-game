import React from 'react';
import './App.module.css';
import Tiles from "./components/Tiles/Tiles";
import classes from '../src/App.module.css'

function App() {
    return (
        <div className={classes.App}>
            <h1 className={classes.tile}>My game</h1>
            <Tiles/>
        </div>
    );
}

export default App;
