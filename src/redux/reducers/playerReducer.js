import { USER_INFO } from '../actions';

const initialState = {
  name: '',
  assertions: '',
  score: '0',
  gravatarEmail: '',
};

const playerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case USER_INFO:
    return {
      ...state,
      ...payload,
    };

  default:
    return state;
  }
};

export default playerReducer;
