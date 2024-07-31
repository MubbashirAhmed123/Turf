const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Admin = require('../model/adminModel');

const routes = express.Router();

const verify = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};



routes.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, turfName, password } = req.body;

    try {
        const result = await Admin.findOne({ email });
        if (!result) {
            return res.status(400).json({ msg: 'Admin not found!' });
        }

        const isPasswordMatch = verify(password);

        if (isPasswordMatch === result.password && turfName === result.turfName) {

            console.log(result,process.env.JWT_SECRET_KEY)

            const token = jwt.sign({ email: result.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ msg: 'Login successful', name: turfName, token });
        } else {
            return res.status(400).json({ msg: 'Invalid credentials!' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

routes.get('/dashboard', (req, res) => {
    const header = req.headers['authorization'];
    console.log(header)
    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ msg: 'Unauthorized access.' });
            }
            req.email = user.email;
            res.status(200).send({ msg: 'Welcome to admin dashboard' });
        });
    } else {
        return res.status(401).json({ msg: 'Authorization header not found' });
    }
});

routes.get('/logout', (req, res) => {
    return res.status(200).send({ msg: 'Logout successfully!' });
});

module.exports = routes;
