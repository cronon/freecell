import React from 'react';
import {BoardComponent} from './board';
import { Game } from '../state/game';

export const GameComponent = ({game}: {game: Game}) => {
    return <div>
        <div>Here is score</div>
        <div>Warning that there are no more moves</div>
        <BoardComponent />
    </div>
}
