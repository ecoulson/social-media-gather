export default interface ISearchChannelOptions {
    query: string;
    first?: number;
    after?: string;
    live_only?: boolean;
}
