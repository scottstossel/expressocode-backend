const {Schema, model} = require('mongoose');

const CommentSchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    }
  },
  {timestamps: true}
)

module.exports = model('Comment', CommentSchema);