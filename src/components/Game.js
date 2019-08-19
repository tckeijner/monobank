import React from 'react';
import { connect } from 'react-redux';
import { transferCash } from '../redux/actions/index';

const mapStateToProps = state => {
    return {
        startingCash: state.startingCash,
        numPlayers: state.numPlayers,
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
            players: [],
            bankTransfer: 0,
        };

        this.renderPlayers = this.renderPlayers.bind(this);
        this.renderPayButtons = this.renderPayButtons.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
        this.handleTransferInputChange = this.handleTransferInputChange.bind(this);
    };

    componentWillMount() {
        const propPlayers = this.props.players;
        let players = [];
        propPlayers.forEach(player => {
            let newPlayerObject = {name: player.name, cash: player.cash, transfer: 0}
            players.push(newPlayerObject);
        })
        this.setState({players: this.props.players})
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
                    <button 
                    key={buttonKey}
                    onClick={ (e) => {this.handleTransfer(fromIndex, toIndex, e)}} >to {buttonName}</button>                    
            );
        });
        const buttonsKey = `${name}ButtonRow`
        return (
            <div key={buttonsKey}>{buttons}</div>
        );
    };

    renderPlayers() {
        const players = this.props.players;
        const list = players.map((player) => {
            const index = players.indexOf(player)
            return (
                <div key={players.indexOf(player)}>
                    <h1>{player.name}</h1>
                    <h2>Cash: {player.cash}</h2>
                    <form>
                        <label>Pay</label>
                        <input 
                        type="number"
                        onChange={(e)=>{this.handleTransferInputChange(index, e)}}
                        default= {0}
                        />
                        {this.renderPayButtons(player.name, index)}
                    </form>
                </div> 
            )
        })
        return (
            <div>{list}</div>
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
        if (fromIndex === -1) {
            amount = this.state.bankTransfer;
        } else {
            amount = this.state.players[fromIndex].transfer;
        };
        console.log(amount)
        this.props.transferCash({ amount, fromIndex, toIndex});
    };

    render () {
        return (
            <div>
                <div key={[-1]}>
                    <h1>Bank</h1>
                    <form>
                        <label>Pay</label>
                        <input 
                        type="number"
                        onChange={(e)=>{this.handleTransferInputChange(-1, e)}}
                        default= {0}
                        />
                        {this.renderPayButtons("BANK", -1)}
                    </form>
                </div> 
                {this.renderPlayers()}
            </div>
        );
    };
};

const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);

export default Game;