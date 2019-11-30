import {Card, createCard, suits} from './card';
import {observable, computed} from 'mobx';

export class Board {
    @observable
    setNumber: number;
    @observable
    allCards: Card[] = [];

    @computed
    get freeplaces() {
        const cards = this.allCards.filter(c => c.position.stack === 'freeplace')
        return [
           cards.find(c => c.position.x === 0) || null,
           cards.find(c => c.position.x === 1) || null,
           cards.find(c => c.position.x === 2) || null,
           cards.find(c => c.position.x === 3) || null,
        ]
    }

    @computed
    get columns() {
        return Array(8).fill([]).map((_, x) => {
            return this.allCards.filter(c => {
                return c.position.stack === 'columns' && c.position.x === x
            })
        })
    }

    @computed
    get foundation(): {[i: string]: Card[]} {
        return suits.reduce((cards: any, suit) => {
            cards[suit] = this.allCards.filter(c => {
                return c.position.stack === 'foundation' && c.suit === suit;
            }) as Card[];
            return cards;
        }, {})
    }

    @computed
    get selectedCard() {
        return this.allCards.find(c => c.selected) || null;
    }
    constructor() {
        this.setNumber = Math.floor(Math.random() * 32000);

        ['spades', 'hearts', 'clubs', 'diamonds'].forEach((suit) => {
            Array(13).fill({}).forEach((_, rank) => {
                const card = observable(createCard({
                    suit,
                    rank: rank+1,
                    position: observable({
                        stack: 'columns',
                        x: this.allCards.length % 8,
                        y: this.allCards.length / 8 |0
                    })
                }));
                this.allCards.push(card);
            });
        });
        this.selectCard = this.selectCard.bind(this);
        this.freePlaceClick = this.freePlaceClick.bind(this);
    }

    selectCard(card: Card) {
        if (this.selectedCard === card) {
            card.selected = false;
        } else if (this.selectedCard != null) {
            this.selectedCard.selected = false;
            card.selected = true;
        } else {
            card.selected = true;
        }

    }
    freePlaceClick(i: number) {
        if (this.selectedCard && this.freeplaces[i] === null) {
            this.selectedCard.position = {
                stack: 'freeplace',
                x: i, y: 0
            }
            this.selectedCard.selected = false;
        }
    }
}
