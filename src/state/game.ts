import {observable} from 'mobx';
import {Board} from './board';

export class Game {
    @observable
    board: Board;
    @observable
    score: number = 0;
    seed = 1;
    constructor(){
        this.seed = -1 //17868 //Math.random()*32000 |0;
        this.board = new Board(this.seed);
    }
}

export const game = new Game;
(window as any).GAME = game;
