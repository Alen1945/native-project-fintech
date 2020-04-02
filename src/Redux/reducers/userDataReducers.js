import { USER_LOGIN, USER_LOGOUT } from '../actions/actionTypes';
const initialState = {
  token: '',
  isLogin: false,
  dataProfile: {},
};

export default function userData(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        ...action.payload,
      };
    case USER_LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
