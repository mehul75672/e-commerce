var jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (token) {
        await jwt.verify(token, process.env.SECRETKEY, async (err, verifytoken) => {
            if (err) {
                console.log("token is not verify");
                return res.status(400).json(err);

            } else {
                let user = await User.findById(verifytoken.id);
                req.send = user;
                next();
            }
        })
    } else {
        return res.status(500).json("provid the token");
    }
}
module.exports = { auth };