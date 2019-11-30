import {Card, createCard} from './card';
import {observable, computed} from 'mobx';

export class Board {
    @observable
    freeplaces: (Card | null)[] = [null, null, null, null];

    @observable
    collectedCards: {[i: string]: Card[]} = {spades: [], diamonds: [], clubs: [], hearts: []}

    @observable
    columns = Array(8).fill([]);
    @observable
    setNumber: number;
    @observable
    allCards: Card[];

    constructor() {
        this.setNumber = Math.floor(Math.random() * 32000);

        this.allCards = ['spades', 'hearts', 'clubs', 'diamonds'].reduce((cards, suit) => {
            const cardsOfSuite = Array(13).fill({}).map((_, i) =>
                observable(createCard({
                    suit,
                    rank: i+1
                }))
            )
            return cards.concat(...cardsOfSuite);
        }, [] as Card[]);
        this.allCards.forEach((card, i) => {
            this.columns[i % 8].push(card);
        })
    }

    selectCard(card: Card) {
        this.allCards.forEach(c => c.selected = false);
        card.selected = true;
    }
}
