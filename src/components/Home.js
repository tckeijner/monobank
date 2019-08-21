import React from 'react';
import {Container, Card, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { nextScreen } from '../redux/actions/index';

function mapDispatchToProps(dispatch) {
    return {
        nextScreen: screen => dispatch(nextScreen(screen))
    };
};

class ConnectedHome extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(e) {
        e.preventDefault();
        this.props.nextScreen("newGame")
    };

    render() {
            return (
                <Container>
                    <Card className='mt-2'>
                        <Card.Header>Home</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Do you love playing Monopoly, but are you tired of all the fumbling around with the paper money? With this app: no more cheating! No more counting. Just set up a game and your banker can control who pays whom! 
                            </Card.Text>
                            <Button
                            onClick={this.handleClick}>
                                New Game
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            );
    };
};

const Home = connect(null, mapDispatchToProps)(ConnectedHome);
export default Home;