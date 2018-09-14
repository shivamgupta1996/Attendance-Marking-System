import { combineReducers } from 'redux';
import user from './reducer-user';
import data from './reducer-posted-data';
import todayData from './reducer-today-data';

export default combineReducers({
user,
data,
todayData,
})
