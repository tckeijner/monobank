import React from 'react';
import {Container, Card, Button} from 'react-bootstrap';
import { nextScreen } from '../redux/reducers/gameSlice';
import {useAppDispatch} from "../hooks";

export default function Home() {
    const dispatch = useAppDispatch();
    function handleClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        dispatch(nextScreen({screen: 'newGame'}))
    }

    return (
        <Container>
            <Card className='mt-2'>
                <Card.Header>Home</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Do you love playing Monopoly, but are you tired of all the fumbling around with the paper money? With this app: no more cheating! No more counting. Just set up a game and your banker can control who pays whom!
                    </Card.Text>
                    <Button
                        onClick={handleClick}>
                        New Game
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
}
