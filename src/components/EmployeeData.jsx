import React,{Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

class EmployeeData extends Component{

  renderChart(){
    let dates=[];
    const {data} = this.props;
    const no_of_days = moment().date();
    for(let i= 1; i <= no_of_days; i++){
      const date = moment().subtract(no_of_days - i, 'day');
       _.find(data, function(item) {
        const clkin = moment(item.clockInDate, 'MMMM Do YYYY').date();
        if(clkin === date.date()){
          dates.push(1);
        }
        else{
          dates.push(0);
        }
      })
    }

    return (
      <div>
        chart
    </div>
  )
  }

  render(){

    console.log("data",this.props.data);
    return(
      <div className="container">
      {this.renderChart()}
      </div>
    )
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
