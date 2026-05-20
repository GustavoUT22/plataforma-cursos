const Enrollment = require('../models/Enrollment.model');
const User = require('../models/User.model');
const Course = require('../models/Course.model');

const inscribirCurso = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const estudianteExiste = await User.findById(studentId);
        if (!estudianteExiste) {
            return res.status(404).json({ message: 'El ID del estudiante no existe' });
        }

        if (estudianteExiste.role !== 'Estudiante') {
            return res.status(400).json({ message: 'El usuario debe tener el rol de Estudiante para matricularse' });
        }

        const cursoExiste = await Course.findById(courseId);
        if (!cursoExiste) {
            return res.status(404).json({ message: 'El ID del curso no existe' });
        }

        const yaInscrito = await Enrollment.findOne({ studentId, courseId });
        if (yaInscrito) {
            return res.status(400).json({ message: 'El estudiante ya se encuentra matriculado en este curso' });
        }

        const nuevaInscripcion = new Enrollment({
            studentId,
            courseId
        });

        await nuevaInscripcion.save();

        res.status(201).json({
            status: 'success',
            message: 'Estudiante matriculado exitosamente',
            data: nuevaInscripcion
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la matrícula', error: error.message });
    }
};

const obtenerMisCursos = async (req, res) => {
    try {
        const { estudianteId } = req.params;

        const misInscripciones = await Enrollment.find({ studentId: estudianteId })
            .populate({
                path: 'courseId',
                select: 'name description',
                populate: { path: 'teacher', select: 'name email' } 
            });

        res.status(200).json({
            status: 'success',
            results: misInscripciones.length,
            data: misInscripciones
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos del estudiante', error: error.message });
    }
};

module.exports = {
    inscribirCurso,
    obtenerMisCursos
};