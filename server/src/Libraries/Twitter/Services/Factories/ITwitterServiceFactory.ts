import TwitterServiceType from "../../TwitterServiceType";
import ITwitterService from "../ITwitterService";

export default interface ITwitterServiceFactory {
    createService(clientType: TwitterServiceType): ITwitterService;
}
