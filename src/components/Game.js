import React from 'react';
import { connect } from 'react-redux';
import { transferCash } from '../redux/actions/index';
import { Card, Form, Button, ButtonGroup} from 'react-bootstrap';

const mapStateToProps = state => {
    return {
        startingCash: state.startingCash,
        players: state.players,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        transferCash: cash => dispatch(transferCash(cash))
    };
};

class ConnectedGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            players: this.props.players,
            bankTransfer: 0,
        };

        this.renderPlayers = this.renderPlayers.bind(this);
        this.renderPayButtons = this.renderPayButtons.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
        this.handleTransferInputChange = this.handleTransferInputChange.bind(this);
    };
    componentWillReceiveProps(nextProps) {
        if (this.props.players !== nextProps.players) {
            this.setState({users: nextProps.users});
        }
    }
    componentWillMount() {
        const propPlayers = this.props.players;
        let players = [];
        propPlayers.forEach(player => {
            let newPlayerObject = {name: player.name, cash: player.cash, transfer: 0}
            players.push(newPlayerObject);
        })
        this.setState({players: this.props.players})
        console.log(this.state, this.props)
    };

    renderPayButtons(name, fromIndex) {
        const players = this.props.players;
        const playerNames = players.map(player => {
            return player.name;
        });
        let names = ["BANK"];
        players.forEach(player => {
            names.push(player.name)
        });
        let buttonNamesArray = []
        names.forEach(element => {
            if (element !== name) {
                buttonNamesArray.push(element)
            };
        });
        const buttons = buttonNamesArray.map(buttonName => {
            const buttonKey = `${name}${buttonName}Button`
            const toIndex = playerNames.indexOf(buttonName)
            return (
                    <Button 
                    variant="outline-primary"
                    key={buttonKey}
                    onClick={ (e) => {this.handleTransfer(fromIndex, toIndex, e)}} >{buttonName}</Button>                    
            );
        });
        const buttonsKey = `${name}ButtonRow`
        return (
            <ButtonGroup 
            className="mb-3"
            key={buttonsKey}>{buttons}</ButtonGroup>
        );
    };

    renderPlayers() {
        const players = this.props.players;
        const list = players.map((player) => {
            const index = players.indexOf(player)
            return (
                <div
                className="col-sm m-2" 
                key={players.indexOf(player)}>
                    <Card>
                    <Card.Header>{player.name}</Card.Header>
                        <Card.Body>
                            
                    <Card.Text>Money: {player.cash}</Card.Text>
                    <Form>
                        <Form.Label>Pay</Form.Label>
                        <Form.Control 
                        type="number"
                        onChange={(e)=>{this.handleTransferInputChange(index, e)}}
                        default= ""
                        ref={(ref) => this.mainInput= ref}
                        />
                        {this.renderPayButtons(player.name, index)}
                    </Form>
                        </Card.Body>
                        
                    </Card>
                    
                </div> 
            )
        })
        return (
                <div className="row">
                    <div className="col-sm m-2" key={[-1]}>
                        <Card>
                        <Card.Header>BANK</Card.Header>
                            <Card.Body>
                                
                            <Card.Text>Money: unlimited</Card.Text>
                    <Form>
                        <Form.Label>Pay</Form.Label>
                        <Form.Control 
                        type="number"
                        onChange={(e)=>{this.handleTransferInputChange(-1, e)}}
                        default= {0}
                        />
                        {this.renderPayButtons("BANK", -1)}
                    </Form>
                            </Card.Body>
                            
                        </Card>

                </div> 
                {list}
                </div>
        )
    };

    handleTransferInputChange(index, e) {
        e.preventDefault();
        if (index === -1) {
            this.setState({bankTransfer: e.target.value})
        } else {
            const newPlayerState = Object.assign({}, this.state.players, {
                [index]: {
                    name: this.state.players[index].name, 
                    cash: this.state.players[index].cash,
                    transfer: e.target.value}
            });
            this.setState({players: newPlayerState})            
        };
    };
    
    handleTransfer(fromIndex, toIndex, e) {
        e.preventDefault();
        console.log(fromIndex, toIndex)
        let amount = 0
        let balance = 999999999999
        if (fromIndex === -1) {
            amount = this.state.bankTransfer;
        } else {
            amount = this.state.players[fromIndex].transfer;
            balance = this.state.players[fromIndex].cash;
        };
        console.log(amount)
        this.props.transferCash({ amount, fromIndex, toIndex, balance});
        this.setState({newPlayerName: ""})
        this.mainInput.value = "";
    };

    render () {
        return (
            <div className="container">
                {this.renderPlayers()}
            </div>
        );
    };
};

const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);

export default Game;