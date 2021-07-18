const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


const User = require('../models/User');


router.get('/dom',ensureAuthenticated,(req,res)=>{
    var found=false;
    User.findOne({_id:req.user._id},async(err,data)=>{
        await data.courses.forEach((obj)=>{
            if(obj.coursename == "DOM"){
                found=true;
            }
        })
        if(found== true){
            res.render('dom',{
                user:data
              })
        }
        else{
            data.courses.push({
                coursename:"DOM",
                complete:false
            })
            data.save().then(()=>{
                res.render('dom',{
                    user:data
                  })
            }).catch(err => console.log(err));
        }
        
    })
   
})

router.get('/domedit',ensureAuthenticated,(req,res)=>{
    User.findOne({_id:req.user._id}).then((data)=>{
        
        data.courses.forEach((obj)=>{
            if(obj.coursename == "DOM"){
                if(obj.complete== false){
                    obj.complete= true;
                    data.save().then(()=>{
                        res.render('dom',{
                            user:data
                        })
                    }).catch(err => console.log(err));
                }
                else{
                    obj.complete= false;
                    data.save().then(()=>{
                        res.render('dom',{
                            user:data
                        })
                    }).catch(err => console.log(err));
                }
                
            }
        })
        
    }).catch(err => console.log(err));
})

router.get('/js',ensureAuthenticated,(req,res)=>{
    var found=false;
    User.findOne({_id:req.user._id},async(err,data)=>{
        await data.courses.forEach((obj)=>{
            if(obj.coursename == "Javascript"){
                found=true;
            }
        })
        if(found== true){
            res.render('javascript',{
                user:data
              })
        }
        else{
            data.courses.push({
                coursename:"Javascript",
                complete:false
            })
            data.save().then(()=>{
                res.render('javascript',{
                    user:data
                  })
            }).catch(err => console.log(err));
        }
        
    })
   
})

router.get('/jsedit',ensureAuthenticated,(req,res)=>{
    User.findOne({_id:req.user._id}).then((data)=>{
        
        data.courses.forEach((obj)=>{
            if(obj.coursename == "Javascript"){
                if(obj.complete== false){
                    obj.complete= true;
                    data.save().then(()=>{
                        res.render('javascript',{
                            user:data
                        })
                    }).catch(err => console.log(err));
                }
                else{
                    obj.complete= false;
                    data.save().then(()=>{
                        res.render('javascript',{
                            user:data
                        })
                    }).catch(err => console.log(err));
                }
                
            }
        })
        
    }).catch(err => console.log(err));
})

router.get('/node',ensureAuthenticated,(req,res)=>{
    var found=false;
    User.findOne({_id:req.user._id},async(err,data)=>{
        await data.courses.forEach((obj)=>{
            if(obj.coursename == "Nodejs"){
                found=true;
            }
        })
        if(found== true){
            res.render('nodejs',{
                user:data
              })
        }
        else{
            data.courses.push({
                coursename:"Nodejs",
                complete:false
            })
            data.save().then(()=>{
                res.render('nodejs',{
                    user:data
                  })
            }).catch(err => console.log(err));
        }
        
    })
   
})

router.get('/nodeedit',ensureAuthenticated,(req,res)=>{
    User.findOne({_id:req.user._id}).then((data)=>{
        
        data.courses.forEach((obj)=>{
            if(obj.coursename == "Nodejs"){
                if(obj.complete== false){
                    obj.complete= true;
                    data.save().then(()=>{
                        res.render('nodejs',{
                            user:data
                        })
                    }).catch(err => console.log(err));
                }
                else{
                    obj.complete= false;
                    data.save().then(()=>{
                        res.render('nodejs',{
                            user:data
                        })
                    }).catch(err => console.log(err));
                }
                
            }
        })
        
    }).catch(err => console.log(err));
})


module.exports = router;
