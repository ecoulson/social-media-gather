import { RequestHandler } from "express";
import { inject, tagged } from "inversify";
import jsonwebtoken from "jsonwebtoken";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import User from "../DataStore/Mongo/Models/User/UserModel";
import UserRecord from "../Records/User/UserRecord";

function requiresAuth(record : InstanceType<typeof UserRecord>) : RequestHandler {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;
            const decoded = jsonwebtoken.verify(token, process.env.AUTH_SECRET) as any;
            const userEntity = await record.findById(decoded.id);
            const user = await User.findById(decoded.id);
            req.userEntity = () => userEntity;
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