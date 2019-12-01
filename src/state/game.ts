import {observable} from 'mobx';
import {Board} from './board';

export class Game {
    @observable
    board: Board = null as any; // no ts, it is assinged in ctor
    @observable
    score: number = 0;
    @observable
    seed = 1;
    constructor(){
        this.newGame(0);
    }
    newGame(seed: number) {
        if (seed === 0 || seed < -1 || seed > 32000) {
            this.seed = Math.random()*32000 |0;
        } else {
            this.seed = seed;
        }
        this.board = new Board(this.seed);
    }
}

export const game = new Game();
(window as any).GAME = game;
