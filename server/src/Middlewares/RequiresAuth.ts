import { RequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../Schemas/Mongo/User/UserModel";
import UserRepository from "../Repositories/User/UserRepository";
import container from "../bootstrap";
import IConfig from "../Config/IConfig";
import Types from "../@Types/Types";

function requiresAuth(repository?: InstanceType<typeof UserRepository>): RequestHandler {
    return async (req, res, next) => {
        try {
            const config = container.get<IConfig>(Types.Config);
            const token = req.cookies.token || req.headers.authorization.split("Bearer ")[1];
            const decoded = jsonwebtoken.verify(token, await config.getValue("AUTH_SECRET")) as {
                id: string;
            };
            if (repository) {
                const userEntity = await repository.findById(decoded.id);
                req.userEntity = () => userEntity;
            } else {
                const user = await User.findById(decoded.id);
                req.user = user;
            }
            next();
        } catch (error) {
            res.status(401).json({
                error: "Not authenticated"
            });
            next(error);
        }
    };
}

export default requiresAuth;
