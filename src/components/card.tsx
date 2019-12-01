import React, { useState } from 'react';
import './card.css';
import { Card, rankToLetter, suitToColor, suitToPic } from '../state/card';
import { observer } from 'mobx-react';

export interface CardComponentProps {
    card: Card;
    onSelect?: (card: Card) => void;
    onDoubleClick?: () => void;
}
export const CardComponent = observer(({card, onSelect, onDoubleClick}: CardComponentProps) => {
    const [zIndex, setZIndex] = useState<string>('');
    const style = zIndex ? {zIndex} : {} as any;
    const selected = card.selected ? 'card-selected' : '';
    return <div style={style} className={`card card-${suitToColor(card.suit)} ${selected}`}
            onClick={() => onSelect && onSelect(card)}
            onMouseDown={onMouseDown} onContextMenu={e => e.preventDefault()} onDoubleClick={onDoubleClick}
            >
            <div className="card-header">
                <span className="card-suit">{suitToPic(card.suit)}</span>
                <span className="card-rank">{rankToLetter(card.rank)}</span>
            </div>
            <div className="card-center">
                <span className="card-suit">{suitToPic(card.suit)}</span>
                <span className="card-rank">{rankToLetter(card.rank)}</span>
            </div>
            <div className="card-footer">
                <span className="card-suit">{suitToPic(card.suit)}</span>
                <span className="card-rank">{rankToLetter(card.rank)}</span>
            </div>
        </div>
    function onMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
            setZIndex('55');
            document.body.addEventListener('mouseup', onMouseUp)
        }
    }
    function onMouseUp(e: MouseEvent) {
        if (e.button === 2) {
            setZIndex('');
            document.body.removeEventListener('mouseup', onMouseUp);
        }
    }
})



