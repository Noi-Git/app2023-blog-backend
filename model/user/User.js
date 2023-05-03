const mongoose = require('mongoose')

// create schema

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
})
