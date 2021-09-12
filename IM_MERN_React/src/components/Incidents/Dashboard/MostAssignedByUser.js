import React, {useEffect} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {GetMostAssignedToUsers} from '../../../store/actions/dashboardActions';
import { connect } from 'react-redux';

function MostAssignedByUser({MostAssignedIncidentsData, getMostAssignedToUsers}) {

  useEffect(() => {
    getMostAssignedToUsers();
  }, []);

   if(MostAssignedIncidentsData.length ===0 || MostAssignedIncidentsData == null )
   return (<h3>loading..</h3>);
console.log("MostAssignedIncidentsData", MostAssignedIncidentsData[0].Name);
  let data = [];

  try{
    let colorIndex = 0;
    MostAssignedIncidentsData.forEach(d => {
      let color = "";
      switch(colorIndex){
        case 0:
          color = "#B71C1C";
          break;
          case 1:
          color = "#E53935";
          break;
          case 2:
          color = "#EF5350";
          break;
          case 3:
          color = "#E57373";
          break;
          case 4:
          color = "#FFCDD2";
          break;
        default:
          color = "green";
      };
      colorIndex++;
      data.push(
        { name: d.Name, y: parseInt(d.Count), color:color }
      )
    });  

  }
  catch(err){
    console.log("error", err);
  }

    const options = {
        title: {
          text: 'My chart'
        },
        chart: {    
          type: 'bar',
          height: (70) + '%',
          //width: (100) + '%',
         },
         title:{
            text:''
        },
        credits:
        {
            enabled: false
        },
        legend: {
            enabled: false
        },
        yAxis: {
            title: {
                text: ''
            }
        },
    
        xAxis: {
            type: 'category',
            min: 0,
            labels: {
                animate: true
            }
        },
      
         series: [{
          name: '',
          dataSorting: {
            enabled: true,
            sortKey: 'y'
        },
          data: data
      }]
      }

    return (
      <div className="col s12 m12 l6 widget">
        <div className="">
          <h5> Most Assigned To Users</h5>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    );
}


const mapStateToProps = (state) => {        
  return{   
      userId :state.userLogin.userId,  // logged in User Id  
      MostAssignedIncidentsData: state.dashboard.MostAssignedIncidentsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMostAssignedToUsers: () => dispatch(GetMostAssignedToUsers()),     
  }
}

// create 

export default connect(mapStateToProps, mapDispatchToProps)(MostAssignedByUser);

//please invert binary tree
