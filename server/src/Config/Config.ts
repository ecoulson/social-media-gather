import AWSConfig from "./AWSConfig";
import IConfig from "./IConfig";
import ProcessConfig from "./ProcessConfig";

export default class Config implements IConfig {
    constructor(private awsConfig: AWSConfig, private processConfig: ProcessConfig) {}

    async getValue(key: string): Promise<string> {
        if (await this.processConfig.hasKey(key)) {
            return this.processConfig.getValue(key);
        }
        return this.awsConfig.getValue(key);
    }

    async hasKey(key: string): Promise<boolean> {
        return (await this.awsConfig.hasKey(key)) || (await this.processConfig.hasKey(key));
    }
}
