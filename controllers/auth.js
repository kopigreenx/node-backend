const jwt = require('jsonwebtoken')

function Auth(req,res,next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({auth:false,message:"Restricted Area"})
    jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
        if (err) return res.status(500).json({
            auth: false,
            message: 'Failed Authentication Token'
        })
        req.userID = decode.id;
        req.token  = token; 
        next();
    })
}

module.exports = Auth;