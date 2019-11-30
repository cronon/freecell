import React from 'react';
import {game} from '../state';

export const Menu = () => {
    return <div>
        <button>New game</button>
        <button onClick={() => game.board.rollback()}>Undo</button>
    </div>
}
