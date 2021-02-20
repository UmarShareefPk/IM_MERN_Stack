const User = require('../models/user');
const UserLogin = require('../models/userlogin');
var jwt = require('jsonwebtoken');
var config = require('../config');


const login = async (req, res) => {
 
  var userlogin = await UserLogin.find({Username : req.body.username , Password : req.body.password})
  
   if (userlogin.length === 0) 
     res.json("Invalid username or password");

  const loginInfo = userlogin[0];

  var user = await User.findById(loginInfo.UserId);

 var token = jwt.sign({userId : loginInfo.UserId}, config.secret, {
  expiresIn: 86400 // expires in 24 hours
});

res.status(200).send({ 
                      Id :  loginInfo.UserId,
                      user : user,
                      Token : token 
                    });
}



const userById = (req, res) => {

 var token = req.headers["x-access-token"];
 if (!token)
   return res.status(401).send({ auth: false, message: "No token provided." });

 jwt.verify(token, config.secret, function (err, decoded) {
   if (err)
     return res
       .status(500)
       .send({ auth: false, message: "Failed to authenticate token." });

   res.status(200).send(decoded);
 });

  User.findById(req.params.id)
      .then(r => res.json(r))
      .catch(err => res.json(err))
 }

 const allUsers = (req, res) => {  
   User.find()
       .then(r => res.json(r))
       .catch(err => res.json(err))
  }


const addUser = (req, res) => {
  const user = new User({
    CreateDate : new Date(),
    FirstName : "Ali",
    LastName : "Ashraf",
    ProfilePic : "test",
    Email : "Ali.Ashraf@gmail.com",
    Phone : "03236006334"
  });

  user.save()
      .then((r)=> {
        res.json(r);
       })
       .catch(err => {
         res.json(r);
       });
}

const addUserLogin = (req, res) => {
  const userlogin = new UserLogin({
    UserId : "6025a25dc3fe122284bfb351",
    Username : "ali",
    Password : "password"   
  });

  userlogin.save()
      .then((r)=> {
        res.json(r);
       })
       .catch(err => {
         res.json(r);
       });
}

const updateSocketId = async (req, res) => {

  let updateResult = await User.findOneAndUpdate({_id: req.body.UserId}, { $set: {SocketId :  req.body.SocketId}}, {useFindAndModify: false}, ()=>{
  });
  //console.log(updateResult);
}


// const blog_details = (req, res) => {
//   const id = req.params.id;
//   Blog.findById(id)
//     .then(result => {
//       res.render('details', { blog: result, title: 'Blog Details' });
//     })
//     .catch(err => {
//       console.log(err);
//       res.render('404', { title: 'Blog not found' });
//     });
// }




// const blog_delete = (req, res) => {
//   const id = req.params.id;
//   Blog.findByIdAndDelete(id)
//     .then(result => {
//       res.json({ redirect: '/blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

module.exports = {
  login,
  userById,
  allUsers,
  addUser,
  addUserLogin,
  updateSocketId
  // blog_details, 
  // blog_create_get, 
  // blog_create_post, 
  // blog_delete
}