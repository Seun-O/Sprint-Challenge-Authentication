import { LOGIN, LOGIN_FAIL, GET_JOKES, GET_JOKES_FAIL } from "../actions";

const INITIAL_STATE = {
  error: null,
  isRegistering: false,
  jokes: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case GET_JOKES:
      return {
        jokes: action.payload
      };
    case GET_JOKES_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
