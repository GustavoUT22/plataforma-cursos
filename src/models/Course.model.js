const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'El nombre del curso es obligatorio'],
      trim: true
  },
  description: {
      type: String,
      required: [true, 'La descripción es obligatoria']
  },
  teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Un curso debe tener un docente asignado']
  },
  category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);