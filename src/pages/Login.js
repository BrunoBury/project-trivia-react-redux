import { Component } from 'react';

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

export default Login;
