import { inject } from "inversify";
import { controller, httpGet, queryParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import UsersMessage from "../Messages/Users/UsersMessage";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import ISearchService from "../Services/Search/ISearchService";

@controller("/api/search")
export default class SearchController {
    constructor(@inject(Types.SearchService) private searchService: ISearchService) {}

    @httpGet("/placeholder")
    async getPlaceholderSearchText(): Promise<IMessageJSONSchema> {
        const user = await this.searchService.getPlaceholderUser();
        return new UsersMessage([user]).toJson();
    }

    @httpGet("/")
    async searchForUser(@queryParam("query") query: string): Promise<IMessageJSONSchema> {
        const searchResults = await this.searchService.search(query);
        return new UsersMessage(searchResults).toJson();
    }
}
