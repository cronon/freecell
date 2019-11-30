import './board.scss';
import {CardComponent} from './card';
import { Card, suits } from '../state/card';
import React from 'react';
import { game } from '../state';
import {observer} from'mobx-react';

export const BoardComponent = observer(() => {
    const cardsMap = (c: Card, i: number) => (
        <CardComponent onSelect={board.selectCard} key={c.id} card={c} />
    )
    const board = game.board;
    return <div className="board">
        <div className="free-places">
            <FreePlace key={0} i={0} />
            <FreePlace key={1} i={1} />
            <FreePlace key={2} i={2} />
            <FreePlace key={3} i={3} />
        </div>
        <span>King</span>
        <div className="collectedCards">
            {suits.map(suit => (
                <div key={suit} className="collectedStack">
                    {board.collectedCards[suit].map(cardsMap)}
                </div>
            ))}
        </div>
        <div className="columns">
            {board.columns.map((column, i) => {
                return <div key={i} className="column">
                        {column.map(cardsMap)}
                    </div>
            })}
        </div>
    </div>
})
const FreePlace = ({i}: {i: number}) => {
    const board = game.board;
    const place = board.freeplaces[i];
    if (place != null) {
        return <div className="free-place">
            <CardComponent onSelect={board.selectCard} card={place} />
        </div>
    } else {
        return <div className="free-place" onClick={() => board.freePlaceClick(i)}>
        </div>
    }
}
