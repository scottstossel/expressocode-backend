const {Schema, model} = require('mongoose');

const PostSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    content: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    topic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Topic'
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: 0
    }
  },
    {timestamps: true},
    {minimize: false}
);

module.exports = model('Post', PostSchema);