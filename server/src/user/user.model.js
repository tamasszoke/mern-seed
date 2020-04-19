'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

/**
 * Create user schema
 */
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  },
  googleId: {
    type: String,
    minlength: 5,
    maxlength: 1000
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1000
  },
  salt: {
    type: String,
    minlength: 5,
    maxlength: 20
  },
  active: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  activation: {
    type: String,
    default: ''
  },
  recovery: {
    type: String,
    default: ''
  },
  age: {
    type: String,
    minlength: 3,
    maxlength: 5
  },
  location: {
    type: String,
    minlength: 3,
    maxlength: 100
  },
  website: String,
  created_at: Date,
  updated_at: Date
})

/**
 * Create a model using user schema
 */
module.exports = mongoose.model('User', userSchema)
