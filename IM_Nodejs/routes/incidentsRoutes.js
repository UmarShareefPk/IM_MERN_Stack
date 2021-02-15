const express = require('express');
const incidentsController = require('../controllers/incidentsController');
let multer = require('multer');
let upload = multer();

const router = express.Router();

 router.get('/incidentById/:id', incidentsController.incidentById);
 router.post('/addincident', upload.any() , incidentsController.addIncident);
 router.get('/incidentsWithPage', incidentsController.incidentsWithPage);

module.exports = router;