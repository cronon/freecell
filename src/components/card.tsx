import React from 'react';
import './card.css';
import { Card, Rank, Suit } from '../state/card';

export const CardComponent = ({card}: {card: Card}) => {
    return <div className={`card card-${suitToColor(card.suit)}`}>
        <div className="card-header">
            <span className={`card-suit`}>{suitToPic(card.suit)}</span>
            <span className="card-rank">{rankToLetter(card.rank)}</span>
        </div>
        <div className="card-center">
            <span className={`card-suit`}>{suitToPic(card.suit)}</span>
            <span className="card-rank">{rankToLetter(card.rank)}</span>
        </div>
    </div>
}
function rankToLetter(number: Rank): string {
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
function suitToPic(suit: Suit): string {
    switch(suit) {
        case 'clubs': return '♣';
        case 'diamonds': return '♦';
        case 'hearts': return '♥';
        case 'spades': return '♠';
        default: throw new Error('Unrecognized suit')
    }
}
function suitToColor(suit: Suit): string {
    switch(suit) {
        case 'diamonds':
        case 'hearts': return 'red';
        case 'spades':
        case 'clubs': return 'black';
        default: throw new Error('Unrecognized suit')
    }
}
