const express = require('express');
const router = express.Router();
const connection = require('connection/connection.js');
const jwt = require('jsonwebtoken');
const verifyToken  = require('/api/routes/jwt-valid.js');



router.post('/login', (req, res) => {
    const { email, pass } = req.body;
    connection.query('select user.email, rol.nombreRol as \'rol\', user.userId from user left join rol on rol.idRol = user.rolId where email=? and pass=?',
        [email, pass], (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    const data = Object.assign({}, rows[0]);
                    const token = jwt.sign(data, "secret",{expiresIn: '1h'});
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
    connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, result) => {
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