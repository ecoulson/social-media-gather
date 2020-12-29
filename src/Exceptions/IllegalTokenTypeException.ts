import TokenType from "../Security/Tokens/TokenType";
import Exception from "./Exception";

export default class IllegalTokenTypeException extends Exception {
    constructor(tokenType: TokenType) {
        super(`Can not create a token for unknown token type '${tokenType}'`);
    }
}
