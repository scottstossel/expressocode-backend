const express = require("express");
const router = express.Router();

const {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");

const {validateJwt} = require('../middlewares/processJwt');

router.get('/', getAllComments);

router.get('/comment/:id', getComment);

router.post('/comment', validateJwt, createComment);

router.put('/comment/:id', validateJwt, updateComment);

router.delete('/comment/:id', validateJwt, deleteComment);

module.exports = router;
