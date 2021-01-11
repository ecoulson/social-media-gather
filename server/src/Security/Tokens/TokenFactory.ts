import { inject, injectable } from "inversify";
import Types from "../../@Types/Types";
import IConfig from "../../Config/IConfig";
import IToken from "./IToken";
import ITokenFactory from "./ITokenFactory";
import JSONWebToken from "./JSONWebToken";
import TokenType from "./TokenType";

@injectable()
export default class TokenFactory<T> implements ITokenFactory<T> {
    constructor(@inject(Types.Config) private config: IConfig) {}

    async create(tokenType: TokenType, payload: T, expiresIn?: string): Promise<IToken<T>> {
        switch (tokenType) {
            case TokenType.JWT:
                return new JSONWebToken(
                    payload,
                    await this.config.getValue("AUTH_SECRET"),
                    expiresIn
                );
            default:
                throw new Error();
        }
    }
}
