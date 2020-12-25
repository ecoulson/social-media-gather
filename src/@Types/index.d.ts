import IUser from "../Entities/User/IUser";

declare global {
    namespace Express {
        export interface Request {
            user: any;
            userEntity() : IUser;
        }
    }

}

export type Transformer<A, B> = (object : A) => B;

export type MixinConstructor<T = {}> = new (...args : any[]) => T;

export {};