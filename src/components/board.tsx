import './board.scss';
import {CardComponent} from './card';
import { Card, suits, Suit } from '../state/card';
import React from 'react';
import { game, movableStack } from '../state';
import {observer} from'mobx-react';
import { last } from 'lodash';

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
        <div className="collectedCards">
            {suits.map(suit => (
                <Foundation suit={suit} key={suit} />
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
    const lastCard = last(column) || null;
    const selectedCard = game.board.selectedCard;
    const canPlace = game.board.canPlaceColumns[index];
    const canPlaceCls = canPlace ? 'can-place' : '';
    return <div className={`column ${canPlaceCls}`} onClick={onClick}>
        {cardsUnder.map(c => <CardComponent key={c.id} card={c} />)}
        {!!lastCard && <CardComponent key={lastCard.id} card={lastCard} />}
    </div>

    function onClick() {
        if (canPlace) {
            const selectedCard = game.board.selectedCard!;
            const selectedColumn = game.board.selectedColumn;
            let toMove = [] as Card[];
            if (selectedColumn) {
                toMove = movableStack(selectedColumn, lastCard);
            } else {
                toMove = [selectedCard];
            }
            toMove.forEach((movingCard, i) => {
                movingCard.position = {
                    stack: 'columns',
                    x: index,
                    y: lastCard ? lastCard.position.y + 1 + i : i
                }
            })
            selectedCard.selected = false;
        } else if (lastCard) {
            game.board.selectCard(lastCard);
        }
    }
});
const Foundation = observer(({suit}: {suit: Suit}) => {
    const board = game.board;
    const cards = board.foundation[suit];
    const lastCard = last(cards);
    return <div className="collectedStack" onClick={() => board.moveToFoundation(suit)}>
        {lastCard && <CardComponent card={lastCard} onSelect={game.board.selectCard} /> }
    </div>
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
});
