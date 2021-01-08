export default interface IPasswordManager {
    compare(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    hash(plainTextPassword: string, rounds: number): Promise<string>;
}
