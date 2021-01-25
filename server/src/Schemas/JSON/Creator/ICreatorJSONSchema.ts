export default interface ICreatorJSONSchema {
    id: string;
    username: string;
    email: string;
    isCreator: boolean;
    verified: boolean;
    following: string[];
    channels: string[];
}
