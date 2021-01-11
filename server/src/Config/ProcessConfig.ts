import IConfig from "./IConfig";

export default class ProcessConfig implements IConfig {
    getValue(key: string): Promise<string> {
        return new Promise((resolve) => resolve(process.env[key]));
    }

    hasKey(key: string): Promise<boolean> {
        return new Promise((resolve) => resolve(process.env[key] !== undefined));
    }
}
