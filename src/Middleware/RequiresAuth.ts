const jsonwebtoken = require("jsonwebtoken");
const User = require("../Models/User");

function requiresAuth() {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;
            const decoded = jsonwebtoken.verify(token, process.env.AUTH_SECRET);
            const user = await User.findById(decoded.id);
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({
                error: "Not authenticated"
            })
            next(error);
        }
    }
}

export default requiresAuth;