import {
  USER_INFO,
  INCREMENT_SCORE,
  INCREMENT_ASSERTION,
} from '../actions';

const initialState = {
  name: '',
  assertions: 0,
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

  case INCREMENT_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + payload,
    };

  default:
    return state;
  }
};

export default player;
