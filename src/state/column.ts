import {Card, lt, createCard} from './card';
import {MSRand} from '../utils';
import {last, zip, flatten} from 'lodash';

export function arrangedStack(column: Card[]): Card[] {
    if (column.length === 0) {
        return [];
    } else {
        const result: Card[] = [last(column)] as any;
        for(let i = column.length-2; i>=0; i--) {
            const current = column[i];
            if (lt(result[0], current)) {
                result.unshift(current);
            } else {
                break;
            }
        }
        return result;
    }
}
export function movableStack(column: Card[], overCard: Card | null): Card[] {
    const bigStack = arrangedStack(column);
    if (overCard === null) {
        return bigStack;
    } else {
        const biggestMovableIndex = bigStack.findIndex(c => lt(c, overCard));
        if (biggestMovableIndex === -1) return [];
        return bigStack.slice(biggestMovableIndex);
    }

}

// https://rosettacode.org/wiki/Deal_cards_for_FreeCell
export function generateDeck(seed: number): Card[] {
    const fourColumns = ['clubs', 'diamonds', 'hearts', 'spades'].map((suit) => {
        return Array(13).fill({}).map((_, i) => createCard({
                suit,
                rank: i+1,
                position: {
                    stack: 'columns',
                    x: 0, y: 0
                }
            }))
    });
    const thirteenRows: Card[][] = zip(...fourColumns) as any;
    const array = flatten(thirteenRows);
    const cards: Card[] = [];

    const rnd = new MSRand(seed);
    let i: number;
    let l: number;
    while(array.length) {
        if (seed !== -1) {
            i = rnd.rand() % array.length;
            l = array.length-1;
            [array[i], array[l]] = [array[l], array[i]];
        }
        const newCard = array.pop() as Card;
        newCard.position.x = cards.length % 8;
        newCard.position.y = cards.length / 8 |0;
        cards.push(newCard)
    }
    return cards;
}
