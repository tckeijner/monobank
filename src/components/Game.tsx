import React from 'react';
import {useAppSelector} from "../hooks";
import {RootState} from "../redux/store";
import PlayerCard from "./PlayerCard";

export default function Game() {
    const { players } = useAppSelector((state: RootState) => state.game)

    function renderPlayers() {
        return players.map((player, index) => PlayerCard({player, index}))
    }

    return (
        <div className="container">
            {renderPlayers()}
        </div>
    );

}

// const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);
//
// export default Game;