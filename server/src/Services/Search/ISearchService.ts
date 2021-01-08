import IUser from "../../Entities/User/IUser";

export default interface ISearchService {
    getPlaceholderUser(): Promise<IUser>;
    search(query: string): Promise<IUser[]>;
}
