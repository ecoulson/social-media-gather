import { injectable } from "inversify";
import IToken from "./IToken";
import ITokenFactory from "./ITokenFactory";
import JSONWebToken from "./JSONWebToken";
import TokenType from "./TokenType";

@injectable()
export default class TokenFactory<T> implements ITokenFactory<T> {
    create(tokenType: TokenType, payload: T, expiresIn?: string): IToken<T> {
        switch (tokenType) {
            case TokenType.JWT:
                return new JSONWebToken(payload, process.env.AUTH_SECRET, expiresIn);
            default:
                throw new Error();
        }
    }
}
