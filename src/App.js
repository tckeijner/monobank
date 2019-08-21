import React from 'react';
import './App.css';
import Home from './components/Home';
import NewGame from './components/NewGame';
import Game from './components/Game';
import NavBar from './components/NavBar';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
      screen: state.screen
  };
};

const ConnectedApp = ({screen}) => {
  switch (screen) {
    case 'home':
      return (
        <div>
          <NavBar />
          <Home />
        </div>
        
      );
    case "newGame":
      return (
        <div>
          <NavBar />
          <NewGame />
        </div>
      );
    case "game":
      return (
        <div>
          <NavBar />
          <Game />
        </div>
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
