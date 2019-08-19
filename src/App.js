import React from 'react';
import './App.css';
import NewGame from './components/NewGame';
import Game from './components/Game';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
      screen: state.screen
  };
};

const ConnectedApp = ({screen}) => {
  switch (screen) {
    case "newGame":
      return (
        <NewGame />
      );
    case "game":
      return (
        <Game />
      );
    default: 
      return (
        <div>
          You did something wrong mate!
        </div>
      )
  };
};

const App = connect(mapStateToProps)(ConnectedApp);


export default App;
