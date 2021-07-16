import { SIGNED_IN, SIGNED_OUT } from '../actions';

let user ={
  email : null
};
export default (state = user, action) => {

  switch (action.type){
    case SIGNED_IN:
      const { email } = action;
      user = {
        email
      }
      return user;
    case SIGNED_OUT:
      return { email: null }
      default :
        return state;
  }
}
