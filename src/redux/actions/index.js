export const USER_INFO = 'USER_INFO';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';

export const userInfo = (player) => ({
  type: USER_INFO,
  payload: player });

export const incrementScore = (score) => ({
  type: INCREMENT_SCORE,
  payload: score,
});
