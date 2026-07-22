const Course = require('../models/Course.model');
const User = require('../models/User.model');

const createCourse = async (req, res) => {
    try {
        const { name, description, teacher, category, modality, duration, vacancies, price, startDate, isActive } = req.body;

        const teacherExists = await User.findById(teacher);
        if (!teacherExists) {
            return res.status(404).json({ message: 'El ID del docente asignado no existe en la base de datos' });
        }

        if (teacherExists.role !== 'teacher' && teacherExists.role !== 'admin') {
            return res.status(400).json({ message: 'El usuario asignado debe tener el rol de Docente o Admin' });
        }

        const newCourse = await Course.create({
            name,
            description,
            teacher,
            category,
            modality: modality || 'Presencial',
            duration: duration || 0,
            vacancies: vacancies || 0,
            price: price || 0,
            startDate: startDate || null,
            isActive: isActive !== undefined ? isActive : true
        });

        const populatedCourse = await Course.findById(newCourse._id).populate('teacher', 'name email');

        res.status(201).json({
            status: 'success',
            message: 'Curso creado exitosamente',
            data: populatedCourse
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


const getCourseById = async (req, res) => {
    try {
      const {id} = req.params;
      const course = await Course.findById(id).populate('teacher', 'name email');

      if(!course) {
        return res.status(404).json({
          message: 'Curso NO encontrado'
        });
      }

      res.status(200).json({
        status: 'success',
        data: course
      });
      
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener el curso seleccionado',
        error: error.message
      });
    }
}

const updateCourse = async (req, res) => {
  try {
    const { name, description, teacher, category, modality, duration, vacancies, price, startDate, isActive } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (teacher !== undefined) updateData.teacher = teacher;
    if (category !== undefined) updateData.category = category;
    if (modality !== undefined) updateData.modality = modality;
    if (duration !== undefined) updateData.duration = duration;
    if (vacancies !== undefined) updateData.vacancies = vacancies;
    if (price !== undefined) updateData.price = price;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (isActive !== undefined) updateData.isActive = isActive;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('teacher', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json({
      message: 'Curso actualizado correctamente',
      course
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    deleteCourse,
    updateCourse
};