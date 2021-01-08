// TODO: This is poor design, there should be a better way to handle out data store queries
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface IQuery {
    skip?: number;
    where?: unknown;
    limit?: number;
    sort?: unknown;
}
