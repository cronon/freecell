import './board.scss';
import {CardComponent} from './card';
import { Card, suits } from '../state/card';
import React from 'react';
import { game, movableStack } from '../state';
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
            {board.columns.map((c, i) => <Column index={i} key={i}/>)}
        </div>
    </div>
});

const Column = observer(({index}: {index: number}) => {
    const column = game.board.columns[index];
    const cardsUnder = column.slice(0, -1);
    const lastCard = column[column.length-1];
    const selectedCard = game.board.selectedCard;
    const canPlace = game.board.canPlaceColumns[index];
    const canPlaceCls = canPlace ? 'can-place' : '';
    return <div className={`column ${canPlaceCls}`}>
        {cardsUnder.map(c => <CardComponent key={c.id} card={c} />)}
        <CardComponent key={lastCard.id} card={lastCard} onSelect={onSelect} />
    </div>

    function onSelect(card: Card) {
        if (canPlace) {
            const selectedCard = game.board.selectedCard!;
            const stack = movableStack(game.board.selectedColumn, lastCard);
            stack.forEach((movingCard, i) => {
                movingCard.position = {
                    stack: 'columns',
                    x: index,
                    y: lastCard.position.y + 1 + i
                }
            })
            selectedCard.selected = false;
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
