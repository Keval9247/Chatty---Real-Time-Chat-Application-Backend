const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const protectMiddlware = async (req, res, next) => {
    try {
        const token = req.cookies.Bearer
        console.log('1111')
        console.log("===============", token)
        console.log("🚀🚀 Your selected text is => token: ", req.cookies.Bearer);
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token is required' });
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY)
        if (!decoded) {
            return res.status(401).json({ message: 'Not authorized, Invalid decoded token' });
        }

        const user = await User.findById({ _id: decoded.id }).select("-password");
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, User not found.' });
        }
        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({ message: 'Dude.. you are not authorized yet, Please try again after a while.' })
    }
}

module.exports = protectMiddlware;