export default interface ITwitchResult<T> {
    results(): T;
    rateLimitRemaining(): number;
    rateLimitResetDateTime(): Date;
}
