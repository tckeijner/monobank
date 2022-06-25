// import { createStore } from 'redux';
import gameReducer from '../reducers/gameSlice';
import newGameReducer from '../reducers/newGameSlice';
import {configureStore} from "@reduxjs/toolkit";


// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = configureStore({
    reducer: {
        game: gameReducer,
        newGame: newGameReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;