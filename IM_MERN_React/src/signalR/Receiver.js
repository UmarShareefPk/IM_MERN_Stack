import {React, useEffect} from 'react'
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { commentRecieved, getAllNotifications } from "../store/actions/notificationsActions";
import { updateHubId } from '../store/actions/userLoginActions'


  function Receiver({commentRecieved, updateHubId, userId, refreshNotifications, token}) {

    useEffect(() => { 
        let socket = socketIOClient("http://localhost:5555", {
          extraHeaders: {
            "x-access-token": token
        }});
        socket.on('connect', function() {
          const sessionID = socket.id; //
          console.log('socket id : ' + sessionID);
          updateHubId(sessionID, userId);
        });

        socket.on('UpdateNotifications', function(incidentId) {
          console.log(incidentId + " has been updated.");
          refreshNotifications(userId);
        });
     
    }, []) 

    return (
        <>            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      allAssignees: state.users.users,
      incidentData: state.incidents.IncidentSelected,
      userId :state.userLogin.userId,  // logged in User Id  
      token : state.userLogin.token     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        commentRecieved: (comment) => dispatch(commentRecieved(comment)),
        updateHubId: (hubId, userId) => dispatch(updateHubId(hubId, userId)),
        refreshNotifications : (userId) =>  dispatch(getAllNotifications(userId))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Receiver);
  
