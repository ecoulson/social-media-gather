declare global {
    namespace Express {
        export interface Request {
            user: any;
        }
    }

}

export type Transformer<A, B> = (object : A) => B;

export type MixinConstructor<T = {}> = new (...args : any[]) => T;

export {};