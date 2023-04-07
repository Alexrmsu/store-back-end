const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).json('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    try {
        const decode = jwt.verify(token, "secret");
        next();
    }
    catch (err) {
        return res.status(401).json('Unauthorized request')
    }
}

module.exports = verifyToken;