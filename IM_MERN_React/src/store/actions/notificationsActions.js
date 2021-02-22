import axios from 'axios';
import { usersUrls } from "../../api/apiURLs";

export const  commentRecieved = (comment) => {
    return (dispatch, getState) => {  
     
      dispatch({ type: 'COMMENT_RECIEVED', comment });  
    }
  }

  export const  getAllNotifications = (userId) => {
    return (dispatch, getState) => {      
      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = usersUrls.allNotificationsUrl + "?userId=" + userId;
        axios.get(url)
          .then((response)=>{            
             const notifications = response.data;
             dispatch({ type: 'GET_ALL_NOTIFICATIONS', data : notifications });
          })
          .catch((err)=>{                 
                   console.log(err);
          });
    
    }
  }

  export const  setNotificationStatus = (id, isRead) => {
    return (dispatch, getState) => {      
      console.log(id);
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = usersUrls.setNotificationStatusUrl + "?notificationId=" + id + "&isRead="+ isRead;
        axios.get(url)
          .then((response)=>{            
             const notification = {
               id,
               isRead
             };
             dispatch({ type: 'STATUS_CHANGED', data : notification });
          })
          .catch((err)=>{                 
                   console.log(err);
          });
    
    }
  }




 