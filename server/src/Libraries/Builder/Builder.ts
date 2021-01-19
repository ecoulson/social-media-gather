import IBuilder from "./IBuilder";

export default abstract class Builder<T> implements IBuilder<T> {
    constructor() {
        this.reset();
    }

    build(): T {
        const constructedObject = this.construct();
        this.reset();
        return constructedObject;
    }

    abstract reset(): void;

    abstract construct(): T;
}
