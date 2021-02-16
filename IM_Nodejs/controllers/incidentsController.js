const Incident = require('../models/incident');
const IncidentAttachment = require('../models/incidentAttachment');
const Comment = require('../models/comment');
const CommentAttachment = require('../models/commentAttachment');
var fs = require('fs');


// const incidentById = (req, res) => {
//   Incident.findById(req.params.id)
//       .then(r => res.json(r))
//       .catch(err => res.json(err))
//  }


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

 console.log(cAttachments);

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

const incidentsWithPage = async (req, res) => {
  let PageSize =  req.query.PageSize;
  let PageNumber =  req.query.PageNumber;
  let SortBy =  req.query.SortBy;
  let SortDirection =  req.query.SortDirection;

  let total = await Incident.find().countDocuments();
  let skip = PageSize * (PageNumber - 1); 

  let incidents = await Incident.find().skip(skip).limit(parseInt(PageSize)).sort('createdAt');

  res.json({
    Incidents : incidents,
    Total_Incidents : total
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  incidentById,
  addIncident,
  incidentsWithPage,
  addComment
}