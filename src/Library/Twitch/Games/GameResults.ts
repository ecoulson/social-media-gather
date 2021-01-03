import ITwitchGameResponseSchema from "../Schemas/ITwitchGameResponseSchema";
import ITwitchGameSchema from "../Schemas/ITwitchGameSchema";

export default class GameResults {
    constructor(private response: ITwitchGameResponseSchema) {}

    getGames(): ITwitchGameSchema[] {
        return this.response.data;
    }
}
