import React,{Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { browserHistory, Link } from 'react-router';
import {Glyphicon, ButtonGroup, Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';

var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EmployeeData extends Component{

  state={
    currentMonth:moment().month()+1,
  }

  renderMonthData(){
    let monthData=[];
    let currmo = this.state.currentMonth;
    this.props.data.map(oneData=>{
        if(moment(oneData.clockOutDate,'MMMM Do YYYY').month()+1 === currmo){
          monthData.push(oneData.clockOutDate);
        }

    })

    return(
      <div><strong>{moment(currmo,'MM').format('MMMM')}</strong>: {monthData.length} days present</div>
    )
  }

  renderWholeData(){
    let cmo = this.state.currentMonth;
    let wholeData=[];
    const {data} = this.props;
    const no_of_days = moment(cmo,'MM').daysInMonth();
    for(let i= 1; i <= no_of_days; i++){
      if(i<10){
        i='0'+i;
      }
      const date = moment(`${i}${cmo}`,'DD MM');

       let dateFinder = _.find(data, function(item) {
        const clkin = moment(item.clockOutDate, 'MMMM Do YYYY');
        return clkin.date() === date.date() && clkin.month() === date.month();
      })

        if(dateFinder){

          wholeData.push(
            <tr key={dateFinder.clockInDate}>
              <td>{dateFinder.clockInDate}</td>
              <td>{dateFinder.clockInTime}</td>
              <td>{dateFinder.clockOutTime}</td>
              <td>{dateFinder.hours}:{dateFinder.minutes}</td>
              <td>{dateFinder.clockInTime && dateFinder.clockOutTime ? "Present" : "Absent"}</td>
              <td>{dateFinder.address}</td>
            </tr>
          )
        }
        else{

          wholeData.push(
            <tr>
              <td>{date.format('MMMM Do YYYY')}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )
        }

    }
    return wholeData;
  }

  renderChart(){
    let cmo = this.state.currentMonth;
    let dates=[];
    let wholeData=[];
    const {data} = this.props;
    const no_of_days = moment(cmo,'MM').daysInMonth();
    for(let i= 1; i <= no_of_days; i++){
      if(i<10){
        i='0'+i;
      }
      const date = moment(`${i}${cmo}`,'DD MM');

       let dateFinder = _.find(data, function(item) {
        const clkin = moment(item.clockOutDate, 'MMMM Do YYYY');
        return clkin.date() === date.date() && clkin.month() === date.month();
      })

        if(dateFinder){
          dates.push({label: date.format('MMM DD YY'), y:1});
          wholeData.push(
            <tr key={dateFinder.clockInDate}>
              <td>{dateFinder.clockInDate}</td>
              <td>{dateFinder.clockInTime}</td>
              <td>{dateFinder.clockOutTime}</td>
              <td>{dateFinder.hours}:{dateFinder.minutes}</td>
              <td>{dateFinder.clockInTime && dateFinder.clockOutTime ? "Present" : "Absent"}</td>
              <td>{dateFinder.address}</td>
            </tr>
          )
        }
        else{
          dates.push({label: date.format('MMM DD YY'), y:0});
          wholeData.push(
            <tr>
              <td>{date.format('MMMM Do YYYY')}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )
        }

    }

  const options = {
    animationEnabled: true,

    title: {
      text: "Monthwise Attendance Chart"
    },
    subtitles: [{
				text: "Present: 1    Absent: 0"
			}],
    axisX: {
				title: "Date",
         interval:1,
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},

      axisY: {
  				title: "Present(1)/Absent(0)",
           interval:1,
  				crosshair: {
  					enabled: true,
  					snapToDataPoint: true
  				}
  			},

    data: [
      {
        type: "column",
        dataPoints:  dates

      }
    ]
  }

  return(
    <div><CanvasJSChart options = {options} />


    </div>);
  }


  setMonth(k){
    this.setState({currentMonth: k})
  }


  //Month button group
  renderButtons(){
    let buttons=[];
    for(let j=1; j<=12; j++){
      buttons.push(<Button key={j} className="btn btn-default" onClick={()=>this.setMonth(j)}>{moment(j,'MM').format('MMMM')}</Button>)
    }
    return buttons;
  }

  render(){
		return (
    <div className="chart-wrapper">
      <div className="container">
        <Link><button className="btn btn-default" onClick={()=>{browserHistory.push('/')}}><Glyphicon title="back" glyph="menu-left" />Back</button></Link>
      </div>
      <div>
        <h3><center>Select a month:</center></h3>
        <div className="button-container">
          <ButtonGroup>
          {
            this.renderButtons()
          }
          </ButtonGroup>
        </div>
        <div className="month-container">{this.renderMonthData()}</div>
      <div className="chart-container">
        {this.renderChart()}
      </div>

      <div>
        <Table responsive hover bordered striped condensed>
        <thead>
        <tr>
        <th>Date</th>
        <th>Time In</th>
        <th>Time Out</th>
        <th>Hours Worked (HH:MM)</th>
        <th>Status</th>
        <th>Location</th>
        </tr>
        </thead>
        <tbody>
          {this.renderWholeData()}
        </tbody>
        </Table>
        </div>
    	</div>
    </div>
		);
  }
}

function mapStateToProps(state){
  const {user, data} = state;
  return {
    user,
    data,
  }
}

export default connect (mapStateToProps)(EmployeeData);
