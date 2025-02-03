const jwt = require('jsonwebtoken');

exports.generateTokenFun = async (userId, res) => {
    try {
        // Generate JWT token with user ID
        const token = jwt.sign({ id: userId }, process.env.SECRETKEY, { expiresIn: '1h' });

        // Set the token in a secure HttpOnly cookie
        res.cookie("Bearer", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000),  // 1 hour expiration
            httpOnly: true,  // Cookie can't be accessed via JavaScript
            secure: process.env.NODE_ENV === 'production',  // Secure cookie only in production (HTTPS)
            sameSite: 'Strict',  // Mitigate CSRF attacks
        });

        // Return the token, you might want to send this in the response body as well
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};
