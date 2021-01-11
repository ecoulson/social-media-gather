export default interface IConfig {
    getValue(key: string): Promise<string>;
    hasKey(key: string): Promise<boolean>;
}
