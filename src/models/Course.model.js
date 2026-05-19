const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true,
  },
  teacher: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  }
})