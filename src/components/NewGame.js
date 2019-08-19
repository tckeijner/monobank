import React from 'react';
import {connect} from 'react-redux';
import { setInitialValues, nextScreen } from '../redux/actions/index';

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
                <li key={players.indexOf(player)}>{player}</li>  
            )
        })
        return (
            <ul>{list}</ul>
        )
    };

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Starting cash per player</label>
                        <input 
                        type="number"
                        onChange={this.handleCashChange}/>
                    </div> 
                    {this.mapPlayersToList()}
                    <div className="form-group">
                        <label htmlFor="title">New Player</label>
                        <input 
                        type="text"
                        onChange={this.handleNewPlayerNameChange}
                        min="2"
                        max="8"
                        default=""
                        ref={(ref) => this.mainInput= ref}/>
                        <button onClick={this.handleAddNewPLayer}>Add player</button>
                    </div>
                    <button 
                        type="submit" >Start Game</button>
                </form>
            </div>        
        )
    }
};

const NewGame = connect(mapStateToProps, mapDispatchToProps)(ConnectedNewGame);

export default NewGame;