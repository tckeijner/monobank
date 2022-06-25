import {Button, ButtonGroup, Card, Form} from "react-bootstrap";
import React from "react";
import {Player, transferCash} from "../redux/reducers/gameSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RootState} from "../redux/store";

export default function PlayerCard(props: {player: Player, index: number}) {
    const dispatch = useAppDispatch();
    const {players} = useAppSelector((state: RootState) => state.game)
    let mainInput: any;

    function handleTransfer(fromIndex: number, toIndex: number, e: any) {
        e.preventDefault();
        dispatch(transferCash({ amount: +mainInput.value, fromIndex, toIndex}))
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
                <Button
                    variant="outline-primary"
                    key={buttonKey}
                    onClick={ (e: any) => {handleTransfer(fromIndex, toIndex, e)}} >{buttonName}</Button>
            );
        });
        const buttonsKey = `${name}ButtonRow`
        return (
            <ButtonGroup
                className="mb-3"
                key={buttonsKey}>{buttons}</ButtonGroup>
        );
    }

    return (
        <div
            className="col-sm m-2"
            key={props.index}>
            <Card>
                <Card.Header>{props.player.name}</Card.Header>
                <Card.Body>

                    <Card.Text>Money: {players[props.index
                        ].cash}</Card.Text>
                    <Form>
                        <Form.Label>Pay</Form.Label>
                        <Form.Control
                            type="number"
                            ref={(ref: any) => mainInput= ref}
                        />
                        {renderPayButtons(props.player.name, props.index)}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}