const express = require('express');
const router = express.Router();
const connection = require('../../connection/connection');
const jwt = require('jsonwebtoken');
const verifyToken  = require('../routes/jwt-valid');
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: 'img_temp/' }); // specify the directory where uploaded files should be stored


router.get('/', (req, res) => {
    connection.query('SELECT * FROM products', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.post('/add', verifyToken, upload.single('image'), (req, res) => {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.buffer : null;

    connection.query(
        'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
        [name, description, price, image],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to add product' });
            }

            res.json({ status: 'Product saved' });
        }
    );
});


router.get('/all', (req, res) => {
    connection.query('SELECT * FROM products', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})


router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    connection.query(
        'SELECT * FROM products WHERE id = ?',
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to retrieve product' });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const product = result[0];

            // Set the content type header to indicate that the response is an image
            res.set('Content-Type', 'image/jpeg');

            // Send the image data as the response body
            res.send(product.image);
        }
    );
});


module.exports = router;