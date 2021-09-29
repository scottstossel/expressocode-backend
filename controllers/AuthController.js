const bcrypt = require('bcryptjs');
const { generateJwt } = require('../middlewares/processJwt');
const cloudinary = require('cloudinary').v2;

const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    if (users.length === 0) {
      return res.status(400).json({message: "No users found ಠ_ಠ"});
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: "Couldn't get the users (╯°□°）╯︵ ┻━┻"});
  }
}

const signUpUser = async (req, res) => {
  const { email } = req.body;
  const testEmail = await User.findOne({email});
  if (testEmail) {
    return res.status(500).json({message: "Email already in use"});
  }
  const user = new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the user"});
  }
}

const uploadProfileImg = async (req, res) => {
  const { id } = req.params;
  const userToUpdate = await User.findById(id);

  if (userToUpdate.img) {
    let array = userToUpdate.img.split('/');
    userToUpdate.img = "";
    let fileName = array[array.length-1];
    const [public_id] = fileName.split('.');
    try {
      await cloudinary.uploader.destroy(public_id);
    } catch (error) {
      console.log('no cloudinary image');
    }
  }

  const {tempFilePath} = req.files.image;

  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
  userToUpdate.img = secure_url;
  await userToUpdate.save();
  try {
    return res.status(201).json(userToUpdate);
  } catch (error) {
    return res.status(500).json({message: "There was an error uploading the image"});
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    return res.status(500).json({message: "Please check credentials"});
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({message: "Please check credentials"});
  } 
  const token = await generateJwt(user._id);
  return res.status(200).json({user, token});
}

module.exports = {
  getAllUsers,
  signUpUser,
  uploadProfileImg,
  loginUser
}