import React, { useEffect } from 'react';
import {BoardComponent} from './board';
import { Game } from '../state/game';
import { autorun } from 'mobx';

export const GameComponent = ({game}: {game: Game}) => {
    useEffect(() => {
        document.addEventListener('keydown', ctrlZ);
        return () => document.removeEventListener('keydown', ctrlZ);
    });
    useEffect(() => {
        return autorun(() => {
            document.title = 'Freecell - Game #'+game.seed;
        });
    })
    return <div>
        <BoardComponent />
    </div>

    function ctrlZ(e: KeyboardEvent) {
        if (e.key === 'z' && e.ctrlKey) {
            game.board.rollback();
        }
    }
}

