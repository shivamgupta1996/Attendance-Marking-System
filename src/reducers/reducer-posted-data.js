import { POSTED_DATA } from '../actions';
export default (state = [], action) => {

  switch(action.type){
    case POSTED_DATA:
      const {data} = action;
      return data;
    default:
      return state;
  }
}
