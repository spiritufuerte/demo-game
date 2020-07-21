import React from "react";
import classes from '../GameLevelButton/GameLevelButton.module.css'


const GameLevelButton = ({onGameLevelChanged, text, id}) => {

    const handleButtonClick = () => {
        onGameLevelChanged(id);
    }

    return (
        <button
            className={classes.GameLevelButton}
            onClick={handleButtonClick}
        >{text}</button>
    )
}

export default GameLevelButton;