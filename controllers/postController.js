
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({message: error})
  }
};


const deletePost =  async(req,res) =>{
  const {id} = req.params
 try {
   await Post.findByIdAndDelete(id);
   res.status(200).json({message: "Post deleted"})
 } catch (error) {
  res.status(500).json({message: error})
 }
}

 
module.exports = {createPost, deletePost}
