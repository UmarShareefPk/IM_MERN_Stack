
import socketIOClient from "socket.io-client";

export   const incidentUpdatedSignalR =  (incidentId) => {
  // const connection = new HubConnectionBuilder()
  // .withUrl('https://localhost:44310/hubs/notifications')
  // .withAutomaticReconnect()
  // .withHubProtocol(new JsonHubProtocol())
  // .configureLogging(LogLevel.Information)
  // .build();

  // connection.start().then(()=>{
  //     console.log(connection.connectionStarted);
  //     if (connection.connectionStarted) {
  //         try {
  //             connection.send("SendIncidentUpdate", incidentId);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       } else {
  //         alert("No connection to server yet.");
  //       }
  // })      
  let socket = socketIOClient("http://localhost:5555");

  // socket.on('chat message', function(msg) {
  //   console.log(msg);
  // });
  // socket.on('Incident Updated', function(incidentId) {
  //   console.log(msg);
  // });  
 
  socket.emit('Incident Updated', incidentId);
  
};


// export   const commentSent =  (message) => {
//         const connection = new HubConnectionBuilder()
//         .withUrl('https://localhost:44310/hubs/notifications')
//         .withAutomaticReconnect()
//         .withHubProtocol(new JsonHubProtocol())
//         .configureLogging(LogLevel.Information)
//         .build();

//         connection.start().then(()=>{
//             console.log(connection.connectionStarted);
//             if (connection.connectionStarted) {
//                 try {
//                     connection.send("Send", message);
//                 } catch (e) {
//                   console.log(e);
//                 }
//               } else {
//                 alert("No connection to server yet.");
//               }
//         })      
    
//     };


