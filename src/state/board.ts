import {Card, createCard} from './card';
import {observable} from 'mobx';

export class Board {
    @observable
    freeplaces: Card[] = [];

    @observable
    collectedCards: {[i: string]: Card[]} = {spades: [], diamonds: [], clubs: [], hearts: []}

    @observable
    columns = Array(8).fill([]);
    @observable
    setNumber: number;
    constructor() {
        this.setNumber = Math.floor(Math.random() * 32000);

        const cards = ['spades', 'hearts', 'clubs', 'diamonds'].reduce((cards, suit) => {
            const cardsOfSuite = Array(13).fill({}).map((_, i) => createCard({
                suit,
                rank: i+1
            }))
            return cards.concat(...cardsOfSuite);
        }, [] as Card[]);
        cards.forEach((card, i) => {
            this.columns[i % 8].push(card);
        })
    }
}
