export default interface IToken<Payload> {
    verify(token: string): Payload;
    sign(): string;
}
