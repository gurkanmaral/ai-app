import  express  from "express";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: "dlr7epyqh",
    api_key:"644682596698682",
    api_secret:"bbEOJPGaF-Rk3gLBXdxJ2w3U9CQ",
})

// GET ALL POSTS
router.route('/').get(async(req,res)=> {
    try {
        const posts = await Post.find({});
        res.status(200).json({success:true, data:posts})
    } catch(error){
        res.status(500).json({success:false, message:error})
    }
})
// CREATE A POST
router.route('/').post(async(req,res)=> {
   try {
    const {name, prompt, photo} = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
    })

    res.status(201).json({success: true, data: newPost})
   }catch(error){
    res.status(500).json({success:false, message:error})
   }
});
export default router