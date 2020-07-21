import React from "react";
import classes from './Tile.module.css';


const Tile = ({color, onColorChanged, isRemoved, clickedTiles, id, gamePaused, amount}) => {
    let defaultColor = 'gray';
    const isClicked = clickedTiles.find(i => i.id === id);

    const handleClick = () => {
        if (gamePaused) {
            return;
        } else {
            onColorChanged({id, color});
        }
    }

    return (
        isRemoved ? <div
                className={amount === 16 ? classes.wrapperRemoved : classes.bigWrapperRemoved}
                style={{backgroundColor: 'transparent'}}
            >
            </div>
            : <div
                className={amount === 16 ? classes.wrapper : classes.bigWrapper}
                onClick={isClicked ? null : handleClick}
                style={{backgroundColor: isClicked ? color : defaultColor}}
            >
            </div>
    )
}


export default Tile;