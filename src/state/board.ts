import {Card, blankCard, Suit, createCard} from './card';
import {observable} from 'mobx';

export class Board {
    @observable
    freeplaces: Card[] = [blankCard, blankCard, blankCard, blankCard];

    @observable
    collectedCards: Card[] = [blankCard, blankCard, blankCard, blankCard];

    @observable
    columns = Array(8).fill([]);
    @observable
    setNumber: number;
    constructor() {
        this.setNumber = Math.floor(Math.random() * 32000);

        const cards = ['spades', 'hearts', 'crosses', 'diamonds'].reduce((cards, suit) => {
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
