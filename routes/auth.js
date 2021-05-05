const router = require('express').Router();
const User = require('../models/user');
const { validateNewUser } = require('../utils/validations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', validateNewUser, async (req, res) => {
    const { username, email, password } = req.body;

    //Hash password
    const pwd = await bcrypt.hash(password, 10);

    //Create User
    try {
        const user = new User({
            username,
            email,
            password: pwd
        })

        await user.save();
        res.send(`User ${user.username} created. ID: ${user._id}`);
    } catch (e) {
        res.send(e);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
            res.send('Incorrect e-mail or password');
        } else {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

            res.header('auth-token', token).send('Logged in');
        }


    } catch (e) {
        res.send(e);
    }
})

module.exports = router;
