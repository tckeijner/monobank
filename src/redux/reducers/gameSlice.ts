import {createSlice, SliceCaseReducers} from "@reduxjs/toolkit";

export interface Player {
    name: string;
    cash: number
}

export interface GameState {
    startingCash: number;
    players: Player[];
    screen: string;
    numPlayers: number;
}

const initialState: GameState = {
    startingCash: 1500,
    players: [{
        name: 'BANK',
        cash: 999999,
    }],
    screen: "home",
    numPlayers: 0,
};

export const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
    name: 'game',
    initialState,
    reducers: {
        setInitialValues: (state, action) => {
            const startingCash = action.payload.startingCash ? +action.payload.startingCash : 1500;
            const players = [
                ...state.players,
                ...action.payload.players.map((player: string) => ({name: player, cash: startingCash}))
            ]
            return {
                ...state,
                players
            }
        },
        transferCash: (state, action) => {
            const payload = {...action.payload}
            const players = state.players.map(player => ({...player}))
            const amount = payload.amount;
            const from = payload.fromIndex;
            const to = payload.toIndex;
            const balance = players[from].cash;
            if (from !== -1) {
                if (balance < amount) {
                    alert("You don't have that kind of money!")
                    return {...state};
                }
                players[from].cash -= amount;
            }
            players[to].cash = players[to].cash + amount;
            return {
                ...state,
                players
            }
        },
        nextScreen: (state, action) => {
            return {
                ...state,
                screen: action.payload.screen
            }
        },
    }
})

export const { setInitialValues, transferCash, nextScreen, setTransferAmount } = gameSlice.actions;
export default gameSlice.reducer;
