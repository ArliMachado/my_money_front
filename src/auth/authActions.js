import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import consts from '../const';

const submit = (values, url) => {
  return (dispatch) => {
    axios.post(url, values)
      .then((resp) => {
        dispatch([
          { type: 'USER_FETCHED', payload: resp.data }
        ]);
      })
      .catch((e) => {
        e.response.data.errors.forEach(
          error => toastr.error('Erro', error),
        );
      });
  };
};

const login = (values) => {
  return submit(values, `${consts.OAPI_URL}/login`);
}

const signup = (values) => {
  return submit(values, `${consts.OAPI_URL}/signup`);
};

const logout = () => {
  return { type: 'TOKEN_VALIDATED', payload: false };
};

const validateToken = (token) => {
  return (dispatch) => {
    if (token) {
      axios.post(`${consts.OAPI_URL}/validateToken`, { token })
        .then((resp) => {
          dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid });
        })
        .catch(() => dispatch({ type: 'TOKEN_VALIDATED', payload: false }));
    } else {
      dispatch({ type: 'TOKEN_VALIDATED', payload: false });
    }
  };
};

export {
  login, signup, logout, validateToken,
};
