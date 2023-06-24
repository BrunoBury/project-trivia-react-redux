import { USER_INFO, INCREMENT_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case USER_INFO:
    return {
      ...state,
      ...payload,
    };

  case INCREMENT_SCORE:
    return {
      ...state,
      score: action.payload + state.score,
    };

  default:
    return state;
  }
};

export default playerReducer;
