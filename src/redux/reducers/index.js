import { SET_INITIAL_VALUES, TRANSFER_CASH, NEXT_SCREEN } from "../constants";

const initialState = {
    startingCash: 1500,
    players: [],
    screen: "newGame"
};

function rootReducer(state = initialState, action) {

    if (action.type === SET_INITIAL_VALUES) {
        const playersArray = [];
        const actionPlayersArray = action.payload.players;
        let startingCash = action.payload.startingCash;
        if (startingCash = undefined) startingCash = 1500
        actionPlayersArray.forEach(player => {
            const playerObject = {name: player, cash: startingCash};
            playersArray.push(playerObject)
        });
        return Object.assign({}, state, {
            startingCash: action.payload.startingCash,
            players: playersArray,
            numPlayers: action.payload.players.length
        });

    } else if (action.type === TRANSFER_CASH) {
        const amount = action.payload.amount;
        const from = action.payload.fromIndex;
        const to = action.payload.toIndex;
        const playersArray = state.players;
        if (from !== -1) {
            if (amount > playersArray[from].cash) {
                alert("You don't have that kind of money!")
                return state;
            };
            playersArray[from].cash -= amount;
        };
        const newToCash = parseFloat(playersArray[to].cash) + parseFloat(amount);
        playersArray[to].cash = newToCash
        return Object.assign({}, state, {
            players: playersArray
        });

    } else if (action.type === NEXT_SCREEN) {
        console.log(action.payload)
        return Object.assign({}, state, {
            screen: action.payload
        });
    };

    return state;
};

export default rootReducer;