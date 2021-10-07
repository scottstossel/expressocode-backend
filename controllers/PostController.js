const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().sort("-createdAt")
    .populate("user", "username")
    .populate("topic", "name")
  try {
    if (posts.length === 0) {
      return res.status(400).json({ message: "Didn't find any posts" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get the posts" });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id)
  .populate("user", "username")
  .populate("topic", "name");
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

// PUT/post
exports.likePost = async (req, res) => {
  // params.id -> id of the post, to know which update
  // find the postById()
  // const likes = post.likes;
  // if (likes.contains)
  // if (arr.indexOf('lasdkjflaksdjflasdf875875') !== -1) console.log("User already liked post");
  // once you have the const, look for all the ids inside the 'likes' of the post
  // if (you find an id of the user) -> exit, he already like the post,
  // otherwise get all the ids into a new array
  // new_arr = [...old_id, new_user_id]
  //post.likes = new_array
  // post.save()

}

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
