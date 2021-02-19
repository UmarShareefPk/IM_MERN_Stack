const Incident = require('../models/incident');
const IncidentAttachment = require('../models/incidentAttachment');
const Comment = require('../models/comment');
const CommentAttachment = require('../models/commentAttachment');
var fs = require('fs');
var path = require('path');


const incidentById = async (req, res) => {
  let id =  req.query.Id;

 let inc = await Incident.findById(id)     
      .catch(err => res.json(err));

  let incident = JSON.parse(JSON.stringify(inc)); // without it, cannot add new property in object. like attachments and comments

  incident.Attachments = await IncidentAttachment.find({IncidentId : id});

 incident.Comments = await Comment.find({IncidentId : id}).sort({'createdAt' : -1})
                            
 let commentsIds =[] 
 incident.Comments.map(c => {
  commentsIds.push(c._id);
 })

 let cAttachments = await CommentAttachment.find({ CommentId: { "$in" : commentsIds} });

 incident.Comments = incident.Comments.map(c => {
  let comment = JSON.parse(JSON.stringify(c));
  let attachs =cAttachments.find(file => file.CommentId === comment._id); 
  comment.attachments = attachs? [].concat(attachs) : [];
  return comment;
 })

 res.json(incident);
 }

 //////////////////////////////////////////////////////////////////////////////////////////////////////

const addIncident = async (req, res) => {
  
  const incident = new Incident(req.body);
  var newIncident = await incident.save().catch(err=>res.status(400).json(err));
  var id = newIncident._id;  

  if (!fs.existsSync('./Attachments/Incidents/' + id)) {
    fs.mkdir('./Attachments/Incidents/' + id, err => {       
      });
  }   

  req.files.forEach(file => {
    let path = './Attachments/Incidents/' + id + '/'+ file.originalname
    fs.writeFile(path , file.buffer, async ()=>{
      const incidentAttachment = new IncidentAttachment({
                                        FileName : file.originalname,
                                        ContentType : file.mimetype,
                                        IncidentId : id,
                                        Size : file.size
                                    });
      await incidentAttachment.save();
    })  
  });

  res.status(200).json("Incident added.");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
const addComment = async (req, res) => {

  const comment = new Comment(req.body);
  var newComment = await comment.save().catch(err=>res.status(400).json(err));
  var id = newComment._id;  

  let comment_response = JSON.parse(JSON.stringify(newComment)); // without it, cannot add new property in object. like attachments

  comment_response.attachments = [];

  if(!req.files || req.files.length === 0)
       res.status(200).json(comment_response);

  if (!fs.existsSync('./Attachments/Incidents/'  + newComment.IncidentId +'/Comments/' + "/" + id)) {   
    fs.mkdir('./Attachments/Incidents/'  + newComment.IncidentId +'/Comments/' + "/" + id,  {recursive: true}, err => {             
      });
  }   
  let fileCount = req.files.length;
  req.files.forEach(file => {
    let path = './Attachments/Incidents/'  + newComment.IncidentId +'/Comments/' + "/" + id + '/'+ file.originalname
    fs.writeFile(path , file.buffer, async ()=>{
      const commentAttachment = new CommentAttachment({
                                        FileName : file.originalname,
                                        ContentType : file.mimetype,
                                        CommentId : id,
                                        Size : file.size
                                    });
     let attch =  await commentAttachment.save();
     comment_response.attachments = [...comment_response.attachments , attch]    
    fileCount--;
    if(fileCount === 0)
      res.status(200).json(comment_response);
    })  
  });  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
const updateIncident = async (req, res) => {
  let field = req.body.Parameter;
  let incidentId = req.body.IncidentId;
  let value = req.body.Value;
  let userId = req.body.UserId;
  let = updateobj = {};
  switch(field.toLowerCase()){
    case 'assignedto':
      updateobj = {AssignedTo : value };
      break;
    case 'title':
      updateobj = {Title : value };
      break;
    case 'description':
      updateobj = {Description : value };
      break;
    case 'additionaldata':
      updateobj = {AdditionalData : value };
      break;
    case 'starttime':
      updateobj = {StartTime : value };
      break;
    case 'duedate':
      updateobj = {DueDate : value };
      break;
    case 'status':
      updateobj = {Status : value };
      break;
    default:
      updateobj = {};
  }

  let updateResult = await Incident.findOneAndUpdate({_id: incidentId}, { $set: updateobj}, {useFindAndModify: false}, ()=>{
  });

  res.status(200).json(updateResult);  
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
const updateComment = async (req, res) => {

   let commentId = req.body._id; 
  let updateobj = {CommentText : req.body.CommentText };   

   let updateResult = await Comment.findOneAndUpdate({_id: commentId}, { $set: updateobj}, {useFindAndModify: false}, ()=>{
   });
   
  res.status(200).json(updateResult);  
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

const incidentsWithPage = async (req, res) => {
  let PageSize =  req.query.PageSize;
  let PageNumber =  req.query.PageNumber;
  let SortBy =  req.query.SortBy;
  let SortDirection =  req.query.SortDirection;

  let total = await Incident.find().countDocuments();
  let skip = PageSize * (PageNumber - 1); 

  let incidents = await Incident.find().skip(skip).limit(parseInt(PageSize)).sort({'createdAt' : -1});

  res.json({
    Incidents : incidents,
    Total_Incidents : total
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

const downloadFile = (req, res) => {
  let type =  req.query.type;
  let CommentId =  req.query.commentId;
  let incidentId =  req.query.incidentId;
  let FileName =  req.query.filename;
  let ContentType =  req.query.ContentType;
  let filepath = "";
  if(!CommentId || CommentId =="") 
    filepath =path.join( __dirname.replace("\controllers" , "") ,
                  '/Attachments/Incidents/' + incidentId +  '/' + FileName);
  else
  filepath =path.join( __dirname.replace("\controllers" , "") ,
                  '/Attachments/Incidents/' + incidentId +  '/Comments/'+ CommentId + '/' + FileName);

  let dirpath = __dirname.replace("\controllers" , "");  
  res.download(filepath);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  incidentById,
  addIncident,
  incidentsWithPage,
  addComment,
  updateIncident,
  downloadFile,
  updateComment
}