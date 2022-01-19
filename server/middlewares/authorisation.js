const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async(req, res, next) => {
    try {

        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).json("Unauthorised");
        }
        const payload = jwt.verify(jwtToken, "+r?FRAD97Vw3Pq");

        req.user = payload.user;

        next();

    } catch (err) {
        console.log(err.message);
        return res.status(403).json("Unauthorised");
    }
}