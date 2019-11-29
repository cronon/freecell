import {observable} from 'mobx';
import {Board} from './board';

export class Game {
    @observable
    board: Board;
    @observable
    score: number = 0;


    constructor(){
        this.board = new Board;

    }
}

export const game = new Game;
