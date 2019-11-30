import React, { useEffect } from 'react';
import {BoardComponent} from './board';
import { Game } from '../state/game';

export const GameComponent = ({game}: {game: Game}) => {
    useEffect(() => {
        document.addEventListener('keydown', ctrlZ)
        return () => document.removeEventListener('keydown', ctrlZ)
    })
    return <div>
        <div>Here is score</div>
        <div>Warning that there are no more moves</div>
        <BoardComponent />
    </div>

    function ctrlZ(e: KeyboardEvent) {
        if (e.key === 'z' && e.ctrlKey) {
            game.board.rollback();
        }
    }
}
