//const baseUrl = "https://localhost:44398/";
const baseUrl = "http://localhost:3333/";

export const usersUrls = {
    tokenUrl : baseUrl + "users/login",
    authenticateUrl :  baseUrl + "users/login",
    allUsersUrl : baseUrl + "users/allUsers",
    userssWithPageUrl : baseUrl + "api/Users/GetUsersWithPage?",
    addNewUserUrl : baseUrl + "api/Users/AddUser",
    updateHubIdUrl : baseUrl + "api/Users/UpdateHubId",
    allNotificationsUrl :  baseUrl + "api/Users/UserNotifications",
    setNotificationStatusUrl : baseUrl + "api/Users/UpdateIsRead"
}

export const incidentsUrls = {
    incidentsWithPageUrl : baseUrl + "incidents/incidentsWithPage?",
    addNewIncidentUrl : baseUrl + "incidents/addincident",
    addNewCommentUrl : baseUrl + "incidents/AddComment",
    deleteCommentUrl : baseUrl + "api/Incidents/DeleteComment?",
    updateIncidentUrl : baseUrl + "incidents/updateIncident",
    updateCommentUrl : baseUrl + "api/Incidents/UpdateComment",    
    getIncidentByIdUrl : baseUrl + "incidents/incidentById?Id=",
    deleteAttachmentUrl : baseUrl + "api/Incidents/DeleteFile?",
    downloadFileUrl : baseUrl + "api/Incidents/DownloadFile?",
}