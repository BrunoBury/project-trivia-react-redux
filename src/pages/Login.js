import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userInfo } from '../redux/actions';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', token);
    dispatch(userInfo(this.state));
    history.push('/game');
  };

  render() {
    const { gravatarEmail, name } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1>Pagina de Login</h1>
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Insira seu E-mail"
          name="gravatarEmail"
          value={ gravatarEmail }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Insira seu Nome"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ name.length <= 0 || gravatarEmail.length <= 0 }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
