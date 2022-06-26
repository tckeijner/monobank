import React from 'react';
import {addNewPlayer, setCashFormVal, setNewPlayerName} from "../redux/reducers/newGameSlice";
import {nextScreen, setInitialValues} from "../redux/reducers/gameSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RootState} from "../redux/store";

export default function NewGame() {
    const dispatch = useAppDispatch();
    const {newPlayers, cashFormVal, newPlayerName} = useAppSelector((state: RootState) => state.newGame)
    let mainInput: any;

    function handleCashChange(e: any) {
        dispatch(setCashFormVal({cashFormVal: e.target.value}))
    }

    function handleNewPlayerNameChange(e: any) {
        dispatch(setNewPlayerName({newPlayerName: e.target.value}))
    }

    function handleAddNewPLayer(e: any) {
        e.preventDefault()
        dispatch(addNewPlayer({newPlayerName}))
        dispatch(setNewPlayerName({newPlayerName: ''}))
        mainInput.value = '';
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        dispatch(setInitialValues({startingCash: cashFormVal, players: newPlayers}))
        dispatch(nextScreen({screen: 'game'}));
    }

    function mapPlayersToList() {
        const list = newPlayers.map((player, index) => {
            return (
                <li key={index}>{player}</li>
            )
        })
        return (
            <ul>{list}</ul>
        )
    }

    return (
        <div>
            <div className='mt-2'>
                <h1>Set up a new game</h1>
                <div>
                    <form
                        onSubmit={handleSubmit}>
                        <label>Starting money per player</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            onChange={handleCashChange}/>
                        <p className="text-muted">
                            Leave empty to use the default value of 1500
                        </p>
                        {mapPlayersToList()}
                        <label htmlFor="title">New Player</label>
                        <input
                            type="text"
                            onChange={handleNewPlayerNameChange}
                            placeholder="Enter player name"
                            ref={(ref: any) => mainInput = ref}
                        />
                        <button
                            onClick={handleAddNewPLayer}
                            type="submit"
                        >Add player
                        </button>
                        <button
                            onClick={handleSubmit}>Start Game
                        </button>
                    </form>
                </div>

            </div>

        </div>
    )
}
