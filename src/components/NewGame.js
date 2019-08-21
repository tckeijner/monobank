import React from 'react';
import {connect} from 'react-redux';
import { setInitialValues, nextScreen } from '../redux/actions/index';
import {Container, Form, Button, ListGroup, Card} from 'react-bootstrap';

const mapStateToProps = state => {
    return {
        startingCash: state.startingCash,
        players: state.players
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setInitialValues: initialValues => dispatch(setInitialValues(initialValues)),
        nextScreen: screen => dispatch(nextScreen(screen))
    };
};

class ConnectedNewGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cashFormVal: 1500,
            newPlayerName: "",
            newPlayers: [],
        };

        this.handleCashChange = this.handleCashChange.bind(this);
        this.handleNewPlayerNameChange = this.handleNewPlayerNameChange.bind(this);
        this.handleAddNewPLayer = this.handleAddNewPLayer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mapPlayersToList = this.mapPlayersToList.bind(this);
    };

    handleCashChange(e) {
        const cash = e.target.value
        this.setState({cashFormVal: cash});
    };
    handleNewPlayerNameChange(e) {
        this.setState({newPlayerName: e.target.value})
        console.log(this.state.newPlayerName)
    };
    handleAddNewPLayer(e) {
        e.preventDefault()
        const newPlayerArray = this.state.newPlayers;
        const newPlayerName = this.state.newPlayerName;
        newPlayerArray.push(newPlayerName);
        this.setState({newPlayers: newPlayerArray});
        this.setState({newPlayerName: ""})
        this.mainInput.value = "";
    }

    handleSubmit(e) {
        e.preventDefault();
        const startingCash = this.state.cashFormVal;
        const players = this.state.newPlayers;
        this.props.setInitialValues({startingCash, players});
        this.props.nextScreen("game");
    };
    mapPlayersToList() {
        const players = this.state.newPlayers;
        const list = players.map((player) => {
            return (
                <ListGroup.Item key={players.indexOf(player)}>{player}</ListGroup.Item>  
            )
        })
        return (
            <ListGroup>{list}</ListGroup>
        )
    };

    render() {
        return(
            <Container>
                <Card className='mt-2'>
                    <Card.Header>Set up a new game</Card.Header>
                    <Card.Body>
                        <Form 
                onSubmit={this.handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label>Starting money per player</Form.Label>
                        <Form.Control 
                        type="number"
                        placeholder="Enter amount"
                        onChange={this.handleCashChange}/>
                        <Form.Text className="text-muted">
                            Leave empty to use the default value of 1500
                        </Form.Text>
                    </Form.Group> 
                    {this.mapPlayersToList()}
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="title">New Player</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={this.handleNewPlayerNameChange}
                        default=""
                        placeholder="Enter player name"
                        ref={(ref) => this.mainInput= ref}/>
                    <Button 
                        onClick={this.handleAddNewPLayer}
                        variant="primary" 
                        type="submit"
                        >Add player</Button>
                    </Form.Group>
                    <Button 
                        variant="primary"
                        onClick={this.handleSubmit} >Start Game</Button>
                </Form>
                    </Card.Body>
                
                </Card>
                
            </Container>        
        )
    }
};

const NewGame = connect(mapStateToProps, mapDispatchToProps)(ConnectedNewGame);

export default NewGame;