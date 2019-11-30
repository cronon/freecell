import {Card, createCard} from './card';
import {observable, computed} from 'mobx';

export class Board {
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

    @observable
    collectedCards: {[i: string]: Card[]} = {spades: [], diamonds: [], clubs: [], hearts: []}

    @observable
    setNumber: number;
    @observable
    allCards: Card[] = [];
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
        this.allCards.forEach(c => c.selected = false);
        card.selected = true;
    }
    freePlaceClick(i: number) {
        console.log(i, this.selectedCard, this.freeplaces[i])
        if (this.selectedCard && this.freeplaces[i] === null) {
            this.selectedCard.position = {
                stack: 'freeplace',
                x: i, y: 0
            }
            this.selectedCard.selected = false;
        }
    }
}
