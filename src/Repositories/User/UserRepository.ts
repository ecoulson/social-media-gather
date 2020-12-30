import IDataStore from "../../DataStore/IDataStore";
import IUser from "../../Entities/User/IUser";
import CoreRepository from "../CoreRepository";
import CountMixin from "../CountMixin";
import RepositoryMixin from "../RepositoryMixin";
import IUserRepository from "./IUserRepository";

class UserRepository extends CoreRepository<IUser> implements IUserRepository {
    constructor(dataStore: IDataStore<IUser>) {
        super(dataStore);
    }

    async findByUsername(username: string): Promise<IUser> {
        return (
            await this.dataStore.find({
                query: { username }
            })
        )[0];
    }

    async findByUsernameOrEmail(username: string, email: string): Promise<IUser> {
        return (
            await this.dataStore.find({
                query: {
                    $or: [{ email }, { username }]
                }
            })
        )[0];
    }

    async findNthUser(offset: number): Promise<IUser> {
        return (
            await this.dataStore.find({
                query: {},
                skip: offset,
                limit: 1
            })
        )[0];
    }

    async searchForUser(query: string): Promise<IUser[]> {
        return await this.dataStore.find({
            query: {
                username: {
                    $regex: new RegExp(`${query}.*`, "i")
                }
            }
        });
    }
}

export default RepositoryMixin<IUser>()(CountMixin<IUser>()(UserRepository));
