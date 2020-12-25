import { RequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../DataStore/Mongo/Models/User/UserModel";
import UserRecord from "../Records/User/UserRecord";

function requiresAuth(record? : InstanceType<typeof UserRecord>) : RequestHandler {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;
            const decoded = jsonwebtoken.verify(token, process.env.AUTH_SECRET) as any;
            if (record) {
                const userEntity = await record.findById(decoded.id);
                req.userEntity = () => userEntity;
            } else {
                const user = await User.findById(decoded.id);
                req.user = user; 
            }
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