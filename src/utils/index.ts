import {Card} from '../state';

export function stateToStr(cards: Card[]): string {
    const ids = cards.filter(c => c.position.stack !== 'columns')
        .sort((c1, c2) => {
            if (c1.position.stack === 'freeplace') return -1
            else return 1
        })
        .map(c => c.id);
    return ids.join();
}
export function logStateShort(cards: Card[]) {
    const ids = stateToStr(cards);
    console.log(ids)
}

export * from './msrand';
