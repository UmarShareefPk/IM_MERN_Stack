import {React, useEffect} from 'react'
import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";

import { commentRecieved, getAllNotifications } from "../store/actions/notificationsActions";
import { updateHubId } from '../store/actions/userLoginActions'


  function Receiver({commentRecieved, updateHubId, userId, refreshNotifications}) {

    useEffect(() => {   
        
        // const newConnection = new HubConnectionBuilder()
        // .withUrl('https://localhost:44310/hubs/notifications')
        // .withAutomaticReconnect()
        // .withHubProtocol(new JsonHubProtocol())
        // .configureLogging(LogLevel.Information)
        // .build();
        // console.log("newConnection",newConnection);
        // newConnection.start()
        // .then(result => {
        //     console.log('Connected!');
        //     let hubId = newConnection.connectionId; 
        //     updateHubId(hubId, userId);
            
        //     newConnection.on('ReceiveMessage', (message) => {
        //         console.log(message);
        //          commentRecieved(message);
        //     });
        //     newConnection.on('UpdateNotifications', (incidentId) => {
        //       console.log(incidentId);
        //       refreshNotifications(userId);
        //   });

        // })
        // .catch(e => console.log('Connection failed: ', e));

        let socket = socketIOClient("http://localhost:5555");
        socket.on('connect', function() {
          const sessionID = socket.id; //
          console.log('socket id : ' + sessionID);
          updateHubId(sessionID, userId);
        });

        socket.on('UpdateNotifications', function(incidentId) {
          console.log(incidentId + " has been updated.");
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
  
