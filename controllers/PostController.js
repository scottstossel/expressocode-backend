const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("user", "username")
    .populate("topic", "name");
  try {
    if (posts.length === 0) {
      return res.status(400).json({ message: "Didn't find any posts" });
    }
    return res.status(200).json(meetings);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get the posts" });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("user", "username");
  try {
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Please try again later" });
  }
};

exports.createPost = async (req, res) => {
  const postToCreate = await Post.create(req.body);
  try {
    return res.status(201).json(postToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create the post" });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const postToUpdate = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(postToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't update the post" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const postToDelete = await Post.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Successfully deleted post" });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't delete post" });
  }
};
