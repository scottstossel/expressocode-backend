const {Schema, model} = require('mongoose');

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    google: {
      type: Boolean,
      default: false
    },
    facebook: {
      type: Boolean,
      default: false
    }
  }
);

UserSchema.methods.toJSON = function() {
  const {password, _id, __v, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

module.exports = model('User', UserSchema);