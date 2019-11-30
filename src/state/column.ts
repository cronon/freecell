import {Card, lt} from './card';
import {last} from 'lodash';

export function arrangedStack(column: Card[]): Card[] {
    if (column.length === 0) {
        return [];
    } else {
        const result: Card[] = [last(column)] as any;
        for(let i = column.length-2; i>=0; i--) {
            const current = column[i];
            if (lt(result[0], current)) {
                result.unshift(current);
            } else {
                break;
            }
        }
        return result;
    }
}
export function movableStack(column: Card[], overCard: Card | null): Card[] {
    const bigStack = arrangedStack(column);
    if (overCard === null) {
        return bigStack;
    } else {
        const biggestMovableIndex = bigStack.findIndex(c => lt(c, overCard));
        if (biggestMovableIndex == -1) return [];
        return bigStack.slice(biggestMovableIndex);
    }

}
