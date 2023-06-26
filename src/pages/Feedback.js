import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const scoreSwitch = 3;
    return (
      <>
        <div>
          <Header />
        </div>
        {assertions >= scoreSwitch
          ? (
            <h1 data-testid="feedback-text">
              Well Done!
            </h1>
          ) : (
            <h1 data-testid="feedback-text">
              Could be better...
            </h1>
          )}
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  ...player,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
