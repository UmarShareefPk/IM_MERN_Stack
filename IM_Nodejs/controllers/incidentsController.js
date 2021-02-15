const Incident = require('../models/incident');
const IncidentAttachment = require('../models/incidentAttachment');
var fs = require('fs');


const incidentById = (req, res) => {
  Incident.findById(req.params.id)
      .then(r => res.json(r))
      .catch(err => res.json(err))
 }

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
    TotalIncidents : total
  });
}


module.exports = {
  incidentById,
  addIncident,
  incidentsWithPage
}