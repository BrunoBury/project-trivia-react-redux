import { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <h1>Pagina de Login</h1>
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Insira seu E-mail"
          name="email"
          value={ email }
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
          disabled={ name.length <= 0 || email.length <= 0 }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
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
};

export default Login;
