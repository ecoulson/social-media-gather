import jsonwebtoken from "jsonwebtoken";
import User from "../Models/User";

function requiresAuth() {
    return async (req : any, res : any, next : any) => {
        try {
            const token = req.cookies.token;
            const decoded = jsonwebtoken.verify(token, process.env.AUTH_SECRET) as any;
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