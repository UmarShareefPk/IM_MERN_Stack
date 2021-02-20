const initState = {
    user_Name : null,
    userId : null,
    loginError : false,
    token : null ,
    socketId : null  
   
   }
   
   const usersReducer = (state = initState, action) => {
     switch (action.type) {
       case "LOGIN_PASS":
         return {
           ...state,
           user_Name: action.loginData.Name,
           userId: action.loginData.User_Id,
           loginError: false,
           token: action.loginData.token,
         };
       case "LOGIN_FAIL":
         return {
           ...state,
           user_Name: null,
           userId: null,
           loginError: true,
           token: null,
         };

       case "UPDATE_SOCKET":
         return {
           ...state,
           socketId: action.socketId,
         };
       case "SIGN_OUT":
         return {
           ...state,
           user_Name : null,
           userId : null,
           loginError : false,
           token : null ,
           socketId : null  
          
         };
       default:
         return state;
     }
   };
   
   export default usersReducer;