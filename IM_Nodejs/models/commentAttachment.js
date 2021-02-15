const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentAttachmentSchema = new Schema({
  FileName: {
    type: String,
    required: true,
  },
  ContentType: {
    type: String,
    required: true,
  },
  CommentId: {
    type: String,
    required: true
  }
}, { timestamps: true });

const CommentAttachment = mongoose.model('IncidentAttachment', commentAttachmentSchema);
module.exports = CommentAttachment;
