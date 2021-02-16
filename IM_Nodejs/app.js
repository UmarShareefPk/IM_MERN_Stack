const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes');
const incidentsRoutes = require('./routes/incidentsRoutes');
var cors = require('cors');
const bodyParser = require('body-parser');

// express app
const app = express();
app.use(cors());

// connect to mongodb & listen for requests
const dbURI= "mongodb+srv://admin:pioneer007@cluster0.dg9t8.mongodb.net/IM?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3333))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {  
//     res.locals.path = req.path;
//     next();
//   });  

app.use('/users', usersRoutes);
app.use('/incidents', incidentsRoutes);

app.get('/person', (req, res) => {  
    res.json("Working");
});
 