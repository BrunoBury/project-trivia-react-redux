import { Component } from 'react';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const HASH = MD5(gravatarEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${HASH}`;

    return (
      <header>
        <img
          src={ gravatarImg }
          alt="Gravatar Profile"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{ name }</h1>
        <p data-testid="header-score">
          {score}
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  ...player,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
