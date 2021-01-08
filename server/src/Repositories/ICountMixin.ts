export default interface ICountMixin {
    count(): Promise<number>;
    estimatedCount(): Promise<number>;
}
