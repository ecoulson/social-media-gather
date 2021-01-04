import { inject } from "inversify";
import { controller, httpGet, queryParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMessageStructure from "../Messages/IMessageStructure";
import UsersMessage from "../Messages/UsersMessage";
import ISearchService from "../Services/Search/ISearchService";

@controller("/api/search")
export default class SearchController {
    constructor(@inject(Types.SearchService) private searchService: ISearchService) {}

    @httpGet("/placeholder")
    async getPlaceholderSearchText(): Promise<IMessageStructure> {
        const user = await this.searchService.getPlaceholderUser();
        return new UsersMessage([user]).create();
    }

    @httpGet("/")
    async searchForUser(@queryParam("query") query: string): Promise<IMessageStructure> {
        const searchResults = await this.searchService.search(query);
        return new UsersMessage(searchResults).create();
    }
}
