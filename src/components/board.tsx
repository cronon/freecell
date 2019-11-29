import './board.css';
import { Board } from '../state/board';
import {CardComponent} from './card';
import { Card, suits } from '../state/card';
import React from 'react';

export const BoardComponent = ({board}: {board: Board}) => {
    const cardsMap = (c: Card) => <CardComponent card={c} />;
    return <div className="board">
        <div className="free-places">
            <div className="free-place">{board.freeplaces[0] && <CardComponent card={board.freeplaces[0]} />}</div>
            <div className="free-place">{board.freeplaces[1] && <CardComponent card={board.freeplaces[1]} />}</div>
            <div className="free-place">{board.freeplaces[2] && <CardComponent card={board.freeplaces[2]} />}</div>
            <div className="free-place">{board.freeplaces[3] && <CardComponent card={board.freeplaces[3]} />}</div>
        </div>
        <span>King</span>
        <div className="collectedCards">
            {suits.map(suit => {
                return <div className="collectedStack">
                    {board.collectedCards[suit].map(card => <CardComponent card={card} />)}
                </div>
            })}
        </div>
        <div className="columns">
            {board.columns.map(column => {
                return <div className="column">
                    {column.map(cardsMap)}
                </div>
            })}
        </div>
    </div>
}
