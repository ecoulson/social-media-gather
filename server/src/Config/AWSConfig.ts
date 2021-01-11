import IConfig from "./IConfig";
import SSM from "aws-sdk/clients/ssm";
import AWS from "aws-sdk";
import EnvironmentType from "../EnvironmentType";
AWS.config.update({ region: "us-west-2" });

export default class AWSConfig implements IConfig {
    private ssm: SSM;
    private cache: Map<string, string>;

    constructor(private environmentType: EnvironmentType) {
        this.ssm = new SSM();
        this.cache = new Map();
    }

    getValue(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }
            this.ssm.getParameter(
                {
                    Name: `${this.environmentType}.${key}`
                },
                (error, data) => {
                    if (error) {
                        return reject(error);
                    }
                    const value = data.Parameter.Value;
                    this.cache.set(key, value);
                    return resolve(value);
                }
            );
        });
    }

    async hasKey(key: string): Promise<boolean> {
        try {
            return (await this.getValue(key)) !== undefined;
        } catch {
            return false;
        }
    }
}
