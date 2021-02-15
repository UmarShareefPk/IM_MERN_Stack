import axios from 'axios';
import qs from 'qs';
import { usersUrls } from "../../api/apiURLs";


  export const logIn = (credentials) => {
    return (dispatch, getState) => {   
         axios({
            method: 'post',
            //url: baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan,
            url : usersUrls.authenticateUrl,
            headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
            data: qs.stringify({
                              grant_type: 'password',
                              username: credentials.username,
                              password: credentials.password 
                          }),
          })
          .then((response)=>{              
              const loginData = {
                  token : response.data.Token,
                  Name :  response.data.user.FirstName + " " +  response.data.user.LastName,
                  User_Id :  response.data.user._id
              }
              console.log("Login Data",loginData);
              dispatch({ type: 'LOGIN_PASS', loginData });
          })
          .catch((err)=>{
                  dispatch({ type: 'LOGIN_FAIL'});
                   console.log(err);
          });    
    }
  }
  
  
  export const signOut = () => {
    return (dispatch, getState) => {     
      dispatch({ type: 'SIGN_OUT', data:null });
    }
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState) => {     
    }
  }

  export const updateHubId = (hubId, userId) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = usersUrls.updateHubIdUrl 
        axios.post(url, {
          HubId : hubId,
          UserId : userId
        })
          .then((response)=>{          
          
             dispatch({ type: 'UPDATE_HUB', hubId });
          })
          .catch((err)=>{                 
                   console.log(err);
          });
    
    }
  }