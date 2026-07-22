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
  category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true
  },
  teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Un curso debe tener un docente asignado']
  },
  modality: {
      type: String,
      enum: ['Presencial', 'Online', 'Híbrido'],
      default: 'Presencial'
  },
  duration: {
      type: Number,
      default: 0,
      min: 0
  },
  vacancies: {
      type: Number,
      default: 0,
      min: 0
  },
  price: {
      type: Number,
      default: 0,
      min: 0
  },
  startDate: {
      type: Date
  },
  isActive: {
      type: Boolean,
      default: true
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);