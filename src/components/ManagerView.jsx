import React,{ Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {hrRef} from '../firebase';
import {postTodayData} from '../actions';
import {Helmet} from "react-helmet";

class ManagerView extends Component {

  componentDidMount(){
    hrRef.on('value',snap => {
      let todayData = [];
      let today = moment().format('MMMM Do YYYY');
      snap.forEach(dataObj => {
        const {clockInDate} = dataObj.val();
          if(today === clockInDate){
            const { user, clockInDate, clockInTime, clockOutDate, clockOutTime, hours, minutes } = dataObj.val();
            todayData.push({user, clockInDate, clockInTime, clockOutDate, clockOutTime, hours, minutes}) }
      })
      this.props.postTodayData(todayData);
      })
  }

  renderTodayData(){
    if(this.props.user.email === "vivek@gmail.com"){
      return(
        this.props.todayData.map(eachData => {
          return(
            <div style={{marginBottom:'25px'}}>
              <h4><u>{eachData.user}</u></h4><br />
              <span><strong>Clock In: </strong>{eachData.clockInTime}</span><br />
              <span><strong>Clock Out: </strong>{eachData.clockOutTime}</span><br />
              <span><strong>Hours worked: </strong>{eachData.hours}:{eachData.minutes}</span><br />
            </div>
          )
        })
      )
    } else {
        return (<div>You are not authorized to view this page.</div>)
      }
  }

  render(){

    return(
      <div className="container">
      <Helmet>
        <title>Admin-AMS</title>
        <meta property="og:title" content="AMS-Admin" />
        <meta property="og:type" content="utility" />
        <meta property="og:url" content="https://markyourattendance.herokuapp.com/manager" />
        <meta property="og:image" content="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" />
      </Helmet>
        <h2><u>Today's Data</u></h2>
        <div>{this.renderTodayData()}</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {user} = state;
  const {data} = state;
  const {todayData} = state;
  return {
    user,
    data,
    todayData
  }
}
export default connect (mapStateToProps,{ postTodayData })(ManagerView);
