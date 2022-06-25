import React from 'react';
import {Container, Card, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { nextScreen } from '../redux/actions';
import {Dispatch} from "redux";

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        nextScreen: (screen: string) => dispatch(nextScreen(screen))
    };
}

function ConnectedHome(props: HomeProps) {
    function handleClick(e: any) {
        e.preventDefault();
        props.nextScreen("newGame")
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

const Home = connect(null, mapDispatchToProps)(ConnectedHome);
export default Home;

export interface HomeProps {
    nextScreen: (nextScreen: string) => void;
}