const {Schema, model} = require('mongoose');

const TopicSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  }
)

module.exports = model('Topic', TopicSchema);
