import React from "react";
import {Player, transferCash} from "../redux/reducers/gameSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RootState} from "../redux/store";
import MoneyLabel from "./MoneyLabel";

export default function PlayerCard(props: { player: Player, index: number }) {
    const dispatch = useAppDispatch();
    const {players} = useAppSelector((state: RootState) => state.game)
    let mainInput: any;

    function handleTransfer(fromIndex: number, toIndex: number, e: any) {
        e.preventDefault();
        dispatch(transferCash({amount: +mainInput.value, fromIndex, toIndex}))
        mainInput.value = "";
    }

    function renderPayButtons(name: string, fromIndex: number) {
        const playerNames = players.map(player => {
            return player.name;
        });
        let names = players.map(player => player.name);
        let buttonNamesArray: string[] = []
        names.forEach(element => {
            if (element !== name) {
                buttonNamesArray.push(element)
            }
        });
        const buttons = buttonNamesArray.map(buttonName => {
            const buttonKey = `${name}${buttonName}Button`
            const toIndex = playerNames.indexOf(buttonName)
            return (
                <button
                    key={buttonKey}
                    onClick={(e: any) => {
                        handleTransfer(fromIndex, toIndex, e)
                    }}>{buttonName}</button>
            );
        });
        const buttonsKey = `${name}ButtonRow`
        return (
            <div
                className='payButtonGrid'
                key={buttonsKey}>{buttons}</div>
        );
    }

    return (
        <div
            className="subCard"
            key={props.index}>
            <form>
                <div className='playerForm'><h1>{props.player.name}</h1>
                    <MoneyLabel newValue={players[props.index].cash}/>
                    <label>Pay</label>
                    <input type="number"
                           ref={(ref: any) => mainInput = ref}/>
                    <label>To</label>
                    {renderPayButtons(props.player.name, props.index)}
                </div>
            </form>
        </div>
    )
}