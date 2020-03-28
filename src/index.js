import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import { Provider } from 'react-redux';
import { logUser } from './actions';
import reducer from './reducers';
import { createStore } from 'redux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ManagerView from './components/ManagerView';
import EmployeeData from './components/EmployeeData';
const store = createStore(reducer);


firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {

    browserHistory.push('/');
    const { email } = user;
    store.dispatch(logUser(email));
  } else {
  // browserHistory.replace('/signin');

  }
});


ReactDOM.render(
  <Provider store={store} >
    <Router path="/" history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/app" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/employeedata/:email" component={EmployeeData} />
      <Route path="/signup" component={SignUp} />
      <Route path="/manager" component={ManagerView} />
    </Router>
  </Provider>, document.getElementById('root'))
