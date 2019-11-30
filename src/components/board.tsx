import './board.scss';
import { Board } from '../state/board';
import {CardComponent} from './card';
import { Card, suits } from '../state/card';
import React from 'react';
import { game } from '../state';
import {observer} from'mobx-react';

export const BoardComponent = observer(({board}: {board: Board}) => {
    const cardsMap = (c: Card, i: number) => (
        <CardComponent onSelect={onCardSelect} key={c.id} card={c} />
    )

    return <div className="board">
        <div className="free-places">
            <div className="free-place">{board.freeplaces[0] && <CardComponent onSelect={onCardSelect} card={board.freeplaces[0]} />}</div>
            <div className="free-place">{board.freeplaces[1] && <CardComponent onSelect={onCardSelect} card={board.freeplaces[1]} />}</div>
            <div className="free-place">{board.freeplaces[2] && <CardComponent onSelect={onCardSelect} card={board.freeplaces[2]} />}</div>
            <div className="free-place">{board.freeplaces[3] && <CardComponent onSelect={onCardSelect} card={board.freeplaces[3]} />}</div>
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
    function onCardSelect(card: Card){
        game.board.selectCard(card);
    }
})
