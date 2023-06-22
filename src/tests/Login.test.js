import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa página de Login', () => {
  it('Verifica se os inputs e buttons são renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  });

  it('Verifica se o botão "Play" fica desabilitado quando os inputs estão vazios', () => {
    renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByTestId('btn-play');

    expect(btnPlay).toBeDisabled();

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');

    userEvent.type(emailInput, '');
    userEvent.type(nameInput, '');

    expect(btnPlay).toBeDisabled();

    userEvent.type(emailInput, 'test@teste.com');
  });

  it('Verifica se o comportamento dos buttons esta correto',  () => {
    const token = {"response_code":0,"response_message":"Token Generated Successfully!","token":"d97b0fd948a017a2e605ae61d43c382f556122cf31b59ce9fc7c04052fbb38fe"}
    
    jest.spyOn(global,'fetch');
    
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    })
    
    renderWithRouterAndRedux(<App/>)
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');
   
    userEvent.type(emailInput,'teste@teste.com');
    userEvent.type(nameInput,'User');   
    userEvent.click(btnPlay);    

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request')   
  });
});