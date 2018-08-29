import React, { Component } from 'react';
import {firebaseApp, userRef} from '../firebase';
import { Link } from 'react-router';

class SignUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      email : '',
      password : '',
      name : '',
      error : {
        message : ''
      }
    }
  }
signUp(){
  //console.log("credentials", this.state);
  const {email, password, name} = this.state;
  firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(user=>{
    if(user != null){
      console.log('useer', user.user.uid);
      userRef.child(`${user.user.uid}`).set({name})
    }

  }).catch(error => {this.setState({error});});

}

  render(){
    return(
    <div className="root-signin">
      <div className= "form-inline" style={{margin:'5%'}}>
        <h2>Sign Up</h2>
        <div className = "form-group">
        <input
          className="form-control"
          style={{marginBottom:'5px'}}
          type="text"
          placeholder = " Full Name"
          onChange = {event => this.setState({name : event.target.value})} />
          <br />
          <input
            className="form-control"
            style={{marginBottom:'5px'}}
            type="text"
            placeholder = "Username"
            onChange = {event => this.setState({email : event.target.value})} />
            <br />
            <input
              className="form-control"
              style={{marginBottom:'5px'}}
              type="password"
              placeholder = "Password"
              onChange = {event => this.setState({password : event.target.value})} />
              <br />
              <button
                className = "btn btn-primary"
                type = "button"
                style={{marginBottom:'5px'}}
                onClick = {() => this.signUp()}>
                Sign Up
              </button>
                <div>{this.state.error.message}</div>
        </div>
        <br />
        <div>
          Already have an ID? <Link to="/signin" >Sign In </Link>
        </div>

      </div>
    </div>
    );
  }
}

export default SignUp;
