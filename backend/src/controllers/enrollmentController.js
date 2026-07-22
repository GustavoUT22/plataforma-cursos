const Enrollment = require('../models/Enrollment.model');
const User = require('../models/User.model');
const Course = require('../models/Course.model');

const enrollmentCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: 'El curso no existe' });
    }

    const alreadyEnrolled = await Enrollment.findOne({ studentId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
    }

    const newEnrollment = await Enrollment.create({ studentId, courseId });

    res.status(201).json({
      message: 'Estudiante matriculado exitosamente',
      enrollment: newEnrollment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const { studentId } = req.params;

    const myEnrollments = await Enrollment.find({ studentId })
      .populate({
        path: 'courseId',
        select: 'name description',
        populate: { path: 'teacher', select: 'name email' }
      });

    res.status(200).json({
      status: 'success',
      results: myEnrollments.length,
      data: myEnrollments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Un administrador inscribe a un estudiante en un curso (indicando ambos ids)
const adminEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ message: 'El estudiante y el curso son obligatorios' });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'El estudiante no existe' });
    }
    if (student.role !== 'student') {
      return res.status(400).json({ message: 'El usuario seleccionado no es un estudiante' });
    }

    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: 'El curso no existe' });
    }

    const alreadyEnrolled = await Enrollment.findOne({ studentId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'El estudiante ya está inscrito en este curso' });
    }

    const newEnrollment = await Enrollment.create({ studentId, courseId });

    res.status(201).json({
      message: 'Estudiante inscrito exitosamente',
      enrollment: newEnrollment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// El estudiante autenticado consulta SUS propias inscripciones (usa el id del token)
const getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.user.id;

    const myEnrollments = await Enrollment.find({ studentId })
      .populate({
        path: 'courseId',
        select: 'name description category',
        populate: { path: 'teacher', select: 'name email' }
      });

    res.status(200).json({
      status: 'success',
      results: myEnrollments.length,
      data: myEnrollments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollmentCourse, getMyCourses, getMyEnrollments, adminEnrollment };