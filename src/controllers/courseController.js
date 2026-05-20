const Course = require('../models/Course.model');
const User = require('../models/User.model');

const createCourse = async (req, res) => {
    try {
        const { name, description, teacher, category } = req.body;

        const teacherExists = await User.findById(teacher);
        if (!teacherExists) {
            return res.status(404).json({ message: 'El ID del docente asignado no existe en la base de datos' });
        }

        if (teacherExists.role !== 'teacher' && teacherExists.role !== 'admin') {
            return res.status(400).json({ message: 'El usuario asignado debe tener el rol de Docente o Admin' });
        }

        const newCourse  = new Course({
            name,
            description,
            teacher,
            category
        });

        await newCourse.save();

        res.status(201).json({
            status: 'success',
            message: 'Curso creado exitosamente',
            data: newCourse
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al crear el curso', error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name email');
        
        res.status(200).json({
            status: 'success',
            results: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos', error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses
};