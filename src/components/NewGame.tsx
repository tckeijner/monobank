import React from 'react';
import {Container, Form, Button, ListGroup, Card} from 'react-bootstrap';
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
                <ListGroup.Item key={index}>{player}</ListGroup.Item>
            )
        })
        return (
            <ListGroup>{list}</ListGroup>
        )
    }

    return (
        <Container>
            <Card className='mt-2'>
                <Card.Header>Set up a new game</Card.Header>
                <Card.Body>
                    <Form
                        onSubmit={handleSubmit}>
                        <Form.Group className="form-group">
                            <Form.Label>Starting money per player</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                onChange={handleCashChange}/>
                            <Form.Text className="text-muted">
                                Leave empty to use the default value of 1500
                            </Form.Text>
                        </Form.Group>
                        {mapPlayersToList()}
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="title">New Player</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleNewPlayerNameChange}
                                placeholder="Enter player name"
                                ref={(ref: any) => mainInput=ref}
                            />
                            <Button
                                onClick={handleAddNewPLayer}
                                variant="primary"
                                type="submit"
                            >Add player</Button>
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={handleSubmit} >Start Game</Button>
                    </Form>
                </Card.Body>

            </Card>

        </Container>
    )
}
