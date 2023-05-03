const mongoose = require('mongoose')

// create schema

const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, 'First name is required'],
    type: String,
  },
})
