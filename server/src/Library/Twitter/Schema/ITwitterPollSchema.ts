import ITwitterPollOptionSchema from "./ITwitterPollOptionSchema";

export default interface ITwitterPollSchema {
    options: ITwitterPollOptionSchema[];
    end_datetime: string;
    duration_minutes: string;
}
