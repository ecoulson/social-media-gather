import { inject, injectable, tagged } from "inversify";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import IUser from "../Entities/User/IUser";
import UserRepository from "../Repositories/User/UserRepository";
import ISearchService from "./ISearchService";

@injectable()
export default class SearchService implements ISearchService {
    constructor(
        @inject(Types.UserRepository)
        @tagged(Tags.MONGO, true)
        private userRepository: InstanceType<typeof UserRepository>
    ) {}

    async getPlaceholderUser(): Promise<IUser> {
        const estimatedUsers = await this.userRepository.estimatedCount();
        const usersToSkip = Math.floor(Math.random() * estimatedUsers);
        return await this.userRepository.findNthUser(usersToSkip);
    }

    search(query: string): Promise<IUser[]> {
        return this.userRepository.searchForUser(query);
    }
}
