const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "username")
    .populate("post", "name");
  try {
    if (comments.length === 0) {
      return res.status(400).json({ message: "Could not find any comments"});
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Could not get the comments"});
  }
}