import React, {Component } from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'react-infinite-calendar/styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import moment from 'moment';
class CalendarShow extends Component {

constructor(props){
  super(props);

  this.state={
    dates:''
  }
}



  render(){
    let filterData = _.filter(this.props.data, {user: this.props.user.email});
    let filterDate =[];
    filterData.map(d => {
      filterDate.push(new Date(moment(d.clockInDate, "MMM Do YYYY")))
    })



const MultipleDateCalendar = withMultipleDates(InfiniteCalendar);

    return(
      <div>
        <InfiniteCalendar
          width={400}
          height={300}
          Component={withMultipleDates(Calendar)}
          selected={filterDate}


        />

      </div>
    )
  }
}


function mapStateToProps(state){

  const {data} = state;
  const {user} = state;
  return {
    user,
    data
  }
}
export default connect (mapStateToProps)(CalendarShow);
