const express = require('express');
const router = express.Router();
const connection = require('../../connection/connection');
const jwt = require('jsonwebtoken');
const  verifyToken  = require('../routes/jwt-valid');



router.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query(' select * from user where email = ? and password = ? ',
        [email, password], (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    const data = Object.assign({}, rows[0]);
                    const token = jwt.sign(data, "secret",{expiresIn: '2h'});
                    return res.json({token});
                }
                else {
                    return res.json({ status: 'Usuario o contraseña incorrectos' });
                }
            } else {
                console.log(err);
            }
        }

    )

})


router.post('/register', verifyToken, (req, res) => {
    connection.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            return res.status(409).json({
                message: 'Email already exists'
            })
        }
        connection.query('INSERT INTO users SET ?', req.body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(201).json({
                message: 'User created'
            })
        })
    })
})



module.exports = router;