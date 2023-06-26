import { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('./') }
        >
          Home
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
