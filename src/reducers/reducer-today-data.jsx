import {TODAY_DATA} from '../actions';

export default (state = [], action) => {

  switch(action.type){
    case TODAY_DATA:
      const {todayData} = action;
      return todayData;
    default:
      return state;
  }
}
