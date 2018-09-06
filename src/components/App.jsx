import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {firebaseApp, userRef, hrRef} from '../firebase';
import { browserHistory, Link } from 'react-router';
import AttendanceTable from './AttendanceTable';
import { signOut } from '../actions';
import _ from 'lodash';
import {Glyphicon} from 'react-bootstrap';
import CalendarShow from './CalendarShow';
import Geocode from "react-geocode";

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      clockInDate:'',
      clockInTime:'',
      clockOutDate:'',
      clockOutTime:'',
      latitude: '',
      longitude: '',
      clockInStatus: "no",
      addr:''
    }
    this.getMyLocation = this.getMyLocation.bind(this)
  }

  componentDidMount() {
    this.getMyLocation()
    let name;
    const uid = firebaseApp.auth().O;
    userRef.on('value', snap =>{
      snap.forEach(vala => {
        name = vala.key;
      })
    })
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        const { coords: { latitude, longitude } } = position;
        Geocode.fromLatLng(latitude, longitude).then(
          response => {
            const address = response.results[0].formatted_address;
            this.setState({addr: address});

          },
          error => {
            console.error(error);
          }
        );
        this.setState({
          latitude,
          longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  signout(){
        firebaseApp.auth().signOut().then(browserHistory.push("/signin"));
        this.props.signOut();

    }

renderButton(){
  const {clockInStatus} = this.state;
  if(this.props.user.email == null){
    return(<div>Please Login to use this service</div>);
  } else
  if(clockInStatus ==="null"){
    return (<div></div>)
  } else
  if(clockInStatus === "no"){
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

pushSignIn(){
  browserHistory.push('/signin');
}

renderAuthButton(){
    if(this.props.user.email!=null){
      return(<Glyphicon className="glyphi" onClick={()=>this.signout()} title="Sign Out" glyph="off" />);
    } else {
      return(<button className="btn btn-warning" onClick={()=>this.pushSignIn()}>Sign in</button>);
    }
}

clockIn(){
  const inDate = moment().format('MMMM Do YYYY');
  const inTime = moment().format('h:mm:ss a');
  const {email} = this.props.user;
  let count=0;
  this.setState({clockInTime:inTime,clockInDate:inDate, clockInStatus: true});
  this.props.data.map(d=>{

    if(inDate === d.clockInDate){
      count+=1;
    }
  })
    if(count===0){
      if(this.state.addr!= ""){
      hrRef.push({user: email, clockInDate: inDate, clockInTime: inTime, address: this.state.addr})
  }} else {
      console.log("Try again next day")
  }


}

clockOut(){
  this.getMyLocation();
  const outTime = moment().format('h:mm:ss a');
  let cintime;
  const outDate = moment().format('MMMM Do YYYY');
  const cout = outTime.split(':');
  hrRef.on('value',snap => {
    snap.forEach(dataObj => {
      const {clockInDate} = dataObj.val();
      if(clockInDate === outDate){
        const {clockInTime} = dataObj.val();
        cintime = clockInTime;
      }
    })
  })
  const cin = cintime.split(':');
  const couth = _.parseInt(_.nth(cout,0));
  const cinh = _.parseInt(_.nth(cin,0));
  let hours = Math.abs(couth-cinh);
  const coutm = _.parseInt(_.nth(cout,1));
  const cinm = _.parseInt(_.nth(cin,1));
  let mins = Math.abs(coutm-cinm);

  if(hours<10){
    hours='0'+hours;
  }
  if(mins<10){
    mins='0'+mins;
  }

  this.setState({clockOutTime:outTime, clockOutDate:outDate, clockInStatus: "null"});
  hrRef.on('value',snap=>{
    snap.forEach(data => {
      const {clockInDate, user} = data.val();
      if(clockInDate === outDate && user===this.props.user.email){
        const {clockOutDate, address} = data.val();
        const ikey = data.key;
        if(!clockOutDate && address === this.state.addr){
          hrRef.child(`${ikey}`).update({clockOutTime:outTime, clockOutDate:outDate, hours, minutes:mins}) }

      }
    })
  })
}

  renderManagerView(){
    if(this.props.user.email==="vivek@gmail.com")
      return (<Link to="/manager">Manager's Tab</Link>)
  }


  render(){
    const {email} = this.props.user;
    // console.log(firebaseApp.auth().O)

    return(
      <div className="container">
        <div className="header-box">
          <div className="heading"><h1>SumHr</h1></div>
          <span>Hello {email} !</span>
          <div>
            {this.renderAuthButton()}
          </div>
          <div>
          {
            this.renderManagerView()
          }
          </div>
        </div>
        <hr />

        <div className="clk-box">
          <div style={{marginBottom:'15px'}}>
            {
              this.renderButton()
            }
          </div>
        </div>
            <hr />

          <div className="table-n-cal">
            <div className="calendar">
              <CalendarShow />
            </div>
            <div className="at-table">
              <AttendanceTable />
            </div>
          </div>
          <div>
            <Link to={`employeedata/${email}`}>Your Data</Link>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {user,data} = state;
  return {
    user,
    data
  }
}
export default connect (mapStateToProps, { signOut })(App);
