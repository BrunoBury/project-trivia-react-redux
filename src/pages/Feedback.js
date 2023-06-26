import { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <h1 data-testid="feedback-text">
          Tela de Feedback
        </h1>
        <div>
          <Header />
        </div>
      </>
    );
  }
}

export default Feedback;
