// https://rosettacode.org/wiki/Deal_cards_for_FreeCell#JavaScript
export class MSRand {
    private state: number;
    constructor(private seed: number) {
        this.state = seed;
    }
    rand(): number {
        this.state = (this.state * 214013 + 2531011) & 0x7FFFFFFF
        return (this.state >> 16) & 0x7fff;
    }
}
