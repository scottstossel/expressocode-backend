const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/PostController");

router.get('/', getAllPosts);

router.get('/post/:id', getPostById);

router.post('/post', createPost);

router.put('/post/:id', updatePost);

router.delete('/post/:id', deletePost);

module.exports = router;