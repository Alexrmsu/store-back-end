const express = require('express');
const router = express.Router();
const connection = require('../../connection/connection');
const jwt = require('jsonwebtoken');
const verifyToken  = require('../routes/jwt-valid');
const fs = require("fs");
const multer = require('multer');



router.get('/image/:name', (req, res) => {

const name = req.params.name;
    const path = './img/' + name;
    fs.readFile(path, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
    });
})





router.get('/', (req, res) => {
    connection.query('SELECT * FROM products', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})


router.post('/add' , verifyToken, (req, res) => {
    const {id, name, description, image, price } = req.body;
    connection.query('INSERT INTO products SET ?', { id, name, description, image, price }, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Product saved' });
        } else {
            console.log(err);
        }
    })
})


router.put('/update', verifyToken, (req, res) => {
    const { id, name, description, price } = req.body;
    connection.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Product updated' });
        } else {
            console.log(err);
        }
    })
})



router.get('/all', (req, res) => {
    connection.query('SELECT * FROM products', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.delete('/delete/:id', verifyToken, (req, res) => {
    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Product deleted' });
        } else {
            console.log(err);
        }
    })
})



module.exports = router;