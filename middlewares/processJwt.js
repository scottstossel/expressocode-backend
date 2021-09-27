const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateJwt = (id) => {
  return new Promise((resolve, reject) => {
    const data = { uid: id };
    jwt.sign(
      data,
      process.env.SECRET_KEY,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

const validateJwt = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({message: "Token not found"});
  }
  try {
    const {uid} = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({message: "Invalid token"});
  }
}

const isAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({message: "Need validation first"});
  }
  const { role, name } = req.user;
  if (role !== 'ADMIN') {
    return res.status(401).json({message: `User ${name} does not have privileges for this operation`});
  }
  next();
}

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({message: "Need validation first"});
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({message: "User does not have valid role"});
    }
    next();
  }
} 

module.exports = {generateJwt, validateJwt, isAdmin, hasRole};