const express = require('express');
const router = express.Router();
const {createPost, deletePost} = require('../controllers/postController')

router.post('/createPost' , createPost)
router.post('/deletePost/:id' , deletePost)


module.exports=router