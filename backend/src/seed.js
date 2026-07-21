/**
 * Script de semilla (datos de prueba).
 * Crea usuarios (admin, docente, estudiante) y algunos cursos.
 *
 * Uso:
 *   node src/seed.js         (local, con .env)
 *   npm run seed
 *
 * En Render se puede ejecutar una vez desde la pestaña "Shell".
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User.model');
const Course = require('./models/Course.model');
const Enrollment = require('./models/Enrollment.model');

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Falta MONGO_URI en las variables de entorno');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB. Limpiando colecciones...');

    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Enrollment.deleteMany({}),
    ]);

    const hash = (plain) => bcrypt.hash(plain, 10);

    // --- Usuarios de prueba ---
    const [admin, teacher, student] = await User.create([
      {
        name: 'Administrador',
        email: 'admin@test.com',
        password: await hash('admin123'),
        role: 'admin',
        status: 'active',
      },
      {
        name: 'Juan Pérez',
        email: 'docente@test.com',
        password: await hash('docente123'),
        role: 'teacher',
        status: 'active',
      },
      {
        name: 'Ana Estudiante',
        email: 'estudiante@test.com',
        password: await hash('estudiante123'),
        role: 'student',
        status: 'active',
      },
    ]);

    // --- Cursos de prueba (asignados al docente) ---
    const courses = await Course.create([
      {
        name: 'Introducción a Angular',
        description: 'Componentes, servicios, rutas y formularios reactivos.',
        teacher: teacher._id,
        category: 'Desarrollo web',
      },
      {
        name: 'React desde cero',
        description: 'Hooks, React Router y consumo de APIs.',
        teacher: teacher._id,
        category: 'Desarrollo web',
      },
      {
        name: 'API REST con Node y Express',
        description: 'Rutas, controladores, JWT y MongoDB.',
        teacher: teacher._id,
        category: 'Backend',
      },
    ]);

    // --- Inscripción de ejemplo del estudiante al primer curso ---
    await Enrollment.create({ studentId: student._id, courseId: courses[0]._id });

    console.log('Semilla completada:');
    console.log(`  ${await User.countDocuments()} usuarios`);
    console.log(`  ${await Course.countDocuments()} cursos`);
    console.log(`  ${await Enrollment.countDocuments()} inscripción(es)`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar la semilla:', error.message);
    process.exit(1);
  }
}

seed();
