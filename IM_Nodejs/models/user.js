const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  CreateDate: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true
  },
  ProfilePic: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: false
  },
  Phone: {
    type: String,
    required: true
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
