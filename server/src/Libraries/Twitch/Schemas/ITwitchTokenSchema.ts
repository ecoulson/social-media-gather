export default interface ITwitchTokenSchema {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: string;
    type?: string;
    scope?: string;
}
