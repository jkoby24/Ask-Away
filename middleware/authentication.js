const config = require("config");
const jwt = require("jsonwebtoken");
//
module.exports = (req, res, next) => {
    const token = req.header("authentication-token");
    const decoded = jwt.verify(token, config.get("jsonWebTokenSecret"));
    console.log(decoded); 
    req.user = decoded.user;
    // it goes to another middleware
    next();
};