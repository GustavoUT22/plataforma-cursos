const { rolesAvailable } = require('../utils/rolesAvailable');
const mongoose = require('mongoose');
const User = require("../models/User.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    // const userExists = await User.findOne({email: req.body.email})
    const userExists = await User.findOne({email});
    if (userExists){
      return res.status(401)
        .json({ message: 'El email ya ha sido usado' });
    }

    if (!rolesAvailable.includes(role)){
      return res.status(401)
        .json({ message: `El rol ${role} no es válido`});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({
      message: 'Usuario creado con éxito',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }));

    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "El email o contraseña es inválido"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "El email o contraseña es inválido"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '4h'
      }
    );

    res.json({
      message: 'Login exitoso',
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}