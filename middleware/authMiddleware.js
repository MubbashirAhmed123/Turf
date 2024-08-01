const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const routes = express.Router();

routes.get('/dashboard', (req, res,next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ msg: 'Unauthorized access.' });
            }
            req.email = user.email;
            res.status(200).send({ msg: 'Welcome to admin dashboard' });
            next()
        });
    } else {
        return res.status(401).json({ msg: 'Authorization header not found' });
    }
});

module.exports=routes