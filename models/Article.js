const {Schema, model} = require('mongoose');

const ArticleSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    }
  }
)