import { USER_INFO, INCREMENT_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, { type, payload }) => {
  switch (type) {
  case USER_INFO:
    return {
      ...state,
      ...payload,
    };

  case INCREMENT_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };

  default:
    return state;
  }
};

export default player;
