import React from 'react';
import './card.css';
import { Card, Rank } from '../state/card';

export const CardComponent = ({card}: {card: Card}) => {
    return <div className="card">
        <div className="card-header">
            <span className={`card-suit`}>{card.suit}</span>
            <span className="card-rank">{rankToLetter(card.rank)}</span>
        </div>
        <div className="card-center">
            <span className={`card-suit`}>{card.suit}</span>
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
            '1','2','3','4','5','5','6','7','8','9','10',
            'J', 'Q', 'K'
        ][number + 1]
    }
}
