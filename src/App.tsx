import React from 'react';
import './App.css';
import Home from './components/Home';
import NewGame from './components/NewGame';
import Game from './components/Game';
import NavBar from './components/NavBar';
import {RootState} from "./redux/store";
import {useAppSelector} from "./hooks";

export default function App() {
    const screen = useAppSelector((state: RootState) => state.game.screen)
    switch (screen) {
        case 'home':
            return (
                <div>
                    <NavBar/>
                    <Home/>
                </div>

            );
        case "newGame":
            return (
                <div>
                    <NavBar/>
                    <NewGame/>
                </div>
            );
        case "game":
            return (
                <div>
                    <NavBar/>
                    <Game/>
                </div>
            );
        default:
            return (
                <div>
                    You did something wrong mate!
                </div>
            )
    }
};
