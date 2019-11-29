export type Suit = 'spades' | 'hearts' | 'crosses' | 'diamonds' | 'blank';
export const suits = ['spades', 'hearts', 'crosses', 'diamonds'];
export type Rank = 0|1|2|3|4|5|6|7|8|9|10|11|12|13;
export interface Card {
    suit: Suit;
    rank: Rank;
    id: string;
}
export function createCard({suit, rank}: {suit: string, rank: number}): Card {
    if (rank < 0 || 13 < rank) {
        throw new Error('Wrong rank ' + rank)
    }
    if (!suit.includes(suit)) {
        throw new Error('Wrong suit ' + suit)
    }
    return {suit, rank,
        get id() {
            return suit+rank;
        }
    } as any;
}
export const blankCard: Card = {
    suit: 'blank',
    rank: 0,
    id: 'blank0'
}

