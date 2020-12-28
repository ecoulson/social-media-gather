/* eslint-disable @typescript-eslint/ban-types */
import IUserDocument from "../DataStore/Mongo/Models/User/IUserDocument";
import IUser from "../Entities/User/IUser";

declare global {
    namespace Express {
        export interface Request {
            user: IUserDocument | null;
            userEntity?(): IUser;
        }
    }
}

export type Transformer<A, B> = (object: A) => B;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MixinConstructor<T = {}> = new (...args: any[]) => T;

export {};
