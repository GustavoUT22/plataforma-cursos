require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User.model");
const Course = require("./models/Course.model");
const Enrollment = require("./models/Enrollment.model");

async function seed() {
    try {
        await connectDB();

        // Limpiar colecciones para dejar la base en un estado conocido
        await Enrollment.deleteMany({});
        await Course.deleteMany({});
        await User.deleteMany({});

        // Usuarios de prueba (contraseñas cifradas con bcrypt)
        const admin = await User.create({
            name: "Administrador",
            email: "admin@test.com",
            password: await bcrypt.hash("admin123", 10),
            role: "admin",
            status: "active",
        });

        const teacher = await User.create({
            name: "Docente Demo",
            email: "docente@test.com",
            password: await bcrypt.hash("docente123", 10),
            role: "teacher",
            status: "active",
        });

        const student = await User.create({
            name: "Estudiante Demo",
            email: "estudiante@test.com",
            password: await bcrypt.hash("estudiante123", 10),
            role: "student",
            status: "active",
        });

        // Cursos de ejemplo, todos con el docente asignado
        const courses = await Course.create([
            {
                name: "Programación Web II",
                description: "Desarrollo full stack con Node.js, Angular, React y Next.js.",
                category: "Frontend",
                teacher: teacher._id,
                modality: "Híbrido",
                duration: 40,
                vacancies: 30,
                price: 180,
                startDate: new Date("2026-08-01"),
                isActive: true,
            },
            {
                name: "Backend con Node.js",
                description: "APIs REST con Express, MongoDB y autenticación por JWT.",
                category: "Backend",
                teacher: teacher._id,
                modality: "Online",
                duration: 55,
                vacancies: 25,
                price: 220,
                startDate: new Date("2026-08-15"),
                isActive: true,
            },
            {
                name: "Bases de Datos NoSQL",
                description: "Modelado y consultas con MongoDB y Mongoose.",
                category: "Bases de Datos",
                teacher: teacher._id,
                modality: "Presencial",
                duration: 35,
                vacancies: 20,
                price: 0,
                startDate: new Date("2026-09-01"),
                isActive: true,
            },
        ]);

        // Inscripción del estudiante al primer curso
        await Enrollment.create({
            studentId: student._id,
            courseId: courses[0]._id,
        });

        console.log("Semilla cargada correctamente:");
        console.log(`  - ${await User.countDocuments()} usuarios`);
        console.log(`  - ${await Course.countDocuments()} cursos`);
        console.log(`  - ${await Enrollment.countDocuments()} inscripción`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error al cargar la semilla:", error.message);
        process.exit(1);
    }
}

seed();
