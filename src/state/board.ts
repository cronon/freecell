import {observable, computed, intercept} from 'mobx';
import {Card, createCard, suits, lt, Suit} from './card';
import {Foundation, canPlaceFoundation, canAutoMoveFoundation} from './foundation';
import {movableStack, generateDeck} from './column';
import {stateToStr} from '../utils';
import { last } from 'lodash';

export class Board {
    turns: Card[][] = [];

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
            }).sort((c1,c2) => c1.position.y - c2.position.y)
        })
    }

    @computed
    get foundation(): Foundation {
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

    @computed
    get selectedColumn() {
        return this.selectedCard &&
            this.selectedCard.position.stack === 'columns' &&
            this.columns[this.selectedCard.position.x]
            || null;
    }
    @computed
    get canPlaceColumns() {
        const selectedCard = this.selectedCard;
        const r = this.columns.map((col, i) => {
            if (selectedCard == null) return false;
            if (col.length === 0) return true; // TODO add calculation of free spaces

            const lastCard = col[col.length-1];
            if (selectedCard.position.stack === 'freeplace' || selectedCard.position.stack === 'foundation') {
                return lt(selectedCard, lastCard);
            } else {
                const selectedColumn = this.selectedColumn!;
                const stack = movableStack(selectedColumn, lastCard);
                return !!stack.length;
            }
        });
        return r;
    }
    @computed
    get canPlaceFoundation(): {[i in Suit]: boolean} {
        const selectedCard = this.selectedCard;
        return suits.reduce((suits, suit) => {
            suits[suit] = false;
            if (selectedCard) {
                suits[suit] = canPlaceFoundation(selectedCard, this.foundation) && selectedCard.suit === suit
            }
            return suits;
        }, {} as any)
    }

    constructor(private seed: number) {
        const planCards = generateDeck(this.seed);
        this.allCards = planCards.map(c => {
            // intercept(card, function(change){ console.log(change); return change })
            return observable(c)
        });
        this.commitState();
        this.finishMove();
        this.selectCard = this.selectCard.bind(this);
        this.moveToFreePlace = this.moveToFreePlace.bind(this);
    }
    finishMove(){
        const autoMoveCards = this.columns.map(col => last(col))
            .concat(...this.freeplaces as any)
            .filter(c => !!c)
            .filter((c: any) => canAutoMoveFoundation(c, this.foundation)) as Card[];
        if (autoMoveCards.length) {
            setTimeout(() => {
                this.commitState();
                autoMoveCards.forEach(c => this._moveToFoundation(c));
                this.finishMove();
            }, 300)
        }
    }
    commitState(){
        this.turns.push(this.allCards.map((card: any) => ({
            ...card,
            position: {...card.position}
        })));
        console.log('committed', this.turns.length, stateToStr(this.allCards))
    }
    rollback(){
        if (this.turns.length) {
            const lastTurn = this.turns.pop();
            this.allCards = lastTurn as any;
            console.log('rolledback', this.turns.length+1, stateToStr(this.allCards))
        }
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
    moveToFreePlace(i: number) {
        if (this.selectedCard && this.freeplaces[i] === null) {
            this.commitState();
            this.selectedCard.position = {
                stack: 'freeplace',
                x: i, y: 0
            }
            this.selectedCard.selected = false;
            this.finishMove();
        }
    }
    tryToMove(card: Card) {
        this.selectedCard && (this.selectedCard.selected = false);
        card.selected = true;

        const suitableColumn = this.canPlaceColumns.findIndex(c => !!c);
        const freeIndex = this.freeplaces.findIndex(f => f === null);
        if (suitableColumn !== -1) {
            this.moveToColumn(suitableColumn);
        } else if (freeIndex !== -1 && card.position.stack !== 'freeplace') {
            this.moveToFreePlace(freeIndex);
        } else if (this.canPlaceFoundation[card.suit]) {
            this.moveToFoundation(card.suit);
        }
    }
    moveToColumn(index: number) {
        const {selectedCard, selectedColumn} = this;
        if (!selectedCard) return;

        let toMove = [] as Card[];
        const lastCard = last(this.columns[index]) || null;
        if (selectedColumn) {
            toMove = movableStack(selectedColumn, lastCard);
        } else {
            toMove = [selectedCard];
        }
        this.commitState();
        toMove.forEach((movingCard, i) => {
            movingCard.position = {
                stack: 'columns',
                x: index,
                y: lastCard ? lastCard.position.y + 1 + i : i
            }
        })
        selectedCard.selected = false;
        this.finishMove();
    }
    _moveToFoundation(card: Card) {
        if (canPlaceFoundation(card, this.foundation)) {
            card.position = {
                stack: 'foundation',
                y: 0,
                x: 0
            }
        }
    }
    moveToFoundation(suit: Suit) {
        const selectedCard = this.selectedCard;
        if (selectedCard && selectedCard.suit === suit && selectedCard.position.stack !== 'foundation') {
            this.commitState();
            this._moveToFoundation(selectedCard);
            selectedCard.selected = false;
            this.finishMove();
        }
    }
}
