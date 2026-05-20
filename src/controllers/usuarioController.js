const User = require('../models/User.model'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const usuarioExiste = await User.findOne({ email: email.toLowerCase() });
        if (usuarioExiste) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            name,
            email,
            password: passwordEncriptada,
            role
        });

        await nuevoUsuario.save();

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado con éxito',
            data: {
                id: nuevoUsuario._id,
                name: nuevoUsuario.name,
                email: nuevoUsuario.email,
                role: nuevoUsuario.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor al registrar', error: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email: email.toLowerCase() });
        if (!usuario) {
            return res.status(400).json({ message: 'Credenciales incorrectas (Correo no encontrado)' });
        }

        const contraseñaCorrecta = await bcrypt.compare(password, usuario.password);
        if (!contraseñaCorrecta) {
            return res.status(400).json({ message: 'Credenciales incorrectas (Contraseña inválida)' });
        }

        const token = jwt.sign(
            { id: usuario._id, role: usuario.role },
            process.env.JWT_SECRET || 'FirmaSecretaSuperSeguraDelISIL',
            { expiresIn: '24h' } 
        );

        res.status(200).json({
            status: 'success',
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: usuario._id,
                name: usuario.name,
                role: usuario.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor al iniciar sesión', error: error.message });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};