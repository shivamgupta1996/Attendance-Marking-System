import React,{ Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {hrRef} from '../firebase';
import {postTodayData} from '../actions';
import { browserHistory, Link } from 'react-router';
import {Glyphicon, Table} from 'react-bootstrap';

class ManagerView extends Component {

  componentDidMount(){
    hrRef.on('value',snap => {
      let todayData = [];
      let today = moment().format('MMMM Do YYYY');
      snap.forEach(dataObj => {
        const {clockInDate} = dataObj.val();
          if(today === clockInDate){
            const { user, clockInDate, clockInTime, clockOutDate, clockOutTime, hours, minutes, address } = dataObj.val();
            todayData.push({user, clockInDate, clockInTime, clockOutDate, clockOutTime, hours, minutes, address}) }
      })
      this.props.postTodayData(todayData);
      })
  }

  showTableData(){
    let today =[];
    this.props.todayData.map(eachData => {

      today.push(
        <tr>
          <td>{eachData.user}</td>
          <td>{eachData.clockInTime}</td>
          <td>{eachData.clockOutTime}</td>
          <td>{eachData.hours}:{eachData.minutes}</td>
          <td>{eachData.address}</td>
        </tr>
      )
    })
    return today;
  }

  renderTodayData(){
    if(this.props.user.email === "vivek@gmail.com"){
      return(
        <Table responsive hover bordered striped condensed>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Hours Worked (HH:MM)</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
          {
            this.showTableData()
          }
          </tbody>
        </Table>
      )
    } else {
        return (<div>You are not authorized to view this page.</div>)
      }
  }

  render(){
    return(
      <div className="container manager-wrapper">
        <Link><button className="btn btn-default" onClick={()=>{browserHistory.push('/')}}><Glyphicon title="back" glyph="menu-left" />Back</button></Link>
        <h2><u>Today's Data</u></h2>
        <div>{this.renderTodayData()}</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {user, data, todayData} = state;

  return {
    user,
    data,
    todayData
  }
}
export default connect (mapStateToProps,{ postTodayData })(ManagerView);
