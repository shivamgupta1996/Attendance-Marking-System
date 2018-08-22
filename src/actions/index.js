export const SIGNED_IN = "signed_in";
export const SIGNED_OUT = "signed_out";
export const POSTED_DATA = "posted_data";
export const TODAY_DATA = "today_data";
export function logUser(email) {

  const action = {
    type : SIGNED_IN,
    email
  }
  return action;
}
export function signOut() {

  const action = {
    type : SIGNED_OUT,
  }
  return action;
}

export function postedData(data){

  const action ={
    type : POSTED_DATA,
    data
  }
  return action;
}

export function postTodayData(todayData){

  const action ={
    type : TODAY_DATA,
    todayData
  }
  return action;
}
