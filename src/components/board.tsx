import './board.scss';
import {CardComponent} from './card';
import { Card, suits } from '../state/card';
import React from 'react';
import { game } from '../state';
import {observer} from'mobx-react';

const cardsMap = (c: Card, i: number) => (
    <CardComponent onSelect={game.board.selectCard} key={c.id} card={c} />
)

export const BoardComponent = observer(() => {
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
                    {board.foundation[suit].map(cardsMap)}
                </div>
            ))}
        </div>
        <div className="columns">
            {board.columns.map((c, i) => <Column column={c} key={i}/>)}
        </div>
    </div>
});

const Column = observer(({column}: {column: Card[]}) => {
    const cardsUnder = column.slice(0, -1);
    const lastCard = column[column.length-1];
    const selectedCard = game.board.selectedCard;
    const canPlace = selectedCard && selectedCard.rank + 1 === lastCard.rank;
    const canPlaceCls = canPlace ? 'can-place' : '';
    return <div className={`column ${canPlaceCls}`}>
        {cardsUnder.map(c => <CardComponent key={c.id} card={c} />)}
        <CardComponent key={lastCard.id} card={lastCard} onSelect={onSelect} />
    </div>

    function onSelect(card: Card) {
        if (canPlace) {
            game.board.selectedCard!.position = {
                stack: 'columns',
                x: card.position.x,
                y: card.position.y + 1
            }
            game.board.selectedCard!.selected = false;
        } else {
            game.board.selectCard(card);
        }
    }
})
const FreePlace = observer(({i}: {i: number}) => {
    const board = game.board;
    const place = board.freeplaces[i];
    if (place != null) {
        return <div className="free-place">
            <CardComponent onSelect={board.selectCard} card={place} />
        </div>
    } else {
        const canPlace = !!game.board.selectedCard ? 'can-place' : '';
        return <div className={`free-place ${canPlace}`} onClick={() => board.freePlaceClick(i)}>
        </div>
    }
})
