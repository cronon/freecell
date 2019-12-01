import React, { useRef } from 'react';
import {game} from '../state';
import './menu.css';
import { observer } from 'mobx-react-lite';

export const Menu = observer(() => {
    const input = useRef<HTMLInputElement>(null);
    return <>
    <header className="header">
        <form className="left" onSubmit={onNewGame}>
            <button type="submit">New game</button>
            <label className="seed-label">
                Seed #
                <input ref={input} className="seed-input" type="number" max="32000" min="-1" />
            </label>
        </form>

        <div className="right">
            <button onClick={() => game.board.rollback()}>Undo</button>
        </div>
    </header>
    <div className="center">
        <h1 className="heading">Freecell - Game #{game.seed}</h1>
    </div>
    </>

    function onNewGame(e: React.FormEvent) {
        e.preventDefault();
        const value = input && input.current ? input.current.value : '0';
        game.newGame(Number(value))
    }
})

