export type Suit = 'spades' | 'hearts' | 'clubs' | 'diamonds';
export const suits = ['spades', 'hearts', 'clubs', 'diamonds'] as Suit[];
export type Rank = 0|1|2|3|4|5|6|7|8|9|10|11|12|13;

export type Stack = 'freeplace' | 'columns' | 'foundation';
export interface Position {
    stack: Stack;
    x: number;
    y: number;
}
export interface Card {
    suit: Suit;
    rank: Rank;
    id: string;
    selected: boolean;
    position: Position;
}

export function createCard({suit, rank, position}: {suit: string, rank: number, position: Position}): Card{
    if (rank < 0 || 13 < rank) {
        throw new Error('Wrong rank ' + rank)
    }
    if (!suit.includes(suit)) {
        throw new Error('Wrong suit ' + suit)
    }
    return {
        suit, rank,
        id: rankToLetter(rank) + suit[0].toUpperCase(),
        selected: false,
        position
    } as any;
}

export function lt(card1: Card, card2: Card): boolean {
    return !sameColor(card1, card2) && card1.rank + 1 === card2.rank
}
export function sameColor(card1: Card, card2: Card) {
    return suitToColor(card1.suit) === suitToColor(card2.suit);
}
export function suitToColor(suit: Suit): string {
    switch(suit) {
        case 'diamonds':
        case 'hearts': return 'red';
        case 'spades':
        case 'clubs': return 'black';
        default: throw new Error('Unrecognized suit')
    }
}

export function suitToPic(suit: Suit): string {
    switch(suit) {
        case 'clubs': return '♣';
        case 'diamonds': return '♦';
        case 'hearts': return '♥';
        case 'spades': return '♠';
        default: throw new Error('Unrecognized suit')
    }
}

export function rankToLetter(number: number): string {
    if (number < 0) {
        throw new Error('No rank less 0')
    } else if (number === 0) {
        return '';
    } else if (number > 13) {
        throw new Error('No rank gt 13');
    } else {
        return [
            'A',
            '2','3','4','5','6','7','8','9','10',
            'J', 'Q', 'K'
        ][number - 1]
    }
}
