//const baseUrl = "https://localhost:44398/";
const baseUrl = "http://localhost:3333/";

export const usersUrls = {
    tokenUrl : baseUrl + "users/login",
    authenticateUrl :  baseUrl + "users/login",
    allUsersUrl : baseUrl + "users/allUsers",
    userssWithPageUrl : baseUrl + "users/usersWithPage?",
    addNewUserUrl : baseUrl + "users/addUser",
    updateSocketIdUrl : baseUrl + "users/updateSocketId",
    allNotificationsUrl :  baseUrl + "notifications/getAllNotifications",
    setNotificationStatusUrl : baseUrl + "notifications/setNotificationStatus"
}

export const incidentsUrls = {
    incidentsWithPageUrl : baseUrl + "incidents/incidentsWithPage?",
    addNewIncidentUrl : baseUrl + "incidents/addincident",
    addNewCommentUrl : baseUrl + "incidents/AddComment",
    deleteCommentUrl : baseUrl + "incidents/deleteComment?",
    updateIncidentUrl : baseUrl + "incidents/updateIncident",
    updateCommentUrl : baseUrl + "incidents/updateComment",    
    getIncidentByIdUrl : baseUrl + "incidents/incidentById?Id=",
    deleteAttachmentUrl : baseUrl + "incidents/deleteFile?",
    downloadFileUrl : baseUrl + "incidents/downloadFile?",
}

export const dashboardUrls = {
    kpiUrl : baseUrl + "api/Incidents/KPI?userId=",
    overallWidgetUrl : baseUrl + "Incidents/OverallWidget",
    last5IncidentsUrl : baseUrl + "Incidents/Last5Incidents",
    oldest5UnresolvedIncidentsUrl : baseUrl + "Incidents/Oldest5UnresolvedIncidents?",
    mostAssignedToUsersIncidentsUrl : baseUrl + "Incidents/MostAssignedToUsersIncidents",
}