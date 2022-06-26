import React from 'react';
import { nextScreen } from '../redux/reducers/gameSlice';
import {useAppDispatch} from "../hooks";

export default function Home() {
    const dispatch = useAppDispatch();
    function handleClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        dispatch(nextScreen({screen: 'newGame'}))
    }

    return (
        <div>
            <div>
                <div>Home</div>
                <div>
                    <p>
                        Do you love playing Monopoly, but are you tired of all the fumbling around with the paper money? With this app: no more cheating! No more counting. Just set up a game and your banker can control who pays whom!
                    </p>
                    <button
                        onClick={handleClick}>
                        New Game
                    </button>
                </div>
            </div>
        </div>
    )
}
