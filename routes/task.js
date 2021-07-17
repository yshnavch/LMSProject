const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


const User = require('../models/User');

var userid;

router.get('/tasks/:id',ensureAuthenticated,(req,res)=>{
  userid=req.params.id;
  User.findOne({_id:userid}).then((data,err)=>{
    if(err) throw err;
    res.render('tasks',{
      records:data,
      user: data
    })
}).catch(err => console.log(err));
})
router.post('/tasks',(req,res)=>{
  const {task,date} =req.body;
  console.log(userid + " heyyyy");
  //var id=req.params.id;
  User.findOne({_id:userid}).then((data,err)=>{
    if(err) throw err;
    data.tasks.push({
      task:task,
      completed:false,
      deadline:date
    })
    data.save().then((data,err)=>{
      if(err) throw err;
      
      res.render('tasks',{
        records:data,
        user:data
      });
    }).catch(err => console.log(err));
  })

  
});

router.get('/editTask/:id',ensureAuthenticated,(req,res)=>{
  var id=req.params.id;
  User.findOne({_id:userid},(err,user)=>{
  

    user.tasks.forEach((obj)=>{
      if(obj._id== id){
        if(obj.completed== false){
            obj.completed=true;
            user.save().then(()=>{
              User.findOne({_id:userid}).then((data,err)=>{
                if(err) throw err;
                res.render('tasks',{
                  records:data,
                  user: data
                })
              }).catch(err => console.log(err));
            
            }).catch(err => console.log(err));
            
        }
        else if(obj.completed== true){
           obj.completed=false;
           user.save().then(()=>{
            User.findOne({_id:userid}).then((data,err)=>{
              if(err) throw err;
              res.render('tasks',{
                records:data,
                user: data
              })
            }).catch(err => console.log(err));
           }).catch(err => console.log(err));
            
         
        }
      }
    })

  })
  

  
})


           
router.get('/delete/:id',ensureAuthenticated,(req,res,next)=>{
  var id=req.params.id;
  User.findOne({_id:userid},(err,user)=>{
    user.tasks.forEach((obj)=>{
      if(obj._id== id){
        var newUser =user.tasks.filter((x)=>{
           return x._id!= id;
        })
        user.tasks=newUser;
        user.save().then(()=>{
          User.findOne({_id:userid}).then((data,err)=>{
            if(err) throw err;
            res.render('tasks',{
              records:data,
              user: data
            })
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }
    })
  })
  


})



module.exports = router;
