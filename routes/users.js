const express = require('express');
const router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



var Storage= multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage:Storage
}).single('file');



// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
{  
  res.render('dashboard', {
    user: req.user
  })
});

router.get('/edit', ensureAuthenticated,(req,res)=>{
  
  res.render('edit',{
    user:req.user
  })
})

router.post('/edit',upload,async (req, res) => {
  
  var { name, email, contact, password } = req.body;
  var user={ 
    _id:req.user._id,
    name,
    email,
    contact,
    password
  }
  const hashedpassword= await bcrypt.hash(password, 10);
  let errors = [];

  if (!name || !email || !password || !contact ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (contact.length != 10) {
    errors.push({ msg: 'Contact number must be 10 digits' });
  }
  if(isNaN(contact)){
    errors.push({ msg: 'Contact number must be a number'});
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('edit', {
      errors,
      user
    });
  }
  else{    

    if(req.file){
      const image =req.file.filename;
      var data= {
        name,
        email,
        contact,
        password:hashedpassword,
        image
      } 
    }
    else{
      var data= {
        name,
        email,
        contact,
        password:hashedpassword
      } 
    }
    
    User.findByIdAndUpdate(req.user._id,data,function(err,result){
      if(err){
        console.log(err);
      }
      else{
        
        res.redirect('/dashboard');
      }
    })
  }

})





// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));


// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register',upload, (req, res) => {
  const { name, email, contact, password } = req.body;
  const image =req.file.filename;
  let errors = [];

  if (!name || !email || !password || !contact || !image) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (contact.length != 10) {
    errors.push({ msg: 'Contact number must be 10 digits' });
  }
  if(isNaN(contact)){
    errors.push({ msg: 'Contact number must be a number'});
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      contact,
      password,
      image
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          contact,
          password,
          image
        });
      } else {
        const newUser = new User({
          name,
          email,
          contact,
          password,
          image,
          tasks:[]
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();// with passport we get this
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;
