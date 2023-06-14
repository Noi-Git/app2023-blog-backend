const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: ture,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

//compile
const Category = mongoose.model('Category', categorySchema)

module.exports = Category