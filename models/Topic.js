const {Schema, model} = require('mongoose');

const TopicSchema = Schema(
  {
    name: {
      type: String,
      required: true
    }
  }
)

module.exports = model('Topic', TopicSchema);
