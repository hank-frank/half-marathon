const jwt = require('jsonwebtoken');
const secret = 'mysecrets';

const withAuth = (req, res, next) => {
    let token = req.cookies.token;
    
    console.log(`token from withAuth: `, token);

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};

module.exports = withAuth;
