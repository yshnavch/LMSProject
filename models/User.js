const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  coursename:{
    type: String,
    required: true
  },
  complete: {
      type: Boolean,
      required: true
    }
});

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    
  },
  deadline: {
    type: Date,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact:{
    type: String,
    required: true
  },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
  image:{
    data:Buffer,
    type:String,
    required: true
  },
  tasks:[TaskSchema],
  courses:[CourseSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
