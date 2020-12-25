import "reflect-metadata"
import UserRecord from "../../../src/Records/User/UserRecord";
import UserService from "../../../src/Services/UserService";
import { Mock } from "moq.ts";
import container from "../../../src/bootstrap";
import Types from "../../../src/@Types/Types";
import IUser from "../../../src/Entities/User/IUser";

describe("User Service Suite", () => {
    let service : UserService;
    let mockUserRecord : Mock<InstanceType<typeof UserRecord>>;
    let mockUser : Mock<IUser>;

    beforeEach(() => {
        mockUser = new Mock<IUser>();
        mockUserRecord = new Mock<InstanceType<typeof UserRecord>>();
        mockUserRecord
            .setup(instance => instance.delete)
            .returns((user : IUser) => Promise.resolve(user))

        container.rebind<InstanceType<typeof UserRecord>>(Types.UserRecord).toConstantValue(mockUserRecord.object());

        service = container.get<UserService>(Types.UserService);
    })

    describe("Delete User", () => {
        test("Should delete user", async () => {
            const user = mockUser.object();

            await service.deleteUser(user);
        })
    })
})