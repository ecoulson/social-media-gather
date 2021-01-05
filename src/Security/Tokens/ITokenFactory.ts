import IToken from "./IToken";
import TokenType from "./TokenType";

export default interface ITokenFactory<T> {
    create(tokenType: TokenType, payload: T, expiresIn?: string): IToken<T>;
}
