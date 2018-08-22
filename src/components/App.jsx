import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { firebaseApp} from '../firebase';
import { hrRef } from '../firebase';
import { browserHistory, Link } from 'react-router';
import AttendanceTable from './AttendanceTable';
import { signOut } from '../actions';
import _ from 'lodash';
import {Glyphicon} from 'react-bootstrap';
import CalendarShow from './CalendarShow';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      clockInDate:'',
      clockInTime:'',
      clockOutDate:'',
      clockOutTime:'',
      hoursWorked :'',
      clockInStatus: false
    }
  }

  signout(){
      const r = window.confirm("Do you really want to Sign Out?");
      if(r === true){
        firebaseApp.auth().signOut().then(browserHistory.push("/signin"));
        this.props.signOut();
      }
    }

renderButton(){
  const {clockInStatus} = this.state;
if(this.props.user.email == null){
  return(<div>Please Login to use this service</div>);
} else
  if(clockInStatus === false){
    return(<button
      className="btn btn-primary"
      type="button"
      onClick= {()=> this.clockIn()}
      >ClockIn
          </button> )
  } else {

    return(<button
      className="btn btn-secondary"
      type="button"
      onClick= {()=> this.clockOut()}
    >ClockOut
    </button> )
  }
}


renderAuthButton(){
    if(this.props.user.email!=null){
      return(<Glyphicon className="glyphi" onClick={()=>this.signout()} title="Sign Out" glyph="off" />);
    } else {
      return(<button className="btn btn-warning"><Link to="/signin">Sign in</Link></button>);
    }
}

clockIn(){
  const inDate = moment().format('MMMM Do YYYY');
  const inTime = moment().format('h:mm:ss a');
  this.setState({clockInTime:inTime,clockInDate:inDate, clockInStatus: true});

}

clockOut(){
  const outTime = moment().format('h:mm:ss a');
  const outDate = moment().format('MMMM Do YYYY');
  this.setState({clockOutTime:outTime, clockOutDate:outDate, clockInStatus: false});
}

checkData(){
  const {email} = this.props.user;
  const {clockInDate, clockInTime, clockOutDate, clockOutTime} = this.state;
  const cin = clockInTime.split(":");
  const cout = clockOutTime.split(":");
  let cinh = _.nth(cin,0); //Clokin Hour digit
  let couth = _.nth(cout,0); //Clokout Hour digit
  let cinm = _.nth(cin,1); //Clokin Minute digit
  let coutm = _.nth(cout,1); //Clokout Minute digit
  let wh = Math.abs(couth-cinh);
  let wm = Math.abs(coutm-cinm);
  if(wh<10){
    wh="0"+wh;
    }
  if(wm<10){
    wm="0"+wm;
  }
  let userData = _.filter(this.props.data, {user:email});
  let count=0;
  userData.map(udata => {
    if(clockInDate === udata.clockInDate){
      count+=1;
    }
  })
    if(count===0){
      hrRef.push({user: email, clockInDate, clockInTime, clockOutDate, clockOutTime, hours:wh, minutes:wm})
      return alert("Data sent successfully!");
    } else{
        return alert("You are not allowed to clock In/Out more than once in a day");
    }


}

sendData(){

  const {clockInTime,clockOutTime} = this.state;
  if(this.props.user.email == null){
    return alert("You have to login first");
  }
  if(clockInTime === '' || clockOutTime === ''){
    return alert("Please Clock in/out before submitting");
  } else {
      this.checkData();
    }

}

renderManagerView(){
  if(this.props.user.email==="vivek@gmail.com")
    return (<Link to="/manager">Manager's Tab</Link>)
}


  render(){
    const {clockInDate, clockInTime, clockOutDate, clockOutTime} = this.state;

    return(
      <div className="container">
        <div className="heading"><h1>SumHr</h1></div>
        <span>Hello {this.props.user.email} !</span>
        <div>
          {this.renderAuthButton()}
        </div>
        <div>
        {
          this.renderManagerView()
        }
        </div>
        <hr />

        <div className="clk-box">
          <div style={{marginBottom:'15px'}}>
            {
              this.renderButton()
            }
          </div>
            <div style={{marginBottom:'15px'}}>clockIn: {clockInDate} {clockInTime}</div>
            <div>clockOut: {clockOutDate} {clockOutTime}</div>

            <button
              type="button"
              style={{marginTop:'15px'}}
              onClick={()=> this.sendData()}
              className="btn btn-danger"
            >Submit
            </button>
          </div>

            <hr />
          <div className="text-danger"><strong>NOTE: Please do press "Submit" button above to submit your attendance</strong></div>
          <div className="table-n-cal">
            <div className="calendar">
              <CalendarShow />
            </div>
            <div className="at-table">
              <AttendanceTable cin={clockInTime} cout = {clockOutTime} />
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {user} = state;
  const {data} = state;
  return {
    user,
    data
  }
}
export default connect (mapStateToProps, { signOut })(App);
