import {Suit, Card, suitToColor, lt} from './card';
import { last } from 'lodash';
export type Foundation = {
    [s in Suit]: Card[];
};
export function canPlaceFoundation(card: Card, foundation: Foundation): boolean {
    const suit = card.suit;
    const lastCard = last(foundation[suit]);
    return lastCard
        ? lastCard.rank + 1 === card.rank
        : card.rank === 1;
}
export function canAutoMoveFoundation(card: Card, foundation: Foundation): boolean {
    if (card.rank === 1) {
        return foundation[card.suit].length === 0;
    } else {
        const canPlace = canPlaceFoundation(card, foundation);
        const flat = [...foundation.clubs, ...foundation.diamonds, ...foundation.hearts, ...foundation.spades];
        return canPlace && flat.filter(cardInFoundation => {
            return lt(cardInFoundation, card)
        }).length === 2;
        // A black 2 can be auto moved when two red aces are there
        // that is there is no other card that can be placed on the black 2
    }
}
