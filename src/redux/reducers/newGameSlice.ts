import {createSlice, SliceCaseReducers} from "@reduxjs/toolkit";

export interface NewGameState {
    cashFormVal: number;
    newPlayerName: "";
    newPlayers: string[]
}

const initialState: NewGameState = {
    cashFormVal: 1500,
    newPlayerName: '',
    newPlayers: []
}

export const newGameSlice = createSlice<NewGameState, SliceCaseReducers<NewGameState>>({
    name: 'newGame',
    initialState,
    reducers: {
        setCashFormVal: (state, action) => {
            return {
                ...state,
                cashFormVal: action.payload.cashFormVal
            }
        },
        setNewPlayerName: (state, action) => {
            return {
                ...state,
                newPlayerName: action.payload.newPlayerName
            }
        },
        addNewPlayer: (state, action) => {
            return {
                ...state,
                newPlayers: [...state.newPlayers, action.payload.newPlayerName]
            }
        },
    }
})

export const { setCashFormVal, setNewPlayerName, addNewPlayer } = newGameSlice.actions
export default newGameSlice.reducer;