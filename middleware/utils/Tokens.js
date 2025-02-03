const jwt = require('jsonwebtoken');

exports.generateTokenFun = async (userId, res) => {
    try {
        const token = jwt.sign({ id: userId }, process.env.SECRETKEY, { expiresIn: '1h' });

        res.cookie("Bearer", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};
