import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const {
      assertions,
      score,
      history,
    } = this.props;
    const scoreSwitch = 3;
    return (
      <>
        <div>
          <Header />
        </div>
        {assertions >= scoreSwitch
          ? (
            <div>
              <h1 data-testid="feedback-text">
                Well Done!
              </h1>
              <h2>
                Você acertou
                <h3 data-testid="feedback-total-question">{assertions}</h3>
                perguntas.
              </h2>
              <h2>
                Sua pontuação total foi:
                <h3 data-testid="feedback-total-score">{score}</h3>
              </h2>
            </div>
          ) : (
            <div>
              <h1 data-testid="feedback-text">
                Could be better...
              </h1>
              <h2>
                Você acertou
                <h3 data-testid="feedback-total-question">{assertions}</h3>
                perguntas.
              </h2>
              <h2>
                Sua pontuação total foi:
                <h3 data-testid="feedback-total-score">{score}</h3>
              </h2>
            </div>
          )}
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('./') }
        >
          Play Again
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  ...player,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
