import React,{Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { browserHistory, Link } from 'react-router';
import {Glyphicon} from 'react-bootstrap';

var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EmployeeData extends Component{

  renderChart(){
    let dates=[];
    const {data} = this.props;
    const no_of_days = moment().date();
    for(let i= 1; i <= no_of_days; i++){
      const date = moment().subtract(no_of_days - i, 'day');

       let dateFinder = _.find(data, function(item) {
        const clkin = moment(item.clockInDate, 'MMMM Do YYYY').date();
        return clkin === date.date()
      })
        if(dateFinder){
          dates.push({label: date.format('MMM DD YY'), y:1});
        }
        else{
          dates.push({label: date.format('MMM DD YY'), y:0});
        }

    }

  const options = {
    title: {
      text: "Attendance Chart"
    },
    axisX: {
				title: "Dates(From starting of the month to the present date)",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},

      axisY: {
  				title: "Present(1)/Absent(0)",
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


  return(<div><CanvasJSChart options = {options} /></div>);
  }

  render(){
		return (
    <div className="container">
      <Link><button className="btn btn-default" onClick={()=>{browserHistory.push('/')}}>Back</button></Link>
  		<div>
      {this.renderChart()}
  		</div>
    </div>
		);


  }
}

function mapStateToProps(state){
  const {user, data} = state;
  return {
    user,
    data
  }
}

export default connect (mapStateToProps)(EmployeeData);
