import _ from 'lodash';
import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {hrRef} from '../firebase';
import {connect} from 'react-redux';
import {postedData} from '../actions';
import moment from 'moment';

class AttendanceTable extends Component {

  componentWillMount(){
    hrRef.on('value',snap => {
      let data = [];
      snap.forEach(dataObj => {
        const {user} = dataObj.val();
          if(user === this.props.user.email){
            const { user, clockInDate, clockInTime, clockOutDate, clockOutTime } = dataObj.val();
            data.push({user, clockInDate, clockInTime, clockOutDate, clockOutTime}) }
      })
      this.props.postedData(data);
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.email && !this.props.user.email) {
      hrRef.on('value',snap => {
        let data = [];
        snap.forEach(dataObj => {
          const {user} = dataObj.val();
            if(user === nextProps.user.email){
              const { user, clockInDate, clockInTime, clockOutDate, clockOutTime, hours, minutes } = dataObj.val();
              data.push({user, clockInDate, clockInTime, clockOutDate, clockOutTime, hours, minutes }) }
        })
        this.props.postedData(data);
        })
    }
  }

showTableData = () => {
  let rows = [];
  const no_of_days = moment().date();
  const clockIns = this.props.data;
  for(let i= 1; i <= no_of_days; i++){
    const current = _.find(clockIns, function(item) {
      const clkin = moment(item.clockInDate, 'MMMM Do YYYY').date();
      const date = moment().subtract(no_of_days - i, 'day').date();
      return clkin === date
    })
    if (current) {
      rows.push(
        <tr key={current.clockInDate}>
          <td>{current.clockInDate}</td>
          <td>{current.clockInTime}</td>
          <td>{current.clockOutTime}</td>
          <td>{current.hours}:{current.minutes}</td>
          <td>Present</td>
        </tr>
      )
    } else{
      rows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>Absent</td>
        </tr>
      )

}  }
  return rows
}


  render(){

    return(
      <div className="tablebody">
        <Table responsive hover bordered striped condensed>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Hours Worked (HH:MM)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
            this.showTableData()
          }

          </tbody>
        </Table>
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

export default connect(mapStateToProps, {postedData})(AttendanceTable);
