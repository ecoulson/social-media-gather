export default interface IBuilder<T> {
    build(): T;
    reset(): void;
}
