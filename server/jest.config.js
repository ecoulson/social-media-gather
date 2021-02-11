module.exports = {
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testEnvironment: "node",
    testMatch: ["**/?(*.)+(spec|test).+(ts)"],
    testPathIgnorePatterns: ["./node_modules/"],
    moduleDirectories: ["node_modules"],
    roots: ["<rootDir>/test"]
};
