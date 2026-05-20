const Enrollment = require('../models/Enrollment.model');
const User = require('../models/User.model');
const Course = require('../models/Course.model');

const enrollmentCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const studentExists = await User.findById(studentId);
        if (!studentExists) {
            return res.status(404).json({ message: 'El ID del estudiante no existe' });
        }

        if (studentExists.role !== 'student') {
            return res.status(400).json({ message: 'El usuario debe tener el rol de Estudiante para matricularse' });
        }

        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ message: 'El ID del curso no existe' });
        }

        const isEnrollment = await Enrollment.findOne({ studentId, courseId });
        if (isEnrollment) {
            return res.status(400).json({ message: 'El estudiante ya se encuentra matriculado en este curso' });
        }

        const newEnrollment = new Enrollment({
            studentId,
            courseId
        });

        await newEnrollment.save();

        res.status(201).json({
            status: 'success',
            message: 'Estudiante matriculado exitosamente',
            data: newEnrollment
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la matrícula', error: error.message });
    }
};

const getMyCourses = async (req, res) => {
    try {
        const { studentId } = req.params;

        const myEnrollments = await Enrollment.find({studentId})
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
        res.status(500).json({ message: 'Error al obtener los cursos del estudiante', error: error.message });
    }
};

module.exports = {
    enrollmentCourse,
    getMyCourses
};