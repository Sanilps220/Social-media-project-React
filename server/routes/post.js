const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requireLogin = require('../middelware/requireLogin')

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedby","_id name")
    .populate("comments.postedby","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err);
    })
})
   const drop = ()=>{
    Post.deleteOne({ "comments.text" : 'beautifull' }).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
   }
router.post('/createpost',requireLogin,(req,res)=>{
    const {title, body, pic} = req.body
    if(!title || !body || !pic ){
        res.status(422).json({error:"please add the all the fields"})
    }
    console.log("server 3 field",title, body, pic);
    req.user.password = undefined;
    const post = new Post({
       title: title,
       body : body,
        photo:pic,
        postedby:req.user
    })
    post.save()
    .then(result=>{
        console.log(result);
        res.json({post:result})
    })
    .catch(err => {         
        console.log(err);
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedby:req.user._id})
    .populate("postedby","_id name")
    .then(mypost=>{
        res.json({mypost:mypost})
    })
    .catch(err=>{
        console.log(err);
    }) 
})

router.put('/like', requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("likes.postedby","_id name")
    .populate("postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result);
        }
    })
})
router.put('/unlike', requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true    
    }).populate("likes.postedby","_id name")
    .populate("postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result);
        }
    })
})
router.put('/comment', requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedby:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedby","_id name")
    .populate("postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result);
        }
    })
})

router.delete('/deletePost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedby","_id name")
   
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedby._id.toString() === req.user._id.toString()){
            post.remove()            
            .then(result=>{
                res.json({result:result})
            }).catch(err=> console.log(err))
        }
    })
})

router.delete('/deletetext/:postId',requireLogin,(req,res)=>{
    Post.findOne({"commets._id":req.params.postId})
    .populate("postedby","_id name")
    .exec((err,comments)=>{
        if(err || !comments){
            return res.status(422).json({error:err})
        }
        if(comments.postedby._id.toString() === req.user._id.toString()){
            comments.remove()
            .then(result=>{
                res.json({result:result})
            }).catch(err=> console.log(err))
        }
    })   
})

module.exports = router