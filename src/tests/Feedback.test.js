import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';
import { string } from 'prop-types';

describe('Testa página de Feedback', () => {
  it('Verifica se os elementos da página de Feedback são exibidos corretamente.', () => {
    renderWithRouterAndRedux(<Feedback />);

    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    const btnRestart = screen.getByTestId('btn-play-again');
    const btnRanking = screen.getByTestId('btn-ranking');

    expect(feedbackText).toBeInTheDocument();
    expect(feedbackTotalQuestion).toBeInTheDocument();
    expect(feedbackTotalScore).toBeInTheDocument();
    expect(btnRestart).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
   });

   it('Verifica se o botão Play Again redireciona o usuário para a tela de Login.', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnRestart = screen.getByTestId('btn-play-again');
    userEvent.click(btnRestart)

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
   });

   it('Verifica se o botão Ranking redireciona o usuário para a tela de Ranking.', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking)

    const { location: { pathname } } = history;

    expect(pathname).toBe('/ranking');
   });
});