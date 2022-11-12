const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../keys')
router.get('/',(req,res)=>{
    console.log('req recieved');
    res.send('Hello');
    res.end()
})

router.get('/protected',(rerq,res)=>{
    
})
router.post('/signup',(req,res)=>{
    let {name ,email ,password}=req.body
    if(!email || !password || !name ){
        return res.json({err:"please enter all fields"});
    }//res.json({message:"Succesfull posted"});
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.json({err:"user already exists ! please goto logIn"});
        }
        bcrypt.hash(password,10)
        .then(hashedPassword  =>{
        const user = new User({
            email,
            password:hashedPassword,
            name
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfull"})
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        throw err;
    })
})
})
router.post('/signin',(req,res)=>{
    const {email ,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please provide email or password"})
    }else{
    User.findOne({email:email})
    .then(savedUser=>{  
        if(!savedUser){
          return  res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password , savedUser.password)
        .then(dotMatch=>{
            if(dotMatch){
                //res.json({message:"Login succesfull"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET) 
                const {_id, name, email} = savedUser
                res.json({token, user: _id,name,email})
            }else{
                return res.status(422).json({error:"Invalid email or password"})
               
            }
        })
        .catch(err=>{
            throw err;
        })      
    })
    }
})
module.exports = router