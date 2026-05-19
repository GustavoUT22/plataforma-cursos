const User = require('../models/User.model');

//create user 
exports.createUser = async (req, res) => {
    try {
        const create = await User.create(req.body);
        res.status(201).json({
            message: "User created",
        data: create
    })
    } catch (error){
        res.status(400).json({
            message: error.message
        })
    }
}