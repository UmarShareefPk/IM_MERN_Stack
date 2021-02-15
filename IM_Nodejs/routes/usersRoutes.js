const express = require('express');
const usersController = require('../controllers/usersController');


const router = express.Router();

 router.post('/login', usersController.login);        
 router.get('/userById/:id', usersController.userById);
 router.get('/allUsers', usersController.allUsers);
 router.get('/addUser', usersController.addUser);
 router.get('/addUserLogin', usersController.addUserLogin);
 


// router.get('/', blogController.blog_index);
// router.post('/', blogController.blog_create_post);
// router.get('/:id', blogController.blog_details);
// router.delete('/:id', blogController.blog_delete);

module.exports = router;