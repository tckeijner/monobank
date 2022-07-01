import React from 'react';
import Home from './components/Home';
import NewGame from './components/NewGame';
import Game from './components/Game';
import {RootState} from "./redux/store";
import {useAppSelector} from "./redux/store/hooks";
import './styles/styles.scss'

export default function App() {
    const screen = useAppSelector((state: RootState) => state.game.screen)
    switch (screen) {
        case 'home':
            return (
                <div className='appContainer'>
                    <Home/>
                </div>

            );
        case "newGame":
            return (
                <div className='appContainer'>
                    <NewGame/>
                </div>
            );
        case "game":
            return (
                <div className='appContainer'>
                    <Game/>
                </div>
            );
        default:
            return (
                <div className='appContainer'>
                    You did something wrong mate!
                </div>
            )
    }
};
