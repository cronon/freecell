import React from 'react';
import './App.css';
import {GameComponent, Menu} from './components';
import {game} from './state';

const App: React.FC = () => {
    return (
        <div className="App">
            <Menu />
            <GameComponent game={game} />
        </div>
    );
}

export default App;
