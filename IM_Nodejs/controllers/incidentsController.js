const Incident = require('../models/incident');
const multiparty = require('multiparty');


const incidentById = (req, res) => {
  Incident.findById(req.params.id)
      .then(r => res.json(r))
      .catch(err => res.json(err))
 }

const addIncident = (req, res) => {
  //res.json(req);
  console.log("req.body" , req.body);
  console.log("req.files" , req.files);
  // let form = new multiparty.Form();

  // form.parse(req, function(err, fields, files) {
  //    Object.keys(fields).forEach(function(name) {
  //         console.log('got field named ' + name);
  //     });
  // });

  res.json("yes");

  const incident = new Incident({
    CreatedBy : new Date(),
    AssignedTo : "Ali",
    CreatedAT : "Ashraf",
    Title : "test",
    Description : "Ali.Ashraf@gmail.com",
    AdditionalData : "03236006334",
    Attachments : "test",
    StartTime : "test",
    DueDate : "test",
    Status : "test",
    Comments : "test"
  });

  // incident.save()
  //     .then((r)=> {
  //       res.json(r);
  //      })
  //      .catch(err => {
  //        res.json(r);
  //      })
    }

module.exports = {
  incidentById,
  addIncident
}