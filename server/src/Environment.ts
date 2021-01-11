import EnvironmentType from "./EnvironmentType";

export default class Environment {
    static getType(): EnvironmentType {
        switch (process.env.NODE_ENV) {
            case "production":
                return EnvironmentType.PRODUCTION;
            case "staging":
                return EnvironmentType.STAGING;
            case "development":
                return EnvironmentType.LOCAL;
            case "local_docker":
                return EnvironmentType.DOCKER;
        }
    }
}
