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
    const board = game.board;
    const column = board.columns[index];
    const cardsUnder = column.slice(0, -1);
    const lastCard = last(column) || null;
    const canPlace = board.canPlaceColumns[index];
    const canPlaceCls = canPlace ? 'can-place' : '';
    return <div className={`column ${canPlaceCls}`} onClick={onClick}>
        {cardsUnder.map(c => <CardComponent key={c.id} card={c} />)}
        {lastCard && <CardComponent key={lastCard.id} card={lastCard}
            onSelect={() => !canPlace && game.board.selectCard(lastCard)}
            onDoubleClick={() => board.tryToMove(lastCard)}/>}
    </div>

    function onClick() {
        if (canPlace) {
            board.moveToColumn(index);
        }
    }
});
const Foundation = observer(({suit}: {suit: Suit}) => {
    const board = game.board;
    const cards = board.foundation[suit];
    const lastCard = last(cards);
    return <div className="collectedStack" onClick={() => board.moveToFoundation(suit)}>
        {lastCard && <CardComponent card={lastCard} onSelect={game.board.selectCard}
            onDoubleClick={() => board.tryToMove(lastCard)}/> }
    </div>
})
const FreePlace = observer(({i}: {i: number}) => {
    const board = game.board;
    const card = board.freeplaces[i];
    if (card != null) {
        return <div className="free-place">
            <CardComponent onDoubleClick={() => board.tryToMove(card)} onSelect={board.selectCard} card={card} />
        </div>
    } else {
        const canPlace = !!game.board.selectedCard ? 'can-place' : '';
        return <div className={`free-place ${canPlace}`} onClick={() => board.moveToFreePlace(i)}>
        </div>
    }
});
