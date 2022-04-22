const Joi = require('joi');
const user = require('../models/user');
const User = require('../models/user');

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const validateNewUser = async (req, res, next) => {
    const validation = userSchema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
    }

    try {
        const emailExists = await User.findOne({ email: req.body.email });
        const usernameExists = await User.findOne({ username: req.body.username });

        if (emailExists || usernameExists) {
            res.status(400).send('Username or e-mail already in use.');
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
}

module.exports = validateNewUser;