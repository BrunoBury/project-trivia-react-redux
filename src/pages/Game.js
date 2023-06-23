import { Component } from 'react';
import Header from '../components/Header';
import RunGame from '../components/RunGame';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <RunGame />
      </div>
    );
  }
}

export default Game;
