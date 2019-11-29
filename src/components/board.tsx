import React from 'react';
import './board.css';
import { Board } from '../state/board';
import {CardComponent} from './card';
import { Card } from '../state/card';

export const BoardComponent = ({board}: {board: Board}) => {
    const cardsMap = (c: Card) => <CardComponent card={c} />;
    return <div className="board">
        {/* <div class="free-places">Free places{board.freeplaces.map(cardsMap)}</div>
        <div>Collected cards {board.collectedCards.map(cardsMap)}</div> */}
        <div className="columns">Main field
            {board.columns.map(column => {
                return <div className="column">
                    {column.map(cardsMap)}
                </div>
            })}
        </div>
    </div>
}
