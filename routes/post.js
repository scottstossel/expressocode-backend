const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/PostController");

const { validateJwt } = require('../middlewares/processJwt');

router.get('/', getAllPosts);

router.get('/post/:id', getPostById);

router.post('/post', validateJwt, createPost);

router.put('/post/:id', validateJwt, updatePost);

router.delete('/post/:id', validateJwt, deletePost);

module.exports = router;