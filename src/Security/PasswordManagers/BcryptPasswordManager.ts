import IPasswordManager from "./IPasswordManager";
import { hash, compare } from "bcrypt";
import HashFailureException from "../../Exceptions/HashFailureException";
import ComparisonFailureException from "../../Exceptions/ComparisonFailureException";
import { injectable } from "inversify";

@injectable()
export default class BcryptPasswordManager implements IPasswordManager {
    hash(plainTextPassword: string, rounds: number): Promise<string> {
        try {
            return hash(plainTextPassword, rounds);
        } catch (error) {
            throw new HashFailureException(error);
        }
    }

    compare(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return compare(plainTextPassword, hashedPassword);
        } catch (error) {
            throw new ComparisonFailureException(error);
        }
    }
}
