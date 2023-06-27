
import { USER, MAIN } from '../config/types';

const initState = {
  is_authed: false,
  user: {},
  error: '',
  token: '',
  brands: [],
  celebrities: [],
}


const user = (state = initState, action) => {
  const { type, payload} = action;
  
  switch(type){
    case USER.LOGIN:
      storage.save({ key: 'token', data: { token: payload.token || state.token }});
      storage.save({ key: 'user', data: { user: payload.user || state.user }})
      return {
        ...state,
        is_authed: true,
        user: payload.user,
        error: payload.error,
      }
    case USER.OUT:
      return {
        ...state,
        is_authed: false,
        authedUser: {}
      }
    case USER.SIGNUP: 
      return {
        ...state,
        user: payload.user,
        error: payload.error,
      }
    case MAIN.BRANDS:
      return {
        ...state,
        brands: payload.brands,
        error: payload.error,
      }
    case MAIN.CELEBRITIES:
      return {
        ...state,
        celebrities: payload.celebrities,
        error: payload.error,
      }
    default:
        return state;
  }
};

export default user;