const Course = require('../models/Course.model');
const User = require('../models/User.model');

const crearCurso = async (req, res) => {
    try {
        const { name, description, teacher, category } = req.body;

        const docenteExiste = await User.findById(teacher);
        if (!docenteExiste) {
            return res.status(404).json({ message: 'El ID del docente asignado no existe en la base de datos' });
        }

        if (docenteExiste.role !== 'Docente' && docenteExiste.role !== 'Admin') {
            return res.status(400).json({ message: 'El usuario asignado debe tener el rol de Docente o Admin' });
        }

        const nuevoCurso = new Course({
            name,
            description,
            teacher,
            category
        });

        await nuevoCurso.save();

        res.status(201).json({
            status: 'success',
            message: 'Curso creado exitosamente',
            data: nuevoCurso
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al crear el curso', error: error.message });
    }
};

const obtenerCursos = async (req, res) => {
    try {
        const cursos = await Course.find().populate('teacher', 'name email');
        
        res.status(200).json({
            status: 'success',
            results: cursos.length,
            data: cursos
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos', error: error.message });
    }
};

module.exports = {
    crearCurso,
    obtenerCursos
};