import React, {useEffect, useState} from "react";
import classes from './Tiles.module.css';
import Tile from '../Tile/Tile'
import GameLevelButton from "../GameLevelButton/GameLevelButton";

const BUTTONS = [
    {id: 1, text: '4x4'},
    {id: 2, text: '6x6'}
];
let countRemovedTiles = 0;

const Tiles = () => {
    const [clickedTiles, setClickedTiles] = useState([]);
    const [tiles, setTiles] = useState([]);
    const [amount, setAmount] = useState(16);
    const [pause, setPause] = useState(false);

    const handleGameLevelChanged = (id) => {
        if (id === 1) {
            setAmount(16);
        } else {
            setAmount(36);
        }
    }

    const gamePaused = () => {
        setPause(true);
    }

    const returnGame = () => {
        setPause(false);
    }

    useEffect(() => {
        if (clickedTiles.length === 2) {
            gamePaused();
            if (clickedTiles[0].color === clickedTiles[1].color) {
                countRemovedTiles++;
                console.log(countRemovedTiles);
                const newTiles = tiles.map(tile => {
                    if (!tile.isRemoved) tile.isRemoved = clickedTiles.find(i => i.id === tile.id);
                    return tile;
                });
                setTimeout(() => setTiles(newTiles), 500);
            }
            returnGame();
            setTimeout((() => {
                setClickedTiles([]);
            }), 500);
        }
    }, [tiles, clickedTiles]);

    const handleTileColorChanged = (obj) => {
        setClickedTiles([...clickedTiles, obj]);
    }

    const generateColor = () => {
        return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    }

    useEffect(() => {
        const generateObj = () => {
            const newTiles = [];
            for (let i = 0; i < amount; i++) {
                newTiles.push({
                    color: i % 2 ? newTiles[i - 1].color : generateColor(),
                    isRemoved: false,
                    id: i
                });
            }
            setTiles(shuffle(newTiles));
        };
        generateObj();
    }, [amount]);

    function shuffle(arr) {
        let j, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.buttons}>
                {BUTTONS.map((item, i) => (
                    <GameLevelButton
                        {...item}
                        key={i}
                        text={item.text}
                        onGameLevelChanged={handleGameLevelChanged}/>
                ))}
            </div>
            {(countRemovedTiles === amount) ?
                <div className={classes.textEndGame}>
                    <h1>End of the game</h1>
                </div> :
                <div className={tiles.length === 16 ? classes.Tiles : classes.bigTiles}>
                    {tiles.map((item) => (
                        <Tile
                            clickedTiles={clickedTiles}
                            {...item}
                            key={item.id}
                            onColorChanged={handleTileColorChanged}
                            gamePaused={pause}
                            amount={amount}
                        />
                    ))}
                </div>}
        </div>
    )
}

export default Tiles;