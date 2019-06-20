import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3300/api`,
  headers: {
    Authorization: localStorage.getItem("token")
  }
});

export const REGISTER = `REGISTER`;
export const REGISTER_FAIL = `REGISTER_FAIL`;
export const registerUser = newUser => dispatch => {
  api
    .post(`register`, newUser)
    .then(res => {
      console.log(res);
      dispatch({ type: REGISTER, payload: res });
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAIL, payload: err });
    });
};

export const LOGIN = `LOGIN`;
export const LOGIN_FAIL = `LOGIN_FAIL`;
export const loginUser = credentials => dispatch => {
  api
    .post(`login`, credentials)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN, payload: res });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};

export const GET_JOKES = `GET_JOKES`;
export const GET_JOKES_FAIL = `GET_JOKES_FAIL`;
export const getJokes = () => dispatch => {
  api
    .get(`jokes`)
    .then(res => {
      dispatch({ type: GET_JOKES, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_JOKES_FAIL, payload: err });
    });
};
