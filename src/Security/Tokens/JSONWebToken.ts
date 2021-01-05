import IToken from "./IToken";
import jsonwebtoken from "jsonwebtoken";

export default class JSONWebToken<Payload> implements IToken<Payload> {
    constructor(private payload: Payload, private secret: string, private expiresIn?: string) {}

    sign(): string {
        return jsonwebtoken.sign(Object.assign({}, this.payload), this.secret, {
            expiresIn: this.expiresIn ? this.expiresIn : "30d"
        });
    }

    verify(token: string): Payload {
        return (jsonwebtoken.verify(token, this.secret) as unknown) as Payload;
    }
}
