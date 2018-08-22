for(let d= moment("August 1st 2018").format('MMMM Do YYYY'); d<=moment().format('MMMM Do YYYY'); d=moment().add(1,'d')){
  this.props.data.map(eachData => {
    if(eachData.clockInDate == d){
      return (
        <td>clockInDate</td>
        <td>clockInTime</td>
        <td>clockOutTime</td>
        <td>Hours Worked</td>
        <td>Present</td>
      )
    } else {
      return(
        <td>clockInDate</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>Absent</td>
      )
    }
    }
  })

}
