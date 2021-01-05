import "reflect-metadata";
import { Mock } from "moq.ts";
import Types from "../../../src/@Types/Types";
import container from "../../../src/bootstrap";
import SearchController from "../../../src/Controllers/SearchController";
import User from "../../../src/Entities/User/User";
import ISearchService from "../../../src/Services/ISearchService";
import UsersMessage from "../../../src/Messages/UsersMessage";

describe("Search Controller Suite", () => {
    let mockSearchService: Mock<ISearchService>;
    let controller: SearchController;
    let user: User;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockSearchService = new Mock<ISearchService>();

        container
            .rebind<ISearchService>(Types.UserService)
            .toConstantValue(mockSearchService.object());

        controller = new SearchController(mockSearchService.object());
    });

    describe("Placeholder", () => {
        test("Should get a random username", async () => {
            mockSearchService
                .setup((searchService) => searchService.getPlaceholderUser)
                .returns(() => Promise.resolve(user));

            const userMessage = await controller.getPlaceholderSearchText();

            expect(userMessage).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Search", () => {
        test("Should search for users", async () => {
            mockSearchService
                .setup((searchService) => searchService.search)
                .returns(() => Promise.resolve([user]));

            const searchMessage = await controller.searchForUser(user.username());

            expect(searchMessage).toEqual(new UsersMessage([user]).create());
        });
    });
});
