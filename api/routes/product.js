const express = require('express');
const router = express.Router();
const connection = require('../../connection/connection');
const jwt = require('jsonwebtoken');
const  verifyToken  = require('../routes/jwt-valid');

router.get('/', (req, res) => {
    connection.query('SELECT * FROM products', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

module.exports = router;