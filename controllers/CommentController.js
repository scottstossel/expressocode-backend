const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "username")
    .populate("post", "title");
  try {
    if (comments.length === 0) {
      return res.status(400).json({ message: "Could not find any comments"});
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Could not get the comments"});
  }
}

exports.getComment = async (req, res) => {
  const {id} = req.params;
  const comment = await Comment.findById(id)
  .populate("user", "username")
  .populate("post", "title");
  try {
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Could not get comment"});
  }
}

exports.createComment = async (req, res) => {
  const commentToCreate = await Comment.create(req.body);
  try {
    return res.status(201).json(commentToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Could not create comment"});
  }
}

exports.updateComment = async (req, res) => {
  const {id} = req.params;
  const commentToUpdate = await Comment.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(commentToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Could not update comment"});
  }
}

exports.deleteComment = async (req, res) => {
  const {id} = req.params;
  const commentToDelete = await Comment.findByIdAndDelete(id);
  try {
    return res.status(203).json({message: "Comment successfully deleted"});
  } catch (error) {
    return res.status(500).json({message: "Could not delete comment"});
  }
}